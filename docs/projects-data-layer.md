# Projects Data Layer & Hooks

This documentation covers the implementation of the projects data layer using SWR hooks with static fallback data for optimal first paint performance.

## Overview

The implementation includes:

1. **TypeScript interfaces** for type safety
2. **SWR-based hooks** for data fetching with caching
3. **Static fallback data** for immediate first paint
4. **Utility functions** for loading static data with `getStaticProps`

## Files Structure

```
src/
├── types/index.ts           # Project TypeScript interfaces
├── lib/
│   ├── useProjects.ts       # SWR hooks for projects
│   └── projects.ts          # Utility functions for static data
└── components/
    └── ProjectsList.tsx     # Example component

public/
└── projects.static.json     # Static fallback data
```

## Usage Examples

### 1. Basic Usage with SWR Hook

```tsx
import { useProjects } from '@/lib/useProjects';

function ProjectsPage() {
  const { projects, total, isLoading, isError, error } = useProjects();

  if (isError) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Projects ({total})</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.projectData?.title || project.name}</h2>
          <p>{project.projectData?.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. With Static Fallback Data (SSG)

```tsx
// pages/projects.tsx or app/projects/page.tsx
import { GetStaticProps } from 'next';
import { useProjects } from '@/lib/useProjects';
import { getProjectsStaticProps } from '@/lib/projects';
import { ProjectsResponse } from '@/types';

interface ProjectsPageProps {
  fallbackData: ProjectsResponse;
}

export default function ProjectsPage({ fallbackData }: ProjectsPageProps) {
  const { projects, isLoading } = useProjects(fallbackData);

  return (
    <div>
      {isLoading && <div>Updating...</div>}
      {/* Projects render immediately with fallback data */}
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

// For pages router
export const getStaticProps: GetStaticProps = async () => {
  return await getProjectsStaticProps();
};
```

### 3. Get Single Project

```tsx
import { useProject } from '@/lib/useProjects';

function ProjectDetail({ projectId }: { projectId: string }) {
  const { project, isLoading } = useProject(projectId);

  if (isLoading) return <div>Loading project...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1>{project.projectData?.title}</h1>
      <p>{project.projectData?.description}</p>
    </div>
  );
}
```

### 4. Filter Projects by Tag

```tsx
import { useProjectsByTag } from '@/lib/useProjects';

function ReactProjects() {
  const { projects, total } = useProjectsByTag('React');

  return (
    <div>
      <h1>React Projects ({total})</h1>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

## TypeScript Interfaces

### Project Interface

```typescript
interface Project {
  id: string;
  name: string;
  coverImageId?: string;
  projectData?: ProjectData;
}

interface ProjectData {
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;
  [key: string]: any;
}
```

### Response Interfaces

```typescript
interface ProjectsResponse {
  folders: Project[];
  total: number;
  lastModified: string;
}

interface ProjectsError {
  error: string;
  message: string;
  timestamp: string;
}
```

## SWR Configuration

The `useProjects` hook is configured with:

- **5-minute revalidation interval** for fresh data
- **1-minute deduplication** to prevent duplicate requests
- **Auto-retry** on errors (3 attempts, 5-second intervals)
- **Stale-while-revalidate** pattern for optimal UX
- **Fallback data support** for immediate rendering

## Static Fallback Data

The `public/projects.static.json` file contains sample project data that:

- Renders immediately on first paint
- Gets replaced with real data once API loads
- Provides seamless user experience
- Supports SSG/ISR patterns

## Performance Benefits

1. **Immediate First Paint**: Static data renders instantly
2. **Background Updates**: Real data loads without blocking UI
3. **Automatic Caching**: SWR handles intelligent caching
4. **Optimistic Updates**: UI updates optimistically
5. **Error Boundaries**: Graceful error handling built-in

## API Endpoint

The hooks call `/api/drive` which:

- Fetches projects from Google Drive
- Returns structured project data
- Includes caching headers for optimal performance
- Handles errors gracefully

## Best Practices

1. Always provide fallback data for better UX
2. Use the specific hooks (`useProject`, `useProjectsByTag`) for filtered data
3. Handle loading and error states appropriately
4. Update static fallback data periodically
5. Consider using ISR for dynamic static generation
