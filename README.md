# 📅 Schedule Generator

> Full-stack web application untuk membuat jadwal kuliah mingguan dengan export PNG/PDF berkualitas tinggi.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

---

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Email/password dengan email confirmation
- ☁️ **Cloud Database** - Supabase PostgreSQL dengan Row Level Security
- 📊 **Multiple Schedules** - Buat dan kelola banyak jadwal
- 🎨 **Auto Layout** - Grid mingguan otomatis dengan deteksi bentrok
- 📥 **High-Quality Export** - PNG (3x resolution) & PDF (A4 landscape)
- 🔄 **Multi-Device Sync** - Akses dari mana saja
- 🎨 **Modern UI** - shadcn/ui components dengan dark mode

### Technical Features
- ⚡ Server-side rendering (Next.js 16)
- 🔒 Row Level Security (RLS)
- 📱 Responsive design
- 🎯 Type-safe (TypeScript + Zod)
- 🚀 Optimistic updates
- 💾 Smart caching (React Query)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (atau npm/yarn)
- Supabase account (gratis)

### 1. Clone & Install

```bash
git clone <your-repo>
cd scechme
pnpm install
```

### 2. Setup Database

**📖 Baca panduan lengkap:** [`docs/START_HERE.md`](./docs/START_HERE.md)

Quick steps:
1. Create account di [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL schema (lihat [`docs/SUPABASE_SETUP_GUIDE.md`](./docs/SUPABASE_SETUP_GUIDE.md))
4. Copy API keys

### 3. Environment Variables

Copy `.env.local.example` ke `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` dan isi dengan Supabase keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
pnpm build
pnpm start
```

---

## 📂 Project Structure

```
scechme/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (login, signup)
│   ├── dashboard/                # Dashboard & schedule management
│   ├── preview/                  # Preview & export
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── providers.tsx             # React Query provider
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── ScheduleCanvas.tsx        # Schedule canvas renderer
│   └── CourseBlock.tsx           # Course block component
├── lib/
│   ├── supabase/                 # Supabase client & types
│   ├── hooks/                    # Custom React hooks
│   ├── types.ts                  # Zod schemas & types
│   ├── layout-engine.ts          # Layout calculation engine
│   ├── export.ts                 # Export functions (PNG/PDF)
│   └── utils.ts                  # Utility functions
├── docs/                         # 📚 Documentation
│   ├── START_HERE.md             # ⭐ Start here!
│   ├── SUPABASE_SETUP_GUIDE.md   # Database setup guide
│   ├── IMPLEMENTATION_COMPLETE.md # Implementation details
│   └── ...                       # More docs
├── middleware.ts                 # Next.js middleware (auth)
├── .env.local.example            # Environment template
└── README.md                     # This file
```

---

## 📚 Documentation

Semua dokumentasi ada di folder [`docs/`](./docs/):

### Getting Started
- **[START_HERE.md](./docs/START_HERE.md)** - ⭐ Mulai dari sini!
- **[SUPABASE_SETUP_GUIDE.md](./docs/SUPABASE_SETUP_GUIDE.md)** - Setup database step-by-step

### Technical Documentation
- **[IMPLEMENTATION_COMPLETE.md](./docs/IMPLEMENTATION_COMPLETE.md)** - What's been built
- **[IMPLEMENTATION_REVIEW.md](./docs/IMPLEMENTATION_REVIEW.md)** - Architecture review
- **[DATABASE_SUMMARY.md](./docs/DATABASE_SUMMARY.md)** - Database schema reference

### Comparison & Analysis
- **[BEFORE_AFTER_COMPARISON.md](./docs/BEFORE_AFTER_COMPARISON.md)** - localStorage vs Supabase
- **[QUICK_START_DATABASE.md](./docs/QUICK_START_DATABASE.md)** - Quick database reference

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Backend & Database
- **[Supabase](https://supabase.com/)** - PostgreSQL database + Auth
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Client state management

### Export & Rendering
- **[html2canvas](https://html2canvas.hertzen.com/)** - PNG/JPEG export
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation

---

## 🗄️ Database Schema

### Tables

**schedules**
```sql
id              UUID (Primary Key)
user_id         UUID (Foreign Key → auth.users)
student_name    TEXT
semester        TEXT
is_public       BOOLEAN
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

**courses**
```sql
id              UUID (Primary Key)
schedule_id     UUID (Foreign Key → schedules)
name            TEXT
room            TEXT
lecturer        TEXT
day             TEXT (enum: monday-saturday)
start_time      TIME
end_time        TIME
color           TEXT
created_at      TIMESTAMPTZ
```

**Relationships:**
- One schedule has many courses (1:N)
- Row Level Security (RLS) enabled
- Users can only access their own data

---

## 🎯 Usage

### 1. Create Account
- Sign up dengan email
- Confirm email (check inbox)
- Login

### 2. Create Schedule
- Click "New Schedule"
- Fill student name & semester
- Add courses (name, room, lecturer, day, time)
- Save

### 3. Export
- Open schedule preview
- Choose format (PDF or PNG)
- Download

### 4. Manage
- View all schedules in dashboard
- Edit, delete, or duplicate schedules
- Access from any device

---

## 📦 Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database (optional)
pnpm supabase:types   # Generate TypeScript types
```

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

4. **Deploy!**

### Update Supabase Settings

After deployment:
1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Update:
   ```
   Site URL: https://your-app.vercel.app
   Redirect URLs: https://your-app.vercel.app/**
   ```

---

## 💰 Cost

### Free Tier (Recommended for Start)
- **Supabase:** $0/month (up to 50K MAU, 500MB database)
- **Vercel:** $0/month (unlimited deployments)
- **Total:** $0/month

### Paid Tier (When You Scale)
- **Supabase Pro:** $25/month (500K MAU, 8GB database)
- **Vercel Pro:** $20/month (optional)

**Conclusion:** Free untuk 50K users pertama! 🎉

---

## 🔐 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Users can only access their own data
- ✅ Secure authentication (Supabase Auth)
- ✅ Environment variables for secrets
- ✅ HTTPS only (enforced by Vercel)
- ✅ Input validation (Zod)

---

## 🐛 Troubleshooting

### Build Error: "Invalid API key"
**Solution:** Create `.env.local` with Supabase keys

### Error: "relation does not exist"
**Solution:** Run SQL schema in Supabase (see [`docs/SUPABASE_SETUP_GUIDE.md`](./docs/SUPABASE_SETUP_GUIDE.md))

### Cannot login
**Solution:** 
1. Check email confirmation
2. Check Supabase Auth settings
3. Check Site URL configuration

### Export not working
**Solution:**
1. Check browser console for errors
2. Disable ad blockers
3. Try different browser

**More troubleshooting:** See [`docs/START_HERE.md`](./docs/START_HERE.md)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

Built with amazing open-source tools:
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

---

## 📞 Support

- **Documentation:** Check [`docs/`](./docs/) folder
- **Issues:** Open an issue on GitHub
- **Supabase Help:** [discord.supabase.com](https://discord.supabase.com)
- **Next.js Help:** [nextjs.org/discord](https://nextjs.org/discord)

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

<div align="center">

**Made with ❤️ for students everywhere**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/schedule-generator/issues) · [Request Feature](https://github.com/yourusername/schedule-generator/issues)

</div>
