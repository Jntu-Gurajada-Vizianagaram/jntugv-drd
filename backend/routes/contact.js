const express = require('express');
const router = express.Router();

// Store messages in memory for now
const messages = [];

router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        subject: subject || 'No Subject',
        message,
        date: new Date().toISOString()
    };

    messages.push(newMessage);
    console.log('New Contact Message:', newMessage);

    res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
});

router.get('/', (req, res) => {
    res.json(messages);
});

module.exports = router;
