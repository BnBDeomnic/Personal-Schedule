# 📅 Schedule Generator

A modern, full-stack web application for creating and exporting beautiful academic schedules. Built with Next.js 16, TypeScript, and Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com/)

## ✨ Features

### 🎨 Beautiful Design
- Modern, gradient-based UI
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions

### 📊 Schedule Management
- Create multiple schedules
- Add/edit/delete courses
- Visual weekly calendar view
- Automatic conflict detection
- Color-coded courses

### 📤 Export Options
- **PNG Export** - High-resolution images (3x quality)
- **PDF Export** - Print-ready A4 landscape format
- Perfect 3:4 aspect ratio
- No stretch, maintains proportions

### 🔐 Authentication
- Secure email/password authentication
- Protected routes
- Session management
- Row-level security (RLS)

### 📱 Mobile Responsive
- Touch-friendly interface
- Optimized for all screen sizes
- Full-width preview on mobile
- Responsive export buttons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/BnBDeomnic/Personal-Schedule.git
cd Personal-Schedule/scechme
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase database**

Run this SQL in your Supabase SQL Editor:

```sql
-- Create schedules table
CREATE TABLE schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  semester TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  room TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  day TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for schedules
CREATE POLICY "Users can view own schedules"
  ON schedules FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own schedules"
  ON schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schedules"
  ON schedules FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own schedules"
  ON schedules FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for courses
CREATE POLICY "Users can view own courses"
  ON courses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own courses"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own courses"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own courses"
  ON courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );
```

5. **Run development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Supabase** - PostgreSQL database
- **Supabase Auth** - Authentication
- **Row Level Security** - Data protection

### Export
- **modern-screenshot** - HTML to image (supports modern CSS)
- **jsPDF** - PDF generation

### State Management
- **React Query** - Server state
- **Zustand** - Client state (if needed)

## 📁 Project Structure

```
scechme/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── dashboard/           # Dashboard pages
│   │   ├── new/            # Create schedule
│   │   └── [id]/edit/      # Edit schedule
│   ├── preview/            # Preview pages
│   │   └── [id]/           # Schedule preview
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── ScheduleCanvas.tsx  # Main schedule canvas
│   └── CourseBlock.tsx     # Course card component
├── lib/                     # Utilities
│   ├── supabase/           # Supabase client & types
│   ├── hooks/              # Custom React hooks
│   ├── layout-engine.ts    # Schedule layout logic
│   ├── export.ts           # Export functions
│   └── types.ts            # TypeScript types
├── proxy.ts                 # Next.js proxy (middleware)
└── public/                  # Static assets
```

## 🎯 Usage

### 1. Create Account
- Sign up with email and password
- Verify email (if enabled)

### 2. Create Schedule
- Click "New Schedule"
- Enter student name and semester
- Add courses with details:
  - Course name
  - Room number
  - Lecturer name
  - Day of week
  - Start and end time
  - Auto-assigned color

### 3. Preview & Export
- Click "Preview" to see your schedule
- Choose export format:
  - **PNG** - For sharing on social media
  - **PDF** - For printing

### 4. Edit Schedule
- Click "Edit" on any schedule
- Add, edit, or delete courses
- Changes save automatically

## 🎨 Customization

### Colors
Edit `COLORS` array in `app/dashboard/new/page.tsx`:
```typescript
const COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  // Add more colors...
];
```

### Canvas Size
Edit `canvasWidth` in `lib/layout-engine.ts`:
```typescript
const canvasWidth = 2480; // Default: 2480px (optimized for 3:4)
```

### Time Range
Adjust `minHour` and `maxHour` in `lib/layout-engine.ts`:
```typescript
minHour = Math.max(6, minHour);  // Earliest: 6 AM
maxHour = Math.min(22, maxHour); // Latest: 10 PM
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms
- **Netlify** - Good Next.js support
- **Railway** - Full control with database
- **Cloudflare Pages** - Edge deployment

## 🧪 Testing

### Build
```bash
pnpm build
```

### Type Check
```bash
pnpm type-check
```

### Lint
```bash
pnpm lint
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [modern-screenshot](https://github.com/qq15725/modern-screenshot) - Screenshot library

## 📧 Contact

- GitHub: [@BnBDeomnic](https://github.com/BnBDeomnic)
- Project Link: [https://github.com/BnBDeomnic/Personal-Schedule](https://github.com/BnBDeomnic/Personal-Schedule)

## 🎉 Features Roadmap

- [ ] PWA support (offline mode)
- [ ] Dark mode toggle
- [ ] Multiple schedule templates
- [ ] Import from CSV/Excel
- [ ] Share schedule via link
- [ ] Print multiple schedules
- [ ] Calendar integration
- [ ] Notification reminders

---

Made with ❤️ by [BnBDeomnic](https://github.com/BnBDeomnic)
