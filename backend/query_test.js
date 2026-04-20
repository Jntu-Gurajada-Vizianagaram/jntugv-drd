const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Anil@73',
    database: process.env.DB_NAME || 'drd_jntugv'
};

async function check() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Connected to DB.");

        const [tables] = await connection.query("SHOW CREATE TABLE notifications");
        console.log("SCHEMA:");
        console.log(tables[0]['Create Table']);

        console.log("\nVALUES:");
        const [rows] = await connection.query("SELECT * FROM notifications ORDER BY id DESC LIMIT 5");
        console.table(rows);

        await connection.end();
    } catch (e) {
        console.error("Error:", e.message);
    }
}
check();
