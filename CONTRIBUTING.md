# 🤝 Contributing to Schedule Generator

Thank you for considering contributing! This document provides guidelines for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/schedule-generator.git
cd schedule-generator/scechme
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment

```bash
cp .env.local.example .env.local
# Fill in your Supabase credentials
```

### 4. Run Development Server

```bash
pnpm dev
```

---

## 🔄 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update tests if needed

### 3. Test Your Changes

```bash
# Run linter
pnpm lint

# Build to check for errors
pnpm build

# Test manually
pnpm dev
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

See [Commit Guidelines](#commit-guidelines) below.

### 5. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 💻 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types (avoid `any`)
- Use Zod for runtime validation

```typescript
// Good
interface User {
  id: string;
  name: string;
}

// Bad
const user: any = { ... };
```

### React Components

- Use functional components
- Use hooks (useState, useEffect, etc.)
- Keep components small and focused
- Use proper prop types

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `ScheduleCanvas.tsx`)
- Utilities: `camelCase.ts` (e.g., `layoutEngine.ts`)
- Hooks: `use*.ts` (e.g., `useAuth.ts`)
- Types: `*.types.ts` (e.g., `database.types.ts`)

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use double quotes for strings
- Max line length: 100 characters
- Use Prettier for formatting

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Test additions/updates
- `chore` - Build process or auxiliary tool changes

### Examples

```bash
# Feature
git commit -m "feat(dashboard): add schedule filtering"

# Bug fix
git commit -m "fix(export): resolve PDF generation issue"

# Documentation
git commit -m "docs: update setup guide"

# Refactor
git commit -m "refactor(auth): simplify login logic"
```

### Rules

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Keep subject line under 50 characters
- Capitalize subject line
- Don't end subject line with period

---

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow guidelines
- [ ] Branch is up-to-date with main

### PR Title

Use same format as commit messages:

```
feat(dashboard): add schedule filtering
```

### PR Description

Include:

1. **What** - What changes were made
2. **Why** - Why these changes are needed
3. **How** - How the changes work
4. **Testing** - How to test the changes
5. **Screenshots** - If UI changes

Template:

```markdown
## Description
Brief description of changes

## Motivation
Why this change is needed

## Changes
- Change 1
- Change 2

## Testing
How to test these changes

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
```

### Review Process

1. Maintainer reviews PR
2. Address feedback if needed
3. Maintainer approves & merges
4. Branch is deleted

---

## 📚 Documentation

### When to Update Docs

Update documentation when:
- Adding new features
- Changing existing behavior
- Fixing bugs that affect usage
- Updating dependencies
- Changing configuration

### Documentation Files

All documentation goes in `docs/` folder:

```
docs/
├── README.md                      # Documentation index
├── START_HERE.md                  # Quick start guide
├── SUPABASE_SETUP_GUIDE.md        # Database setup
└── ...                            # Other guides
```

### Documentation Style

- Use clear, simple language
- Include code examples
- Add screenshots for UI changes
- Use proper Markdown formatting
- Keep docs up-to-date with code

### Adding New Documentation

1. Create file in `docs/` folder
2. Use descriptive filename (e.g., `FEATURE_NAME_GUIDE.md`)
3. Add to `docs/README.md` index
4. Link from main `README.md` if relevant

---

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues
- Try latest version
- Check documentation

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]

## Screenshots
[Add screenshots if applicable]

## Additional Context
Any other relevant information
```

---

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
Other solutions you've considered

## Additional Context
Any other relevant information
```

---

## 🧪 Testing

### Manual Testing

1. Test all affected features
2. Test on different browsers
3. Test responsive design
4. Test error cases

### Automated Testing (Future)

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

---

## 🎨 UI/UX Guidelines

### Design Principles

- Keep it simple
- Consistent spacing
- Clear visual hierarchy
- Accessible (WCAG 2.1 AA)

### Component Guidelines

- Use shadcn/ui components
- Follow existing patterns
- Maintain consistent styling
- Test dark mode

---

## 📦 Dependencies

### Adding Dependencies

Before adding new dependencies:

1. Check if really needed
2. Check bundle size
3. Check maintenance status
4. Check license

```bash
# Add dependency
pnpm add package-name

# Add dev dependency
pnpm add -D package-name
```

### Updating Dependencies

```bash
# Check outdated packages
pnpm outdated

# Update specific package
pnpm update package-name

# Update all packages
pnpm update
```

---

## 🔒 Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email maintainer directly
2. Include detailed description
3. Include steps to reproduce
4. Wait for response before disclosure

---

## 📞 Getting Help

- **Documentation:** Check `docs/` folder
- **Issues:** Search existing issues
- **Discussions:** Use GitHub Discussions
- **Discord:** Join Supabase/Next.js Discord

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🎉**
