# Website Portfolio

A modern, themeable portfolio built with Next.js 14, TypeScript, and Tailwind CSS. The project uses a simple design token system (via CSS variables and Tailwind theme mapping) to ensure consistent styling and easy theming. Deployed on Vercel with preview and production workflows.

- Tech stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, GSAP, Headless UI, Heroicons, SWR
- Package manager: pnpm
- Deployment: Vercel (CLI + GitHub integration)

## Contents

- Overview
- Design tokens
- Component API examples
- Theming
- Project structure
- Local development
- Building
- Deploying to Vercel (preview and production)
- GitHub + Vercel integration
- Related docs

## Overview

The app centralizes design decisions (color, spacing, radius, typography, elevation) as tokens. Tokens are exposed as CSS variables and referenced by Tailwind via theme extension. Components read from these tokens so you can switch themes without rewriting component styles.

## Design tokens

Tokens live in CSS variables and are mapped into Tailwind. In this project, the variables are defined in src/styles/globals.css and consumed via tailwind.config.ts. Updating these affects the entire site.

Optional example token files are provided in src/styles/examples for reference (not imported by default).

Tailwind mapping (tailwind.config.ts excerpts):

- Colors derive from CSS variables, e.g. primary.500 uses rgb(var(--color-primary-500) / <alpha-value>)
- Base colors: background, foreground, muted, border, input, ring
- Fluid typography (text-fluid-\*) and spacing aliases

See tailwind.config.ts for the full mapping.

Token reference table (examples):

| Token   | Example key   | Default value                | Notes                 |
| ------- | ------------- | ---------------------------- | --------------------- |
| Colors  | color.bg      | hsl(0 0% 100%)               | Base background       |
|         | color.fg      | hsl(240 10% 3.9%)            | Base foreground       |
|         | color.primary | hsl(221 83% 53%)             | Brand color           |
|         | color.border  | hsl(214 32% 91%)             | Borders/hairlines     |
| Spacing | space.1       | 4px                          | XS spacing            |
|         | space.2       | 8px                          | S spacing             |
| Radius  | radius.md     | 8px                          | Default corner radius |
| Shadow  | shadow.md     | 0 4px 12px hsl(0 0% 0%/0.08) | Cards/dialogs         |

## Component API examples

These match the actual components in this repo.

Button (src/components/ui/Button.tsx)

import { Button } from "@/components/ui/Button";

/_ Props: variant: 'primary' | 'secondary' | 'ghost'; size: 'sm' | 'md' | 'lg'; loading?: boolean; startIcon?: ReactNode; endIcon?: ReactNode _/

Button variant="primary" size="md" onClick={() => {}}>
Save changes
/Button>

Button variant="secondary" size="sm" startIcon={svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>path d="M5 12h14"/>/svg>}>
Add item
/Button>

Button variant="ghost" size="lg" loading>
Loading state
/Button>

Card (src/components/ui/Card.tsx)

import { Card } from "@/components/ui/Card";

Card hover glass className="p-6">
h3 className="text-lg font-semibold mb-2">Card title/h3>
p className="text-sm text-muted-foreground">Content goes here./p>
/Card>

ThemeProvider and ThemeToggle (src/components/theme)

import { ThemeProvider, ThemeToggle } from "@/components/theme";

ThemeProvider>
ThemeToggle />
App />
/ThemeProvider>

Reduced-motion hook (src/hooks/usePrefersReducedMotion.ts)

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const prefersReducedMotion = usePrefersReducedMotion();

## Theming

This project uses next-themes with class-based dark mode.

- Provider: src/components/theme/theme-provider.tsx
  - attribute="class", defaultTheme="system", enableSystem
- Toggle: src/components/theme/theme-toggle.tsx
- Variables: defined in src/styles/globals.css (both light and dark) and also guarded by @media (prefers-color-scheme: dark) for auto theming.

Optional example theme files are included in src/styles/examples (not imported), showing how you might split variables per theme.

Tailwind usage

- Use semantic utilities based on CSS variables, e.g., bg-background text-foreground border-border, and color palettes like text-primary-700, bg-secondary-600.
- Dark mode is toggled by the presence of the .dark class on html (handled by next-themes).

## Related docs

- Projects grid implementation: docs/PROJECTS_GRID_IMPLEMENTATION.md
- Hero implementation: HERO_IMPLEMENTATION.md
- SEO usage: docs/SEO_USAGE.md

## Project structure

```
src/
├── app/          # Next.js 14 App Router pages
├── components/   # Reusable React components
├── lib/          # Utility functions and helpers
├── types/        # TypeScript type definitions
├── styles/       # CSS and token files
└── pages/api/    # API routes
```

## Local development

- Install: pnpm install
- Run dev server: pnpm dev (opens http://localhost:3000)
- Lint/format: pnpm lint && pnpm format
- Test: pnpm test

## Building

- Production build: pnpm build
- Start preview server (if applicable): pnpm start

## Deploying to Vercel

Prerequisites

- Install the Vercel CLI: pnpm add -D vercel
- Authenticate and link the project if not already linked: pnpm vercel link

Preview deploy

- pnpm vercel
  - Builds and uploads a preview deployment for the current branch.

Production deploy

- pnpm dlx vercel --prod
  - Triggers a production deployment from your current branch/commit.

Environment variables

- Manage env vars in the Vercel dashboard (Project Settings → Environment Variables) or via CLI (vercel env ...).
- Never commit secrets. Use env vars and framework runtime config.

## GitHub + Vercel integration

- Push your changes to GitHub:

  git add -A
  git commit -m "docs: add tokens, APIs, theming, and Vercel deployment guide"
  git push origin <branch>

- With the Vercel GitHub app installed and your repo connected:
  - Every pull request automatically gets a preview deployment.
  - Pushing to the default branch (e.g., main) triggers a production deployment.

Troubleshooting

- Verify the Vercel project is linked to the correct GitHub repo.
- Check Node and pnpm versions and the build command in the Vercel dashboard.
- For monorepos, set the correct root directory and output settings in Vercel.
