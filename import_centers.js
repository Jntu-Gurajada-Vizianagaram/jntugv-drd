const fs = require('fs');
const path = require('path');
const db = require('./backend/config/db');

async function importCenters() {
    try {
        const dataPath = path.join(__dirname, 'raw_centers.txt');
        const content = fs.readFileSync(dataPath, 'utf-8');
        const lines = content.split('\n').filter(l => l.trim());

        console.log(`Found ${lines.length} lines. Processing...`);

        // Skip header
        const startIndex = 1;

        let count = 0;
        let errors = 0;

        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Split by tab
            const parts = line.split('\t').map(p => p.trim());

            // Expected columns: S.NO, Name of Research Centre (Dept), Name of Institute
            // Note: The raw data seems to have 'Name of Research Centre' as Dept (e.g., Civil Engineering)
            // and 'Name of Institute' as the actual College/Institute name.
            // We'll map:
            // name -> Name of Institute
            // description -> Name of Research Centre (Dept)
            // location -> extracted from name? or just generic
            // coordinator -> null/blank

            if (parts.length < 3) {
                console.log(`Skipping invalid line ${i + 1}: ${line}`);
                continue;
            }

            const department = parts[1];
            const institute = parts[2];

            // We want to store [Institute Name] - [Department]
            // OR maybe just Institute as name, and Department in description.

            try {
                // Check if exists
                const [exists] = await db.execute(
                    'SELECT id FROM research_centers WHERE name = ? AND description = ?',
                    [institute, department]
                );

                if (exists.length === 0) {
                    await db.execute(`
                        INSERT INTO research_centers (name, description, location, coordinator)
                        VALUES (?, ?, ?, ?)
                    `, [institute, department, 'Vizianagaram', '']);
                    process.stdout.write('.');
                    count++;
                } else {
                    process.stdout.write('s');
                }

            } catch (err) {
                console.error(`Error inserting ${institute}:`, err.message);
                errors++;
            }
        }

        console.log(`\nImport complete. Added: ${count}, Errors: ${errors}`);
        process.exit(0);

    } catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}

importCenters();
