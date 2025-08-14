'use client';

import { useState, useEffect } from 'react';
import ResponsiveDebugger, {
  ResponsiveTestGrid,
  useBreakpoint,
} from '@/components/ResponsiveDebugger';
import { ScrollAnimations } from '@/lib/scroll-animations';
import { ThemeToggle } from '@/components/theme';

export default function TestPage() {
  const { breakpoint, screenSize, isMobile, isTablet, isDesktop } =
    useBreakpoint();
  const [showAnimations, setShowAnimations] = useState(true);

  useEffect(() => {
    if (showAnimations) {
      ScrollAnimations.setup(() => {
        // Test fade-in animations
        ScrollAnimations.batch(
          '.test-fade-in',
          {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0 },
          },
          {
            trigger: '.test-animations-section',
            start: 'top 80%',
            once: false,
          }
        );

        // Test slide-in animations
        ScrollAnimations.batch(
          '.test-slide-left',
          {
            from: { opacity: 0, x: -50 },
            to: { opacity: 1, x: 0 },
          },
          {
            trigger: '.test-slide-section',
            start: 'top 80%',
            once: false,
          }
        );

        ScrollAnimations.batch(
          '.test-slide-right',
          {
            from: { opacity: 0, x: 50 },
            to: { opacity: 1, x: 0 },
          },
          {
            trigger: '.test-slide-section',
            start: 'top 80%',
            once: false,
          }
        );
      });
    }

    return () => ScrollAnimations.killAll();
  }, [showAnimations]);

  return (
    <div className="min-h-screen bg-background">
      {/* Debug and controls */}
      <ResponsiveDebugger position="top-left" detailed />

      <div className="fixed top-2 right-2 z-50 flex gap-2">
        <ThemeToggle />
        <button
          onClick={() => setShowAnimations(!showAnimations)}
          className="px-3 py-1 text-xs bg-primary-500 text-white rounded font-mono"
        >
          {showAnimations ? 'Disable' : 'Enable'} Animations
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-fluid-6xl font-bold text-gradient">
            Responsive & Animation Test Page
          </h1>
          <p className="text-fluid-lg text-muted-foreground">
            Test breakpoints, animations, and micro-interactions
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 rounded">
              {screenSize.width} × {screenSize.height}
            </span>
            <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 rounded">
              {breakpoint.toUpperCase()}
            </span>
            <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900 rounded">
              {isMobile
                ? 'Mobile'
                : isTablet
                  ? 'Tablet'
                  : isDesktop
                    ? 'Desktop'
                    : 'Unknown'}
            </span>
          </div>
        </header>

        {/* Breakpoint Test */}
        <section className="space-y-8">
          <h2 className="text-fluid-3xl font-bold">
            Responsive Breakpoint Tests
          </h2>
          <ResponsiveTestGrid />
        </section>

        {/* Typography Test */}
        <section className="space-y-8">
          <h2 className="text-fluid-3xl font-bold">Fluid Typography Test</h2>
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg space-y-4">
              <h1 className="text-fluid-6xl font-bold">Fluid H1 (6XL)</h1>
              <h2 className="text-fluid-5xl font-bold">Fluid H2 (5XL)</h2>
              <h3 className="text-fluid-4xl font-bold">Fluid H3 (4XL)</h3>
              <h4 className="text-fluid-3xl font-bold">Fluid H4 (3XL)</h4>
              <h5 className="text-fluid-2xl font-bold">Fluid H5 (2XL)</h5>
              <h6 className="text-fluid-xl font-bold">Fluid H6 (XL)</h6>
              <p className="text-fluid-lg">Large paragraph text</p>
              <p className="text-fluid-base">Base paragraph text</p>
              <p className="text-fluid-sm">Small paragraph text</p>
              <p className="text-fluid-xs">Extra small paragraph text</p>
            </div>
          </div>
        </section>

        {/* Focus Test */}
        <section className="space-y-8">
          <h2 className="text-fluid-3xl font-bold">
            Keyboard Navigation & Focus Test
          </h2>
          <p className="text-muted-foreground">
            Use Tab key to navigate through these elements and test focus
            styles:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="p-4 bg-primary-500 text-white rounded-lg focus-ring">
              Primary Button
            </button>
            <button className="p-4 border border-border rounded-lg focus-ring">
              Secondary Button
            </button>
            <a
              href="#test"
              className="p-4 bg-accent-500 text-white rounded-lg focus-ring block text-center"
            >
              Link Button
            </a>
            <input
              type="text"
              placeholder="Text input"
              className="p-4 border border-border rounded-lg focus-ring"
            />
            <select className="p-4 border border-border rounded-lg focus-ring">
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <textarea
              placeholder="Textarea"
              rows={3}
              className="p-4 border border-border rounded-lg focus-ring"
            />
          </div>
        </section>

        {/* Animation Test Section 1 */}
        <section className="test-animations-section space-y-8">
          <h2 className="text-fluid-3xl font-bold">
            Scroll-Triggered Fade Animations
          </h2>
          <p className="text-muted-foreground">
            Scroll down to see fade-in animations:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="test-fade-in p-6 bg-primary-100 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <h3 className="font-semibold mb-2">Card 1</h3>
              <p className="text-sm text-muted-foreground">
                This card fades in on scroll
              </p>
            </div>
            <div className="test-fade-in p-6 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg border border-secondary-200 dark:border-secondary-800">
              <h3 className="font-semibold mb-2">Card 2</h3>
              <p className="text-sm text-muted-foreground">
                This card fades in on scroll
              </p>
            </div>
            <div className="test-fade-in p-6 bg-accent-100 dark:bg-accent-900/20 rounded-lg border border-accent-200 dark:border-accent-800">
              <h3 className="font-semibold mb-2">Card 3</h3>
              <p className="text-sm text-muted-foreground">
                This card fades in on scroll
              </p>
            </div>
            <div className="test-fade-in p-6 bg-primary-100 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <h3 className="font-semibold mb-2">Card 4</h3>
              <p className="text-sm text-muted-foreground">
                This card fades in on scroll
              </p>
            </div>
            <div className="test-fade-in p-6 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg border border-secondary-200 dark:border-secondary-800">
              <h3 className="font-semibold mb-2">Card 5</h3>
              <p className="text-sm text-muted-foreground">
                This card fades in on scroll
              </p>
            </div>
            <div className="test-fade-in p-6 bg-accent-100 dark:bg-accent-900/20 rounded-lg border border-accent-200 dark:border-accent-800">
              <h3 className="font-semibold mb-2">Card 6</h3>
              <p className="text-sm text-muted-foreground">
                This card fades in on scroll
              </p>
            </div>
          </div>
        </section>

        {/* Animation Test Section 2 */}
        <section className="test-slide-section space-y-8">
          <h2 className="text-fluid-3xl font-bold">Slide-in Animations</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="test-slide-left p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Slide from Left</h3>
              <p className="text-muted-foreground">
                This content slides in from the left side when it enters the
                viewport.
              </p>
            </div>
            <div className="test-slide-right p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Slide from Right</h3>
              <p className="text-muted-foreground">
                This content slides in from the right side when it enters the
                viewport.
              </p>
            </div>
          </div>
        </section>

        {/* Spacing Test */}
        <section className="space-y-8">
          <h2 className="text-fluid-3xl font-bold">Fluid Spacing Test</h2>
          <div className="space-y-fluid-md">
            <div className="p-fluid-xs bg-red-100 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
              <code className="text-xs">p-fluid-xs</code>
            </div>
            <div className="p-fluid-sm bg-orange-100 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
              <code className="text-xs">p-fluid-sm</code>
            </div>
            <div className="p-fluid-md bg-yellow-100 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
              <code className="text-xs">p-fluid-md</code>
            </div>
            <div className="p-fluid-lg bg-green-100 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <code className="text-xs">p-fluid-lg</code>
            </div>
            <div className="p-fluid-xl bg-blue-100 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
              <code className="text-xs">p-fluid-xl</code>
            </div>
          </div>
        </section>

        {/* Reduced Motion Test */}
        <section className="space-y-8">
          <h2 className="text-fluid-3xl font-bold">Reduced Motion Test</h2>
          <div className="p-6 bg-muted rounded-lg">
            <p className="mb-4 text-muted-foreground">
              Test reduced motion by enabling it in your system preferences or
              browser settings. All animations should be disabled or
              significantly reduced.
            </p>
            <p className="text-sm font-mono">
              <strong>macOS:</strong> System Preferences → Accessibility →
              Display → Reduce motion
              <br />
              <strong>Windows:</strong> Settings → Ease of Access → Display →
              Show animations
              <br />
              <strong>Chrome:</strong> DevTools → Rendering → Emulate CSS
              prefers-reduced-motion
            </p>
          </div>
        </section>

        {/* Dark Mode Test */}
        <section className="space-y-8">
          <h2 className="text-fluid-3xl font-bold">Dark Mode Test</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <h4 className="font-semibold text-primary-800 dark:text-primary-200">
                Primary Colors
              </h4>
              <p className="text-primary-600 dark:text-primary-400 text-sm">
                Background adapts to theme
              </p>
            </div>
            <div className="p-4 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg border border-secondary-200 dark:border-secondary-800">
              <h4 className="font-semibold text-secondary-800 dark:text-secondary-200">
                Secondary Colors
              </h4>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                Background adapts to theme
              </p>
            </div>
            <div className="p-4 bg-accent-100 dark:bg-accent-900/20 rounded-lg border border-accent-200 dark:border-accent-800">
              <h4 className="font-semibold text-accent-800 dark:text-accent-200">
                Accent Colors
              </h4>
              <p className="text-accent-600 dark:text-accent-400 text-sm">
                Background adapts to theme
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <h4 className="font-semibold text-foreground">Base Colors</h4>
              <p className="text-muted-foreground text-sm">
                System colors adapt
              </p>
            </div>
          </div>
        </section>

        <div className="py-16">
          <p className="text-center text-muted-foreground">
            End of test page. Scroll back up to test animations again!
          </p>
        </div>
      </div>
    </div>
  );
}
