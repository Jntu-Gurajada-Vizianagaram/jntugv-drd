const fs = require('fs');
const path = require('path');
const db = require('./backend/config/db');

async function importScholars() {
    try {
        console.log("Reading file...");
        const rawData = fs.readFileSync(path.join(__dirname, 'raw_scholars_new.txt'), 'utf-8');
        const lines = rawData.trim().split('\n');

        // Skip header
        const rows = lines.slice(1);

        console.log(`Found ${rows.length} records. Connecting to DB...`);

        // Create table if not exists with correct schema matching CSV
        await db.execute(`
            CREATE TABLE IF NOT EXISTS scholars (
                id INT AUTO_INCREMENT PRIMARY KEY,
                roll_number VARCHAR(50) UNIQUE,
                scholar_name VARCHAR(255),
                admission_mode VARCHAR(20), -- FT/PT
                department VARCHAR(255),
                supervisor_name VARCHAR(255),
                co_supervisor_name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Table 'scholars' ready. Starting import...");

        for (const line of rows) {
            const cols = line.split('\t'); // Tab separated
            if (cols.length < 5) continue;

            // Mapping based on S.NO	Roll Number	Research Scholar Name	FT/PT	Department	Superviosr Name	Co-Supervisor Name
            const roll = cols[1]?.trim();
            const name = cols[2]?.trim();
            const mode = cols[3]?.trim();
            const dept = cols[4]?.trim();
            const supervisor = cols[5]?.trim();
            const co_supervisor = cols[6]?.trim() || '';

            if (roll) {
                try {
                    // Upsert to avoid duplicates
                    await db.execute(`
                    INSERT INTO scholars 
                    (roll_number, scholar_name, admission_mode, department, supervisor_name, co_supervisor_name) 
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    scholar_name = VALUES(scholar_name),
                    department = VALUES(department),
                    supervisor_name = VALUES(supervisor_name),
                    co_supervisor_name = VALUES(co_supervisor_name)
                `, [roll, name, mode, dept, supervisor, co_supervisor]);
                } catch (e) {
                    console.error(`Failed to insert ${roll}:`, e.message);
                }
            }
        }

        console.log("Import completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Import failed:", error);
        process.exit(1);
    }
}

importScholars();
