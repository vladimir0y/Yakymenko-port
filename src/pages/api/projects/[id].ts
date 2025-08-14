import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface ProjectFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'code' | 'other';
  path: string;
  size: number;
  lastModified: string;
}

interface ProjectFilesResponse {
  projectId: string;
  files: ProjectFile[];
  total: number;
}

interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

// Helper function to determine file type based on extension
function getFileType(fileName: string): ProjectFile['type'] {
  const ext = path.extname(fileName).toLowerCase();

  if (
    ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'].includes(ext)
  ) {
    return 'image';
  }
  if (['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv'].includes(ext)) {
    return 'video';
  }
  if (['.pdf', '.doc', '.docx', '.txt', '.md', '.rtf'].includes(ext)) {
    return 'document';
  }
  if (
    [
      '.html',
      '.css',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.py',
      '.java',
      '.cpp',
      '.c',
      '.php',
      '.json',
      '.xml',
    ].includes(ext)
  ) {
    return 'code';
  }
  return 'other';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectFilesResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only GET requests are allowed',
      timestamp: new Date().toISOString(),
    });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Project ID is required',
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const projectPath = path.join(process.cwd(), 'Projects', id);

    // Check if project directory exists
    if (!fs.existsSync(projectPath)) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Project '${id}' not found`,
        timestamp: new Date().toISOString(),
      });
    }

    // Read all files in the project directory
    const files: ProjectFile[] = [];

    const scanDirectory = (dirPath: string, relativePath: string = '') => {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        const relativeItemPath = path.join(relativePath, item.name);

        if (item.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(fullPath, relativeItemPath);
        } else {
          // Add file to list
          try {
            const stats = fs.statSync(fullPath);
            const relativeToCwd = path
              .relative(process.cwd(), fullPath)
              .replace(/\\/g, '/');

            files.push({
              id: relativeItemPath.replace(/\\/g, '/'),
              name: item.name,
              type: getFileType(item.name),
              path: `/${relativeToCwd}`,
              size: stats.size,
              lastModified: stats.mtime.toISOString(),
            });
          } catch (error) {
            console.warn(`Failed to get stats for file ${fullPath}:`, error);
          }
        }
      }
    };

    scanDirectory(projectPath);

    // Sort files by type and name
    files.sort((a, b) => {
      if (a.type !== b.type) {
        const typeOrder = ['image', 'video', 'document', 'code', 'other'];
        return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
      }
      return a.name.localeCompare(b.name);
    });

    const response: ProjectFilesResponse = {
      projectId: id,
      files,
      total: files.length,
    };

    // Set cache headers
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json(response);
  } catch (error) {
    console.error(`Project files API error for ${id}:`, error);

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to load project files',
      timestamp: new Date().toISOString(),
    });
  }
}
