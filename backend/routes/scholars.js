const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

// GET all
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                id,
                scholar_name as name,
                roll_number,
                department,
                supervisor_name as supervisor,
                co_supervisor_name as co_supervisor,
                admission_year,
                admission_mode as status,
                email,
                phone
            FROM scholars 
            ORDER BY created_at DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching scholars:", error);
        res.status(500).json({ error: 'Database error', details: error.message });
    }
});

// POST new
// POST new
router.post('/', verifyToken, async (req, res) => {
    const { name, roll_number, department, supervisor, co_supervisor, admission_year, status, email, phone } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO scholars (scholar_name, roll_number, department, supervisor_name, co_supervisor_name, admission_year, admission_mode, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, roll_number, department, supervisor, co_supervisor, admission_year, status || 'Full-Time', email, phone]
        );
        const newItem = { id: result.insertId, ...req.body };
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error adding scholar:", error);
        res.status(500).json({ error: 'Failed to add scholar (Duplicate Roll Number?)' });
    }
});

// PUT update
// PUT update
router.put('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { name, roll_number, department, supervisor, co_supervisor, admission_year, status, email, phone } = req.body;
    try {
        await db.execute(
            'UPDATE scholars SET scholar_name=?, roll_number=?, department=?, supervisor_name=?, co_supervisor_name=?, admission_year=?, admission_mode=?, email=?, phone=? WHERE id=?',
            [name, roll_number, department, supervisor, co_supervisor, admission_year, status, email, phone, id]
        );
        // Return updated object with correct mapping
        const updatedItem = { id, name, roll_number, department, supervisor, co_supervisor, admission_year, status, email, phone };
        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating scholar:", error);
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
