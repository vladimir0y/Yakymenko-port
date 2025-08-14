# Design System & Tailwind CSS Configuration

This directory contains the comprehensive design system and Tailwind CSS configuration for the portfolio website.

## Files Overview

### `globals.css`

The main stylesheet containing:

- Google Fonts imports (Inter, JetBrains Mono, Poppins)
- CSS custom properties (design tokens) for light/dark themes
- Base styles and resets
- Typography baseline
- Component utilities
- Animation utilities
- Print styles

### Configuration

The design system is configured in:

- `tailwind.config.ts` - Main Tailwind configuration with custom theme extensions
- `postcss.config.mjs` - PostCSS configuration with Tailwind and Autoprefixer

## Design Tokens

### Color Palette

- **Primary**: Professional Blue (50-950 scale)
- **Secondary**: Elegant Purple (50-950 scale)
- **Accent**: Vibrant Teal (50-950 scale)
- **Base Colors**: Background, foreground, muted, border, input, ring

### Typography

- **Font Families**:
  - `sans`: Inter (body text)
  - `display`: Poppins (headings)
  - `mono`: JetBrains Mono (code)

- **Fluid Typography**: Using `clamp()` for responsive text sizes
  - `fluid-xs` to `fluid-6xl` scales

### Spacing

- **Fluid Spacing**: Responsive spacing using `clamp()`
  - `fluid-xs` to `fluid-2xl` scales

## Features

### Dark Mode Support

- Class-based dark mode strategy (`dark:` prefix)
- Automatic system preference detection
- CSS variables that adapt to theme

### Responsive Design

- Mobile-first approach
- Fluid typography and spacing
- Breakpoint utilities

### Custom Utilities

- `.text-gradient` - Animated gradient text
- `.glass-effect` - Glassmorphism effect
- `.container-fluid` - Responsive container with fluid padding
- `.section-padding` - Consistent section spacing
- Animation classes for common effects

### Accessibility

- Focus-visible support
- Reduced motion preferences
- High contrast colors
- Semantic color names

## Usage Examples

### Using Design Tokens

```tsx
import { designTokens } from '../lib/design-tokens';

// Theme management
designTokens.theme.setTheme('dark');
designTokens.theme.toggleTheme();

// Component variants
const buttonClass = designTokens.variant.getButtonVariant('primary', 'lg');

// Layout utilities
const containerClass = designTokens.layout.getContainer('xl');

// Typography utilities
const headingClass = designTokens.typography.getHeading(1, 'text-gradient');
```

### CSS Custom Properties

```css
/* Using color tokens */
.my-component {
  background: rgb(var(--color-primary-500));
  color: rgb(var(--color-primary-50));
}

/* Using in Tailwind classes */
.bg-primary-500 /* Uses rgb(var(--color-primary-500)) */
```

### Fluid Typography

```tsx
<h1 className="text-fluid-5xl">Responsive Heading</h1>
<p className="text-fluid-base">Responsive body text</p>
```

### Custom Gradients

```tsx
<div className="bg-gradient-hero">Hero with gradient background</div>
<h2 className="text-gradient">Gradient text effect</h2>
```

## Customization

### Adding New Colors

1. Add CSS variables to `:root` and `.dark` in `globals.css`
2. Add color scale to `tailwind.config.ts` theme extension
3. Update TypeScript types in `src/types/design-tokens.ts`

### Adding New Font Sizes

1. Add clamp() definition in `tailwind.config.ts`
2. Update `FluidFontSize` type
3. Add utility functions in `src/lib/design-tokens.ts`

### Extending Components

Create new variant utilities in `src/lib/design-tokens.ts`:

```tsx
export const customUtils = {
  getCardVariant(variant: 'default' | 'elevated' | 'outlined'): string {
    // Custom component variant logic
  },
};
```

## Performance

- Tailwind purging is configured for `./src/**/*.{ts,tsx}`
- CSS is optimized with Autoprefixer
- Google Fonts use `display=swap` for better loading performance
- Print styles are separated to avoid loading costs

## Browser Support

- Modern CSS features (CSS Grid, Flexbox, Custom Properties)
- Fallbacks for older browsers where needed
- Progressive enhancement approach
