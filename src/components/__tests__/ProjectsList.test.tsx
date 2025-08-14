import { render, screen } from '@testing-library/react';
import ProjectsList from '../ProjectsList';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/scroll-animations', () => ({
  ScrollAnimations: {
    setup: (enabledCb: () => void, disabledCb: () => void) => {
      // Invoke fallback so elements are visible without animations
      disabledCb();
    },
    slideIn: vi.fn(),
    fadeIn: vi.fn(),
    killAll: vi.fn(),
  },
}));

vi.mock('@/lib/useProjects', () => ({
  useProjects: () => ({
    projects: [
      {
        id: '1',
        name: 'Mock Project',
        description: 'Desc',
        technologies: [],
        links: { github: '', demo: '' },
        status: 'completed',
        featured: false,
        thumbnail: '',
      },
    ],
    total: 1,
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

describe('ProjectsList', () => {
  it('renders header with total and grid of projects', () => {
    render(<ProjectsList />);

    // Header
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText('(1)')).toBeInTheDocument();

    // Grid renders list role via ProjectsGrid
    const list = screen.getByRole('list', { name: /projects list/i });
    expect(list).toBeInTheDocument();
  });

  it('renders error state when isError', async () => {
    vi.doMock('@/lib/useProjects', () => ({
      useProjects: () => ({
        projects: [],
        total: 0,
        isLoading: false,
        isError: true,
        error: { message: 'Boom' },
      }),
    }));

    const { default: ProjectsListLocal } = await import('../ProjectsList');
    render(<ProjectsListLocal />);

    expect(screen.getByText(/Error Loading Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Boom/i)).toBeInTheDocument();
  });
});
