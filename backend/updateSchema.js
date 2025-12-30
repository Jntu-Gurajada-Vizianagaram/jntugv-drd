const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function updateSchema() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'jntugv-rd',
            password: 'Jntugv@DRD2025',
            database: 'drd_jntugv'
        });

        console.log("Connected to database...");

        // 1. Scholars
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS scholars (
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
            )
        `);
        console.log("Scholars table created/verified.");

        // 2. Research Areas
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS research_areas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Research Areas table created/verified.");

        // 3. Research Centers
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS research_centers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                coordinator VARCHAR(255),
                location VARCHAR(255),
                description TEXT,
                contact_info VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Research Centers table created/verified.");

        // 4. Subjects
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS subjects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                subject_code VARCHAR(50) UNIQUE NOT NULL,
                subject_name VARCHAR(255) NOT NULL,
                credits INT,
                department VARCHAR(100),
                type VARCHAR(50) DEFAULT 'Core',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Subjects table created/verified.");

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("Schema update failed:", error);
        process.exit(1);
    }
}

updateSchema();
