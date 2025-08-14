'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ThemeToggle } from '@/components/theme';

// Simple inline heroicons (menu, x) to avoid extra deps
function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}
function IconClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const nav = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export function AppHeader() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    // close on route change
    setOpen(false);
  }, [pathname]);

  return (
    <div className="pointer-events-none sticky top-4 z-50">
      <div className="pointer-events-auto mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-12 shadow-glass border border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-slate-900/40 supports-[backdrop-filter]:border-white/20"
          role="navigation"
          aria-label="Primary"
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight text-slate-900 dark:text-slate-100"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-12 bg-primary-600 text-white">
                V
              </span>
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-6"
              aria-label="Primary"
            >
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'text-sm transition-colors',
                      active
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <ThemeToggle />
            </nav>

            {/* Mobile actions */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-12 p-2 text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-haspopup="true"
              >
                {open ? (
                  <IconClose className="h-6 w-6" />
                ) : (
                  <IconMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile nav - Framer Motion slide-down */}
          <LazyMotion features={domAnimation} strict>
            <AnimatePresence initial={false}>
              {open ? (
                <m.nav
                  id="mobile-nav"
                  key="mobile-nav"
                  initial={
                    prefersReducedMotion ? false : { height: 0, opacity: 0 }
                  }
                  animate={
                    prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }
                  }
                  exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 300, damping: 30 }
                  }
                  className="md:hidden overflow-hidden border-t border-white/10"
                  role="menu"
                  aria-label="Mobile"
                >
                  <ul className="flex flex-col gap-1 px-4 py-3">
                    {nav.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={[
                              'block rounded-12 px-3 py-2 text-sm',
                              active
                                ? 'bg-primary-500/10 text-primary-700 dark:text-primary-200'
                                : 'text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/5',
                            ].join(' ')}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </m.nav>
              ) : null}
            </AnimatePresence>
          </LazyMotion>
        </div>
      </div>
    </div>
  );
}
