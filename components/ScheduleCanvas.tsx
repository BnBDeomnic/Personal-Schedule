"use client";

import { Schedule } from "@/lib/types";
import { calculateLayout, generateTimeLabels, getLayoutConfig } from "@/lib/layout-engine";
import { CourseBlock } from "./CourseBlock";

interface ScheduleCanvasProps {
  schedule: Schedule;
  scale?: number;
}

const DAYS_LABEL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAYS_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function ScheduleCanvas({ schedule, scale = 0.25 }: ScheduleCanvasProps) {
  const blocks = calculateLayout(schedule.courses);
  const timeLabels = generateTimeLabels(schedule.courses);
  const config = getLayoutConfig(schedule.courses);
  
  const { canvasWidth, canvasHeight, headerHeight, dayHeaderHeight, footerHeight, timeColumnWidth, dayColumnWidth, hourHeight } = config;

  return (
    <div 
      id="schedule-canvas"
      className="relative bg-gradient-to-br from-slate-50 to-blue-50"
      style={{
        width: canvasWidth,
        height: canvasHeight,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {/* Compact Modern Header */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden"
        style={{ height: headerHeight }}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500" />
        
        {/* Header Content - More Compact */}
        <div className="relative z-10 px-12 py-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-6xl font-black text-white tracking-tight leading-none">{schedule.studentName}</h1>
              <p className="text-xl text-white/90 font-semibold mt-2">Academic Schedule • {schedule.semester}</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
            <p className="text-white/80 text-sm font-medium">Total Courses</p>
            <p className="text-white text-4xl font-black">{schedule.courses.length}</p>
          </div>
        </div>
      </div>

      {/* Day Headers - Compact */}
      <div className="absolute left-0 right-0"
        style={{ 
          top: headerHeight,
          height: dayHeaderHeight,
        }}>
        {DAYS_LABEL.map((day, idx) => (
          <div key={day}
            className="absolute"
            style={{
              left: timeColumnWidth + idx * dayColumnWidth,
              width: dayColumnWidth,
              height: dayHeaderHeight,
            }}>
            <div className="mx-2 h-full bg-white rounded-xl shadow-md border-2 border-slate-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold text-slate-500 tracking-wider">{DAYS_SHORT[idx]}</div>
                <div className="text-lg font-black text-slate-800">{day}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Column - Compact */}
      <div className="absolute left-0"
        style={{ 
          top: headerHeight + dayHeaderHeight, 
          width: timeColumnWidth,
          height: canvasHeight - headerHeight - dayHeaderHeight - footerHeight
        }}>
        {timeLabels.map((time, idx) => (
          <div key={time} className="flex items-start justify-end pr-4"
            style={{ 
              position: "absolute",
              top: idx * hourHeight,
              height: hourHeight,
            }}>
            <div className="text-right pt-1">
              <div className="text-3xl font-bold text-slate-700">{time.split(':')[0]}</div>
              <div className="text-xs text-slate-400 -mt-1">:00</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Lines */}
      {DAYS_LABEL.map((_, idx) => (
        <div key={idx}>
          {timeLabels.map((_, timeIdx) => (
            <div key={timeIdx}
              className="absolute border-t border-slate-200/50"
              style={{
                top: headerHeight + dayHeaderHeight + timeIdx * hourHeight,
                left: timeColumnWidth + idx * dayColumnWidth,
                width: dayColumnWidth,
              }}
            />
          ))}
        </div>
      ))}

      {/* Course Blocks */}
      {blocks.map((block) => (
        <CourseBlock key={block.course.id} block={block} scale={1} />
      ))}
      
      {/* Compact Footer */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-100 to-slate-50 border-t-2 border-slate-200 flex items-center justify-between px-12"
        style={{ height: footerHeight }}
      >
        <div className="text-slate-600 text-sm font-medium">
          Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="text-slate-400 text-sm">
          {schedule.courses.length} courses • {DAYS_LABEL.filter((_, idx) => 
            schedule.courses.some(c => c.day === ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][idx])
          ).length} active days
        </div>
      </div>
    </div>
  );
}
