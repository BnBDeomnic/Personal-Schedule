"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/useAuth";
import { Course, courseSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const dynamic = 'force-dynamic';

const COLORS = [
  "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b",
  "#10b981", "#06b6d4", "#6366f1", "#ef4444"
];

export default function NewSchedulePage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentName, setStudentName] = useState("");
  const [semester, setSemester] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Omit<Course, "id" | "color">>({
    resolver: zodResolver(courseSchema.omit({ id: true, color: true })),
    defaultValues: {
      name: "",
      room: "",
      lecturer: "",
      day: undefined,
      startTime: "",
      endTime: "",
    }
  });

  const onAddCourse = (data: Omit<Course, "id" | "color">) => {
    const newCourse: Course = {
      ...data,
      id: Date.now().toString(),
      color: COLORS[courses.length % COLORS.length],
    };
    
    setCourses([...courses, newCourse]);
    toast.success(`Added: ${data.name}`);
    reset({
      name: "",
      room: "",
      lecturer: "",
      day: undefined,
      startTime: "",
      endTime: "",
    });
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    toast.info("Course removed");
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

    if (!user) {
      toast.error("You must be logged in");
      router.push("/login");
      return;
    }

    setSaving(true);

    try {
      // Create schedule
      const { data: schedule, error: scheduleError } = await supabase
        .from('schedules')
        .insert({
          user_id: user.id,
          student_name: studentName,
          semester: semester,
        })
        .select()
        .single();

      if (scheduleError) throw scheduleError;

      // Insert courses
      const coursesData = courses.map(course => ({
        schedule_id: schedule.id,
        name: course.name,
        room: course.room,
        lecturer: course.lecturer,
        day: course.day,
        start_time: course.startTime,
        end_time: course.endTime,
        color: course.color,
      }));

      const { error: coursesError } = await supabase
        .from('courses')
        .insert(coursesData);

      if (coursesError) throw coursesError;

      toast.success("Schedule created successfully!");
      router.push(`/preview/${schedule.id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to save schedule");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Create New Schedule</h1>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            ← Back
          </Button>
        </div>

        {/* Student Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                placeholder="John Doe"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                placeholder="Fall 2023"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Course Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onAddCourse)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Introduction to Psychology"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    {...register("room")}
                    placeholder="Hall 3B"
                  />
                  {errors.room && <p className="text-sm text-red-500">{errors.room.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lecturer">Lecturer</Label>
                  <Input
                    id="lecturer"
                    {...register("lecturer")}
                    placeholder="Dr. Sarah Smith"
                  />
                  {errors.lecturer && <p className="text-sm text-red-500">{errors.lecturer.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select onValueChange={(value) => setValue("day", value as any, { shouldValidate: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
                {errors.day && <p className="text-sm text-red-500">{errors.day.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    {...register("startTime")}
                  />
                  {errors.startTime && <p className="text-sm text-red-500">{errors.startTime.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    {...register("endTime")}
                  />
                  {errors.endTime && <p className="text-sm text-red-500">{errors.endTime.message}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full">+ Add Course</Button>
            </form>
          </CardContent>
        </Card>

        {/* Course List */}
        {courses.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Added Courses ({courses.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: course.color }} />
                    <div>
                      <p className="font-semibold">{course.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course.day} • {course.startTime}-{course.endTime} • {course.room}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCourse(course.id)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={courses.length === 0 || saving}
          className="w-full"
          size="lg"
        >
          {saving ? "Saving..." : "Save & Preview Schedule"}
        </Button>
      </div>
    </div>
  );
}
