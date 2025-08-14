'use client';

import * as React from 'react';

export function usePrefersReducedMotion() {
  const getPref = () =>
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const [prefersReduced, setPrefersReduced] = React.useState(getPref);

  React.useEffect(() => {
    if (!('matchMedia' in window)) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReduced(mq.matches);
    handler();
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return prefersReduced;
}
