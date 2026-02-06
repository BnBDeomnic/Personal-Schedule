"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useSchedules } from "@/lib/hooks/useSchedules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { signOut } = useAuth();
  const { schedules, isLoading, deleteSchedule } = useSchedules();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;
    
    try {
      await deleteSchedule.mutateAsync(id);
      toast.success("Schedule deleted successfully");
    } catch (error) {
      toast.error("Failed to delete schedule");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Schedules</h1>
            <div className="flex gap-3">
              <Button asChild className="flex-1 sm:flex-none">
                <Link href="/dashboard/new">+ New Schedule</Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="flex-1 sm:flex-none">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!schedules || schedules.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">No schedules yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Create your first schedule to get started</p>
              <Button asChild>
                <Link href="/dashboard/new">Create Schedule</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((schedule) => (
              <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{schedule.student_name}</CardTitle>
                  <CardDescription>{schedule.semester}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>{schedule.courses?.length || 0} courses</p>
                    <p className="text-xs mt-1">
                      Created {format(new Date(schedule.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/dashboard/${schedule.id}/edit`}>✏️ Edit</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/preview/${schedule.id}`}>👁️ Preview</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
