"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Course, courseSchema } from "@/lib/types";

const COLORS = [
  "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", 
  "#10b981", "#06b6d4", "#6366f1", "#ef4444"
];

export default function EditorPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentName, setStudentName] = useState("");
  const [semester, setSemester] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Course, "id">>({
    resolver: zodResolver(courseSchema.omit({ id: true })),
  });

  const onAddCourse = (data: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...data,
      id: Date.now().toString(),
      color: COLORS[courses.length % COLORS.length],
    };
    setCourses([...courses, newCourse]);
    reset();
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const goToPreview = () => {
    if (!studentName || !semester || courses.length === 0) {
      alert("Lengkapi data terlebih dahulu!");
      return;
    }
    
    const schedule = { studentName, semester, courses };
    localStorage.setItem("schedule", JSON.stringify(schedule));
    router.push("/preview");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Add Class Editor</h1>

        {/* Student Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Student Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Mahasiswa"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Semester (e.g., Fall 2023)"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Add Course Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Course Details</h2>
          <form onSubmit={handleSubmit(onAddCourse)} className="space-y-4">
            <input
              {...register("name")}
              placeholder="Course Name (e.g., Introduction to Psychology)"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("room")}
                placeholder="Room / Location (e.g., Hall 3B)"
                className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                {...register("lecturer")}
                placeholder="Lecturer Name (e.g., Dr. Sarah Smith)"
                className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <select
              {...register("day")}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a day</option>
              <option value="monday">Senin</option>
              <option value="tuesday">Selasa</option>
              <option value="wednesday">Rabu</option>
              <option value="thursday">Kamis</option>
              <option value="friday">Jumat</option>
              <option value="saturday">Sabtu</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("startTime")}
                type="time"
                placeholder="Start Time"
                className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                {...register("endTime")}
                type="time"
                placeholder="End Time"
                className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              + Add Class
            </button>
          </form>
        </div>

        {/* Course List */}
        {courses.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Added Courses ({courses.length})
            </h2>
            <div className="space-y-2">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: course.color }} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{course.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {course.day} • {course.startTime}-{course.endTime} • {course.room}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview Button */}
        <button
          onClick={goToPreview}
          disabled={courses.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition"
        >
          Preview Schedule →
        </button>
      </div>
    </div>
  );
}
