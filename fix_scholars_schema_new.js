const db = require('./backend/config/db');

async function fixSchema() {
    try {
        console.log("Checking schema...");

        // Check current columns
        const [columns] = await db.execute("SHOW COLUMNS FROM scholars");
        const columnNames = columns.map(c => c.Field);
        console.log("Current columns:", columnNames);

        if (!columnNames.includes('name')) {
            console.log("Adding 'name' column...");
            await db.execute("ALTER TABLE scholars ADD COLUMN name VARCHAR(255) AFTER roll_number");
        }

        if (!columnNames.includes('co_supervisor')) {
            console.log("Adding 'co_supervisor' column...");
            await db.execute("ALTER TABLE scholars ADD COLUMN co_supervisor VARCHAR(255) AFTER supervisor");
        }

        if (!columnNames.includes('admission_year')) {
            console.log("Adding 'admission_year' column...");
            await db.execute("ALTER TABLE scholars ADD COLUMN admission_year VARCHAR(10) AFTER status");
        }

        console.log("Schema fix complete.");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
fixSchema();
