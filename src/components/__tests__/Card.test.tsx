import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../ui/Card';

describe('Card', () => {
  it('renders with glass and hover by default', () => {
    const { container } = render(
      <Card>
        <div>Card Content</div>
      </Card>
    );

    expect(screen.getByText('Card Content')).toBeInTheDocument();
    // Has rounded base class
    expect(container.firstChild).toHaveClass('rounded-xl');
  });

  it('can disable glass and hover', () => {
    const { container } = render(
      <Card glass={false} hover={false} className="custom" />
    );

    expect(container.firstChild).toHaveClass('custom');
  });
});
