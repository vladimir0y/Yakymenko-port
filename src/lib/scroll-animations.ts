'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinSpacing?: boolean;
  snap?: boolean | object;
  toggleActions?: string;
  once?: boolean;
  markers?: boolean;
}

export interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration?: number;
  ease?: string;
  stagger?: number;
  delay?: number;
}

export class ScrollAnimations {
  private static instances: ScrollTrigger[] = [];

  /**
   * Create a fade-in animation triggered by scroll
   */
  static fadeIn(
    elements: string | Element | Element[],
    options: ScrollAnimationOptions = {}
  ): ScrollTrigger | null {
    if (typeof window === 'undefined') return null;

    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      toggleActions = 'play none none reverse',
      once = false,
      markers = false,
    } = options;

    try {
      const tl = gsap.timeline();

      tl.fromTo(
        elements,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
        }
      );

      const scrollTrigger = ScrollTrigger.create({
        trigger: trigger,
        start: start,
        end: end,
        toggleActions: toggleActions,
        once: once,
        markers: markers,
        animation: tl,
      });

      if (!once) {
        this.instances.push(scrollTrigger);
      }

      return scrollTrigger;
    } catch (error) {
      console.warn('ScrollTrigger fadeIn failed:', error);
      return null;
    }
  }

  /**
   * Create a slide-in animation triggered by scroll
   */
  static slideIn(
    elements: string | Element | Element[],
    direction: 'left' | 'right' | 'up' | 'down' = 'up',
    options: ScrollAnimationOptions = {}
  ): ScrollTrigger | null {
    if (typeof window === 'undefined') return null;

    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      toggleActions = 'play none none reverse',
      once = false,
      markers = false,
    } = options;

    const directionMap = {
      left: { x: -60, y: 0 },
      right: { x: 60, y: 0 },
      up: { x: 0, y: 60 },
      down: { x: 0, y: -60 },
    };

    const { x: fromX, y: fromY } = directionMap[direction];

    try {
      const tl = gsap.timeline();

      tl.fromTo(
        elements,
        {
          opacity: 0,
          x: fromX,
          y: fromY,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
        }
      );

      const scrollTrigger = ScrollTrigger.create({
        trigger: trigger,
        start: start,
        end: end,
        toggleActions: toggleActions,
        once: once,
        markers: markers,
        animation: tl,
      });

      if (!once) {
        this.instances.push(scrollTrigger);
      }

      return scrollTrigger;
    } catch (error) {
      console.warn('ScrollTrigger slideIn failed:', error);
      return null;
    }
  }

  /**
   * Create a custom animation triggered by scroll
   */
  static custom(
    elements: string | Element | Element[],
    animation: AnimationConfig,
    options: ScrollAnimationOptions = {}
  ): ScrollTrigger | null {
    if (typeof window === 'undefined') return null;

    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      toggleActions = 'play none none reverse',
      once = false,
      markers = false,
    } = options;

    const {
      from,
      to,
      duration = 0.8,
      ease = 'power2.out',
      stagger = 0,
      delay = 0,
    } = animation;

    try {
      const tl = gsap.timeline({ delay });

      tl.fromTo(elements, from, {
        ...to,
        duration,
        ease,
        stagger,
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: trigger,
        start: start,
        end: end,
        toggleActions: toggleActions,
        once: once,
        markers: markers,
        animation: tl,
      });

      if (!once) {
        this.instances.push(scrollTrigger);
      }

      return scrollTrigger;
    } catch (error) {
      console.warn('ScrollTrigger custom animation failed:', error);
      return null;
    }
  }

  /**
   * Create a parallax effect
   */
  static parallax(
    elements: string | Element | Element[],
    speed: number = 0.5,
    options: ScrollAnimationOptions = {}
  ): ScrollTrigger | null {
    if (typeof window === 'undefined') return null;

    const {
      trigger,
      start = 'top bottom',
      end = 'bottom top',
      scrub = true,
      markers = false,
    } = options;

    try {
      const scrollTrigger = ScrollTrigger.create({
        trigger: trigger,
        start: start,
        end: end,
        scrub: scrub,
        markers: markers,
        animation: gsap.fromTo(
          elements,
          { y: 0 },
          { y: `${speed * 100}%`, ease: 'none' }
        ),
      });

      this.instances.push(scrollTrigger);
      return scrollTrigger;
    } catch (error) {
      console.warn('ScrollTrigger parallax failed:', error);
      return null;
    }
  }

  /**
   * Batch animate multiple elements
   */
  static batch(
    elements: string,
    animation: AnimationConfig,
    options: ScrollAnimationOptions & { interval?: number } = {}
  ): ScrollTrigger[] | null {
    if (typeof window === 'undefined') return null;

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      once = false,
      interval = 0.1,
    } = options;

    const { from, to, duration = 0.6, ease = 'power2.out' } = animation;

    try {
      const triggers = ScrollTrigger.batch(elements, {
        start: start,
        end: end,
        once: once,
        interval: interval,
        onEnter: (elements: Element[]) => {
          gsap.fromTo(elements, from, {
            ...to,
            duration,
            ease,
            stagger: 0.1,
          });
        },
        onLeave: once
          ? undefined
          : (elements: Element[]) => {
              gsap.to(elements, { ...from, duration: 0.3 });
            },
        onEnterBack: once
          ? undefined
          : (elements: Element[]) => {
              gsap.fromTo(elements, from, {
                ...to,
                duration,
                ease,
                stagger: 0.1,
              });
            },
        onLeaveBack: once
          ? undefined
          : (elements: Element[]) => {
              gsap.to(elements, { ...from, duration: 0.3 });
            },
      });

      if (!once) {
        this.instances.push(...triggers);
      }

      return triggers;
    } catch (error) {
      console.warn('ScrollTrigger batch failed:', error);
      return null;
    }
  }

  /**
   * Refresh all ScrollTrigger instances
   */
  static refresh(): void {
    if (typeof window !== 'undefined' && ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  /**
   * Kill all ScrollTrigger instances
   */
  static killAll(): void {
    if (typeof window !== 'undefined' && ScrollTrigger) {
      this.instances.forEach((instance) => instance.kill());
      this.instances = [];
      ScrollTrigger.killAll();
    }
  }

  /**
   * Check if reduced motion is preferred
   */
  static prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Setup animations with reduced motion consideration
   */
  static setup(setupFunction: () => void, fallbackFunction?: () => void): void {
    if (typeof window === 'undefined') return;

    if (this.prefersReducedMotion()) {
      // Use fallback or do nothing if user prefers reduced motion
      if (fallbackFunction) {
        fallbackFunction();
      } else {
        // Show elements immediately without animation
        gsap.set('[data-scroll-animate]', { opacity: 1, y: 0, x: 0 });
      }
    } else {
      setupFunction();
    }
  }
}

// Export convenience functions
export const {
  fadeIn,
  slideIn,
  custom,
  parallax,
  batch,
  refresh,
  killAll,
  prefersReducedMotion,
  setup,
} = ScrollAnimations;
