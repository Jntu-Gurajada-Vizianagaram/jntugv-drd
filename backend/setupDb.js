const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function init() {
    try {
        // Connect without database selected
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'jntugv-rd',
            password: process.env.DB_PASSWORD || 'Jntugv@DRD2025'
        });

        const dbName = process.env.DB_NAME || 'drd_jntugv';

        // Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`Database '${dbName}' created or already exists.`);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

init();
