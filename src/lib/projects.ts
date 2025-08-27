import { ProjectsResponse, Project } from '@/types';

// Static fallback data for when API is unavailable
const staticProjectsData: Project[] = [
  {
    id: 'rock-climbing-project',
    name: 'Rock Climbing',
    title: 'Rock Climbing Interactive Experience',
    description: 'An immersive interactive presentation about rock climbing techniques, safety procedures, and adventure experiences with multimedia content.',
    image: '/Projects/Rock Climbing/cover.png',
    tags: ['Articulate Rise'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Rock Climbing Interactive Experience',
      description: 'An immersive interactive presentation about rock climbing techniques, safety procedures, and adventure experiences with multimedia content.',
      tags: ['Articulate Rise'],
      technologies: [],
      live: 'https://vladimir0y.github.io/Yakymenko-port/Projects/Rock%20Climbing/index.html',
      github: 'https://github.com/vladimir0y/Rock_Climbing',
    },
  },
  {
    id: 'cybersecurity-tech-project',
    name: 'Cybersecurity - Tech',
    title: 'Cybersecurity - Tech',
    description: 'This cybersecurity course introduces essential concepts and practical skills to protect digital systems and data. Participants learn about common threats, safe online practices, and basic strategies for securing networks and personal information.',
    image: '/Projects/Cybersecurity - Tech/cover.png',
    tags: ['Articulate Storyline'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Cybersecurity - Tech',
      description: 'This cybersecurity course introduces essential concepts and practical skills to protect digital systems and data. Participants learn about common threats, safe online practices, and basic strategies for securing networks and personal information.',
      tags: ['Articulate Storyline'],
      technologies: [],
      live: 'https://vladimir0y.github.io/Yakymenko-port/Projects/Cybersecurity%20-%20Tech/story.html',
    },
  },
  {
    id: 'software-simulator-project',
    name: 'Software Simulator PowerPoint',
    title: 'Software Simulator PowerPoint',
    description: 'This presentation demonstrates a software simulator, showcasing its features, functionality, and practical applications. It guides users through interactive scenarios to help them understand and practice using the software effectively.',
    image: '/Projects/Software Simulator PowerPoint/cover.png',
    tags: ['Articulate Storyline'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Software Simulator PowerPoint',
      description: 'This presentation demonstrates a software simulator, showcasing its features, functionality, and practical applications. It guides users through interactive scenarios to help them understand and practice using the software effectively.',
      tags: ['Articulate Storyline'],
      technologies: [],
      live: 'https://vladimir0y.github.io/Yakymenko-port/Projects/Software%20Simulator%20PowerPoint/story.html',
    },
  },
  {
    id: 'time-management-smart-goals-project',
    name: 'Time Management - SMART Goals',
    title: 'Time Management - SMART Goals',
    description: 'This course teaches effective time management using the SMART goals framework, helping participants set Specific, Measurable, Achievable, Relevant, and Time-bound objectives to boost productivity and achieve personal and professional targets.',
    image: '/Projects/Time Management - SMART Goals/cover.png',
    tags: ['Articulate Storyline'],
    date: '',
    technologies: [],
    projectData: {
      title: 'Time Management - SMART Goals',
      description: 'This course teaches effective time management using the SMART goals framework, helping participants set Specific, Measurable, Achievable, Relevant, and Time-bound objectives to boost productivity and achieve personal and professional targets.',
      tags: ['Articulate Storyline'],
      technologies: [],
      live: 'https://vladimir0y.github.io/Yakymenko-port/Projects/Time%20Management%20-%20SMART%20Goals/story.html',
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
