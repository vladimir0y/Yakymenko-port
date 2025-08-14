import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../ui/Button';

// Mock prefers-reduced-motion hook to avoid motion props mishaps
vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}));

describe('Button', () => {
  it('renders with variants and sizes, handles loading state', () => {
    const { rerender } = render(
      <Button variant="primary" size="sm">
        Click
      </Button>
    );

    expect(screen.getByText('Click')).toBeInTheDocument();

    rerender(
      <Button variant="secondary" size="lg" loading>
        Submit
      </Button>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('is disabled while loading and click is prevented', () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Processing
      </Button>
    );

    const btn = screen.getByRole('button', { name: /processing/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
