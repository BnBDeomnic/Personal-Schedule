export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      schedules: {
        Row: {
          id: string
          user_id: string
          student_name: string
          semester: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          student_name: string
          semester: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          student_name?: string
          semester?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          schedule_id: string
          name: string
          room: string
          lecturer: string
          day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
          start_time: string
          end_time: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          schedule_id: string
          name: string
          room: string
          lecturer: string
          day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
          start_time: string
          end_time: string
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          schedule_id?: string
          name?: string
          room?: string
          lecturer?: string
          day?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
          start_time?: string
          end_time?: string
          color?: string
          created_at?: string
        }
      }
    }
  }
}
