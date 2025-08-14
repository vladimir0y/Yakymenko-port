# SEO Configuration Usage Guide

This guide explains how to use the SEO configuration that has been set up for your portfolio.

## Overview

The project now includes:

- ✅ Enhanced `src/app/layout.tsx` with proper font loading and theme integration
- ✅ `next-seo.config.ts` with comprehensive OpenGraph and meta tag configuration
- ✅ Font preloading for performance optimization
- ✅ Updated Tailwind config with all font variables

## Font Loading Strategy

### Local Fonts (Primary)

- **Geist Sans**: `var(--font-geist-sans)` - Primary sans-serif font
- **Geist Mono**: `var(--font-geist-mono)` - Primary monospace font

### Google Fonts (Fallbacks)

- **Inter**: `var(--font-inter)` - Fallback sans-serif font
- **JetBrains Mono**: `var(--font-jetbrains-mono)` - Fallback monospace font

### Usage in Tailwind CSS

```tsx
// Default sans (uses Geist Sans with Inter fallback)
<h1 className="font-sans">Heading with Geist Sans</h1>

// Default mono (uses Geist Mono with JetBrains Mono fallback)
<code className="font-mono">Code with Geist Mono</code>

// Specific font families
<p className="font-geist-sans">Geist Sans specifically</p>
<p className="font-google-sans">Inter specifically</p>
<p className="font-geist-mono">Geist Mono specifically</p>
<p className="font-google-mono">JetBrains Mono specifically</p>
```

## SEO Usage

### Default SEO (already configured in layout.tsx)

The basic SEO is handled automatically through the metadata export in `layout.tsx`.

### Page-specific SEO with next-seo

For pages that need custom SEO, install and use the NextSeo component:

{% raw %}

```tsx
import { NextSeo } from 'next-seo';

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title="About Me"
        description="Learn more about my background and experience as a full stack developer."
        openGraph={{
          title: 'About Me | Portfolio',
          description:
            'Learn more about my background and experience as a full stack developer.',
          images: [
            {
              url: 'https://your-domain.com/about-og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'About Me - Full Stack Developer',
            },
          ],
        }}
      />
      <div>{/* Your page content */}</div>
    </>
  );
}
```

{% endraw %}

### Project-specific SEO

For individual project pages:

{% raw %}

```tsx
import { NextSeo } from 'next-seo';

export default function ProjectPage() {
  return (
    <>
      <NextSeo
        title="Project Name"
        description="Detailed description of this specific project and the technologies used."
        openGraph={{
          title: 'Project Name | Portfolio',
          description:
            'Detailed description of this specific project and the technologies used.',
          images: [
            {
              url: 'https://your-domain.com/projects/project-name-og.jpg',
              width: 1200,
              height: 630,
              alt: 'Project Name - Screenshot',
            },
          ],
        }}
      />
      <div>{/* Your project content */}</div>
    </>
  );
}
```

{% endraw %}

## Configuration Customization

### Update next-seo.config.ts

1. Replace `https://your-domain.com` with your actual domain
2. Update the Twitter handle `@yourtwitterhandle`
3. Customize the default title and description
4. Add your actual OpenGraph images

### Update layout.tsx metadata

The `metadata` export in `layout.tsx` provides the default SEO. Update:

- `title.default` and `title.template`
- `description`
- `openGraph.url` and `openGraph.images.url`
- `twitter.images`

## Performance Benefits

### Font Loading Optimizations

- Fonts are preloaded in the `<head>` for better performance
- `font-display: swap` ensures text remains visible during font load
- Local fonts are prioritized with Google Fonts as fallbacks

### SEO Optimizations

- Proper OpenGraph tags for social media sharing
- Structured metadata for search engines
- Mobile-optimized viewport settings
- Proper robots directives

## Theme Integration

The ThemeProvider is now directly integrated into the layout with proper attributes:

- `attribute="class"` - Uses class-based theme switching
- `defaultTheme="system"` - Respects user's system preference
- `enableSystem` - Allows system theme detection
- `disableTransitionOnChange` - Prevents flash during theme changes

## Next Steps

1. **Add actual OpenGraph images** to `/public/` directory
2. **Update domain references** in `next-seo.config.ts`
3. **Customize default titles and descriptions** to match your brand
4. **Add structured data** for better SEO (consider using next-seo's JSON-LD features)
5. **Set up analytics** tracking for better insights

## File Structure

```
├── src/app/
│   └── layout.tsx          # Main layout with font loading and SEO
├── public/
│   └── fonts/              # Font files for preloading
├── next-seo.config.ts      # SEO configuration
└── docs/
    └── SEO_USAGE.md        # This guide
```
