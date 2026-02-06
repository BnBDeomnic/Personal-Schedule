import { z } from "zod";

// Schema untuk validasi input
export const courseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nama matkul wajib diisi"),
  room: z.string().min(1, "Ruang wajib diisi"),
  lecturer: z.string().min(1, "Nama dosen wajib diisi"),
  day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Format: HH:MM"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Format: HH:MM"),
  color: z.string(),
});

export const scheduleSchema = z.object({
  studentName: z.string().min(1, "Nama mahasiswa wajib diisi"),
  semester: z.string().min(1, "Semester wajib diisi"),
  courses: z.array(courseSchema),
});

export type Course = z.infer<typeof courseSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;

// Tipe untuk layout calculation
export interface CourseBlock {
  course: Course;
  top: number;
  left: number;
  width: number;
  height: number;
  column: number;
}
