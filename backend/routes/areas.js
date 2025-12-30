const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM research_areas ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/', verifyToken, upload.single('file'), async (req, res) => {
    const { title, description } = req.body;
    let imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const [result] = await db.execute(
            'INSERT INTO research_areas (title, description, image_path) VALUES (?, ?, ?)',
            [title, description, imagePath]
        );
        res.status(201).json({ id: result.insertId, title, description, image_path: imagePath });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add area' });
    }
});

router.put('/:id', verifyToken, upload.single('file'), async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    let imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        let query = 'UPDATE research_areas SET title=?, description=?';
        let params = [title, description];
        if (imagePath) {
            query += ', image_path=?';
            params.push(imagePath);
        }
        query += ' WHERE id=?';
        params.push(id);

        await db.execute(query, params);
        const [rows] = await db.execute('SELECT * FROM research_areas WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update area' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.execute('DELETE FROM research_areas WHERE id = ?', [req.params.id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete area' });
    }
});

module.exports = router;
