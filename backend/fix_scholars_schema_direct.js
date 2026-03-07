const db = require('./config/db');

async function fixScholars() {
    try {
        console.log("Checking scholars table schema...");
        const [columns] = await db.execute('SHOW COLUMNS FROM scholars');
        const columnNames = columns.map(c => c.Field);

        if (!columnNames.includes('created_at')) {
            console.log("Adding created_at column...");
            await db.execute('ALTER TABLE scholars ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
        }
        if (!columnNames.includes('admission_year')) {
            console.log("Adding admission_year column...");
            await db.execute('ALTER TABLE scholars ADD COLUMN admission_year VARCHAR(50)');
        }
        if (!columnNames.includes('admission_mode')) {
            console.log("Adding admission_mode column...");
            await db.execute('ALTER TABLE scholars ADD COLUMN admission_mode VARCHAR(100)');
        }

        console.log("Scholars table schema verified successfully.");
        process.exit(0);
    } catch (err) {
        if (err.code === 'ER_NO_SUCH_TABLE') {
            console.log("Scholars table doesn't exist. It will be created by the route inits.");
            process.exit(0);
        }
        console.error("Error fixing scholars table:", err.message);
        process.exit(1);
    }
}

fixScholars();
