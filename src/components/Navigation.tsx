'use client';

import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#main-content', id: 'main-content' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Skills', href: '#skills-expertise', id: 'skills-expertise' },
  { label: 'Impact', href: '#achievements', id: 'achievements' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <div className="bg-blue-600 p-2 rounded">
        <button
          onClick={() => {
            alert('Button clicked!');
            setIsMenuOpen(!isMenuOpen);
          }}
          className="bg-white text-black px-4 py-2 rounded font-bold"
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
        
        {isMenuOpen && (
          <div className="mt-2 bg-red-500 p-4 rounded">
            <div className="text-white font-bold mb-2">MENU ITEMS:</div>
            {navItems.map((item, i) => (
              <div key={i} className="mb-1">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block bg-yellow-400 text-black px-2 py-1 rounded text-center font-bold"
                >
                  {i + 1}. {item.label}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
