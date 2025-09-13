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
  const [isDesktopVisible, setIsDesktopVisible] = useState(false);

  // Desktop scroll logic
  useEffect(() => {
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

      // Show/hide desktop nav
      if (window.innerWidth >= 768) {
        setIsDesktopVisible(currentScrollY > 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-300 hidden md:block ${
          isDesktopVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Main navigation"
      >
        <div className="glass-nav">
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
      </nav>

      {/* Mobile Navigation - Always visible */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="glass-nav relative">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center px-4 py-3 w-full nav-link"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 z-10">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                <div className="py-2">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`block px-4 py-3 text-center font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        activeSection === item.id 
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                          : 'text-gray-700 dark:text-gray-300'
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
    </>
  );
}
