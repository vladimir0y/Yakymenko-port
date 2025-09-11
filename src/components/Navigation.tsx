'use client';

import { useState, useEffect } from 'react';
import type React from 'react';

const navItems = [
  { label: 'Home', href: '#main-content', id: 'main-content' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Skills', href: '#skills-expertise', id: 'skills-expertise' },
  { label: 'Achievements', href: '#achievements', id: 'achievements' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Testimonial', href: '#testimonial', id: 'testimonial' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main-content');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-background/80 backdrop-blur-sm border border-border rounded-full px-6 py-3 shadow-lg"
      aria-label="Main navigation"
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.id)}
            className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
              activeSection === item.id
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-muted-foreground'
            }`}
            aria-label={`Navigate to ${item.label} section`}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`px-6 py-2 text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 hover:bg-muted/30 ${
                    activeSection === item.id
                      ? 'text-primary-600 dark:text-primary-400 bg-muted/20'
                      : 'text-muted-foreground'
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
