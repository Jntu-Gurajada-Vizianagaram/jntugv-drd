const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM subjects ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/', verifyToken, upload.single('file'), async (req, res) => {
    const { subject_code, subject_name, credits, department, type } = req.body;
    let filePath = null;

    if (req.file) {
        filePath = `/uploads/${req.file.filename}`;
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO subjects (subject_code, subject_name, credits, department, type, file_path) VALUES (?, ?, ?, ?, ?, ?)',
            [subject_code, subject_name, credits, department, type || 'Core', filePath]
        );
        res.status(201).json({ id: result.insertId, ...req.body, file_path: filePath });
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({ error: 'Failed to add subject (Duplicate Code?)' });
    }
});

router.put('/:id', verifyToken, upload.single('file'), async (req, res) => {
    const id = req.params.id;
    const { subject_code, subject_name, credits, department, type } = req.body;
    let filePath = null;

    if (req.file) {
        filePath = `/uploads/${req.file.filename}`;
    }

    try {
        let sql = 'UPDATE subjects SET subject_code=?, subject_name=?, credits=?, department=?, type=?';
        let params = [subject_code, subject_name, credits, department, type];

        if (filePath) {
            sql += ', file_path=?';
            params.push(filePath);
        }

        sql += ' WHERE id=?';
        params.push(id);

        await db.execute(sql, params);
        const [rows] = await db.execute('SELECT * FROM subjects WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Error updating subject:", error);
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
