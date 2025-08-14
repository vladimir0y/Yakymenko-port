import fs from 'fs';
import path from 'path';
import { ProjectsResponse } from '@/types';

/**
 * Load static fallback data for projects
 * Used with getStaticProps for SSG with fallback data
 */
export async function getStaticProjectsData(): Promise<ProjectsResponse> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'projects.static.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: ProjectsResponse = JSON.parse(fileContents);

    return data;
  } catch (error) {
    console.warn('Failed to load static projects data:', error);

    // Return empty fallback if file can't be loaded
    return {
      folders: [],
      total: 0,
      lastModified: new Date().toISOString(),
    };
  }
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
