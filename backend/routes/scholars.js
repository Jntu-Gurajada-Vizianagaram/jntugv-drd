const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

// Initialize Table
const initTable = async () => {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS scholars (
                id INT AUTO_INCREMENT PRIMARY KEY,
                scholar_name VARCHAR(255) NOT NULL,
                roll_number VARCHAR(100) UNIQUE NOT NULL,
                department VARCHAR(255),
                supervisor_name VARCHAR(255),
                co_supervisor_name VARCHAR(255),
                admission_year VARCHAR(50),
                admission_mode VARCHAR(100),
                email VARCHAR(255),
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check for missing columns and add them (for existing tables)
        const [columns] = await db.execute('SHOW COLUMNS FROM scholars');
        const columnNames = columns.map(c => c.Field);

        if (!columnNames.includes('email')) {
            await db.execute('ALTER TABLE scholars ADD COLUMN email VARCHAR(255)');
        }
        if (!columnNames.includes('phone')) {
            await db.execute('ALTER TABLE scholars ADD COLUMN phone VARCHAR(20)');
        }
        if (!columnNames.includes('admission_year')) {
            await db.execute('ALTER TABLE scholars ADD COLUMN admission_year VARCHAR(50)');
        }

        console.log("Scholars table initialized and verified");
    } catch (err) {
        console.error("Error initializing scholars table:", err);
    }
};
initTable();

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

// GET one by id
router.get('/:id', async (req, res) => {
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
            WHERE id = ?
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Scholar not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

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
