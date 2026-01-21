const db = require('./backend/config/db');

async function fixSchema() {
    try {
        console.log("Fixing 'scholars' table schema...");

        // 1. Rename columns to match the import script and standard naming
        // name -> scholar_name (match import script)
        // supervisor -> supervisor_name
        // status -> admission_mode

        // Check existing columns first to avoid errors if run multiple times
        const [columns] = await db.execute("DESCRIBE scholars");
        const hasScholarName = columns.some(c => c.Field === 'scholar_name');
        const hasCoSupervisor = columns.some(c => c.Field === 'co_supervisor_name');

        if (!hasScholarName) {
            console.log("Renaming 'name' to 'scholar_name'...");
            await db.execute("ALTER TABLE scholars CHANGE COLUMN name scholar_name VARCHAR(255) NULL");
        }

        if (columns.some(c => c.Field === 'supervisor')) {
            console.log("Renaming 'supervisor' to 'supervisor_name'...");
            await db.execute("ALTER TABLE scholars CHANGE COLUMN supervisor supervisor_name VARCHAR(255) NULL");
        }

        if (columns.some(c => c.Field === 'status')) {
            console.log("Renaming 'status' to 'admission_mode'...");
            await db.execute("ALTER TABLE scholars CHANGE COLUMN status admission_mode VARCHAR(20) NULL");
        }

        if (!hasCoSupervisor) {
            console.log("Adding 'co_supervisor_name' column...");
            await db.execute("ALTER TABLE scholars ADD COLUMN co_supervisor_name VARCHAR(255) NULL AFTER supervisor_name");
        }

        console.log("Schema update complete.");
        process.exit(0);
    } catch (error) {
        console.error("Schema fix failed:", error);
        process.exit(1);
    }
}

fixSchema();
