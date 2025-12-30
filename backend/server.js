const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5000",
    "http://192.168.57.30:3000",
    "https://drd-jntugv.vercel.app",

];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notifications');
const downloadsRoutes = require('./routes/downloads');
const contactRoutes = require('./routes/contact');
const fileRoutes = require('./routes/files');
const path = require('path');

app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/downloads', downloadsRoutes);
app.use('/api/scholars', require('./routes/scholars'));
app.use('/api/areas', require('./routes/areas'));
app.use('/api/centers', require('./routes/centers'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/contact', contactRoutes);
app.use('/api/files', fileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('DRD Backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
