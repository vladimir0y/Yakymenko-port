import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Types
interface ProjectData {
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;
  [key: string]: any;
}

interface FolderItem {
  id: string;
  name: string;
  coverImageId?: string;
  projectData?: ProjectData;
}

interface DriveApiResponse {
  folders: FolderItem[];
  total: number;
  lastModified: string;
}

interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

// Helper function to create JWT auth client
function createAuthClient(): JWT {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing required Google service account credentials');
  }

  return new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
}

// Helper function to get file content as JSON
async function getFileContent(drive: any, fileId: string): Promise<any> {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });

    return JSON.parse(response.data);
  } catch {
    // File doesn't exist or can't be parsed as JSON
    return null;
  }
}

// Helper function to find specific files in a folder
async function findFilesInFolder(
  drive: any,
  folderId: string,
  fileName: string
): Promise<string | null> {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and name = '${fileName}' and trashed = false`,
      fields: 'files(id, name)',
    });

    return response.data.files?.[0]?.id || null;
  } catch (error) {
    console.error(`Error finding ${fileName} in folder ${folderId}:`, error);
    return null;
  }
}

// Main handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DriveApiResponse | ErrorResponse>
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
    // Validate environment variables
    const folderId = process.env.DRIVE_FOLDER_ID;
    if (!folderId) {
      throw new Error('DRIVE_FOLDER_ID environment variable is required');
    }

    // Create authenticated Google Drive client
    const auth = createAuthClient();
    const drive = google.drive({ version: 'v3', auth });

    // Fetch child folders from the main folder
    const foldersResponse = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, modifiedTime)',
      orderBy: 'name',
    });

    const folders = foldersResponse.data.files || [];
    const folderItems: FolderItem[] = [];

    // Process each folder to find cover.jpg and project.json
    for (const folder of folders) {
      if (!folder.id || !folder.name) continue;

      const folderItem: FolderItem = {
        id: folder.id,
        name: folder.name,
      };

      // Look for cover.jpg
      const coverImageId = await findFilesInFolder(
        drive,
        folder.id,
        'cover.jpg'
      );
      if (coverImageId) {
        folderItem.coverImageId = coverImageId;
      }

      // Look for project.json and parse it
      const projectJsonId = await findFilesInFolder(
        drive,
        folder.id,
        'project.json'
      );
      if (projectJsonId) {
        const projectData = await getFileContent(drive, projectJsonId);
        if (projectData) {
          folderItem.projectData = projectData;
        }
      }

      folderItems.push(folderItem);
    }

    // Calculate the most recent modification time for caching
    const lastModified = folders.reduce((latest, folder) => {
      const folderTime = new Date(folder.modifiedTime || 0);
      return folderTime > latest ? folderTime : latest;
    }, new Date(0));

    // Prepare response
    const response: DriveApiResponse = {
      folders: folderItems,
      total: folderItems.length,
      lastModified: lastModified.toISOString(),
    };

    // Set SWR-compatible cache headers
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.setHeader('Last-Modified', lastModified.toUTCString());

    // Return successful response
    return res.status(200).json(response);
  } catch (error) {
    console.error('Google Drive API error:', error);

    // Determine error type and appropriate status code
    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error instanceof Error) {
      if (
        error.message.includes('credentials') ||
        error.message.includes('GOOGLE_')
      ) {
        statusCode = 500; // Server configuration error
        errorMessage = 'Server configuration error';
      } else if (error.message.includes('DRIVE_FOLDER_ID')) {
        statusCode = 500; // Server configuration error
        errorMessage = 'Server configuration error';
      } else if (
        error.message.includes('permission') ||
        error.message.includes('access')
      ) {
        statusCode = 403;
        errorMessage = 'Access denied to Google Drive folder';
      } else if (error.message.includes('not found')) {
        statusCode = 404;
        errorMessage = 'Google Drive folder not found';
      }
    }

    // Return error response
    return res.status(statusCode).json({
      error: statusCode === 500 ? 'Internal Server Error' : 'Client Error',
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
