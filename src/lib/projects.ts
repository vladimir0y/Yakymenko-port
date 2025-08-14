import { ProjectsResponse, Project } from '@/types';

// Static fallback data for when API is unavailable
const staticProjectsData: Project[] = [
  {
    id: 'cybersecurity-tech',
    name: 'Cybersecurity - Tech',
    title: 'Cybersecurity - Tech',
    description: '',
    image: '/Projects/Cybersecurity - Tech/cover.png',
    tags: [],
    date: '2024-01-01T00:00:00.000Z',
    technologies: [],
    projectData: {
      title: 'Cybersecurity - Tech',
      description: '',
      tags: [],
      date: '2024-01-01',
      technologies: [],
    },
  },
  {
    id: 'rock-climbing',
    name: 'Rock Climbing',
    title: 'Rock Climbing',
    description: '',
    image: '/Projects/Rock Climbing/cover.png',
    tags: [],
    date: '2024-01-01T00:00:00.000Z',
    technologies: [],
    projectData: {
      title: 'Rock Climbing',
      description: '',
      tags: [],
      date: '2024-01-01',
      technologies: [],
    },
  },
  {
    id: 'software-simulator-powerpoint',
    name: 'Software Simulator PowerPoint',
    title: 'Software Simulator PowerPoint',
    description: '',
    image: '/Projects/Software Simulator PowerPoint/cover.png',
    tags: [],
    date: '2024-01-01T00:00:00.000Z',
    technologies: [],
    projectData: {
      title: 'Software Simulator PowerPoint',
      description: '',
      tags: [],
      date: '2024-01-01',
      technologies: [],
    },
  },
  {
    id: 'time-management-smart-goals',
    name: 'Time Management - SMART Goals',
    title: 'Time Management - SMART Goals',
    description: '',
    image: '/Projects/Time Management - SMART Goals/cover.png',
    tags: [],
    date: '2024-01-01T00:00:00.000Z',
    technologies: [],
    projectData: {
      title: 'Time Management - SMART Goals',
      description: '',
      tags: [],
      date: '2024-01-01',
      technologies: [],
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
