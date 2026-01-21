const db = require('./backend/config/db');

async function checkSchema() {
    try {
        console.log("Checking research_centers schema...");
        const [columns] = await db.execute("SHOW COLUMNS FROM research_centers");
        console.log(columns.map(c => c.Field));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
checkSchema();
