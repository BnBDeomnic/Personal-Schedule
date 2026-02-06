# 🚀 QUICK START: Database Implementation

Step-by-step guide untuk implement Supabase ke aplikasi kamu.

---

## 📋 Prerequisites

- [ ] Akun Supabase (gratis)
- [ ] Node.js 18+ installed
- [ ] pnpm installed

---

## 🎯 STEP 1: Setup Supabase Project

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: `schedule-generator`
   - Database Password: (save this!)
   - Region: Singapore (closest to Indonesia)

### 1.2 Run SQL Schema
1. Go to SQL Editor in Supabase Dashboard
2. Copy & paste this:

```sql
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

-- Create indexes
CREATE INDEX idx_schedules_user_id ON schedules(user_id);
CREATE INDEX idx_courses_schedule_id ON courses(schedule_id);

-- Enable RLS
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for schedules
CREATE POLICY "Users can view own schedules"
  ON schedules FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert own schedules"
  ON schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schedules"
  ON schedules FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own schedules"
  ON schedules FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for courses
CREATE POLICY "Users can view courses of accessible schedules"
  ON courses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND (schedules.user_id = auth.uid() OR schedules.is_public = true)
    )
  );

CREATE POLICY "Users can insert courses to own schedules"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update courses of own schedules"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete courses of own schedules"
  ON courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE schedules.id = courses.schedule_id
      AND schedules.user_id = auth.uid()
    )
  );
```

3. Click "Run"

### 1.3 Get API Keys
1. Go to Settings → API
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (optional, untuk admin)

---

## 🎯 STEP 2: Install Dependencies

```bash
cd scechme
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-ui-react @supabase/auth-ui-shared
pnpm add zustand @tanstack/react-query sonner
```

---

## 🎯 STEP 3: Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Add to `.gitignore`:
```
.env.local
```

---

## 🎯 STEP 4: Create Supabase Client

I'll create the files for you in the next step.

---

## 🎯 STEP 5: Generate TypeScript Types

```bash
# Install Supabase CLI
pnpm add -D supabase

# Login
npx supabase login

# Link project
npx supabase link --project-ref your-project-ref

# Generate types
npx supabase gen types typescript --linked > lib/supabase/database.types.ts
```

**Project ref** ada di URL: `https://[project-ref].supabase.co`

---

## 🎯 STEP 6: Test Connection

Create test file `lib/supabase/test.ts`:

```typescript
import { supabase } from './client';

export async function testConnection() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Connection failed:', error);
    return false;
  }
  
  console.log('Connection successful!', data);
  return true;
}
```

---

## 🎯 STEP 7: Enable Authentication

### 7.1 Configure Auth Providers

In Supabase Dashboard:
1. Go to Authentication → Providers
2. Enable:
   - ✅ Email (default)
   - ✅ Google (optional)
   - ✅ GitHub (optional)

### 7.2 Configure Email Templates (Optional)

Go to Authentication → Email Templates
- Customize confirmation email
- Customize reset password email

---

## 🎯 STEP 8: Update Next.js Config

Add to `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    domains: ['your-project.supabase.co'],
  },
};
```

---

## 📊 VERIFICATION CHECKLIST

Before proceeding to code implementation:

- [ ] Supabase project created
- [ ] SQL schema executed successfully
- [ ] API keys copied to `.env.local`
- [ ] Dependencies installed
- [ ] `.env.local` added to `.gitignore`
- [ ] TypeScript types generated (optional for now)

---

## 🐛 TROUBLESHOOTING

### Error: "relation does not exist"
→ SQL schema belum dijalankan. Go to SQL Editor dan run lagi.

### Error: "Invalid API key"
→ Check `.env.local`, pastikan key benar dan restart dev server.

### Error: "Row Level Security policy violation"
→ User belum login. Implement auth dulu.

### Error: "Cannot find module '@supabase/supabase-js'"
→ Run `pnpm install` lagi.

---

## ✅ NEXT: Code Implementation

Setelah semua setup selesai, aku akan implement:

1. **Supabase client utilities**
2. **Auth pages** (login/signup)
3. **Protected routes**
4. **Database CRUD operations**
5. **Migrate from localStorage**

Ready? Bilang "implement database" dan aku langsung coding! 🚀
