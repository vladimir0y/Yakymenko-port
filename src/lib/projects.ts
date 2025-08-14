import { ProjectsResponse, Project } from '@/types';

// Static fallback data for when API is unavailable
const staticProjectsData: Project[] = [
  {
    id: 'gbl',
    name: 'GBL',
    title: 'GBL - Game Based Learning',
    description:
      'An interactive game-based learning platform designed to enhance educational experiences through gamification principles and engaging user interfaces.',
    image: '/api/placeholder/400/300',
    tags: ['Education', 'Gaming', 'Interactive', 'UI/UX'],
    date: '2024-01-15T00:00:00.000Z',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Game Development'],
    github: 'https://github.com/vladimir0y/Website-Portfolio',
    live: 'https://vladimir0y.github.io/Website-Portfolio/projects/gbl/story.html',
    projectData: {
      title: 'GBL - Game Based Learning',
      description:
        'An interactive game-based learning platform designed to enhance educational experiences through gamification principles and engaging user interfaces.',
      tags: ['Education', 'Gaming', 'Interactive', 'UI/UX'],
      date: '2024-01-15',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Game Development'],
      github: 'https://github.com/vladimir0y/Website-Portfolio',
      live: 'https://vladimir0y.github.io/Website-Portfolio/projects/gbl/story.html',
    },
  },
  {
    id: 'rock-climbing',
    name: 'Rock Climbing Adventure',
    title: 'Rock Climbing Adventure',
    description:
      'A comprehensive rock climbing guide and adventure platform featuring route information, difficulty ratings, and community-driven content for climbing enthusiasts.',
    image: '/api/placeholder/400/300',
    tags: ['Sports', 'Adventure', 'Community', 'Web App'],
    date: '2023-11-20T00:00:00.000Z',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/vladimir0y/Website-Portfolio',
    live: 'https://vladimir0y.github.io/Website-Portfolio/projects/rock-climbing/content/index.html',
    projectData: {
      title: 'Rock Climbing Adventure',
      description:
        'A comprehensive rock climbing guide and adventure platform featuring route information, difficulty ratings, and community-driven content for climbing enthusiasts.',
      tags: ['Sports', 'Adventure', 'Community', 'Web App'],
      date: '2023-11-20',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/vladimir0y/Website-Portfolio',
      live: 'https://vladimir0y.github.io/Website-Portfolio/projects/rock-climbing/content/index.html',
    },
  },
  {
    id: 'time-management',
    name: 'Time Management System',
    title: 'Time Management System',
    description:
      'A sophisticated time management and productivity tracking application with task scheduling, time tracking, and analytics to help users optimize their daily workflows.',
    image: '/api/placeholder/400/300',
    tags: ['Productivity', 'Time Tracking', 'Analytics', 'Task Management'],
    date: '2023-09-10T00:00:00.000Z',
    technologies: ['TypeScript', 'React', 'Next.js', 'PostgreSQL'],
    github: 'https://github.com/vladimir0y/Website-Portfolio',
    live: 'https://vladimir0y.github.io/Website-Portfolio/projects/time-management/story.html',
    projectData: {
      title: 'Time Management System',
      description:
        'A sophisticated time management and productivity tracking application with task scheduling, time tracking, and analytics to help users optimize their daily workflows.',
      tags: ['Productivity', 'Time Tracking', 'Analytics', 'Task Management'],
      date: '2023-09-10',
      technologies: ['TypeScript', 'React', 'Next.js', 'PostgreSQL'],
      github: 'https://github.com/vladimir0y/Website-Portfolio',
      live: 'https://vladimir0y.github.io/Website-Portfolio/projects/time-management/story.html',
    },
  },
  {
    id: 'time-management-main',
    name: 'Time Management Dashboard',
    title: 'Time Management Main Dashboard',
    description:
      'The main dashboard and administration panel for the Time Management System, featuring comprehensive analytics, user management, and system configuration tools.',
    image: '/api/placeholder/400/300',
    tags: ['Dashboard', 'Analytics', 'Admin Panel', 'Data Visualization'],
    date: '2023-10-05T00:00:00.000Z',
    technologies: ['React', 'D3.js', 'Chart.js', 'Node.js', 'Express'],
    github: 'https://github.com/vladimir0y/Website-Portfolio',
    live: 'https://vladimir0y.github.io/Website-Portfolio/projects/time-management-main/story.html',
    projectData: {
      title: 'Time Management Main Dashboard',
      description:
        'The main dashboard and administration panel for the Time Management System, featuring comprehensive analytics, user management, and system configuration tools.',
      tags: ['Dashboard', 'Analytics', 'Admin Panel', 'Data Visualization'],
      date: '2023-10-05',
      technologies: ['React', 'D3.js', 'Chart.js', 'Node.js', 'Express'],
      github: 'https://github.com/vladimir0y/Website-Portfolio',
      live: 'https://vladimir0y.github.io/Website-Portfolio/projects/time-management-main/story.html',
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
