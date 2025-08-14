import useSWR from 'swr';
import { ProjectsResponse, ProjectsError, Project } from '@/types';
import { getStaticProjects } from './projects';

// Fetcher function for SWR with fallback handling
const fetcher = async (url: string): Promise<ProjectsResponse> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Try to get error details
      let errorMessage = 'Failed to fetch projects';
      try {
        const errorData: ProjectsError = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If we can't parse error response, use status text
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      // Log warning and fall back to static data
      console.warn(
        `Projects API failed: ${errorMessage}, using static fallback`
      );

      // Return static data as fallback
      const staticProjects = getStaticProjects();
      return {
        folders: staticProjects,
        total: staticProjects.length,
        lastModified: new Date().toISOString(),
      };
    }

    return response.json();
  } catch (error) {
    // Log the error for debugging and fall back to static data
    console.warn('Projects API unavailable, using static fallback:', error);
    const staticProjects = getStaticProjects();
    return {
      folders: staticProjects,
      total: staticProjects.length,
      lastModified: new Date().toISOString(),
    };
  }
};

// Custom hook for fetching projects
export function useProjects(fallbackData?: ProjectsResponse) {
  const { data, error, isLoading, mutate } = useSWR<ProjectsResponse, Error>(
    '/api/projects',
    fetcher,
    {
      fallbackData,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 5 * 60 * 1000, // Revalidate every 5 minutes
      dedupingInterval: 60 * 1000, // Dedupe requests within 1 minute
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    projects: data?.folders || [],
    total: data?.total || 0,
    lastModified: data?.lastModified,
    isLoading,
    isError: !!error,
    error,
    mutate, // For manual revalidation
  };
}

// Helper function to get a project by ID
export function useProject(projectId: string, fallbackData?: ProjectsResponse) {
  const { projects, ...rest } = useProjects(fallbackData);
  const project = projects.find((p: Project) => p.id === projectId);

  return {
    project,
    ...rest,
  };
}

// Helper function to get projects by tag
export function useProjectsByTag(tag: string, fallbackData?: ProjectsResponse) {
  const { projects, total, ...rest } = useProjects(fallbackData);
  const filteredProjects = projects.filter((project: Project) =>
    project.projectData?.tags?.includes(tag)
  );

  return {
    projects: filteredProjects,
    total: filteredProjects.length,
    originalTotal: total,
    ...rest,
  };
}
