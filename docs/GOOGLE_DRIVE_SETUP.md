# Google Drive API Setup Guide

This guide will help you set up Google Drive API integration for your portfolio website.

## Prerequisites

1. Google Cloud Console account
2. Google Drive folder with your projects
3. Vercel account (for deployment)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 2: Enable Google Drive API

1. In Google Cloud Console, navigate to **APIs & Services** > **Library**
2. Search for "Google Drive API"
3. Click on it and press "Enable"

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details:
   - **Name**: `portfolio-drive-access`
   - **Description**: `Service account for portfolio website Drive access`
4. Click "Create and Continue"
5. Skip the optional role assignment (click "Continue")
6. Click "Done"

## Step 4: Generate Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** > **Create New Key**
5. Select **JSON** format
6. Click "Create" - this will download a JSON file

## Step 5: Extract Credentials from JSON

Open the downloaded JSON file and extract these values:

- `client_email` - this is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` - this is your `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

## Step 6: Set Up Your Google Drive Folder

1. Create a folder in Google Drive for your projects
2. Inside this main folder, create subfolders for each project
3. Each project subfolder should contain:
   - `cover.jpg` - Project thumbnail image
   - `project.json` - Project metadata file
   - Other project files (optional)

### Example project.json structure:

```json
{
  "title": "My Awesome Project",
  "description": "A detailed description of the project",
  "tags": ["React", "TypeScript", "Next.js"],
  "date": "2024-01-15",
  "technologies": ["React", "Node.js"],
  "github": "https://github.com/yourusername/project",
  "live": "https://project.vercel.app"
}
```

## Step 7: Share the Folder with Service Account

1. Right-click on your main projects folder in Google Drive
2. Click "Share"
3. Add your service account email (from step 5)
4. Set permission to "Viewer"
5. Click "Send"

## Step 8: Get the Folder ID

1. Open your main projects folder in Google Drive
2. Look at the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Copy the folder ID from the URL

## Step 9: Set Environment Variables

### For Local Development:

Create a `.env.local` file in your project root:

```bash
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here...\n-----END PRIVATE KEY-----"
```

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add these three variables:

| Name                                 | Value                                      |
| ------------------------------------ | ------------------------------------------ |
| `GOOGLE_DRIVE_FOLDER_ID`             | Your folder ID                             |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`       | Your service account email                 |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Your private key (with \n for line breaks) |

**Important**: For the private key in Vercel:

- Keep the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts
- Replace actual line breaks with `\n`
- Wrap the entire key in quotes

## Step 10: Test the Setup

### Local Testing:

```bash
npm run dev
# Visit http://localhost:3000/api/drive/health
```

### Vercel Testing:

```bash
# After deployment
curl https://your-site.vercel.app/api/drive/health
```

The health endpoint should return:

```json
{
  "status": "healthy",
  "message": "All Google Drive API environment variables are configured",
  "environment": {
    "hasGoogleServiceAccountEmail": true,
    "hasGoogleServiceAccountPrivateKey": true,
    "hasGoogleDriveFolderId": true
  }
}
```

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**
   - Make sure you shared the folder with the service account email
   - Check that the service account has "Viewer" permissions

2. **404 Not Found Error**
   - Verify the folder ID is correct
   - Make sure the folder exists and is accessible

3. **500 Server Error**
   - Check that all environment variables are set
   - Verify the private key format (include BEGIN/END markers)
   - Ensure Google Drive API is enabled in your project

4. **Authentication Errors**
   - Double-check the service account email
   - Verify the private key is complete and properly formatted
   - Make sure there are no extra spaces or characters

### Debug Commands:

```bash
# Test environment variables locally
node -e "console.log('Email:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)"
node -e "console.log('Key:', !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)"
node -e "console.log('Folder:', !!process.env.GOOGLE_DRIVE_FOLDER_ID)"

# Test API endpoint
curl http://localhost:3000/api/drive/health
curl http://localhost:3000/api/drive
```

## Security Best Practices

1. **Never commit credentials to version control**
   - Add `.env*` to your `.gitignore`
   - Use environment variables for all sensitive data

2. **Use minimum required permissions**
   - Service account only needs "Viewer" access to the specific folder
   - Don't give broader Drive access

3. **Regularly rotate credentials**
   - Generate new service account keys periodically
   - Delete old unused keys

4. **Monitor API usage**
   - Keep an eye on your Google Cloud Console API quotas
   - Set up billing alerts if needed

## Support

If you encounter issues:

1. Check the health endpoint first: `/api/drive/health`
2. Review Vercel function logs
3. Verify all environment variables are set correctly
4. Ensure Google Drive folder structure matches expectations
