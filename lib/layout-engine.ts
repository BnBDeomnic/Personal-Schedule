import { Course, CourseBlock } from "./types";

/**
 * Dynamic layout configuration
 * Adjusts based on number of courses and time range
 */
export function getLayoutConfig(courses: Course[]) {
  // Find min/max hours from courses
  let minHour = 24;
  let maxHour = 0;
  
  courses.forEach(course => {
    const startHour = parseInt(course.startTime.split(':')[0]);
    const endHour = parseInt(course.endTime.split(':')[0]);
    minHour = Math.min(minHour, startHour);
    maxHour = Math.max(maxHour, endHour + 1);
  });
  
  // Default to 7-18 if no courses
  if (courses.length === 0) {
    minHour = 7;
    maxHour = 18;
  }
  
  // Minimal padding (only 30 minutes before/after)
  minHour = Math.max(6, minHour);
  maxHour = Math.min(22, maxHour);
  
  const hourRange = maxHour - minHour;
  const hourHeight = 160; // Taller for better visibility
  
  // Calculate actual content height
  const contentHeight = hourRange * hourHeight;
  const headerHeight = 240; // Smaller header
  const footerHeight = 80;
  const dayHeaderHeight = 70;
  
  // Canvas width optimized for 3:4 export ratio
  // Using 2480px width (instead of 3508) for better proportions
  const canvasWidth = 2480; // Optimized for 3:4 ratio when exported
  
  return {
    // Canvas size - dynamic based on content
    canvasWidth: canvasWidth,
    canvasHeight: headerHeight + dayHeaderHeight + contentHeight + footerHeight,
    
    // Grid config
    headerHeight: headerHeight,
    dayHeaderHeight: dayHeaderHeight,
    footerHeight: footerHeight,
    timeColumnWidth: 120, // Reduced from 160
    dayColumnWidth: 385,  // Reduced from 545 (2480 - 120) / 6 ≈ 393, use 385 for spacing
    hourHeight: hourHeight,
    
    // Time range (dynamic)
    startHour: minHour,
    endHour: maxHour,
    
    // Padding
    padding: 30,
    blockPadding: 8,
    cardRadius: 16,
  };
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/**
 * Convert time string (HH:MM) to decimal hours
 */
export function timeToDecimal(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
}

/**
 * Calculate position & size untuk setiap course block
 */
export function calculateLayout(courses: Course[]): CourseBlock[] {
  const config = getLayoutConfig(courses);
  const blocks: CourseBlock[] = [];
  
  courses.forEach((course) => {
    const dayIndex = DAYS.indexOf(course.day);
    if (dayIndex === -1) return;
    
    const startDecimal = timeToDecimal(course.startTime);
    const endDecimal = timeToDecimal(course.endTime);
    const duration = endDecimal - startDecimal;
    
    // Calculate position
    const top = 
      config.headerHeight + config.dayHeaderHeight +
      (startDecimal - config.startHour) * config.hourHeight;
    
    const left = 
      config.timeColumnWidth + 
      dayIndex * config.dayColumnWidth;
    
    const height = duration * config.hourHeight - config.blockPadding * 2;
    const width = config.dayColumnWidth - config.blockPadding * 2;
    
    blocks.push({
      course,
      top,
      left,
      width,
      height,
      column: dayIndex,
    });
  });
  
  // Handle overlapping courses (side-by-side)
  return handleOverlaps(blocks, config);
}

/**
 * Detect & handle overlapping courses
 */
function handleOverlaps(blocks: CourseBlock[], config: ReturnType<typeof getLayoutConfig>): CourseBlock[] {
  const grouped = new Map<number, CourseBlock[]>();
  
  // Group by day
  blocks.forEach((block) => {
    const existing = grouped.get(block.column) || [];
    existing.push(block);
    grouped.set(block.column, existing);
  });
  
  // Check overlaps per day
  grouped.forEach((dayBlocks) => {
    dayBlocks.sort((a, b) => a.top - b.top);
    
    for (let i = 0; i < dayBlocks.length; i++) {
      const overlapping = [dayBlocks[i]];
      
      for (let j = i + 1; j < dayBlocks.length; j++) {
        const current = dayBlocks[i];
        const next = dayBlocks[j];
        
        if (next.top < current.top + current.height) {
          overlapping.push(next);
        }
      }
      
      // Adjust width if overlapping
      if (overlapping.length > 1) {
        const newWidth = (config.dayColumnWidth - config.blockPadding * 2) / overlapping.length;
        overlapping.forEach((block, idx) => {
          block.width = newWidth - config.blockPadding;
          block.left += idx * newWidth;
        });
      }
    }
  });
  
  return blocks;
}

/**
 * Generate time labels based on dynamic range
 */
export function generateTimeLabels(courses: Course[]): string[] {
  const config = getLayoutConfig(courses);
  const labels: string[] = [];
  for (let h = config.startHour; h <= config.endHour; h++) {
    labels.push(`${h.toString().padStart(2, "0")}:00`);
  }
  return labels;
}
