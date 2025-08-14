import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    timeline: () => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    }),
    to: vi.fn(),
  },
}));

// Mock window.matchMedia for reduced motion detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Hero', () => {
  it('renders hero content correctly', () => {
    render(<Hero />);

    // Check for main heading
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Volodymyr Yakymenko/i);

    // Check for CTA buttons
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });

  it('displays the primary CTA button', () => {
    render(<Hero />);

    const ctaButton = screen.getByRole('button', { name: /View My Work/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('displays the secondary CTA button', () => {
    render(<Hero />);

    const contactButton = screen.getByRole('button', { name: /Get In Touch/i });
    expect(contactButton).toBeInTheDocument();
  });

  it('renders without crashing when no props provided', () => {
    expect(() => render(<Hero />)).not.toThrow();
  });
});
