const mysql = require('mysql2');
const dotenv = require('dotenv');

const path = require('path');
// Load .env from backend root regardless of where the script is run
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log(`DB Connection: Host=${process.env.DB_HOST || 'localhost'}, User=${process.env.DB_USER || 'root'}, Database=${process.env.DB_NAME || 'drd_jntugv'}`);

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'drd_jntugv',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
