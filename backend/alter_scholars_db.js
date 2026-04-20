const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

async function run() {
    const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Anil@73',
        database: process.env.DB_NAME || 'drd_jntugv'
    };
    const c = await mysql.createConnection(dbConfig);
    
    const queries = [
        "ALTER TABLE scholars ADD COLUMN stage_1 BOOLEAN DEFAULT 0;",
        "ALTER TABLE scholars ADD COLUMN stage_2 BOOLEAN DEFAULT 0;",
        "ALTER TABLE scholars ADD COLUMN examiner_data TEXT;",
        "ALTER TABLE scholars ADD COLUMN stage_6 BOOLEAN DEFAULT 0;",
        "ALTER TABLE scholars ADD COLUMN stage_7 BOOLEAN DEFAULT 0;"
    ];

    for (let q of queries) {
        try {
            await c.query(q);
            console.log("Executed: ", q);
        } catch(e) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log("Column already exists for query: ", q);
            } else {
                console.error(e.message);
            }
        }
    }
    
    // Set default examiner_data to existing records
    const defaultExaminers = JSON.stringify({
        examiner1: { name: "", acceptance: false, dispatch: false, receipt: false },
        examiner2: { name: "", acceptance: false, dispatch: false, receipt: false },
        examiner3: { name: "", acceptance: false, dispatch: false, receipt: false }
    });
    
    await c.query(`UPDATE scholars SET examiner_data = ? WHERE examiner_data IS NULL`, [defaultExaminers]);
    console.log("Updated default examiner data");
    
    await c.end();
}

run();
