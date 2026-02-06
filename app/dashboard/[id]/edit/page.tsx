"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export const dynamic = 'force-dynamic';

interface Course {
  id?: string;
  name: string;
  room: string;
  lecturer: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

const DAYS = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
];

const COLORS = [
  "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", 
  "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#84CC16"
];

export default function EditSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const scheduleId = params?.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form state for new/edit course
  const [courseName, setCourseName] = useState("");
  const [courseRoom, setCourseRoom] = useState("");
  const [courseLecturer, setCourseLecturer] = useState("");
  const [courseDay, setCourseDay] = useState("monday");
  const [courseStartTime, setCourseStartTime] = useState("08:00");
  const [courseEndTime, setCourseEndTime] = useState("10:00");
  const [courseColor, setCourseColor] = useState(COLORS[0]);

  useEffect(() => {
    fetchSchedule();
  }, [scheduleId]);

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

    setStudentName(data.student_name);
    setSemester(data.semester);
    setCourses(data.courses.map((c: any) => ({
      id: c.id,
      name: c.name,
      room: c.room,
      lecturer: c.lecturer,
      day: c.day,
      startTime: c.start_time,
      endTime: c.end_time,
      color: c.color,
    })));
    setLoading(false);
  };

  const resetCourseForm = () => {
    setCourseName("");
    setCourseRoom("");
    setCourseLecturer("");
    setCourseDay("monday");
    setCourseStartTime("08:00");
    setCourseEndTime("10:00");
    setCourseColor(COLORS[0]);
    setEditingCourse(null);
  };

  const handleAddCourse = () => {
    if (!courseName || !courseRoom || !courseLecturer) {
      toast.error("Please fill all course fields");
      return;
    }

    const newCourse: Course = {
      name: courseName,
      room: courseRoom,
      lecturer: courseLecturer,
      day: courseDay,
      startTime: courseStartTime,
      endTime: courseEndTime,
      color: courseColor,
    };

    setCourses([...courses, newCourse]);
    resetCourseForm();
    toast.success("Course added");
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseName(course.name);
    setCourseRoom(course.room);
    setCourseLecturer(course.lecturer);
    setCourseDay(course.day);
    setCourseStartTime(course.startTime);
    setCourseEndTime(course.endTime);
    setCourseColor(course.color);
  };

  const handleUpdateCourse = () => {
    if (!editingCourse) return;

    const updatedCourses = courses.map(c => 
      c.id === editingCourse.id ? {
        ...c,
        name: courseName,
        room: courseRoom,
        lecturer: courseLecturer,
        day: courseDay,
        startTime: courseStartTime,
        endTime: courseEndTime,
        color: courseColor,
      } : c
    );

    setCourses(updatedCourses);
    resetCourseForm();
    toast.success("Course updated");
  };

  const handleDeleteCourse = (course: Course) => {
    setCourses(courses.filter(c => c.id !== course.id));
    toast.success("Course removed");
  };

  const handleSave = async () => {
    if (!studentName || !semester) {
      toast.error("Please fill student name and semester");
      return;
    }

    if (courses.length === 0) {
      toast.error("Please add at least one course");
      return;
    }

    setSaving(true);

    try {
      // Update schedule
      const { error: scheduleError } = await supabase
        .from('schedules')
        .update({
          student_name: studentName,
          semester: semester,
        })
        .eq('id', scheduleId);

      if (scheduleError) throw scheduleError;

      // Delete all existing courses
      await supabase
        .from('courses')
        .delete()
        .eq('schedule_id', scheduleId);

      // Insert new courses
      const coursesToInsert = courses.map(c => ({
        schedule_id: scheduleId,
        name: c.name,
        room: c.room,
        lecturer: c.lecturer,
        day: c.day,
        start_time: c.startTime,
        end_time: c.endTime,
        color: c.color,
      }));

      const { error: coursesError } = await supabase
        .from('courses')
        .insert(coursesToInsert);

      if (coursesError) throw coursesError;

      toast.success("Schedule updated successfully!");
      router.push(`/preview/${scheduleId}`);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save schedule");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Schedule</h1>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Schedule Info & Course Form */}
          <div className="space-y-6">
            {/* Schedule Info */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="e.g., Fall 2024"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Form */}
            <Card>
              <CardHeader>
                <CardTitle>{editingCourse ? "Edit Course" : "Add New Course"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g., Mathematics"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseRoom">Room</Label>
                    <Input
                      id="courseRoom"
                      value={courseRoom}
                      onChange={(e) => setCourseRoom(e.target.value)}
                      placeholder="e.g., A101"
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseLecturer">Lecturer</Label>
                    <Input
                      id="courseLecturer"
                      value={courseLecturer}
                      onChange={(e) => setCourseLecturer(e.target.value)}
                      placeholder="e.g., Dr. Smith"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="courseDay">Day</Label>
                  <Select value={courseDay} onValueChange={setCourseDay}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map(day => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={courseStartTime}
                      onChange={(e) => setCourseStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={courseEndTime}
                      onChange={(e) => setCourseEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Color</Label>
                  <div className="flex gap-2 mt-2">
                    {COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => setCourseColor(color)}
                        className={`w-8 h-8 rounded-full transition-all ${
                          courseColor === color ? "ring-4 ring-offset-2 ring-blue-500" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {editingCourse ? (
                    <>
                      <Button onClick={handleUpdateCourse} className="flex-1">
                        Update Course
                      </Button>
                      <Button onClick={resetCourseForm} variant="outline">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddCourse} className="w-full">
                      Add Course
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Course List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Courses ({courses.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {courses.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No courses added yet</p>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {courses.map((course, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        style={{ borderLeftWidth: 4, borderLeftColor: course.color }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{course.name}</h3>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditCourse(course)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteCourse(course)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>👨‍🏫 {course.lecturer}</p>
                          <p>📍 {course.room}</p>
                          <p>📅 {DAYS.find(d => d.value === course.day)?.label}</p>
                          <p>🕐 {course.startTime} - {course.endTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-6"
              size="lg"
            >
              {saving ? "Saving..." : "💾 Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
