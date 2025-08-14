import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, path: filePath } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  if (!filePath || !Array.isArray(filePath)) {
    return res.status(400).json({ error: 'File path is required' });
  }

  try {
    // Construct the full path to the file
    const projectPath = path.join(process.cwd(), 'Projects', id);
    const requestedFilePath = path.join(projectPath, ...filePath);

    // Security check: ensure the file is within the project directory
    const normalizedProjectPath = path.resolve(projectPath);
    const normalizedFilePath = path.resolve(requestedFilePath);
    
    if (!normalizedFilePath.startsWith(normalizedProjectPath)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if file exists
    if (!fs.existsSync(normalizedFilePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if it's a file (not a directory)
    const stats = fs.statSync(normalizedFilePath);
    if (!stats.isFile()) {
      return res.status(404).json({ error: 'Not a file' });
    }

    // Get the file content
    const fileBuffer = fs.readFileSync(normalizedFilePath);
    
    // Determine content type
    const contentType = mime.lookup(normalizedFilePath) || 'application/octet-stream';
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    // For HTML files, we might need to modify relative paths
    if (contentType === 'text/html') {
      let htmlContent = fileBuffer.toString('utf-8');
      
      // Replace relative paths to go through our API
      const baseUrl = `/api/projects/${id}/view`;
      
      // Replace common relative path patterns
      htmlContent = htmlContent.replace(
        /(?:src|href)=["'](?!https?:\/\/|\/\/|#)([^"']+)["']/gi,
        (match, relativePath) => {
          // Skip data URLs and absolute URLs
          if (relativePath.startsWith('data:') || relativePath.startsWith('#')) {
            return match;
          }
          
          // Convert relative path to absolute API path
          const newPath = `${baseUrl}/${relativePath}`;
          return match.replace(relativePath, newPath);
        }
      );
      
      return res.send(htmlContent);
    }
    
    // For other file types, return the buffer directly
    return res.send(fileBuffer);
    
  } catch (error) {
    console.error('Error serving project file:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
