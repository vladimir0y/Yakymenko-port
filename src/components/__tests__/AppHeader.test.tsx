import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppHeader } from '../shell/AppHeader';

// next/navigation is mocked in setup.ts

describe('AppHeader', () => {
  it('renders without crashing and contains nav landmark', () => {
    const { getByRole } = render(<AppHeader />);
    expect(getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
  });
});
