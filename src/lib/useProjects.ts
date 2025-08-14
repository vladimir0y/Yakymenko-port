import useSWR from 'swr';
import { ProjectsResponse, ProjectsError, Project } from '@/types';

// Fetcher function for SWR
const fetcher = async (url: string): Promise<ProjectsResponse> => {
  const response = await fetch(url);

  if (!response.ok) {
    const error: ProjectsError = await response.json();
    throw new Error(error.message || 'Failed to fetch projects');
  }

  return response.json();
};

// Custom hook for fetching projects
export function useProjects(fallbackData?: ProjectsResponse) {
  const { data, error, isLoading, mutate } = useSWR<ProjectsResponse, Error>(
    '/api/drive',
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
