"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type Schedule = Database['public']['Tables']['schedules']['Row'];
type ScheduleInsert = Database['public']['Tables']['schedules']['Insert'];
type Course = Database['public']['Tables']['courses']['Row'];

export function useSchedules() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const { data: schedules, isLoading } = useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*, courses(*)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createSchedule = useMutation({
    mutationFn: async (schedule: ScheduleInsert) => {
      const { data, error } = await supabase
        .from('schedules')
        .insert(schedule)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const deleteSchedule = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  return {
    schedules,
    isLoading,
    createSchedule,
    deleteSchedule,
  };
}
