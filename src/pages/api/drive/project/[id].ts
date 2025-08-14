import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Types
interface ProjectFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

interface ProjectFilesResponse {
  files: ProjectFile[];
  total: number;
  projectId: string;
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

// Helper functions for future use (currently unused)
// function isVideoFile(mimeType: string, name: string): boolean {
//   const videoMimeTypes = [
//     'video/mp4',
//     'video/webm',
//     'video/ogg',
//     'video/avi',
//     'video/mov',
//     'video/wmv',
//     'video/flv',
//     'video/mkv',
//   ];

//   const videoExtensions = [
//     '.mp4',
//     '.webm',
//     '.ogg',
//     '.avi',
//     '.mov',
//     '.wmv',
//     '.flv',
//     '.mkv',
//   ];

//   return (
//     videoMimeTypes.includes(mimeType) ||
//     videoExtensions.some((ext) => name.toLowerCase().endsWith(ext))
//   );
// }

// function getVideoEmbedType(url: string): 'youtube' | 'vimeo' | null {
//   if (url.includes('youtube.com') || url.includes('youtu.be')) {
//     return 'youtube';
//   }
//   if (url.includes('vimeo.com')) {
//     return 'vimeo';
//   }
//   return null;
// }

// Main handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectFilesResponse | ErrorResponse>
) {
  // Only allow GET requests
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
    // Create authenticated Google Drive client
    const auth = createAuthClient();
    const drive = google.drive({ version: 'v3', auth });

    // Fetch files from the project folder
    const filesResponse = await drive.files.list({
      q: `'${id}' in parents and trashed = false`,
      fields:
        'files(id, name, mimeType, size, modifiedTime, webViewLink, thumbnailLink)',
      orderBy: 'name',
    });

    const files = filesResponse.data.files || [];

    // Process files and add metadata
    const projectFiles: ProjectFile[] = files.map((file) => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      size: file.size || undefined,
      modifiedTime: file.modifiedTime!,
      webViewLink: file.webViewLink || undefined,
      thumbnailLink: file.thumbnailLink || undefined,
    }));

    // Prepare response
    const response: ProjectFilesResponse = {
      files: projectFiles,
      total: projectFiles.length,
      projectId: id,
    };

    // Set cache headers
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate'); // 30 minutes

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
        statusCode = 500;
        errorMessage = 'Server configuration error';
      } else if (
        error.message.includes('permission') ||
        error.message.includes('access')
      ) {
        statusCode = 403;
        errorMessage = 'Access denied to Google Drive folder';
      } else if (error.message.includes('not found')) {
        statusCode = 404;
        errorMessage = 'Project not found';
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
