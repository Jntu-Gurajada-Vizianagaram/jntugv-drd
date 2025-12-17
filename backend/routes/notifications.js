const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Mock Data
let notifications = [
    { id: 1, title: 'Ph.D. Admission Notification 2024-25', date: '2024-12-15', category: 'Admissions', link: '#' },
    { id: 2, title: 'Circular regarding Pre-Ph.D. Examinations', date: '2024-12-10', category: 'Examinations', link: '#' }
];

// GET all notifications
router.get('/', (req, res) => {
    res.json(notifications);
});

// POST new notification (Protected)
router.post('/', verifyToken, (req, res) => {
    const { title, category, link } = req.body;
    const newNote = {
        id: notifications.length + 1,
        title,
        category,
        link: link || '#',
        date: new Date().toISOString().split('T')[0]
    };
    notifications.unshift(newNote);
    res.json(newNote);
});

// DELETE notification (Protected)
router.delete('/:id', verifyToken, (req, res) => {
    const id = parseInt(req.params.id);
    notifications = notifications.filter(n => n.id !== id);
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;
