# 🚀 START HERE - Quick Setup Guide

Ikuti langkah ini untuk menjalankan aplikasi.

---

## ✅ STEP-BY-STEP CHECKLIST

### 1️⃣ Setup Supabase (30 menit)

**📖 BUKA FILE INI:** `SUPABASE_SETUP_GUIDE.md`

Quick steps:
```
☐ Buka supabase.com
☐ Sign up / Login
☐ Create new project (nama: schedule-generator)
☐ Tunggu 2 menit (project setup)
☐ Buka SQL Editor
☐ Copy SQL schema dari SUPABASE_SETUP_GUIDE.md
☐ Paste & Run
☐ Buka Settings → API
☐ Copy Project URL
☐ Copy anon public key
```

---

### 2️⃣ Setup Environment Variables (5 menit)

**Create file `.env.local`** di folder `scechme/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ GANTI dengan keys dari Supabase kamu!**

Checklist:
```
☐ File .env.local created
☐ NEXT_PUBLIC_SUPABASE_URL filled
☐ NEXT_PUBLIC_SUPABASE_ANON_KEY filled
☐ No typos
☐ No extra spaces
```

---

### 3️⃣ Install Dependencies (2 menit)

```bash
cd scechme
pnpm install
```

Checklist:
```
☐ pnpm installed (or use npm)
☐ Dependencies installed successfully
☐ No errors
```

---

### 4️⃣ Run Development Server (1 menit)

```bash
pnpm dev
```

Checklist:
```
☐ Server started
☐ No errors in terminal
☐ Open http://localhost:3000
☐ Landing page loads
```

---

### 5️⃣ Test Authentication (5 menit)

1. **Sign Up**
   ```
   ☐ Click "Get Started"
   ☐ Enter email & password
   ☐ Click "Create account"
   ☐ See success message
   ```

2. **Confirm Email**
   ```
   ☐ Check email inbox
   ☐ Click confirmation link
   ☐ Redirected to app
   ```

3. **Login**
   ```
   ☐ Enter email & password
   ☐ Click "Sign in"
   ☐ Redirected to dashboard
   ```

---

### 6️⃣ Test Core Features (10 menit)

1. **Create Schedule**
   ```
   ☐ Click "New Schedule"
   ☐ Fill student name
   ☐ Fill semester
   ☐ Add course (name, room, lecturer, day, time)
   ☐ Click "Add Course"
   ☐ See course in list
   ☐ Add 2-3 more courses
   ☐ Click "Save & Preview"
   ```

2. **Preview & Export**
   ```
   ☐ See schedule preview
   ☐ Click "Export PDF"
   ☐ PDF downloads
   ☐ Click "Export as Image"
   ☐ PNG downloads
   ```

3. **Dashboard**
   ```
   ☐ Click "Back to Dashboard"
   ☐ See schedule in list
   ☐ Click "Preview"
   ☐ Click "Delete"
   ☐ Confirm deletion
   ```

---

### 7️⃣ Verify Database (2 menit)

1. **Check Supabase Dashboard**
   ```
   ☐ Go to supabase.com/dashboard
   ☐ Open your project
   ☐ Click "Table Editor"
   ☐ Click "schedules" table
   ☐ See your schedule data
   ☐ Click "courses" table
   ☐ See your courses data
   ```

---

## 🎉 SUCCESS!

Kalau semua checklist ✅, aplikasi kamu sudah jalan!

---

## 🐛 TROUBLESHOOTING

### Error: "Invalid API key"
**Solution:**
1. Check `.env.local` file exists
2. Check keys are correct (no typos)
3. Restart dev server: `Ctrl+C` → `pnpm dev`

### Error: "relation does not exist"
**Solution:**
1. SQL schema belum dijalankan
2. Buka Supabase SQL Editor
3. Run schema dari `SUPABASE_SETUP_GUIDE.md`

### Error: "Failed to fetch"
**Solution:**
1. Check internet connection
2. Check Supabase project status
3. Check `.env.local` URL benar

### Email tidak datang
**Solution:**
1. Check spam folder
2. Wait 5 minutes
3. Manually confirm di Supabase Dashboard:
   - Authentication → Users
   - Click user → Confirm email

### Build error
**Solution:**
1. Delete `.next` folder
2. Run `pnpm build` again
3. Check `.env.local` exists

---

## 📚 NEXT STEPS

Setelah semua jalan:

### Local Development
- [ ] Read `README.md` untuk full documentation
- [ ] Explore code structure
- [ ] Customize UI/colors
- [ ] Add more features

### Deployment
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Update Supabase Site URL
- [ ] Test production

### Learning
- [ ] Read `IMPLEMENTATION_REVIEW.md`
- [ ] Understand architecture
- [ ] Learn Supabase features
- [ ] Explore shadcn/ui components

---

## 📖 DOCUMENTATION

All guides available:

1. **START_HERE.md** ← You are here
2. **SUPABASE_SETUP_GUIDE.md** - Detailed Supabase setup
3. **IMPLEMENTATION_COMPLETE.md** - What's been built
4. **README.md** - Main documentation
5. **IMPLEMENTATION_REVIEW.md** - Architecture review

---

## 🆘 NEED HELP?

1. **Check docs** - All answers are in the guides
2. **Check console** - Browser console (F12) shows errors
3. **Check Supabase logs** - Dashboard → Logs
4. **Ask me** - I'm here to help!

---

## 🎯 QUICK COMMANDS

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Check for errors
pnpm lint

# Install new package
pnpm add package-name
```

---

## 🔗 IMPORTANT LINKS

- **Local App:** http://localhost:3000
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard

---

**Ready? Start with Step 1! 🚀**

**Questions? Check the docs or ask me! 💪**
