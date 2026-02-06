import { CourseBlock as CourseBlockType } from "@/lib/types";

interface CourseBlockProps {
  block: CourseBlockType;
  scale: number;
}

export function CourseBlock({ block, scale }: CourseBlockProps) {
  const { course, top, left, width, height } = block;

  const bgColor = course.color;
  const borderColor = course.color;

  return (
    <div
      className="absolute group transition-all duration-200"
      style={{
        top: top,
        left: left + 8,
        width: width - 16,
        height: height,
      }}
    >
      {/* Card Container */}
      <div 
        className="relative h-full rounded-xl shadow-lg overflow-hidden border-l-4 transition-transform group-hover:scale-[1.02]"
        style={{
          backgroundColor: `${bgColor}15`,
          borderLeftColor: borderColor,
          borderTop: `1px solid ${bgColor}30`,
          borderRight: `1px solid ${bgColor}30`,
          borderBottom: `1px solid ${bgColor}30`,
        }}
      >
        {/* Content */}
        <div className="relative h-full p-4 flex flex-col justify-between">
          {/* Top Section */}
          <div>
            {/* Course Name */}
            <h3 
              className="font-black leading-tight mb-2 line-clamp-2"
              style={{ 
                fontSize: Math.max(18, Math.min(24, height / 5)),
                color: borderColor,
              }}
            >
              {course.name}
            </h3>
            
            {/* Lecturer */}
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: borderColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p 
                className="font-semibold text-sm line-clamp-1"
                style={{ color: borderColor }}
              >
                {course.lecturer}
              </p>
            </div>
            
            {/* Room */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: borderColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p 
                className="font-medium text-sm"
                style={{ color: borderColor }}
              >
                {course.room}
              </p>
            </div>
          </div>
          
          {/* Bottom Section - Time */}
          <div 
            className="mt-auto pt-2 border-t flex items-center justify-between"
            style={{ borderColor: `${borderColor}30` }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" style={{ color: borderColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span 
                className="text-sm font-bold"
                style={{ color: borderColor }}
              >
                {course.startTime}
              </span>
            </div>
            <span 
              className="text-sm font-bold"
              style={{ color: borderColor }}
            >
              {course.endTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
