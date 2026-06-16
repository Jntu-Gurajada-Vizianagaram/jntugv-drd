const fs = require('fs');

let googleClient = null;

function getGoogleClient() {
    if (googleClient) return googleClient;

    try {
        googleClient = require('googleapis').google;
        return googleClient;
    } catch (err) {
        console.warn('googleapis package not installed. Google Drive uploads are disabled.');
        return null;
    }
}

/**
 * Uploads a local file to Google Drive and returns the shareable webViewLink.
 * @param {string} localFilePath - The absolute path to the local file.
 * @param {string} originalName - The original name of the file
 * @param {string} mimeType - The mimeType of the file
 * @returns {Promise<string|null>} - The shareable Google Drive link, or null if setup is incomplete.
 */
async function uploadToGoogleDrive(localFilePath, originalName, mimeType) {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID; // Optional

    const google = getGoogleClient();
    if (!google) {
        return null;
    }

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        console.warn('Google Drive OAuth2 credentials not fully provided in .env. Skipping Drive upload.');
        return null;
    }

    try {
        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        );

        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const fileMetadata = {
            name: `${Date.now()}_${originalName}`,
        };
        
        if (FOLDER_ID) {
            fileMetadata.parents = [FOLDER_ID];
        }

        const media = {
            mimeType: mimeType || 'application/octet-stream',
            body: fs.createReadStream(localFilePath),
        };

        // 1. Upload the file
        const file = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink, webContentLink',
        });

        const fileId = file.data.id;

        // 2. Adjust permissions so anyone with the link can view it (Reader setup)
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // 3. Return the share link
        return file.data.webViewLink;
    } catch (error) {
        console.error('Error uploading to Google Drive:', error.message);
        throw error;
    }
}

module.exports = {
    uploadToGoogleDrive,
};
