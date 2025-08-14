import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  timestamp: string;
  environment: {
    hasGoogleServiceAccountEmail: boolean;
    hasGoogleServiceAccountPrivateKey: boolean;
    hasGoogleDriveFolderId: boolean;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'unhealthy',
      message: 'Method Not Allowed',
      timestamp: new Date().toISOString(),
      environment: {
        hasGoogleServiceAccountEmail: false,
        hasGoogleServiceAccountPrivateKey: false,
        hasGoogleDriveFolderId: false,
      },
    });
  }

  const hasGoogleServiceAccountEmail =
    !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const hasGoogleServiceAccountPrivateKey =
    !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const hasGoogleDriveFolderId = !!process.env.GOOGLE_DRIVE_FOLDER_ID;

  const environment = {
    hasGoogleServiceAccountEmail,
    hasGoogleServiceAccountPrivateKey,
    hasGoogleDriveFolderId,
  };

  let status: 'healthy' | 'degraded' | 'unhealthy';
  let message: string;

  if (
    hasGoogleServiceAccountEmail &&
    hasGoogleServiceAccountPrivateKey &&
    hasGoogleDriveFolderId
  ) {
    status = 'healthy';
    message = 'All Google Drive API environment variables are configured';
  } else if (
    hasGoogleServiceAccountEmail ||
    hasGoogleServiceAccountPrivateKey ||
    hasGoogleDriveFolderId
  ) {
    status = 'degraded';
    message = 'Some Google Drive API environment variables are missing';
  } else {
    status = 'unhealthy';
    message = 'No Google Drive API environment variables configured';
  }

  return res.status(200).json({
    status,
    message,
    timestamp: new Date().toISOString(),
    environment,
  });
}
