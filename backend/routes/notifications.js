const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');
const upload = require('../middleware/upload');

// Initialize Table
const initTable = async () => {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS notifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                file_path VARCHAR(255),
                link VARCHAR(255),
                date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Notifications table initialized");
    } catch (err) {
        console.error("Error initializing notifications table:", err);
    }
};
initTable();

// GET all notifications
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM notifications ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST new notification (Protected)
router.post('/', verifyToken, upload.single('file'), async (req, res) => {
    const { title, category, link, date } = req.body;
    let filePath = null;

    if (req.file) {
        filePath = `/uploads/${req.file.filename}`;
    }

    // Default connection link if no file and no link provided? 
    // For now, let's allow empty link/file.

    try {
        const [result] = await db.execute(
            'INSERT INTO notifications (title, category, file_path, link, date) VALUES (?, ?, ?, ?, ?)',
            [
                title,
                category,
                filePath,
                link || '#',
                date || new Date().toISOString().split('T')[0]
            ]
        );

        const newNotification = {
            id: result.insertId,
            title,
            category,
            file_path: filePath,
            link: link || '#',
            date: date || new Date().toISOString().split('T')[0]
        };

        res.status(201).json(newNotification);
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'Failed to add notification' });
    }
});

// DELETE notification (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    try {
        await db.execute('DELETE FROM notifications WHERE id = ?', [id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' });
    }
});

// UPDATE notification (Protected)
router.put('/:id', verifyToken, upload.single('file'), async (req, res) => {
    const id = req.params.id;
    const { title, category, link, date } = req.body;
    let filePath = null;

    if (req.file) {
        filePath = `/uploads/${req.file.filename}`;
    }

    try {
        let updates = [];
        let params = [];

        if (title) { updates.push('title = ?'); params.push(title); }
        if (category) { updates.push('category = ?'); params.push(category); }
        if (link) { updates.push('link = ?'); params.push(link); }
        if (date) { updates.push('date = ?'); params.push(date); }
        if (filePath) { updates.push('file_path = ?'); params.push(filePath); }

        if (updates.length === 0) {
            return res.json({ message: "No updates provided" });
        }

        let query = `UPDATE notifications SET ${updates.join(', ')} WHERE id = ?`;
        params.push(id);

        await db.execute(query, params);

        // Fetch updated record
        const [rows] = await db.execute('SELECT * FROM notifications WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Failed to update notification' });
    }
});

module.exports = router;
