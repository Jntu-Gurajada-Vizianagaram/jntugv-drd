const db = require('./config/db');

async function normalizePaths() {
    try {
        const [rows] = await db.execute('SELECT id, file_path FROM notifications WHERE file_path IS NOT NULL');
        console.log(`Checking ${rows.length} notification paths...`);

        for (const row of rows) {
            if (row.file_path && !row.file_path.startsWith('/') && !row.file_path.startsWith('http')) {
                const newPath = `/${row.file_path}`;
                console.log(`Updating ${row.id}: ${row.file_path} -> ${newPath}`);
                await db.execute('UPDATE notifications SET file_path = ? WHERE id = ?', [newPath, row.id]);
            }
        }
        console.log("Normalization complete.");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

normalizePaths();
