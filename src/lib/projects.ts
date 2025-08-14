import { ProjectsResponse, Project } from '@/types';

// Static fallback data for when API is unavailable
const staticProjectsData: Project[] = [
  {
    id: 'rock-climbing-rise',
    name: 'Rock Climbing Rise',
    title: 'Rock Climbing Rise',
    description: 'Interactive learning module built with Articulate Rise.',
    image: '/Projects/Rock Climbing/cover.png',
    tags: ['Articulate Rise'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Rock Climbing Rise',
      description: 'Interactive learning module built with Articulate Rise.',
      tags: ['Articulate Rise'],
      // no year/date tag
      technologies: [],
    },
  },
  {
    id: 'cybersecurity-tech',
    name: 'Cybersecurity - Tech',
    title: 'Cybersecurity - Tech',
    description: 'Interactive module built with Articulate Storyline.',
    image: '/Projects/Cybersecurity - Tech/cover.png',
    tags: ['Articulate Storyline'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Cybersecurity - Tech',
      description: 'Interactive module built with Articulate Storyline.',
      tags: ['Articulate Storyline'],
      technologies: [],
    },
  },
  {
    id: 'software-simulator-powerpoint',
    name: 'Software Simulator PowerPoint',
    title: 'Software Simulator PowerPoint',
    description: 'Interactive module built with Articulate Storyline.',
    image: '/Projects/Software Simulator PowerPoint/cover.png',
    tags: ['Articulate Storyline'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Software Simulator PowerPoint',
      description: 'Interactive module built with Articulate Storyline.',
      tags: ['Articulate Storyline'],
      technologies: [],
    },
  },
  {
    id: 'time-management-smart-goals',
    name: 'Time Management - SMART Goals',
    title: 'Time Management - SMART Goals',
    description: 'Interactive module built with Articulate Storyline.',
    image: '/Projects/Time Management - SMART Goals/cover.png',
    tags: ['Articulate Storyline'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Time Management - SMART Goals',
      description: 'Interactive module built with Articulate Storyline.',
      tags: ['Articulate Storyline'],
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
