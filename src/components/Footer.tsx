'use client';

import type React from 'react';
import { contactInfo } from '@/data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-secondary-950/95 text-white">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600" />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-white via-accent-300 to-primary-300 bg-clip-text text-transparent">
              Volodymyr Yakymenko
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Product & Learning Experience Expert specializing in e-learning development, gamification, and AI-assisted content creation.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-accent-300">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#services"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-300 hover:text-accent-300 transition-colors text-sm"
              >
                Services
              </a>
              <a
                href="#skills-expertise"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.querySelector('#skills-expertise')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-300 hover:text-accent-300 transition-colors text-sm"
              >
                Skills & Expertise
              </a>
              <a
                href="#achievements"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.querySelector('#achievements')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-300 hover:text-accent-300 transition-colors text-sm"
              >
                Achievements
              </a>
              <a
                href="#projects"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-300 hover:text-accent-300 transition-colors text-sm"
              >
                Projects
              </a>
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-accent-300">Connect</h4>
            <div className="flex flex-col space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-accent-300 transition-colors text-sm group"
                aria-label="Send me an email"
              >
                <svg className="h-4 w-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M21.5 9V17C21.5 18.1046 20.6046 19 19.5 19H4.5C3.39543 19 2.5 18.1046 2.5 17V9" />
                  <path d="M22 7H2L12 13L22 7Z" />
                </svg>
                Email
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-accent-300 transition-colors text-sm group"
                aria-label="Connect on LinkedIn"
              >
                <svg className="h-4 w-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-secondary-800">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Volodymyr Yakymenko. All rights reserved.
          </div>
          
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-300 hover:text-accent-300 transition-colors text-sm group"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <svg className="h-4 w-4 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
