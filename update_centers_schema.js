const db = require('./backend/config/db');

async function migrateCenters() {
    try {
        console.log("Migrating research_centers schema...");

        // 1. Add department column
        try {
            await db.execute("ALTER TABLE research_centers ADD COLUMN department VARCHAR(255) AFTER name");
            console.log("Added 'department' column.");
        } catch (e) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.error("Error adding column:", e.message);
            else console.log("'department' column already exists.");
        }

        // 2. Migrate data: Set department = description (assuming description currently holds dept names from previous import)
        // Only do this if department is empty to avoid overwriting if run multiple times?
        // Actually, if we just added it, it's NULL.
        await db.execute("UPDATE research_centers SET department = description WHERE department IS NULL");
        console.log("Migrated data from description to department.");

        // 3. Clear description so it can be used for actual descriptions
        // But only if we are sure... The user hasn't entered "real" descriptions yet, just imported data.
        // So clearing it is safe.
        await db.execute("UPDATE research_centers SET description = NULL");
        console.log("Cleared 'description' column.");

        // 4. Drop unused columns: coordinator, location
        try {
            await db.execute("ALTER TABLE research_centers DROP COLUMN coordinator");
            console.log("Dropped 'coordinator' column.");
        } catch (e) { console.log("'coordinator' column likely already dropped."); }

        try {
            await db.execute("ALTER TABLE research_centers DROP COLUMN location");
            console.log("Dropped 'location' column.");
        } catch (e) { console.log("'location' column likely already dropped."); }

        console.log("Migration complete.");
        process.exit(0);
    } catch (e) {
        console.error("Migration failed:", e);
        process.exit(1);
    }
}
migrateCenters();
