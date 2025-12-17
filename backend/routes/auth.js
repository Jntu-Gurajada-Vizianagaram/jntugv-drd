const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock User for demo
const ADMIN_USER = {
    email: 'dr@jntugv.edu.in',
    password: 'Admin@123'
};

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        const token = jwt.sign({ id: 1, email: email }, process.env.JWT_SECRET || 'Jntugv@DR&D', {
            expiresIn: '24h'
        });
        return res.json({ token, message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
