"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ScheduleCanvas } from "@/components/ScheduleCanvas";
import { exportAsPNG, exportAsJPEG, exportAsPDF } from "@/lib/export";
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
  const [isFullScreen, setIsFullScreen] = useState(false);
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

  const handleExport = async (type: "png" | "jpeg" | "pdf") => {
    const element = document.getElementById("schedule-canvas");
    if (!element) return;

    setIsExporting(true);
    try {
      if (type === "png") await exportAsPNG(element);
      else if (type === "jpeg") await exportAsJPEG(element);
      else if (type === "pdf") await exportAsPDF(element);
      toast.success("Export successful!");
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
      return { width: 3508, height: 2480 };
    }

    const config = {
      canvasWidth: 3508,
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

  // Calculate scale to fit screen
  const calculateScale = () => {
    if (typeof window === 'undefined') return 0.25;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const scaleX = screenWidth / canvasDimensions.width;
    const scaleY = screenHeight / canvasDimensions.height;
    
    return Math.min(scaleX, scaleY, 1); // Max 1 (100%)
  };

  return (
    <>
      {/* Full Screen Mode */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 z-50 bg-black/80 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
          >
            ✕ Close Full Screen
          </button>
          
          {/* Canvas - Full Screen */}
          <div className="w-full h-full flex items-center justify-center">
            <ScheduleCanvas schedule={schedule} scale={calculateScale()} />
          </div>
        </div>
      )}

      {/* Normal View */}
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

          {/* Preview - Exact Canvas Size (No White Space) */}
          <div 
            className="bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{
              width: canvasDimensions.width * 0.25,
              height: canvasDimensions.height * 0.25,
            }}
          >
            <ScheduleCanvas schedule={schedule} scale={0.25} />
          </div>

          {/* Actions */}
          <div className="bg-gray-800 rounded-lg p-6 space-y-4">
            {/* Full Screen Button */}
            <div>
              <Button
                onClick={() => setIsFullScreen(true)}
                className="w-full"
                size="lg"
                variant="default"
              >
                🖥️ View Full Screen (No White Space)
              </Button>
            </div>

            {/* Export Options */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Export Options</h2>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleExport("pdf")}
                  disabled={isExporting}
                  className="flex-1"
                  size="lg"
                >
                  📄 Export PDF
                </Button>
                <Button
                  onClick={() => handleExport("png")}
                  disabled={isExporting}
                  variant="secondary"
                  className="flex-1"
                  size="lg"
                >
                  🖼️ Export as Image (PNG)
                </Button>
              </div>
              {isExporting && (
                <p className="text-center text-gray-400 mt-4">Exporting... Please wait.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
