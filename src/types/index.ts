// Global type definitions for the application
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Project-related types
export interface ProjectData {
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;
  [key: string]: any;
}

export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  date: string;
  github?: string;
  live?: string;
  technologies: string[];
  coverImageId?: string;
  projectData?: ProjectData;
}

export interface ProjectsResponse {
  folders: Project[];
  total: number;
  lastModified: string;
}

export interface ProjectsError {
  error: string;
  message: string;
  timestamp: string;
}

// Project file types
export interface ProjectFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

export interface ProjectFilesResponse {
  files: ProjectFile[];
  total: number;
  projectId: string;
}

// Media player types
export type MediaType =
  | 'html'
  | 'video'
  | 'youtube'
  | 'vimeo'
  | 'image'
  | 'unknown';

export interface MediaItem {
  file: ProjectFile;
  type: MediaType;
  embedUrl?: string;
}

// Add more type definitions as needed
