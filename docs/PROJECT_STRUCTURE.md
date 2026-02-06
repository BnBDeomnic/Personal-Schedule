# 📁 Project Structure

Complete overview of the Schedule Generator project structure.

---

## 🌳 Directory Tree

```
scechme/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # Authentication routes
│   │   ├── login/page.tsx           # Login page
│   │   └── signup/page.tsx          # Signup page
│   ├── 📁 dashboard/                # Dashboard routes
│   │   ├── page.tsx                 # Schedules list
│   │   ├── new/page.tsx             # Create schedule
│   │   └── [id]/page.tsx            # Edit schedule
│   ├── 📁 preview/                  # Preview routes
│   │   └── [id]/page.tsx            # Preview & export
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   ├── providers.tsx                # React Query provider
│   └── globals.css                  # Global styles
│
├── 📁 components/                   # React components
│   ├── 📁 ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── sonner.tsx
│   ├── ScheduleCanvas.tsx           # Schedule canvas renderer
│   └── CourseBlock.tsx              # Course block component
│
├── 📁 lib/                          # Utilities & libraries
│   ├── 📁 supabase/                 # Supabase integration
│   │   ├── client.ts                # Client-side Supabase
│   │   ├── server.ts                # Server-side Supabase
│   │   ├── middleware.ts            # Auth middleware
│   │   └── database.types.ts        # TypeScript types
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── useAuth.ts               # Authentication hook
│   │   └── useSchedules.ts          # Schedules CRUD hook
│   ├── types.ts                     # Zod schemas & types
│   ├── layout-engine.ts             # Layout calculation
│   ├── export.ts                    # Export functions
│   └── utils.ts                     # Utility functions
│
├── 📁 docs/                         # 📚 Documentation
│   ├── README.md                    # Documentation index
│   ├── START_HERE.md                # Quick start guide
│   ├── SUPABASE_SETUP_GUIDE.md      # Database setup
│   ├── IMPLEMENTATION_COMPLETE.md   # Implementation details
│   ├── IMPLEMENTATION_REVIEW.md     # Architecture review
│   ├── DATABASE_SUMMARY.md          # Database reference
│   ├── QUICK_START_DATABASE.md      # Quick DB setup
│   ├── BEFORE_AFTER_COMPARISON.md   # Feature comparison
│   └── PROJECT_STRUCTURE.md         # This file
│
├── 📁 public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── 📄 middleware.ts                 # Next.js middleware
├── 📄 .env.local.example            # Environment template
├── 📄 .gitignore                    # Git ignore rules
├── 📄 README.md                     # Main documentation
├── 📄 CONTRIBUTING.md               # Contribution guidelines
├── 📄 LICENSE                       # MIT License
├── 📄 package.json                  # Dependencies
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 next.config.ts                # Next.js config
├── 📄 tailwind.config.ts            # Tailwind config
├── 📄 components.json               # shadcn/ui config
└── 📄 eslint.config.mjs             # ESLint config
```

---

## 📂 Folder Descriptions

### `/app` - Next.js App Router

Main application code using Next.js 16 App Router.

**Structure:**
- `(auth)/` - Authentication pages (grouped route)
- `dashboard/` - Main application pages
- `preview/` - Preview & export functionality
- `layout.tsx` - Root layout with providers
- `page.tsx` - Landing page
- `providers.tsx` - React Query & Toaster setup

**Key Files:**
- `layout.tsx` - Wraps all pages, includes fonts & providers
- `providers.tsx` - QueryClientProvider & Toaster
- `globals.css` - Tailwind directives & global styles

---

### `/components` - React Components

Reusable React components.

**Structure:**
- `ui/` - shadcn/ui components (auto-generated)
- `ScheduleCanvas.tsx` - Main schedule renderer
- `CourseBlock.tsx` - Individual course block

**Component Guidelines:**
- Use TypeScript
- Export as named exports
- Include prop types
- Keep components focused

---

### `/lib` - Libraries & Utilities

Core business logic and utilities.

#### `/lib/supabase` - Database Integration
- `client.ts` - Browser Supabase client
- `server.ts` - Server Supabase client
- `middleware.ts` - Auth middleware helpers
- `database.types.ts` - Auto-generated types

#### `/lib/hooks` - Custom Hooks
- `useAuth.ts` - Authentication state & methods
- `useSchedules.ts` - Schedule CRUD operations

#### Core Files
- `types.ts` - Zod schemas & TypeScript types
- `layout-engine.ts` - Schedule layout calculations
- `export.ts` - PNG/PDF export functions
- `utils.ts` - Utility functions (cn, etc.)

---

### `/docs` - Documentation

All project documentation.

