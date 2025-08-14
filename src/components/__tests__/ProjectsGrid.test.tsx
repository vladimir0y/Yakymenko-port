import { render, screen } from '@testing-library/react';
import ProjectsGrid from '../ProjectsGrid';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Project } from '@/types';

vi.mock('@/lib/scroll-animations', () => ({
  ScrollAnimations: {
    setup: (enabledCb: () => void, disabledCb: () => void) => {
      // Immediately invoke reduced-motion fallback to avoid relying on GSAP
      disabledCb();
    },
    batch: vi.fn(),
    slideIn: vi.fn(),
    fadeIn: vi.fn(),
    killAll: vi.fn(),
  },
}));

const projects: Project[] = [
  {
    id: '1',
    name: 'Alpha',
    description: 'Alpha project',
    technologies: ['React'],
    links: { github: '', demo: '' },
    status: 'completed',
    featured: false,
    thumbnail: '',
  },
  {
    id: '2',
    name: 'Beta',
    description: 'Beta project',
    technologies: ['Next.js'],
    links: { github: '', demo: '' },
    status: 'in-progress',
    featured: true,
    thumbnail: '',
  },
];

describe('ProjectsGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a list of projects', () => {
    render(<ProjectsGrid projects={projects} />);

    // Role list and listitems are present
    const list = screen.getByRole('list', { name: /projects list/i });
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(projects.length);
  });

  it('wires click to open modal via ProjectCard interaction (smoke)', () => {
    render(<ProjectsGrid projects={projects} />);

    // The ProjectCard renders a button role; ensure at least one is present
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
