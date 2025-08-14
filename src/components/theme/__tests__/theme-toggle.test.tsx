import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../theme-toggle';

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    timeline: () => ({
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    }),
    to: vi.fn(),
  },
}));

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    resolvedTheme: 'light',
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('renders without crashing', () => {
    expect(() => render(<ThemeToggle />)).not.toThrow();
  });

  it('handles theme changes smoothly', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    // Multiple rapid clicks should work
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledTimes(3);
  });
});