**Files:**
- `README.md` - Documentation index
- `START_HERE.md` - Quick start checklist
- `SUPABASE_SETUP_GUIDE.md` - Database setup
- `IMPLEMENTATION_COMPLETE.md` - What's built
- `IMPLEMENTATION_REVIEW.md` - Architecture
- `DATABASE_SUMMARY.md` - DB reference
- `QUICK_START_DATABASE.md` - Quick DB guide
- `BEFORE_AFTER_COMPARISON.md` - Comparison
- `PROJECT_STRUCTURE.md` - This file

**Guidelines:**
- All new docs go in this folder
- Use Markdown format
- Update index when adding docs
- Keep docs up-to-date

---

### `/public` - Static Assets

Static files served directly.

**Contents:**
- SVG icons
- Images
- Fonts (if any)

**Usage:**
```tsx
import Image from 'next/image';
<Image src="/next.svg" alt="Next.js" />
```

---

## 📄 Configuration Files

### TypeScript
- `tsconfig.json` - TypeScript configuration
- `next-env.d.ts` - Next.js type definitions

### Build Tools
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration

### Code Quality
- `eslint.config.mjs` - ESLint rules
- `components.json` - shadcn/ui configuration

### Package Management
- `package.json` - Dependencies & scripts
- `pnpm-lock.yaml` - Lock file
- `pnpm-workspace.yaml` - Workspace config

### Environment
- `.env.local.example` - Environment template
- `.env.local` - Local environment (gitignored)

### Git
- `.gitignore` - Git ignore rules

---

## 🔄 Data Flow

### Authentication Flow
```
User → Login Page → Supabase Auth → Middleware → Dashboard
```

### Schedule Creation Flow
```
User → Dashboard → New Schedule → Form → Supabase → Dashboard
```

### Export Flow
```
User → Preview → ScheduleCanvas → html2canvas/jsPDF → Download
```

---

## 🗄️ Database Structure

### Tables
- `schedules` - User schedules
- `courses` - Schedule courses

### Relationships
```
users (Supabase Auth)
  ↓ 1:N
schedules
  ↓ 1:N
courses
```

---

## 🎨 Styling Architecture

### Tailwind CSS
- Utility-first approach
- Custom theme in `tailwind.config.ts`
- Global styles in `app/globals.css`

### shadcn/ui
- Component library
- Customizable via `components.json`
- Components in `components/ui/`

### CSS Variables
```css
:root {
  --background: ...
  --foreground: ...
  --primary: ...
}
```

---

## 🔐 Security Layers

### 1. Authentication
- Supabase Auth (email/password)
- Session management
- Email confirmation

### 2. Authorization
- Row Level Security (RLS)
- User-specific data access
- Middleware protection

### 3. Input Validation
- Zod schemas
- React Hook Form validation
- Server-side validation

---

## 🚀 Deployment Structure

### Development
```
Local → pnpm dev → http://localhost:3000
```

### Production
```
GitHub → Vercel → https://your-app.vercel.app
```

### Database
```
Supabase Dashboard → PostgreSQL → Edge Functions
```

---

## 📦 Dependencies Overview

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### Database & Auth
- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - SSR helpers

### State Management
- `@tanstack/react-query` - Server state
- `zustand` - Client state

### Forms & Validation
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Form + Zod

### UI
- `tailwindcss` - CSS framework
- `sonner` - Toast notifications
- `date-fns` - Date utilities

### Export
- `html2canvas` - Canvas rendering
- `jspdf` - PDF generation

---

## 🧪 Testing Structure (Future)

```
scechme/
├── __tests__/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── vitest.config.ts
```

---

## 📊 Code Statistics

### Lines of Code (Approximate)
- TypeScript: ~3,000 lines
- React Components: ~1,500 lines
- Utilities: ~500 lines
- Documentation: ~5,000 lines

### File Count
- TypeScript files: ~30
- React components: ~15
- Documentation: ~10
- Configuration: ~10

---

## 🔄 Development Workflow

### 1. Local Development
```bash
pnpm dev          # Start dev server
pnpm lint         # Check code quality
pnpm build        # Test production build
```

### 2. Git Workflow
```bash
git checkout -b feature/name
# Make changes
git commit -m "feat: description"
git push origin feature/name
# Create PR
```

### 3. Deployment
```bash
git push origin main
# Vercel auto-deploys
```

---

## 📝 Naming Conventions

### Files
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Hooks: `use*.ts`
- Types: `*.types.ts`

### Variables
- Constants: `UPPER_SNAKE_CASE`
- Functions: `camelCase`
- Components: `PascalCase`
- Types/Interfaces: `PascalCase`

### Database
- Tables: `snake_case`
- Columns: `snake_case`
- Functions: `snake_case`

---

## 🎯 Key Principles

### Code Organization
- Feature-based structure
- Separation of concerns
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)

### Component Design
- Single responsibility
- Reusability
- Composability
- Type safety

### Performance
- Code splitting
- Lazy loading
- Optimistic updates
- Smart caching

---

## 📚 Further Reading

- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Patterns](https://reactpatterns.com/)

---

**Last Updated:** February 2026
