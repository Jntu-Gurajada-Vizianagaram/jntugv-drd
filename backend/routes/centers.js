const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM research_centers ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    const { name, department, description, contact_info } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO research_centers (name, department, description, contact_info) VALUES (?, ?, ?, ?)',
            [name, department, description, contact_info]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add center' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { name, department, description, contact_info } = req.body;
    try {
        await db.execute(
            'UPDATE research_centers SET name=?, department=?, description=?, contact_info=? WHERE id=?',
            [name, department, description, contact_info, id]
        );
        const [rows] = await db.execute('SELECT * FROM research_centers WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update center' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.execute('DELETE FROM research_centers WHERE id = ?', [req.params.id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete center' });
    }
});

module.exports = router;
