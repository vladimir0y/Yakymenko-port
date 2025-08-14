import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      {children}
    </section>
  );
}
