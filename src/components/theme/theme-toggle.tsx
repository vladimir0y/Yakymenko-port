'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const sunRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sunRef.current || !moonRef.current) return;

    const isDark = theme === 'dark';

    if (prefersReducedMotion) {
      // Set states without animation
      if (isDark) {
        gsap.set(sunRef.current, { rotate: 180, scale: 0, opacity: 0 });
        gsap.set(moonRef.current, { rotate: 0, scale: 1, opacity: 1 });
        gsap.set(containerRef.current, { backgroundColor: '#1e293b' });
      } else {
        gsap.set(moonRef.current, { rotate: -180, scale: 0, opacity: 0 });
        gsap.set(sunRef.current, { rotate: 0, scale: 1, opacity: 1 });
        gsap.set(containerRef.current, { backgroundColor: '#f1f5f9' });
      }
      return;
    }

    const tl = gsap.timeline();

    if (isDark) {
      // Animate to moon (dark mode)
      tl.to(sunRef.current, {
        rotate: 180,
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
        .to(
          moonRef.current,
          {
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          },
          '-=0.1'
        )
        .to(
          containerRef.current,
          {
            backgroundColor: '#1e293b',
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '-=0.3'
        );
    } else {
      // Animate to sun (light mode)
      tl.to(moonRef.current, {
        rotate: -180,
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
        .to(
          sunRef.current,
          {
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          },
          '-=0.1'
        )
        .to(
          containerRef.current,
          {
            backgroundColor: '#f1f5f9',
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '-=0.3'
        );
    }
  }, [theme, mounted, prefersReducedMotion]);

  const handleToggle = () => {
    if (!mounted) return;

    // Add a subtle press animation
    if (!prefersReducedMotion) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }

    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />;
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="relative group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full transition-all duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-checked={theme === 'dark'}
      role="switch"
      type="button"
    >
      <div
        ref={containerRef}
        className="relative w-12 h-12 rounded-full flex items-center justify-center border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        }}
      >
        {/* Sun Icon */}
        <svg
          ref={sunRef}
          className="absolute w-6 h-6 text-amber-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{
            opacity: theme === 'dark' ? 0 : 1,
            transform:
              theme === 'dark'
                ? 'rotate(180deg) scale(0)'
                : 'rotate(0deg) scale(1)',
          }}
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>

        {/* Moon Icon */}
        <svg
          ref={moonRef}
          className="absolute w-6 h-6 text-slate-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{
            opacity: theme === 'dark' ? 1 : 0,
            transform:
              theme === 'dark'
                ? 'rotate(0deg) scale(1)'
                : 'rotate(-180deg) scale(0)',
          }}
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>

        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-full bg-primary-500/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
    </button>
  );
}
