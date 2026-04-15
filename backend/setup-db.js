const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Anil@73'
};

async function setupDatabase() {
    let connection;
    try {
        console.log(`Connecting to MySQL at ${dbConfig.host} as ${dbConfig.user}...`);
        connection = await mysql.createConnection(dbConfig);

        const dbName = process.env.DB_NAME || 'drd_jntugv';
        console.log(`Creating database "${dbName}" if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

        console.log("Database created/verified successfully.");

        // Now run the seed script for scholars if it exists
        // We'll just print a message for now, the user can run it after.
        console.log("Next step: The backend will automatically create tables on its first run.");

    } catch (error) {
        console.error("Error setting up database:", error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error("TIP: Check your DB_PASSWORD in backend/.env");
        }
    } finally {
        if (connection) await connection.end();
    }
}

setupDatabase();
