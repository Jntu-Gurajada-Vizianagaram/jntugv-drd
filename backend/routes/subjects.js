const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM subjects ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    const { subject_code, subject_name, credits, department, type } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO subjects (subject_code, subject_name, credits, department, type) VALUES (?, ?, ?, ?, ?)',
            [subject_code, subject_name, credits, department, type || 'Core']
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({ error: 'Failed to add subject (Duplicate Code?)' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { subject_code, subject_name, credits, department, type } = req.body;
    try {
        await db.execute(
            'UPDATE subjects SET subject_code=?, subject_name=?, credits=?, department=?, type=? WHERE id=?',
            [subject_code, subject_name, credits, department, type, id]
        );
        const [rows] = await db.execute('SELECT * FROM subjects WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update subject' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.execute('DELETE FROM subjects WHERE id = ?', [req.params.id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete subject' });
    }
});

module.exports = router;
