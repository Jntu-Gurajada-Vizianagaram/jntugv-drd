const db = require('./config/db');

async function testConnection() {
    try {
        console.log("Testing DB connection...");
        const [rows] = await db.execute('SELECT 1 as val');
        console.log("Connection successful. Value:", rows[0].val);
        process.exit(0);
    } catch (error) {
        console.error("Connection failed:", error.message);
        process.exit(1);
    }
}

testConnection();
