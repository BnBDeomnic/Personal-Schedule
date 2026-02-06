"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ScheduleCanvas } from "@/components/ScheduleCanvas";
import { exportAsPNG, exportAsJPEG, exportAsPDF } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const scheduleId = params?.id as string;
  const [schedule, setSchedule] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Print Preview</h1>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6 overflow-auto">
          <ScheduleCanvas schedule={schedule} scale={0.25} />
        </div>

        {/* Export Options */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Print Options</h2>
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
  );
}
