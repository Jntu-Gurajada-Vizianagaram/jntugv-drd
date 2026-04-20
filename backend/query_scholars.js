const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
    const c = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Anil@73',
        database: process.env.DB_NAME || 'drd_jntugv'
    });
    
    // First let's check what scholars exist:
    const [all] = await c.query('SELECT id, roll_number, scholar_name FROM scholars LIMIT 10');
    console.log("Samples:", all);
    
    // And specifically check for 22022P0101:
    const [spec] = await c.query('SELECT * FROM scholars WHERE roll_number = ?', ['22022P0101']);
    console.log("Specific match:", spec);

    await c.end();
}

run().catch(console.error);
