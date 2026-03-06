const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function main() {
    const log = (msg) => {
        console.log(msg);
        try { fs.appendFileSync('fix_db.log', msg + '\n'); } catch (e) { }
    };

    try {
        log("Starting DB Fix...");

        // 1. Create .env file
        const envContent = `DB_HOST=localhost
DB_USER=jntugv-rd
DB_PASSWORD=Jntugv@DRD2025
DB_NAME=drd_jntugv
PORT=6000
INTERNAL_BACKEND_URL=http://localhost:6000
`;
        try {
            fs.writeFileSync('.env', envContent);
            log(".env file created.");
        } catch (e) {
            log("Could not write .env file (might be locked): " + e.message);
        }

        // 2. Connect as root to setup user and db
        log("Connecting as root...");
        let connection;
        try {
            connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'Anil@73'
            });
        } catch (e) {
            log("Could not connect as root. Trying jntugv-rd directly...");
            connection = await mysql.createConnection({
                host: 'localhost',
                user: 'jntugv-rd',
                password: 'Jntugv@DRD2025'
            });
        }

        // 3. Create Database
        await connection.execute("CREATE DATABASE IF NOT EXISTS drd_jntugv");
        log("Database drd_jntugv created/verified.");

        // 4. Create User (Only if we are root)
        if (connection.config.user === 'root') {
            try {
                // Check if user exists
                const [users] = await connection.execute("SELECT User FROM mysql.user WHERE User = 'jntugv-rd'");
                if (users.length === 0) {
                    await connection.execute("CREATE USER 'jntugv-rd'@'localhost' IDENTIFIED BY 'Jntugv@DRD2025'");
                    log("User 'jntugv-rd' created.");
                } else {
                    log("User 'jntugv-rd' already exists.");
                    // Optional: Update password to ensure it matches
                    // await connection.execute("ALTER USER 'jntugv-rd'@'localhost' IDENTIFIED BY 'Jntugv@DRD2025'");
                }

                await connection.execute("GRANT ALL PRIVILEGES ON drd_jntugv.* TO 'jntugv-rd'@'localhost'");
                await connection.execute("FLUSH PRIVILEGES");
                log("Privileges granted.");
            } catch (e) {
                log("User creation/grant warning: " + e.message);
            }
        }

        await connection.end();

        // 6. Run Schema Updates 
        const userConnection = await mysql.createConnection({
            host: 'localhost',
            user: 'jntugv-rd',
            password: 'Jntugv@DRD2025',
            database: 'drd_jntugv'
        });

        const tables = [
            `CREATE TABLE IF NOT EXISTS scholars (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                roll_number VARCHAR(50) UNIQUE NOT NULL,
                department VARCHAR(100),
                supervisor VARCHAR(255),
                admission_year VARCHAR(4),
                status VARCHAR(50) DEFAULT 'Full-Time',
                email VARCHAR(255),
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE IF NOT EXISTS research_areas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE IF NOT EXISTS research_centers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                coordinator VARCHAR(255),
                location VARCHAR(255),
                description TEXT,
                contact_info VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE IF NOT EXISTS subjects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                subject_code VARCHAR(50) UNIQUE NOT NULL,
                subject_name VARCHAR(255) NOT NULL,
                credits INT,
                department VARCHAR(100),
                type VARCHAR(50) DEFAULT 'Core',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE IF NOT EXISTS notifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                file_path VARCHAR(255),
                link VARCHAR(255),
                date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE IF NOT EXISTS downloads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                type VARCHAR(50) NOT NULL,
                link VARCHAR(255),
                file_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        ];

        for (const sql of tables) {
            await userConnection.execute(sql);
        }
        log("Tables created.");

        await userConnection.end();
        log("SUCCESS! Database setup complete.");

    } catch (e) {
        log("ERROR: " + e.message);
        console.error(e);
        process.exit(1);
    }
}

main();
