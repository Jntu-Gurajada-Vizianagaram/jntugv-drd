const db = require('../config/db');
const { uploadToGoogleDrive } = require('./driveUpload');
const path = require('path');
const fs = require('fs');

async function syncExistingFilesToDrive() {
    console.log('[Drive Sync] Starting background sync of existing local files to Google Drive...');
    const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');

    try {
        // Sync Notifications
        const [notifications] = await db.execute('SELECT id, title, file_path, link FROM notifications WHERE file_path IS NOT NULL');
        
        for (const notif of notifications) {
            // Check if it already has a drive link
            if (notif.link && notif.link.includes('drive.google.com')) {
                continue;
            }

            // file_path looks like "/uploads/filename.ext"
            const filename = notif.file_path.replace('/uploads/', '');
            const localPath = path.join(uploadDir, filename);

            if (fs.existsSync(localPath)) {
                try {
                    console.log(`[Drive Sync] Uploading notification file: ${filename}`);
                    const driveLink = await uploadToGoogleDrive(localPath, filename, 'application/octet-stream');
                    if (driveLink) {
                        await db.execute('UPDATE notifications SET link = ?, file_path = NULL WHERE id = ?', [driveLink, notif.id]);
                        console.log(`[Drive Sync] Successfully synced notification id ${notif.id} to Drive.`);
                    }
                } catch (err) {
                    console.error(`[Drive Sync] Failed to upload notification id ${notif.id}:`, err.message);
                }
            } else {
                await db.execute('UPDATE notifications SET file_path = NULL WHERE id = ?', [notif.id]);
                console.log(`[Drive Sync] Cleared missing local file reference for notification id ${notif.id}.`);
            }
        }

        // Sync Downloads
        const [downloads] = await db.execute('SELECT id, title, file_path, link FROM downloads WHERE file_path IS NOT NULL');
        
        for (const dl of downloads) {
            if (dl.link && dl.link.includes('drive.google.com')) {
                continue;
            }

            const filename = dl.file_path.replace('/uploads/', '');
            const localPath = path.join(uploadDir, filename);

            if (fs.existsSync(localPath)) {
                try {
                    console.log(`[Drive Sync] Uploading download file: ${filename}`);
                    const driveLink = await uploadToGoogleDrive(localPath, filename, 'application/octet-stream');
                    if (driveLink) {
                        await db.execute('UPDATE downloads SET link = ?, file_path = NULL WHERE id = ?', [driveLink, dl.id]);
                        console.log(`[Drive Sync] Successfully synced download id ${dl.id} to Drive.`);
                    }
                } catch (err) {
                    console.error(`[Drive Sync] Failed to upload download id ${dl.id}:`, err.message);
                }
            } else {
                await db.execute('UPDATE downloads SET file_path = NULL WHERE id = ?', [dl.id]);
                console.log(`[Drive Sync] Cleared missing local file reference for download id ${dl.id}.`);
            }
        }

        console.log('[Drive Sync] Background sync complete.');
    } catch (dbErr) {
        console.error('[Drive Sync] Error querying database:', dbErr.message);
    }
}

module.exports = {
    syncExistingFilesToDrive
};
