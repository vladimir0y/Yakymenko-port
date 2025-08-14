import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../ProjectCard';
import { Project } from '@/types';

// Mock project data
const mockProject: Project = {
  id: '1',
  name: 'Test Project',
  description: 'A test project description',
  technologies: ['React', 'TypeScript', 'Next.js'],
  links: {
    github: 'https://github.com/test/repo',
    demo: 'https://test-demo.com',
  },
  status: 'completed',
  featured: true,
  thumbnail: 'test-image.jpg',
};

describe('ProjectCard', () => {
  const mockOnClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('displays featured badge for featured projects', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('does not display featured badge for non-featured projects', () => {
    const nonFeaturedProject = { ...mockProject, featured: false };
    render(<ProjectCard project={nonFeaturedProject} onClick={mockOnClick} />);

    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockProject);
  });

  it('has proper accessibility attributes', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Test Project')
    );
  });

  it('displays status correctly', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('handles different status values', () => {
    const inProgressProject = {
      ...mockProject,
      status: 'in-progress' as const,
    };
    render(<ProjectCard project={inProgressProject} onClick={mockOnClick} />);

    expect(screen.getByText('In Progress')).toBeInTheDocument();
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

  it('handles keyboard navigation', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    card.focus();

    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledWith(mockProject);

    vi.clearAllMocks();

    fireEvent.keyDown(card, { key: ' ', code: 'Space' });
    expect(mockOnClick).toHaveBeenCalledWith(mockProject);
  });
});
