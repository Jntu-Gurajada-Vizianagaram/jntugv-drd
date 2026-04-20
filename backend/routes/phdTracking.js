const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

// GET all for Admin Dashboard (phd tracking schema expects htno, scholar_name, department)
router.get('/admin/scholars', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                id,
                roll_number as htno,
                scholar_name,
                department,
                supervisor_name,
                co_supervisor_name,
                stage_1,
                stage_2,
                examiner_data,
                stage_6,
                stage_7
            FROM scholars
            ORDER BY created_at DESC
        `);
        // Map boolean fields if necessary
        const mapped = rows.map(r => ({
            ...r,
            stage_1: !!r.stage_1,
            stage_2: !!r.stage_2,
            stage_6: !!r.stage_6,
            stage_7: !!r.stage_7,
        }));
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST to add scholar from PhD tracking Admin
router.post('/admin/scholars', verifyToken, async (req, res) => {
    const { htno, scholar_name, department, supervisor_name, co_supervisor_name } = req.body;
    try {
        const defaultExaminers = JSON.stringify({
            examiner1: { name: "", acceptance: false, dispatch: false, receipt: false },
            examiner2: { name: "", acceptance: false, dispatch: false, receipt: false },
            examiner3: { name: "", acceptance: false, dispatch: false, receipt: false }
        });
        const [result] = await db.execute(
            `INSERT INTO scholars (roll_number, scholar_name, department, supervisor_name, co_supervisor_name, examiner_data)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [htno, scholar_name, department, supervisor_name, co_supervisor_name, defaultExaminers]
        );
        res.json({ id: result.insertId, success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add scholar. HTNo might already exist.' });
    }
});

// GET single scholar details and tracking stages by HTNO
router.get('/scholars/:htno', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                id,
                roll_number as htno,
                scholar_name,
                department,
                supervisor_name,
                co_supervisor_name,
                stage_1,
                stage_2,
                examiner_data,
                stage_6,
                stage_7
            FROM scholars WHERE roll_number = ?
        `, [req.params.htno]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Scholar Not Found' });
        }
        const data = rows[0];
        data.stage_1 = !!data.stage_1;
        data.stage_2 = !!data.stage_2;
        data.stage_6 = !!data.stage_6;
        data.stage_7 = !!data.stage_7;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// PUT update stages
router.put('/admin/scholars/:htno/stages', verifyToken, async (req, res) => {
    const { stage_1, stage_2, examiner_data, stage_6, stage_7 } = req.body;
    try {
        await db.execute(
            `UPDATE scholars SET stage_1 = ?, stage_2 = ?, examiner_data = ?, stage_6 = ?, stage_7 = ? WHERE roll_number = ?`,
            [stage_1, stage_2, examiner_data, stage_6, stage_7, req.params.htno]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stages' });
    }
});

module.exports = router;
