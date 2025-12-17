const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notifications');
const contactRoutes = require('./routes/contact');

app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
    res.send('DRD Backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
