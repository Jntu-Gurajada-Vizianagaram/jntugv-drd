const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function checkTables() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'jntugv-rd',
            password: 'Jntugv@DRD2025',
            database: 'drd_jntugv'
        });

        console.log("Connected to database.");
        const [rows] = await connection.execute('SHOW TABLES');
        console.log("Tables in database:", rows);

        // Try the exact query from the route
        try {
            const [scholars] = await connection.execute('SELECT * FROM scholars ORDER BY created_at DESC');
            console.log("Scholars API Query success. Rows:", scholars.length);
        } catch (e) {
            console.error("Scholars API Query failed:", e.message);
        }

        await connection.end();
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

checkTables();
