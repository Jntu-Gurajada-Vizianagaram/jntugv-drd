const db = require('./config/db');

async function checkScholars() {
    try {
        const [rows] = await db.execute('DESCRIBE scholars');
        console.log('Scholars Table Schema:');
        console.table(rows);
        process.exit(0);
    } catch (err) {
        console.error('Error checking scholars table:', err.message);
        process.exit(1);
    }
}

checkScholars();
