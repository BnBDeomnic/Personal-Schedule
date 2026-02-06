# 🐛 Troubleshooting Guide

Common issues and solutions for Schedule Generator.

---

## 🔧 Build & Development Issues

### ❌ Error: "Can't resolve 'tw-animate-css'"

**Symptoms:**
```
CssSyntaxError: tailwindcss: Can't resolve 'tw-animate-css'
```

**Cause:** Invalid import in `globals.css`

**Solution:** Already fixed! The line `@import "tw-animate-css";` has been removed.

If you still see this:
1. Check `app/globals.css`
2. Remove line: `@import "tw-animate-css";`
3. Keep only: `@import "tailwindcss";`

---

### ❌ Error: "Your project's URL and Key are required" (Middleware)

**Symptoms:**
```
Error: Your project's URL and Key are required to create a Supabase client!
at updateSession (lib\supabase\middleware.ts:9:38)
```

**Cause:** Middleware trying to access env vars during build/dev startup

**Solution:** Already fixed! Middleware now gracefully handles missing env vars.

If you still see this:
1. Restart dev server: `Ctrl+C` then `pnpm dev`
2. Check `.env.local` exists and has correct values
3. Clear `.next` folder: `rm -rf .next`

---

### ❌ Error: "Missing Supabase environment variables"

**Symptoms:**
```
Error: @supabase/ssr: Your project's URL and API key are required
```

**Cause:** Environment variables tidak diset atau tidak terbaca

**Solution:**

1. **Check `.env.local` exists**
   ```bash
   # Should exist in scechme/ folder
   ls .env.local
   ```

2. **Verify content**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Restart dev server**
   ```bash
   # Stop server (Ctrl+C)
   pnpm dev
   ```

4. **Clear Next.js cache**
   ```bash
   rm -rf .next
   pnpm build
   ```

---

### ❌ Error: "relation does not exist"

**Symptoms:**
```
Error: relation "schedules" does not exist
```

**Cause:** SQL schema belum dijalankan di Supabase

**Solution:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Open your project
3. Click "SQL Editor"
4. Run schema from [`SUPABASE_SETUP_GUIDE.md`](./SUPABASE_SETUP_GUIDE.md)

---

### ❌ Build Error: Prerendering failed

**Symptoms:**
```
Error occurred prerendering page "/login"
```

**Cause:** Pages trying to access Supabase during build

**Solution:** Already fixed! Pages now use `export const dynamic = 'force-dynamic'`

If you still see this:
1. Check all pages have `export const dynamic = 'force-dynamic'`
2. Check layouts have it too
3. Clear `.next` folder: `rm -rf .next`

---

### ❌ Error: "Cannot find module"

**Symptoms:**
```
Error: Cannot find module '@/lib/supabase/client'
```

**Cause:** Dependencies not installed or path alias issue

**Solution:**

1. **Reinstall dependencies**
   ```bash
   rm -rf node_modules
   pnpm install
   ```

2. **Check tsconfig.json**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

---

## 🔐 Authentication Issues

### ❌ Cannot sign up

**Symptoms:**
- Form submits but nothing happens
- Error in console

**Solutions:**

1. **Check Supabase Auth enabled**
   - Go to Supabase Dashboard
   - Authentication → Providers
   - Ensure "Email" is enabled

2. **Check Site URL**
   - Authentication → URL Configuration
   - Site URL: `http://localhost:3000` (dev) or your domain (prod)
   - Redirect URLs: `http://localhost:3000/**`

3. **Check browser console**
   - Press F12
   - Look for errors
   - Check Network tab

---

### ❌ Email confirmation not received

**Solutions:**

1. **Check spam folder**

2. **Manually confirm user**
   - Supabase Dashboard → Authentication → Users
   - Click user → Confirm email

3. **Check email provider**
   - Some providers block Supabase emails
   - Try different email

4. **Disable email confirmation (dev only)**
   - Supabase Dashboard → Authentication → Providers
   - Email → Disable "Confirm email"

---

### ❌ Cannot login after signup

**Solutions:**

1. **Confirm email first**
   - Check inbox for confirmation link
   - Or manually confirm in Supabase Dashboard

2. **Check password**
   - Minimum 6 characters
   - Try reset password

3. **Check RLS policies**
   - Supabase Dashboard → Table Editor
   - Click table → Policies
   - Ensure policies exist

---

## 🗄️ Database Issues

### ❌ Error: "Row Level Security policy violation"

**Symptoms:**
```
Error: new row violates row-level security policy
```

**Cause:** RLS policies not set up correctly

**Solution:**

