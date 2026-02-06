"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ScheduleCanvas } from "@/components/ScheduleCanvas";
import { exportAsPNG, exportAsPDF } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const dynamic = 'force-dynamic';

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const scheduleId = params?.id as string;
  const [schedule, setSchedule] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewScale, setPreviewScale] = useState(0.25);
  const supabase = createClient();

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!scheduleId) {
        router.push("/dashboard");
        return;
      }

      const { data, error } = await supabase
        .from('schedules')
        .select('*, courses(*)')
        .eq('id', scheduleId)
        .single();

      if (error || !data) {
        toast.error("Schedule not found");
        router.push("/dashboard");
        return;
      }

      // Transform to match old format
      const transformedSchedule = {
        studentName: data.student_name,
        semester: data.semester,
        courses: data.courses.map((c: any) => ({
          id: c.id,
          name: c.name,
          room: c.room,
          lecturer: c.lecturer,
          day: c.day,
          startTime: c.start_time,
          endTime: c.end_time,
          color: c.color,
        })),
      };

      setSchedule(transformedSchedule);
      setLoading(false);
    };

    fetchSchedule();
  }, [scheduleId, router, supabase]);

  // Update preview scale on window resize
  useEffect(() => {
    const updateScale = () => {
      const availableWidth = Math.min(window.innerWidth - 100, 1400);
      const canvasWidth = 2480;
      const scale = availableWidth / canvasWidth;
      setPreviewScale(scale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleExport = async (type: "png" | "pdf") => {
    const element = document.getElementById("schedule-canvas");
    if (!element) {
      toast.error("Schedule canvas not found");
      return;
    }

    setIsExporting(true);
    try {
      const filename = `${schedule.studentName}_${schedule.semester}`.replace(/\s+/g, '_');
      
      if (type === "png") {
        await exportAsPNG(element, `${filename}.png`);
        toast.success("PNG exported successfully!");
      } else if (type === "pdf") {
        await exportAsPDF(element, `${filename}.pdf`);
        toast.success("PDF exported successfully!");
      }
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading schedule...</p>
      </div>
    );
  }

  if (!schedule) return null;

  // Calculate exact canvas dimensions
  const getCanvasDimensions = () => {
    if (!schedule || schedule.courses.length === 0) {
      return { width: 2480, height: 1860 }; // Updated default
    }

    const config = {
      canvasWidth: 2480, // Updated from 3508
      headerHeight: 240,
      dayHeaderHeight: 70,
      footerHeight: 80,
      hourHeight: 160,
    };

    // Calculate dynamic height based on courses
    const startHours = schedule.courses.map((c: any) => parseInt(c.startTime.split(':')[0]));
    const endHours = schedule.courses.map((c: any) => parseInt(c.endTime.split(':')[0]));
    const minHour = Math.min(...startHours);
    const maxHour = Math.max(...endHours) + 1;
    const hourRange = maxHour - minHour;

    const contentHeight = hourRange * config.hourHeight;
    const totalHeight = config.headerHeight + config.dayHeaderHeight + contentHeight + config.footerHeight;

    return {
      width: config.canvasWidth,
      height: totalHeight,
    };
  };

  const canvasDimensions = getCanvasDimensions();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Print Preview</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push(`/dashboard/${scheduleId}/edit`)}>
              ✏️ Edit Schedule
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              ← Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Preview - Full Width */}
        <div 
          className="bg-white rounded-lg shadow-2xl overflow-hidden mb-6 mx-auto"
          style={{
            width: canvasDimensions.width * previewScale,
            height: canvasDimensions.height * previewScale,
          }}
        >
          <ScheduleCanvas schedule={schedule} scale={previewScale} />
        </div>

        {/* Export Options */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Export Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => handleExport("pdf")}
              disabled={isExporting}
              className="h-20 text-lg"
              size="lg"
            >
              {isExporting ? (
                "Exporting..."
              ) : (
                <>
                  <span className="text-3xl mr-3">📄</span>
                  <div className="text-left">
                    <div className="font-bold">Export as PDF</div>
                    <div className="text-xs opacity-80">A4 Landscape, Print-ready</div>
                  </div>
                </>
              )}
            </Button>
            <Button
              onClick={() => handleExport("png")}
              disabled={isExporting}
              variant="secondary"
              className="h-20 text-lg"
              size="lg"
            >
              {isExporting ? (
                "Exporting..."
              ) : (
                <>
                  <span className="text-3xl mr-3">🖼️</span>
                  <div className="text-left">
                    <div className="font-bold">Export as Image</div>
                    <div className="text-xs opacity-80">PNG, High Resolution (3x)</div>
                  </div>
                </>
              )}
            </Button>
          </div>
          {isExporting && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-gray-400 mt-2">Processing... Please wait</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
