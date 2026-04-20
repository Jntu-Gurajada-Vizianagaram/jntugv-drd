const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');
const upload = require('../middleware/upload');

// Initialize Downloads Table
const initTable = async () => {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS downloads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                type VARCHAR(50) NOT NULL,
                link VARCHAR(255),
                file_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Downloads table initialized");
    } catch (err) {
        console.error("Error initializing downloads table:", err);
    }
};
// initTable(); // Disabled to prevent PM2 connection refused crashes on boot

// GET all downloads
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM downloads ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST new download (Protected)
router.post('/', verifyToken, upload.single('file'), async (req, res) => {
    const { title, category, type, link } = req.body;
    let filePath = null;
    let finalLink = link || '#';

    let driveLink = null;

    if (req.file) {
        try {
            const { uploadToGoogleDrive } = require('../utils/driveUpload');
            driveLink = await uploadToGoogleDrive(req.file.path, req.file.originalname, req.file.mimetype);
        } catch (uploadErr) {
            console.error("Google Drive upload failed, falling back to local:", uploadErr.message);
        }

        if (driveLink) {
            finalLink = driveLink;
            // filePath remains null
        } else {
            filePath = `/uploads/${req.file.filename}`;
            finalLink = filePath; // If local file uploaded, link points to file
        }
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO downloads (title, category, type, link, file_path) VALUES (?, ?, ?, ?, ?)',
            [title, category, type, finalLink, filePath]
        );

        const newDownload = {
            id: result.insertId,
            title,
            category,
            type,
            link: finalLink,
            file_path: filePath
        };

        res.status(201).json(newDownload);
    } catch (error) {
        console.error('Error adding download:', error);
        res.status(500).json({ error: 'Failed to add download' });
    }
});

// PUT update download (Protected)
router.put('/:id', verifyToken, upload.single('file'), async (req, res) => {
    const id = req.params.id;
    const { title, category, type, link } = req.body;
    let filePath = null;

    let driveLink = null;

    if (req.file) {
        try {
            const { uploadToGoogleDrive } = require('../utils/driveUpload');
            driveLink = await uploadToGoogleDrive(req.file.path, req.file.originalname, req.file.mimetype);
        } catch (uploadErr) {
            console.error("Google Drive upload failed, falling back to local:", uploadErr.message);
        }

        if (!driveLink) {
            filePath = `/uploads/${req.file.filename}`;
        }
    }

    try {
        let query = 'UPDATE downloads SET title = ?, category = ?, type = ?';
        let params = [title, category, type];

        if (driveLink) {
            query += ', file_path = ?, link = ?'; // Clear local filePath, use driveLink
            params.push(null);
            params.push(driveLink);
        } else if (filePath) {
            query += ', file_path = ?, link = ?'; // Update link to file path if new local file
            params.push(filePath);
            params.push(filePath);
        } else if (link !== undefined) {
            query += ', link = ?'; // Update link if provided (and no file)
            params.push(link || '#');
        }

        query += ' WHERE id = ?';
        params.push(id);

        await db.execute(query, params);

        const [rows] = await db.execute('SELECT * FROM downloads WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating download:', error);
        res.status(500).json({ error: 'Failed to update download' });
    }
});

// DELETE download (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    try {
        await db.execute('DELETE FROM downloads WHERE id = ?', [id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete download' });
    }
});

module.exports = router;
