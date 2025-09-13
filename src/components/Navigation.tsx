'use client';

import { useState, useEffect } from 'react';
import type React from 'react';

const navItems = [
  { label: 'Home', href: '#main-content', id: 'main-content' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Skills', href: '#skills-expertise', id: 'skills-expertise' },
  { label: 'Impact', href: '#achievements', id: 'achievements' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main-content');
  const [isVisible, setIsVisible] = useState(false);
  
  // Always show navigation on mobile when menu is open
  const shouldShowNav = isVisible || isMenuOpen;
  
  // Force visibility on very small screens to debug
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        console.log('Mobile detected, forcing nav visibility for debugging');
        setIsVisible(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout | null = null;
    let scrollTimer: NodeJS.Timeout | null = null;

    const startHideTimer = () => {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (!isMenuOpen) {
          setIsVisible(false);
        }
      }, 3000);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = currentScrollY + 100;

      // Update active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }

      // Show/hide navigation based on scroll
      if (currentScrollY > 100) {
        setIsVisible(true);
        
        // Clear existing timers
        if (hideTimer) clearTimeout(hideTimer);
        if (scrollTimer) clearTimeout(scrollTimer);
        
        // Set a timer to start the hide countdown after scroll stops
        scrollTimer = setTimeout(() => {
          if (!isMenuOpen) {
            startHideTimer();
          }
        }, 150);
      } else {
        // At top of page; keep nav visible if menu is open
        if (!isMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        if (hideTimer) clearTimeout(hideTimer);
        if (scrollTimer) clearTimeout(scrollTimer);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer) clearTimeout(hideTimer);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [isMenuOpen]);

  // Handle menu state changes
  useEffect(() => {
    if (!isMenuOpen && isVisible && window.scrollY > 100) {
      // Menu was closed, start hide timer if we're scrolled down and visible
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen, isVisible]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    console.log('Mobile menu toggle clicked', { isMenuOpen, isVisible });
    setIsMenuOpen((prev) => {
      const next = !prev;
      console.log('Setting menu open to:', next);
      return next;
    });
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-300 ${
        shouldShowNav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Main navigation"
    >
      {/* Desktop Navigation */}
      <div className="glass-nav hidden md:block">
        <div className="flex items-center space-x-6 px-6 py-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`nav-link ${
                activeSection === item.id ? 'nav-link--active' : ''
              }`}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="glass-nav md:hidden overflow-visible">
        <button
          onClick={toggleMenu}
          className="nav-link flex items-center justify-center px-4 py-2 w-full touch-manipulation"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[calc(100vw-3rem)] max-w-xs">
            <div className="glass-nav overflow-hidden">
              <div className="py-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`nav-link nav-link--mobile ${
                      activeSection === item.id ? 'nav-link--active' : ''
                    }`}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
