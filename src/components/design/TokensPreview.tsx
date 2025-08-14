import React from 'react';

export default function TokensPreview({ title }: { title: string }) {
  const colorScales = [
    {
      name: 'primary',
      steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      name: 'secondary',
      steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      name: 'accent',
      steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
  ];

  const textSamples = [
    { cls: 'text-fluid-5xl', label: 'Display / 5xl' },
    { cls: 'text-fluid-3xl', label: 'Headline / 3xl' },
    { cls: 'text-fluid-xl', label: 'Title / xl' },
    { cls: 'text-fluid-base', label: 'Body / base' },
    { cls: 'text-fluid-sm', label: 'Caption / sm' },
  ];

  const spaceSamples = [
    { var: 'container-xs' },
    { var: 'container-sm' },
    { var: 'container-md' },
    { var: 'container-lg' },
    { var: 'container-xl' },
    { var: 'm3-1' },
    { var: 'm3-2' },
    { var: 'm3-3' },
    { var: 'm3-4' },
    { var: 'm3-5' },
    { var: 'm3-6' },
    { var: 'm3-7' },
    { var: 'm3-8' },
  ];

  const elevations = [{ name: 'soft' }, { name: 'glass' }, { name: 'deep' }];

  return (
    <div className="container mx-auto px-container-sm py-container-md">
      <h1 className="mb-6">{title}</h1>

      <section className="mb-12">
        <h2 className="mb-4">Color palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {colorScales.map((scale) => (
            <div key={scale.name} className="rounded-lg border p-4">
              <h3 className="text-fluid-lg font-semibold mb-3 capitalize">
                {scale.name}
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {scale.steps.map((step) => (
                  <div
                    key={step}
                    className="aspect-video rounded-md border"
                    style={{
                      backgroundColor: `rgb(var(--color-${scale.name}-${step}))`,
                    }}
                  >
                    <div className="text-[10px] font-mono p-1/2 opacity-80">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4">Typography scale</h2>
        <div className="space-y-3">
          {textSamples.map((t) => (
            <div key={t.cls} className="border rounded-lg p-m3-4">
              <div className={`${t.cls} font-display`}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {t.label} — {t.cls}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4">Spacing tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {spaceSamples.map((s) => (
            <div key={s.var} className="border rounded-lg">
              <div
                className={`bg-muted rounded-t-lg`}
                style={{ padding: `var(--space-${s.var})` }}
              >
                <div className="bg-accent-500/30 rounded text-center text-xs">
                  content
                </div>
              </div>
              <div className="text-xs text-muted-foreground px-m3-3 py-m3-2">
                --space-{s.var}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4">Elevation tokens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {elevations.map((e) => (
            <div
              key={e.name}
              className="rounded-lg border bg-background p-m3-5"
              style={{
                boxShadow: `var(--elevation-${e.name})`,
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div className="text-fluid-lg font-medium capitalize">
                {e.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                box-shadow: var(--elevation-{e.name})
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
