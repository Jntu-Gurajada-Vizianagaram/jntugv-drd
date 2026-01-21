const db = require('./config/db');

async function checkTable() {
    try {
        console.log("Checking research_areas table...");

        // 1. Check if table exists
        const [tables] = await db.execute("SHOW TABLES LIKE 'research_areas'");
        if (tables.length === 0) {
            console.log("Table 'research_areas' does NOT exist. Creating it...");
            await db.execute(`
                CREATE TABLE IF NOT EXISTS research_areas (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    image_path VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log("Table created.");
        } else {
            console.log("Table 'research_areas' exists.");
        }

        // 2. Check content
        const [rows] = await db.execute("SELECT * FROM research_areas");
        console.log(`Row count: ${rows.length}`);

        if (rows.length === 0) {
            console.log("Inserting dummy data...");
            await db.execute("INSERT INTO research_areas (title, description) VALUES ('Test Area', 'This is a test area')");
            console.log("Dummy data inserted.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkTable();
