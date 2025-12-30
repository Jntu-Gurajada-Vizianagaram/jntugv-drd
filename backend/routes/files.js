const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const db = require('../config/db');

// POST /api/files/upload
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, filename, path: filePath, size, mimetype } = req.file;

    try {
        // Ensure table exists (could be moved to server startup)
        await db.execute(`
            CREATE TABLE IF NOT EXISTS files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                original_name VARCHAR(255) NOT NULL,
                filename VARCHAR(255) NOT NULL,
                path VARCHAR(255) NOT NULL,
                size INT,
                mimetype VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert file record
        const [result] = await db.execute(
            'INSERT INTO files (original_name, filename, path, size, mimetype) VALUES (?, ?, ?, ?, ?)',
            [originalname, filename, filePath, size, mimetype]
        );

        res.status(201).json({
            message: 'File uploaded successfully',
            file: {
                id: result.insertId,
                original_name: originalname,
                filename: filename,
                url: `/uploads/${filename}` // Construct accessible URL
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Database error occurred' });
    }
});

module.exports = router;
