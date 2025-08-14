import { ProjectsResponse, Project } from '@/types';

// Static fallback data for when API is unavailable
const staticProjectsData: Project[] = [
  {
    id: 'gbl',
    name: 'GBL',
    title: 'Game Based Learning',
    description:
      'An interactive game-based learning platform designed to enhance educational experiences.',
    image: '/api/placeholder/400/300',
    tags: ['Education', 'Gaming', 'Interactive'],
    date: '2024-01-15T00:00:00.000Z',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    projectData: {
      title: 'Game Based Learning',
      description:
        'An interactive game-based learning platform designed to enhance educational experiences.',
      tags: ['Education', 'Gaming', 'Interactive'],
      date: '2024-01-15',
      technologies: ['JavaScript', 'HTML', 'CSS'],
    },
  },
  {
    id: 'rock-climbing',
    name: 'Rock Climbing Adventure',
    title: 'Rock Climbing Adventure',
    description:
      'A comprehensive rock climbing guide and adventure platform for climbing enthusiasts.',
    image: '/api/placeholder/400/300',
    tags: ['Sports', 'Adventure', 'Community'],
    date: '2023-11-20T00:00:00.000Z',
    technologies: ['React', 'Node.js', 'MongoDB'],
    projectData: {
      title: 'Rock Climbing Adventure',
      description:
        'A comprehensive rock climbing guide and adventure platform for climbing enthusiasts.',
      tags: ['Sports', 'Adventure', 'Community'],
      date: '2023-11-20',
      technologies: ['React', 'Node.js', 'MongoDB'],
    },
  },
  {
    id: 'time-management',
    name: 'Time Management System',
    title: 'Time Management System',
    description:
      'A sophisticated time management and productivity tracking application.',
    image: '/api/placeholder/400/300',
    tags: ['Productivity', 'Time Tracking', 'Analytics'],
    date: '2023-09-10T00:00:00.000Z',
    technologies: ['TypeScript', 'React', 'Next.js'],
    projectData: {
      title: 'Time Management System',
      description:
        'A sophisticated time management and productivity tracking application.',
      tags: ['Productivity', 'Time Tracking', 'Analytics'],
      date: '2023-09-10',
      technologies: ['TypeScript', 'React', 'Next.js'],
    },
  },
  {
    id: 'time-management-main',
    name: 'Time Management Dashboard',
    title: 'Time Management Main Dashboard',
    description:
      'The main dashboard and administration panel for the Time Management System.',
    image: '/api/placeholder/400/300',
    tags: ['Dashboard', 'Analytics', 'Admin Panel'],
    date: '2023-10-05T00:00:00.000Z',
    technologies: ['React', 'D3.js', 'Chart.js'],
    projectData: {
      title: 'Time Management Main Dashboard',
      description:
        'The main dashboard and administration panel for the Time Management System.',
      tags: ['Dashboard', 'Analytics', 'Admin Panel'],
      date: '2023-10-05',
      technologies: ['React', 'D3.js', 'Chart.js'],
    },
  },
];

/**
 * Get static projects data (client-side compatible)
 */
export function getStaticProjects(): Project[] {
  return staticProjectsData;
}

/**
 * Load static fallback data for projects (server-side)
 */
export async function getStaticProjectsData(): Promise<ProjectsResponse> {
  return {
    folders: staticProjectsData,
    total: staticProjectsData.length,
    lastModified: new Date().toISOString(),
  };
}

/**
 * Get static props for pages that need projects data
 * Use this in getStaticProps to provide fallback data
 */
export async function getProjectsStaticProps() {
  const fallbackData = await getStaticProjectsData();

  return {
    props: {
      fallbackData,
    },
    // Revalidate at most once every hour (3600 seconds)
    revalidate: 3600,
  };
}

/**
 * Client-side utility to load static fallback data
 * Useful for client-side applications or when getStaticProps isn't available
 */
export async function loadStaticProjectsData(): Promise<ProjectsResponse> {
  try {
    const response = await fetch('/projects.static.json');
    if (!response.ok) {
      throw new Error('Failed to fetch static data');
    }
    return await response.json();
  } catch (error) {
    console.warn('Failed to load static projects data:', error);

    // Return empty fallback if fetch fails
    return {
      folders: [],
      total: 0,
      lastModified: new Date().toISOString(),
    };
  }
}
