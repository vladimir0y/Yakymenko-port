import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Types
interface ProjectData {
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;
  github?: string;
  live?: string;
  technologies?: string[];
  [key: string]: any;
}

interface ProjectItem {
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
  projectData?: ProjectData;
}

interface ProjectsApiResponse {
  folders: ProjectItem[];
  total: number;
  lastModified: string;
}

interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

// Helper function to find files in a directory
function findFilesInDirectory(
  dirPath: string,
  fileName: string
): string | null {
  try {
    const files = fs.readdirSync(dirPath);
    const foundFile = files.find(
      (file) => file.toLowerCase() === fileName.toLowerCase()
    );
    return foundFile ? path.join(dirPath, foundFile) : null;
  } catch {
    return null;
  }
}

// Helper function to get project metadata
function getProjectMetadata(projectPath: string): ProjectData {
  const metadataPath = findFilesInDirectory(projectPath, 'project.json');
  if (metadataPath && fs.existsSync(metadataPath)) {
    try {
      const content = fs.readFileSync(metadataPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`Failed to parse project.json for ${projectPath}:`, error);
    }
  }
  return {};
}

// Helper function to find cover image
function findCoverImage(projectPath: string): string | undefined {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const imageNames = ['cover', 'thumbnail', 'preview', 'main'];

  for (const name of imageNames) {
    for (const ext of imageExtensions) {
      const imagePath = findFilesInDirectory(projectPath, `${name}.${ext}`);
      if (imagePath && fs.existsSync(imagePath)) {
        // Return relative path from public directory
        const relativePath = path
          .relative(process.cwd(), imagePath)
          .replace(/\\/g, '/');
        return `/${relativePath}`;
      }
    }
  }

  // If no cover image found, look for any image in the directory
  try {
    const files = fs.readdirSync(projectPath);
    const imageFile = files.find((file) => {
      const ext = path.extname(file).toLowerCase().slice(1);
      return imageExtensions.includes(ext);
    });

    if (imageFile) {
      const relativePath = path
        .relative(process.cwd(), path.join(projectPath, imageFile))
        .replace(/\\/g, '/');
      return `/${relativePath}`;
    }
  } catch {
    // Directory read failed
  }

  return undefined;
}

// Main handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectsApiResponse | ErrorResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only GET requests are allowed',
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const projectsPath = path.join(process.cwd(), 'Projects');

    // Check if Projects directory exists
    if (!fs.existsSync(projectsPath)) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Projects directory not found',
        timestamp: new Date().toISOString(),
      });
    }

    // Read project directories
    const directories = fs
      .readdirSync(projectsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const projectItems: ProjectItem[] = [];
    let latestModified = new Date(0);

    // Process each project directory
    for (const dirName of directories) {
      const projectPath = path.join(projectsPath, dirName);

      try {
        // Get directory stats for modification time
        const stats = fs.statSync(projectPath);
        if (stats.mtime > latestModified) {
          latestModified = stats.mtime;
        }

        // Get project metadata
        const metadata = getProjectMetadata(projectPath);

        // Find cover image
        const coverImage = findCoverImage(projectPath);

        // Create project item
        const projectItem: ProjectItem = {
          id: dirName,
          name: dirName,
          title: metadata.title || dirName.replace(/[-_]/g, ' '),
          description: metadata.description || 'No description available',
          image: coverImage,
          tags: metadata.tags || [],
          date: metadata.date || stats.mtime.toISOString(),
          github: metadata.github,
          live: metadata.live,
          technologies: metadata.technologies || metadata.tags || [],
          projectData: metadata,
        };

        projectItems.push(projectItem);
      } catch (error) {
        console.warn(`Failed to process project directory ${dirName}:`, error);
        // Skip this project but continue with others
      }
    }

    // Sort projects by date (newest first)
    projectItems.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Prepare response
    const response: ProjectsApiResponse = {
      folders: projectItems,
      total: projectItems.length,
      lastModified: latestModified.toISOString(),
    };

    // Set cache headers
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.setHeader('Last-Modified', latestModified.toUTCString());

    return res.status(200).json(response);
  } catch (error) {
    console.error('Projects API error:', error);

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to load projects',
      timestamp: new Date().toISOString(),
    });
  }
}
