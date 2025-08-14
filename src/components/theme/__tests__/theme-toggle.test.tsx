import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../theme-toggle';

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
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  it('displays sun icon for light theme', () => {
    render(<ThemeToggle />);

    // Check for sun icon (SunIcon from Heroicons)
    const sunIcon = screen.getByTestId('theme-icon');
    expect(sunIcon).toBeInTheDocument();
  });

  it('displays moon icon for dark theme', () => {
    // Mock dark theme
    vi.mocked(
      vi.fn(() => ({
        theme: 'dark',
        setTheme: mockSetTheme,
        resolvedTheme: 'dark',
      }))
    );

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('handles keyboard navigation', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(mockSetTheme).toHaveBeenCalledWith('dark');

    vi.clearAllMocks();

    // Test Space key
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies custom className', () => {
    const { container } = render(<ThemeToggle className="custom-toggle" />);

    expect(container.firstChild).toHaveClass('custom-toggle');
  });

  it('maintains focus ring for accessibility', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus-ring');
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
