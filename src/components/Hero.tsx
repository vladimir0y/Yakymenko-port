'use client';

import { useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';
import { designTokens } from '@/lib/design-tokens';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion && canvasRef.current && parallaxRef.current) {
      // GSAP Timeline for initial animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate text elements in sequence
      if (textRef.current) {
        const textElements = textRef.current.children;
        tl.fromTo(
          textElements,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
          }
        );
      }

      // Animate scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        );

        // Add continuous bounce animation to scroll indicator
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // Mouse move parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!parallaxRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate mouse position as percentage from center
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        // Apply subtle parallax movement
        gsap.to(parallaxRef.current, {
          x: xPercent * 30,
          y: yPercent * 20,
          duration: 0.8,
          ease: 'power2.out',
        });
      };

      // Add mouse move listener
      window.addEventListener('mousemove', handleMouseMove);

      // Cleanup function
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        tl.kill();
      };
    }
  }, []);

  // Scroll to next section function
  const scrollToNext = () => {
    const nextSection = document.querySelector('main > section:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Canvas with Layered Gradients */}
      <div
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10" />

        {/* Parallax gradient layer */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-radial from-primary-600/20 via-transparent to-secondary-600/20"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(var(--color-primary-600), 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(var(--color-secondary-600), 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, rgba(var(--color-accent-600), 0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-accent-500/5 animate-gradient-shift" />
      </div>

      {/* Content Container */}
      <div className={designTokens.layout.getContainer('xl')}>
        <div ref={textRef} className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1
            className={designTokens.cn(
              designTokens.typography.getHeading(1),
              'text-gradient'
            )}
          >
            Full Stack Developer &amp; Digital Creator
          </h1>

          {/* Subtitle */}
          <p
            className={designTokens.cn(
              designTokens.typography.getBodyText('lg'),
              'text-muted-foreground max-w-2xl mx-auto'
            )}
          >
            Crafting exceptional digital experiences with modern web
            technologies. Specializing in React, Next.js, TypeScript, and
            scalable cloud solutions.
          </p>

          {/* Bio Text */}
          <div
            className={designTokens.cn(
              designTokens.typography.getBodyText('base'),
              'text-foreground/80 max-w-3xl mx-auto leading-relaxed'
            )}
          >
            <p>
              Passionate about creating intuitive user interfaces and robust
              backend systems. With expertise in modern JavaScript ecosystems,
              cloud architecture, and DevOps practices, I bring ideas to life
              through clean, performant, and accessible code.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className={designTokens.variant.getButtonVariant('primary', 'lg')}
              onClick={() => {
                const projectsSection = document.querySelector('#projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </button>
            <button
              className={designTokens.variant.getButtonVariant('outline', 'lg')}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground transition-colors duration-300 focus:outline-none focus:text-foreground"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium tracking-wide uppercase">
            Scroll
          </span>
          <div className="relative">
            <ChevronDownIcon
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1 group-focus:translate-y-1"
              aria-hidden="true"
            />
          </div>
        </button>
      </div>

      {/* Accessibility: Hidden heading for screen readers */}
      <h2 className="sr-only">
        Welcome to my portfolio - Full Stack Developer specializing in modern
        web development
      </h2>
    </section>
  );
};

export default Hero;
