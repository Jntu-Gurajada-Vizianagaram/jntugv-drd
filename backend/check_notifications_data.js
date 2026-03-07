const db = require('./config/db');

async function checkNotifications() {
    try {
        const [rows] = await db.execute('SELECT title, file_path, link, external_link FROM notifications ORDER BY created_at DESC');
        console.log('Notifications Data (Latest 10):');
        console.table(rows.slice(0, 10));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkNotifications();
