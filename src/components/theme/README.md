# Theme Toggle Component

A dark/light theme toggle component built with `next-themes` and GSAP animations.

## Features

- 🌙 **Dark/Light Mode Toggle**: Seamless switching between light and dark themes
- 🎭 **System Theme Detection**: Automatically detects user's system preference
- 💾 **LocalStorage Persistence**: Theme preference is saved and persists across sessions
- ✨ **GSAP Animations**: Smooth rotation and morphing animations between sun/moon icons
- 🎯 **Accessibility**: Full keyboard navigation and screen reader support
- 🚀 **SSR-Safe**: Prevents hydration mismatches with proper mounting checks

## Components

### ThemeProvider

Wraps your application with theme context using `next-themes`.

```tsx
import { ThemeProvider } from '@/components/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

**Props:**

- Extends all `next-themes` ThemeProvider props
- `storageKey`: Custom key for localStorage (default: "portfolio-theme")
- `defaultTheme`: Default theme (default: "system")

### ThemeToggle

An animated toggle button that switches between light and dark themes.

```tsx
import { ThemeToggle } from '@/components/theme';

export default function Navigation() {
  return (
    <nav>
      <ThemeToggle />
    </nav>
  );
}
```

**Features:**

- Animated sun/moon icons with GSAP
- Smooth rotation and scale transitions
- Button press feedback animation
- Hover effects with ripple animation
- Focus ring for accessibility

## Configuration

The component is pre-configured with:

- **Attribute**: `class` (works with Tailwind's `dark:` variants)
- **Storage**: `localStorage` with key `portfolio-theme`
- **System Detection**: Enabled by default
- **Transition Prevention**: Disabled during theme changes to prevent flash

## Styling

The component uses Tailwind CSS classes and can be customized through:

- CSS custom properties in `globals.css`
- Tailwind configuration
- Component-level style overrides

## Accessibility

- **ARIA Labels**: Dynamic labels based on current theme
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus rings
- **Screen Readers**: Semantic button with descriptive labels

## Technical Details

- **Hydration Safe**: Uses mounting state to prevent SSR/client mismatches
- **Performance**: Optimized GSAP timelines with proper cleanup
- **TypeScript**: Full type safety with proper component props
- **Next.js 14**: Compatible with App Router and Server Components
