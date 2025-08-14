import React from 'react';
import TokensPreview from '@/components/design/TokensPreview';

export default function MockupsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto py-container-lg">
        <h1 className="text-fluid-4xl font-semibold mb-m3-6">
          Design System Mockups
        </h1>
        <p className="text-fluid-base text-muted-foreground mb-m3-8">
          These high-fidelity mockups demonstrate token-driven UI across
          desktop, tablet, and mobile breakpoints.
        </p>

        <div className="space-y-16">
          {/* Desktop */}
          <div>
            <h2 className="text-fluid-3xl font-semibold mb-m3-4">
              Desktop (≥ 1280px)
            </h2>
            <div className="rounded-xl border shadow-soft overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-container-lg">
                <header className="flex items-center justify-between">
                  <div className="text-white text-fluid-2xl font-display">
                    Brand
                  </div>
                  <nav className="hidden md:flex gap-m3-5 text-white/90">
                    <a className="hover:text-white" href="#">
                      Home
                    </a>
                    <a className="hover:text-white" href="#">
                      Projects
                    </a>
                    <a className="hover:text-white" href="#">
                      About
                    </a>
                    <a className="hover:text-white" href="#">
                      Contact
                    </a>
                  </nav>
                </header>
                <div className="mt-m3-6 grid grid-cols-12 gap-m3-6">
                  <div className="col-span-7">
                    <h3 className="text-white text-fluid-5xl leading-tight">
                      Build once, scale everywhere
                    </h3>
                    <p className="text-white/80 text-fluid-lg mt-m3-3 max-w-prose">
                      Components inherit color, spacing, and typography from
                      tokens. Switch themes without editing component code.
                    </p>
                    <div className="mt-m3-5 flex gap-m3-3">
                      <button className="px-m3-5 py-m3-3 rounded-[var(--radius-md)] bg-white text-primary-700 font-medium shadow-soft">
                        Get started
                      </button>
                      <button className="px-m3-5 py-m3-3 rounded-[var(--radius-md)] bg-white/10 text-white border border-white/30">
                        Live demo
                      </button>
                    </div>
                  </div>
                  <div className="col-span-5">
                    <div className="bg-background/80 rounded-xl p-m3-5 shadow-deep">
                      <div className="h-40 rounded-lg bg-primary-100 dark:bg-primary-900 border" />
                      <div className="mt-m3-4 grid grid-cols-3 gap-m3-3">
                        <div className="h-16 rounded-lg bg-secondary-100 dark:bg-secondary-900 border" />
                        <div className="h-16 rounded-lg bg-accent-100 dark:bg-accent-900 border" />
                        <div className="h-16 rounded-lg bg-primary-100 dark:bg-primary-900 border" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-container-lg grid grid-cols-12 gap-m3-6 bg-background">
                <aside className="col-span-3 hidden xl:block">
                  <div className="rounded-lg border p-m3-4 shadow-soft">
                    <div className="text-fluid-lg font-medium mb-m3-2">
                      Filters
                    </div>
                    <div className="space-y-m3-2 text-sm text-muted-foreground">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" /> Primary
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" /> Secondary
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" /> Accent
                      </label>
                    </div>
                  </div>
                </aside>
                <section className="col-span-12 xl:col-span-9">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-m3-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <article
                        key={i}
                        className="rounded-xl border p-m3-4 shadow-soft hover:shadow-deep transition-shadow"
                      >
                        <div className="h-36 rounded-lg bg-gradient-primary mb-m3-3" />
                        <h3 className="text-fluid-xl font-semibold">
                          Card title
                        </h3>
                        <p className="text-fluid-sm text-muted-foreground mt-m3-2">
                          Token-driven card example.
                        </p>
                        <button className="mt-m3-3 text-primary-600 hover:text-primary-700">
                          Learn more →
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Tablet */}
          <div>
            <h2 className="text-fluid-3xl font-semibold mb-m3-4">
              Tablet (≥ 768px)
            </h2>
            <div className="rounded-xl border shadow-soft overflow-hidden">
              <div className="p-container-md bg-gradient-secondary">
                <h3 className="text-white text-fluid-3xl">Responsive grid</h3>
                <p className="text-white/85 max-w-prose">
                  Two-column layouts shift to one column below the md
                  breakpoint.
                </p>
              </div>
              <div className="p-container-md grid md:grid-cols-2 gap-m3-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-m3-4 shadow-soft">
                    <div className="h-24 rounded bg-muted mb-m3-3" />
                    <div className="text-fluid-lg font-medium">
                      Module {i + 1}
                    </div>
                    <div className="text-fluid-sm text-muted-foreground">
                      Uses spacing tokens and elevation.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div>
            <h2 className="text-fluid-3xl font-semibold mb-m3-4">
              Mobile (≤ 640px)
            </h2>
            <div className="rounded-xl border shadow-soft overflow-hidden">
              <div className="p-container-sm bg-gradient-accent">
                <h3 className="text-white text-fluid-2xl">Compact UI</h3>
                <p className="text-white/90">
                  Single column, larger touch targets.
                </p>
              </div>
              <div className="p-container-sm space-y-m3-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-m3-4 shadow-soft flex items-center gap-m3-3"
                  >
                    <div className="size-14 rounded bg-primary-100 dark:bg-primary-900" />
                    <div>
                      <div className="text-fluid-lg font-medium">
                        Item {i + 1}
                      </div>
                      <div className="text-fluid-sm text-muted-foreground">
                        Token-driven list tile
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <TokensPreview title="Token reference" />
        </div>
      </section>
    </main>
  );
}
