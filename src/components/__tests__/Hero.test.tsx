import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

// Mock the scroll animations
vi.mock('@/lib/scroll-animations', () => ({
  ScrollAnimations: {
    setup: vi.fn(),
    slideIn: vi.fn(),
    fadeIn: vi.fn(),
    killAll: vi.fn(),
    prefersReducedMotion: vi.fn(() => false),
  },
}));

describe('Hero', () => {
  it('renders hero content correctly', () => {
    render(<Hero />);

    // Check for main heading
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();

    // Check for description
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();

    // Check for CTA buttons
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });

  it('has proper heading structure', () => {
    render(<Hero />);

    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Hi, I'm/i);
  });

  it('displays the primary CTA button', () => {
    render(<Hero />);

    const ctaButton = screen.getByRole('button', { name: /View My Work/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass('btn-primary');
  });

  it('displays the secondary CTA button', () => {
    render(<Hero />);

    const contactButton = screen.getByRole('button', { name: /Get In Touch/i });
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveClass('btn-secondary');
  });

  it('has proper semantic structure', () => {
    render(<Hero />);

    const heroSection = screen.getByRole('banner');
    expect(heroSection).toBeInTheDocument();
  });

  it('contains accessible content', () => {
    render(<Hero />);

    // Check for proper heading hierarchy
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();

    // Check that buttons are properly labeled
    const ctaButton = screen.getByRole('button', { name: /View My Work/i });
    const contactButton = screen.getByRole('button', { name: /Get In Touch/i });

    expect(ctaButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Hero className="custom-hero-class" />);

    expect(container.firstChild).toHaveClass('custom-hero-class');
  });

  it('renders without crashing when no props provided', () => {
    expect(() => render(<Hero />)).not.toThrow();
  });

  it('has appropriate ARIA landmarks', () => {
    render(<Hero />);

    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
  });
});
