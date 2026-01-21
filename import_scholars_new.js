const fs = require('fs');
const path = require('path');
const db = require('./backend/config/db');

async function importScholars() {
    try {
        const dataPath = path.join(__dirname, 'raw_scholars_new.txt');
        const content = fs.readFileSync(dataPath, 'utf-8');
        const lines = content.split('\n').filter(l => l.trim());

        console.log(`Found ${lines.length} lines. Processing...`);

        // Skip header if present (starts with S.NO)
        const startIndex = lines[0].toLowerCase().includes('s.no') ? 1 : 0;

        let count = 0;
        let errors = 0;

        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = line.split('\t').map(p => p.trim());

            // Expected columns: S.NO, Roll Number, Name, FT/PT, Dept, Supervisor, Co-Supervisor
            if (parts.length < 5) {
                console.log(`Skipping invalid line ${i + 1}: ${line}`);
                continue;
            }

            // Extract logic
            const rollNumber = parts[1];
            const name = parts[2];
            const statusFull = parts[3]; // FT/PT
            const department = parts[4];
            const supervisor = parts[5];
            const coSupervisor = parts[6] === '-------' || parts[6] === '----' || parts[6] === '-----' || parts[6] === '---' || !parts[6] ? null : parts[6];

            const status = statusFull === 'FT' ? 'Full-Time' : 'Part-Time';

            const batchPrefix = rollNumber.substring(0, 2);
            let admissionYear = '20' + batchPrefix;
            if (rollNumber.startsWith('120022')) admissionYear = '2012';

            try {
                // Determine existing by roll number
                const [exists] = await db.execute('SELECT id FROM scholars WHERE roll_number = ?', [rollNumber]);

                if (exists.length > 0) {
                    await db.execute(`
                        UPDATE scholars 
                        SET scholar_name = ?, department = ?, supervisor_name = ?, co_supervisor_name = ?, admission_mode = ?, admission_year = ?
                        WHERE roll_number = ?
                    `, [name, department, supervisor, coSupervisor, status, admissionYear, rollNumber]);
                } else {
                    await db.execute(`
                        INSERT INTO scholars (roll_number, scholar_name, department, supervisor_name, co_supervisor_name, admission_mode, admission_year)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    `, [rollNumber, name, department, supervisor, coSupervisor, status, admissionYear]);
                }
                process.stdout.write('.');
                count++;
            } catch (err) {
                console.error(`Error inserting ${rollNumber}:`, err.message);
                errors++;
            }
        }

        console.log(`\nImport complete. Success: ${count}, Errors: ${errors}`);
        process.exit(0);

    } catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}

importScholars();
