import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppFooter } from '../AppFooter';

describe('AppFooter', () => {
  it('renders footer landmark with current year', () => {
    render(<AppFooter />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });

  it('has social links with accessible labels', () => {
    render(<AppFooter />);

    const github = screen.getByRole('link', { name: /github/i });
    const linkedin = screen.getByRole('link', { name: /linkedin/i });

    expect(github).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();

    expect(github).toHaveAttribute('href');
    expect(linkedin).toHaveAttribute('href');
  });

  it('renders theme toggle as an accessible switch', () => {
    render(<AppFooter />);

    // ThemeToggle renders a button with role="switch"
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-label');
  });
});
