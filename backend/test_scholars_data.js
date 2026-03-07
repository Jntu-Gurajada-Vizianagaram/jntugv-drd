const db = require('./config/db');

async function testScholars() {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM scholars');
        console.log('Total Scholars in DB:', rows[0].count);
        const [sample] = await db.execute('SELECT * FROM scholars LIMIT 2');
        console.log('Sample Data:');
        console.log(JSON.stringify(sample, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

testScholars();