1. **Check policies exist**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'schedules';
   ```

2. **Re-run RLS policies**
   - Copy from [`SUPABASE_SETUP_GUIDE.md`](./SUPABASE_SETUP_GUIDE.md)
   - Run in SQL Editor

3. **Check user is authenticated**
   - User must be logged in
   - Check `auth.uid()` returns value

---

### ❌ Data not showing in dashboard

**Solutions:**

1. **Check user_id matches**
   ```sql
   SELECT * FROM schedules WHERE user_id = auth.uid();
   ```

2. **Check RLS policies**
   - Policies might be too restrictive

3. **Check browser console**
   - Look for API errors

4. **Verify data exists**
   - Supabase Dashboard → Table Editor
   - Check `schedules` table

---

## 📦 Export Issues

### ❌ PDF export not working

**Solutions:**

1. **Check browser compatibility**
   - Use Chrome/Edge (best support)
   - Disable ad blockers

2. **Check console errors**
   - Press F12
   - Look for canvas errors

3. **Try PNG export first**
   - If PNG works, PDF should work

4. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R

---

### ❌ Export quality poor

**Solutions:**

1. **Check scale setting**
   ```typescript
   // In export.ts
   scale: 3  // Higher = better quality
   ```

2. **Check canvas size**
   ```typescript
   // In layout-engine.ts
   canvasWidth: 3508  // A4 @300dpi
   ```

3. **Use PNG instead of JPEG**
   - PNG has better quality
   - JPEG is compressed

---

## 🌐 Deployment Issues

### ❌ Vercel deployment fails

**Solutions:**

1. **Add environment variables**
   - Vercel Dashboard → Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Update Supabase Site URL**
   - Supabase Dashboard → Authentication → URL Configuration
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

3. **Check build logs**
   - Vercel Dashboard → Deployments
   - Click deployment → View logs

---

### ❌ Production auth not working

**Solutions:**

1. **Update Site URL in Supabase**
   - Must match production URL exactly

2. **Check environment variables**
   - Vercel Dashboard → Settings → Environment Variables
   - Ensure they're set for Production

3. **Redeploy**
   - After changing env vars, redeploy
   - Vercel Dashboard → Deployments → Redeploy

---

## 💻 Development Environment

### ❌ Port 3000 already in use

**Solutions:**

1. **Kill process**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:3000 | xargs kill -9
   ```

2. **Use different port**
   ```bash
   pnpm dev -- -p 3001
   ```

---

### ❌ Hot reload not working

**Solutions:**

1. **Restart dev server**
   ```bash
   # Ctrl+C to stop
   pnpm dev
   ```

2. **Clear Next.js cache**
   ```bash
   rm -rf .next
   pnpm dev
   ```

3. **Check file watchers**
   - Some systems have file watcher limits
   - Increase limit (Google for your OS)

---

## 🔍 Debugging Tips

### Enable Verbose Logging

```typescript
// lib/supabase/client.ts
export function createClient() {
  const client = createBrowserClient(url, key);
  
  // Add logging
  client.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event, session);
  });
  
  return client;
}
```

### Check Supabase Logs

1. Supabase Dashboard → Logs
2. Filter by:
   - API logs
   - Auth logs
   - Database logs

### Browser DevTools

1. **Console** - JavaScript errors
2. **Network** - API calls
3. **Application** - Cookies, localStorage
4. **Sources** - Breakpoints

---

## 📞 Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Check browser console for errors
3. ✅ Check Supabase logs
4. ✅ Try clearing cache
5. ✅ Try in incognito mode

### Where to Ask

1. **GitHub Issues** - Bug reports
2. **Supabase Discord** - Database/auth issues
3. **Next.js Discord** - Framework issues
4. **Stack Overflow** - General questions

### What to Include

When asking for help, include:

1. **Error message** (full text)
2. **Steps to reproduce**
3. **Environment**:
   - OS
   - Node version
   - Browser
4. **What you've tried**
5. **Screenshots** (if UI issue)

---

## 🔄 Common Fixes Checklist

When something breaks, try these in order:

- [ ] Restart dev server
- [ ] Clear browser cache (Ctrl+Shift+R)
- [ ] Clear Next.js cache (`rm -rf .next`)
- [ ] Reinstall dependencies (`rm -rf node_modules && pnpm install`)
- [ ] Check environment variables
- [ ] Check Supabase Dashboard (tables, auth, logs)
- [ ] Check browser console
- [ ] Try incognito mode
- [ ] Try different browser

---

## 📚 Related Documentation

- [START_HERE.md](./START_HERE.md) - Setup guide
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Database setup
- [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) - Implementation details

---

**Still stuck? Open an issue on GitHub with details!**
