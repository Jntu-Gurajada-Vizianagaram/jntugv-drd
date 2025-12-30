const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

// GET all
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM scholars ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST new
router.post('/', verifyToken, async (req, res) => {
    const { name, roll_number, department, supervisor, admission_year, status, email, phone } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO scholars (name, roll_number, department, supervisor, admission_year, status, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, roll_number, department, supervisor, admission_year, status || 'Full-Time', email, phone]
        );
        const newItem = { id: result.insertId, ...req.body };
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error adding scholar:", error);
        res.status(500).json({ error: 'Failed to add scholar (Duplicate Roll Number?)' });
    }
});

// PUT update
router.put('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { name, roll_number, department, supervisor, admission_year, status, email, phone } = req.body;
    try {
        await db.execute(
            'UPDATE scholars SET name=?, roll_number=?, department=?, supervisor=?, admission_year=?, status=?, email=?, phone=? WHERE id=?',
            [name, roll_number, department, supervisor, admission_year, status, email, phone, id]
        );
        const [rows] = await db.execute('SELECT * FROM scholars WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update scholar' });
    }
});

// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.execute('DELETE FROM scholars WHERE id = ?', [req.params.id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete scholar' });
    }
});

module.exports = router;
