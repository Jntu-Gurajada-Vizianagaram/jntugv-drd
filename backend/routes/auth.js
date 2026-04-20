const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Initialize Users Table & Seed Admin
const initAuth = async () => {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check if admin exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', ['dr@jntugv.edu.in']);
        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash('Director.R&D@123', 10);
            await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', ['dr@jntugv.edu.in', hashedPassword]);
            console.log("Default admin user created");
        }
    } catch (err) {
        console.error("Auth init error:", err);
    }
};
// initAuth(); // Disabled to prevent PM2 connection refused crashes on boot

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'User not Found :404' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials :401' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'Jntugv@DR&D',
            { expiresIn: '24h' }
        );

        res.json({ token, message: 'Login successful :200' });  
    } catch (error) {
        console.error("Login fatal error:", error);
        // Return 500 but log explicitly 
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

module.exports = router;
