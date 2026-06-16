const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

const allowedOrigins = [

    "http://localhost:6001",
    "http://localhost:3000",
    "http://72.61.232.85:3014",
    "http://72.61.232.85:3000",
    "http://72.61.232.85:6001",
    "http://192.168.57.30:5000",
    "http://192.168.57.30:6001",
    "http://192.168.57.30:3000",
    "https://drnd.jntugv.edu.in",
    "https://drnd.jntugv.edu.in/api/",
    "https://jntugv-drd.vercel.app",
    "https://drd.jntugv.edu.in",
    "https://*.jntugv.edu.in",
    "https://jntugv.edu.in"

];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }

        // Allow all Vercel deployments and jntugv subdomains
        if (origin.endsWith('.vercel.app') || origin.endsWith('.jntugv.edu.in')) {
            return callback(null, true);
        }

        console.error('Blocked by CORS:', origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notifications');
const downloadsRoutes = require('./routes/downloads');
const contactRoutes = require('./routes/contact');
const fileRoutes = require('./routes/files');
const phdTrackingRoutes = require('./routes/phdTracking');
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
app.use('/api/phd-tracking', phdTrackingRoutes);

// Fallback: Bind routes without /api prefix
app.use('/auth', authRoutes);
app.use('/notifications', notificationRoutes);
app.use('/downloads', downloadsRoutes);
app.use('/scholars', require('./routes/scholars'));
app.use('/areas', require('./routes/areas'));
app.use('/centers', require('./routes/centers'));
app.use('/subjects', require('./routes/subjects'));
app.use('/phd-tracking', phdTrackingRoutes);
app.use('/contact', contactRoutes);
app.use('/files', fileRoutes);

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
app.use('/uploads', (req, res, next) => {
    const fullPath = path.join(uploadDir, req.url);
    const fs = require('fs');
    if (fs.existsSync(fullPath) && !fs.lstatSync(fullPath).isDirectory()) {
        console.log(`[Static] Serving existing file: ${fullPath}`);
    } else {
        console.warn(`[Static] File NOT found on disk: ${fullPath}`);
    }
    next();
}, express.static(uploadDir, {
    dotfiles: 'ignore',
    etag: true,
    index: false,
    maxAge: '1d'
}));

// Fallback for /api/uploads in case it's used
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('DRD Backend API is running');
});

// Run background Google Drive Sync for old local files if migration is needed
try {
    const { syncExistingFilesToDrive } = require('./utils/syncDrive');
    syncExistingFilesToDrive().catch((err) => {
        console.error('[Drive Sync] Background sync failed:', err.message);
    });
} catch (err) {
    console.warn('[Drive Sync] Module unavailable, skipping background sync:', err.message);
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
