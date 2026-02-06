# 🚀 SUPABASE SETUP GUIDE - Step by Step

Follow langkah ini untuk setup database Supabase.

---

## 📋 STEP 1: Create Supabase Account

1. Buka [supabase.com](https://supabase.com)
2. Klik **"Start your project"** atau **"Sign Up"**
3. Sign up dengan:
   - GitHub (recommended)
   - Google
   - Email

---

## 📋 STEP 2: Create New Project

1. Setelah login, klik **"New Project"**
2. Pilih **Organization** (atau buat baru kalau belum ada)
3. Isi form:
   ```
   Name: schedule-generator
   Database Password: [buat password kuat, SIMPAN INI!]
   Region: Southeast Asia (Singapore) - terdekat dengan Indonesia
   Pricing Plan: Free
   ```
4. Klik **"Create new project"**
5. Tunggu ~2 menit (project sedang di-setup)

---

## 📋 STEP 3: Run SQL Schema

### 3.1 Buka SQL Editor
1. Di sidebar kiri, klik **"SQL Editor"**
2. Klik **"New query"**

### 3.2 Copy & Paste SQL Ini

```sql
-- ============================================
-- SCHEDULE GENERATOR DATABASE SCHEMA
-- ============================================

-- Create schedules table
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  semester TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  room TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  day TEXT NOT NULL CHECK (day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_schedules_user_id ON schedules(user_id);
CREATE INDEX idx_courses_schedule_id ON courses(schedule_id);

-- Enable Row Level Security
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR SCHEDULES
-- ============================================

-- Users can view their own schedules or public schedules
CREATE POLICY "Users can view own schedules"
  ON schedules FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

-- Users can insert their own schedules
CREATE POLICY "Users can insert own schedules"
  ON schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own schedules
CREATE POLICY "Users can update own schedules"
  ON schedules FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own schedules
CREATE POLICY "Users can delete own schedules"
  ON schedules FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES FOR COURSES
-- ============================================

-- Users can view courses of accessible schedules
CREATE POLICY "Users can view courses of accessible schedules"
  ON courses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND (schedules.user_id = auth.uid() OR schedules.is_public = true)
    )
  );

-- Users can insert courses to their own schedules
CREATE POLICY "Users can insert courses to own schedules"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

-- Users can update courses of their own schedules
CREATE POLICY "Users can update courses of own schedules"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

-- Users can delete courses of their own schedules
CREATE POLICY "Users can delete courses of own schedules"
  ON courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

-- ============================================
-- SUCCESS!
-- ============================================
-- Your database is now ready to use!
```

### 3.3 Run Query
1. Klik **"Run"** (atau tekan `Ctrl+Enter`)
2. Tunggu sampai muncul **"Success. No rows returned"**
3. ✅ Database schema berhasil dibuat!

---

## 📋 STEP 4: Get API Keys

### 4.1 Buka Settings
1. Di sidebar kiri, klik **"Settings"** (icon gear)
2. Klik **"API"**

### 4.2 Copy Keys
Kamu akan lihat 2 keys penting:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**JANGAN SHARE `service_role` KEY!** (itu admin key)

---

## 📋 STEP 5: Setup Environment Variables

### 5.1 Create .env.local
Di root project kamu (`scechme/`), buat file `.env.local`:

```bash
# Windows (PowerShell)
New-Item .env.local

# Mac/Linux
touch .env.local
```

### 5.2 Paste Configuration
Buka `.env.local` dan paste ini (ganti dengan key kamu):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ PENTING:**
- Ganti `xxxxxxxxxxxxx` dengan project URL kamu
- Ganti `eyJhbG...` dengan anon key kamu
- Jangan commit file ini ke Git (sudah ada di .gitignore)

---

## 📋 STEP 6: Enable Email Authentication

### 6.1 Configure Auth
1. Di Supabase Dashboard, klik **"Authentication"**
2. Klik **"Providers"**
3. Pastikan **"Email"** sudah enabled (default: ON)

### 6.2 Configure Email Templates (Optional)
1. Klik **"Email Templates"**
2. Customize:
   - Confirm signup
   - Reset password
   - Magic link

### 6.3 Site URL Configuration
1. Klik **"URL Configuration"**
2. Set:
   ```
   Site URL: http://localhost:3000
   Redirect URLs: http://localhost:3000/**
   ```

**Untuk production nanti:**
```
Site URL: https://your-domain.com
Redirect URLs: https://your-domain.com/**
```

---

## 📋 STEP 7: Test Connection

### 7.1 Run Development Server
```bash
cd scechme
pnpm dev
```

### 7.2 Test Flow
1. Buka http://localhost:3000
2. Klik **"Get Started"** atau **"Sign Up"**
3. Daftar dengan email kamu
4. Check email untuk confirmation link
5. Klik link confirmation
6. Login
7. Create schedule
8. ✅ Success!

---

## 📋 STEP 8: Verify Database

### 8.1 Check Tables
1. Di Supabase Dashboard, klik **"Table Editor"**
2. Kamu akan lihat 2 tables:
   - `schedules`
   - `courses`

### 8.2 Check Data
Setelah create schedule di app:
1. Klik table `schedules`
2. Kamu akan lihat data schedule kamu
3. Klik table `courses`
4. Kamu akan lihat courses yang kamu tambahkan

---

## 🎯 VERIFICATION CHECKLIST

Sebelum lanjut, pastikan:

- [x] Supabase project created
- [x] SQL schema executed (no errors)
- [x] API keys copied
- [x] `.env.local` file created
- [x] Environment variables set correctly
- [x] Email auth enabled
- [x] Site URL configured
- [x] Dev server running
- [x] Can sign up
- [x] Can login
- [x] Can create schedule
- [x] Data appears in Supabase dashboard

---

## 🐛 TROUBLESHOOTING

### Error: "Invalid API key"
**Solution:**
1. Check `.env.local` file
2. Pastikan tidak ada typo
3. Restart dev server: `Ctrl+C` → `pnpm dev`

### Error: "relation does not exist"
**Solution:**
1. SQL schema belum dijalankan
2. Go to SQL Editor
3. Run schema lagi

### Error: "Row Level Security policy violation"
**Solution:**
1. User belum login
2. RLS policies belum dibuat
3. Check SQL schema, pastikan semua policies ada

### Error: "Failed to fetch"
**Solution:**
1. Check internet connection
2. Check Supabase project status (dashboard)
3. Check `.env.local` URL benar

### Email confirmation tidak datang
**Solution:**
1. Check spam folder
2. Di Supabase Dashboard → Authentication → Users
3. Manually confirm user (klik user → Confirm email)

### Cannot sign up
**Solution:**
1. Check browser console (F12)
2. Check Network tab untuk error details
3. Pastikan email auth enabled di Supabase

---

## 📊 SUPABASE DASHBOARD OVERVIEW

### Key Sections:
1. **Table Editor** - View/edit data
2. **SQL Editor** - Run queries
3. **Authentication** - Manage users
4. **Storage** - File uploads (future)
5. **API Docs** - Auto-generated API docs
6. **Logs** - Debug errors

---

## 🎓 NEXT STEPS

Setelah setup selesai:

1. ✅ Test semua fitur (signup, login, create, delete)
2. ✅ Deploy to Vercel
3. ✅ Update Site URL di Supabase (production URL)
4. ✅ Invite friends to test
5. ✅ Monitor usage di Supabase Dashboard

---

## 💰 FREE TIER LIMITS

Supabase Free Tier:
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth
- ✅ Unlimited API requests

**Cukup untuk 1-2 tahun pertama!**

---

## 🔗 USEFUL LINKS

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ DONE!

Database kamu sekarang ready! 🎉

Kalau ada masalah, check **TROUBLESHOOTING** section atau tanya aku.

**Happy coding! 🚀**
