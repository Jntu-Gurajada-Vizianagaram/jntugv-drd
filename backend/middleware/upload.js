const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Prioritize a persistent absolute directory from .env to survive deployments, fallback to local uploads folder
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // preserve the original name but replace spaces with underscores to prevent broken URLs
        cb(null, file.originalname.replace(/\s+/g, '_'));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
