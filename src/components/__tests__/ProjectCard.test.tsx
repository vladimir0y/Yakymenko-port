import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../ProjectCard';
import { Project } from '@/types';

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    set: vi.fn(),
    to: vi.fn(),
    timeline: () => ({
      to: vi.fn().mockReturnThis(),
    }),
  },
}));

// Mock project data that matches current component
const mockProject: Project = {
  id: '1',
  name: 'Test Project',
  projectData: {
    title: 'Test Project',
    description: 'A test project description',
    tags: ['React', 'TypeScript'],
    date: '2023-01-01',
  },
  liveUrl: '/Projects/test-project/index.html',
};

describe('ProjectCard', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('does not display featured badge for non-featured projects', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    // Current component doesn't have featured badges
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProjectCard
        project={mockProject}
        onClick={mockOnClick}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('calls onClick when card is clicked', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    const card = screen.getByText('Test Project').closest('div');
    fireEvent.click(card!);

    expect(mockOnClick).toHaveBeenCalledWith(mockProject);
  });
});
