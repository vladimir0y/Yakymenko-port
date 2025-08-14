# Development Configuration

This project includes comprehensive tooling and code quality configurations for Next.js with TypeScript.

## 🛠️ Tooling & Code Quality

### ESLint Configuration

- **Next.js & TypeScript rules** via `eslint-config-next` and `next/typescript`
- **Prettier integration** with `eslint-plugin-prettier` and `eslint-config-prettier`
- **Custom rules** for code quality and consistency
- **Auto-fixable issues** with `npm run lint:fix`

### Prettier Configuration

- **Consistent formatting** across the codebase
- **Single quotes**, **semicolons**, and **trailing commas**
- **80 character line width** with **2-space indentation**
- **Automatic formatting** on save in VSCode

### Pre-commit Hooks (Husky + lint-staged)

- **Automatic linting** and formatting before commits
- **Type checking** to catch TypeScript errors early
- **Staged file processing** to avoid formatting entire codebase

### TypeScript Path Aliases

```json
{
  "@/*": ["./src/*"],
  "@/components": ["./src/components"],
  "@/lib": ["./src/lib"],
  "@/utils": ["./src/utils"],
  "@/hooks": ["./src/hooks"],
  "@/types": ["./src/types"],
  "@/styles": ["./src/styles"],
  "@/pages": ["./src/pages"],
  "@/app": ["./src/app"],
  "@/api": ["./src/app/api"],
  "@/public": ["./public"]
}
```

### VSCode Configuration

- **Auto-format on save** with Prettier
- **Auto-fix ESLint issues** on save
- **Import organization** on save
- **Tailwind CSS IntelliSense** with custom class regex patterns
- **Recommended extensions** for optimal development experience

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix auto-fixable ESLint issues
npm run format       # Format all files with Prettier
npm run format:check # Check if files are formatted
npm run type-check   # Run TypeScript compiler checks
```

## 🔧 VSCode Extensions

Install the recommended extensions for the best development experience:

- **Prettier** - Code formatter
- **ESLint** - Linting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript Next** - Enhanced TypeScript support
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Path Intellisense** - Autocomplete filenames
- **Error Lens** - Inline error highlighting
- **Code Spell Checker** - Spell checking

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Format and lint your code:**
   ```bash
   npm run format
   npm run lint:fix
   ```

## 📋 Pre-commit Checklist

The following checks run automatically before each commit:

- ✅ ESLint fixes and validation
- ✅ Prettier formatting
- ✅ TypeScript type checking (manual via `npm run type-check`)

## 🎯 Code Quality Rules

- Use **single quotes** for strings
- Add **trailing commas** where appropriate
- Keep **line width to 80 characters**
- Use **TypeScript strict mode**
- Prefer **const** over **let** where possible
- Avoid **var** declarations
- Use **path aliases** for clean imports

Example of clean imports:

```typescript
// ✅ Good
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { UserType } from '@/types';

// ❌ Avoid
import { Button } from '../../../components/ui/Button';
import { formatDate } from '../../lib/utils';
```
