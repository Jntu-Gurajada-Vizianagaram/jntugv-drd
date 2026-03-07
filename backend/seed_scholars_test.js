const db = require('./config/db');

const scholarsData = [
    { "roll": "22022P0101", "name": "R Bala Murali Krishna", "type": "PT", "dept": "Civil Engineering", "supervisor": "Dr.P.Markandeya Raju", "coSupervisor": "Dr.V.Ravindra" },
    { "roll": "21022P0110", "name": "V Praveen", "type": "PT", "dept": "Civil Engineering", "supervisor": "Dr.P.Markandeya Raju", "coSupervisor": "Dr.G.Yesuratnam" },
    { "roll": "19022P0119", "name": "Ch Giridhar Kumar", "type": "PT", "dept": "Civil Engineering", "supervisor": "Dr.P Subba Rao", "coSupervisor": "-" },
    { "roll": "22022P0201", "name": "P Maheswara Rao", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.K.Srikumar", "coSupervisor": "-" },
    { "roll": "22022P0202", "name": "T Karthik", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.V.S.Vakula", "coSupervisor": "-" },
    { "roll": "21022P0213", "name": "T Amar Kiran", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.V.S.Vakula", "coSupervisor": "-" },
    { "roll": "19022P0250", "name": "Sai Ganesh M", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.D.Vijaya Kumar", "coSupervisor": "Dr.V.S.Vakula" },
    { "roll": "19022P0219", "name": "Anil Kumar P", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.P.Sekhar", "coSupervisor": "Dr.V.S.Vakula" },
    { "roll": "19022P0210", "name": "R V L Narayan Divakar", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.G.Syam Naresh", "coSupervisor": "Dr.Y.S.Kishore Babu" },
    { "roll": "19022P0246", "name": "Tammineni Sireesha", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.K.Srikumar", "coSupervisor": "Dr.A.Padmaja" },
    { "roll": "19022P0230", "name": "P Sivakumar", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.V.S.Vakula", "coSupervisor": "-" },
    { "roll": "18022P0213", "name": "P Karunakar", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.K.Srikumar", "coSupervisor": "-" },
    { "roll": "15022P0216", "name": "K Swetha", "type": "PT", "dept": "Electrical & Electronics Engineering", "supervisor": "Dr.D.Vijaya Kumar", "coSupervisor": "Dr.V.S.Vakula" },
    { "roll": "22022P0301", "name": "T Jagadeesh", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.C.L.V.R.S.V.Prasad", "coSupervisor": "Dr.G.Swami Naidu" },
    { "roll": "22022P0302", "name": "D Nagaraju", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.S.Subrahmanyam Mendu", "coSupervisor": "Dr.C.Neelima Devi" },
    { "roll": "21022P0337", "name": "P Aknath", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.P.Vijay Kumar", "coSupervisor": "Dr.C.Neelima Devi" },
    { "roll": "21022P0336", "name": "A Sai sree Harsha", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.P.Jamaleswara Kumar", "coSupervisor": "Dr.K.Srinivasa Prasad" },
    { "roll": "21022P0329", "name": "D Appanna", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.K.Srinivas Prasad", "coSupervisor": "Dr.G.Swami Naidu" },
    { "roll": "21022P0328", "name": "Gowri Shankar Kaitha", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.C.Neelima Devi", "coSupervisor": "-" },
    { "roll": "21022P0321", "name": "S Roopa", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.G.Swami Naidu", "coSupervisor": "-" },
    { "roll": "21022P0309", "name": "A V S Gowtham", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.G.Swami Naidu", "coSupervisor": "-" },
    { "roll": "21022P0302", "name": "V Gangadhar Praveen Ketha", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.C.Neelima Devi", "coSupervisor": "-" },
    { "roll": "21022P0339", "name": "M Jayaprakash", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.K.Srinivas Prasad", "coSupervisor": "-" },
    { "roll": "19022P0330", "name": "Abdul Khurshid", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.C.Neelima Devi", "coSupervisor": "Dr.G.Swami Naidu" },
    { "roll": "120022P0329", "name": "Brahmananda Reddy Sathi", "type": "PT", "dept": "Mechanical Engineering", "supervisor": "Dr.N.Hari babu", "coSupervisor": "Dr.G.Swami Naidu" },
    { "roll": "22022P0401", "name": "M Krishna Priya", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.K.Babulu", "coSupervisor": "Dr.M.Hema" },
    { "roll": "22022P0402", "name": "B Priyanka", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.P.Satishh Rama Chowdary", "coSupervisor": "Dr.K.C.B.Rao" },
    { "roll": "21022P0444", "name": "V Jeevan Kumar", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.B.Nalini", "coSupervisor": "-" },
    { "roll": "21022P0422", "name": "V Vijaya Santhi", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.B.Nalini", "coSupervisor": "-" },
    { "roll": "21022P0457", "name": "G Mani Kanta", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.A.Vamsee Krishna", "coSupervisor": "Dr.M.Nalini" },
    { "roll": "19022P0408", "name": "T Venkata Rao", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.K.Babulu", "coSupervisor": "Dr.G.Appala Naidu" },
    { "roll": "19022P0430", "name": "V Bharathi Devarakonda", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.K.Babulu", "coSupervisor": "Dr.M.Hema" },
    { "roll": "15022P0406", "name": "B Sekhar", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.K.V.Ramanayya", "coSupervisor": "Dr.K.Babulu" },
    { "roll": "15022P0477", "name": "Sagara Pandu", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.G.Manmadha Rao", "coSupervisor": "-" },
    { "roll": "15022P0427", "name": "T Srinivasa Rao", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.Ch.Srinivasu", "coSupervisor": "Dr.K.Babulu" },
    { "roll": "15022P0460", "name": "B Lakshmi", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.N.Kamaraju", "coSupervisor": "Dr.K.Babulu" },
    { "roll": "14022P0442", "name": "P Bujji Babu", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.N.Kamaraju", "coSupervisor": "Dr.K.Babulu" },
    { "roll": "13022P0411", "name": "V Prasanth", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.K.Babulu", "coSupervisor": "Dr.N.Kamaraju" },
    { "roll": "13022P0403", "name": "K Himabindu", "type": "PT", "dept": "Electronics & Communication Engineering", "supervisor": "Dr.K.Babulu", "coSupervisor": "Dr.G.N.Swamy" },
    { "roll": "22022P0501", "name": "N Sarath Kumar", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.R.Rajeswara Rao", "coSupervisor": "-" },
    { "roll": "22022P0502", "name": "T Anil Kumar", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.R.Rajeswara Rao", "coSupervisor": "-" },
    { "roll": "22022P0503", "name": "T Balaji", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "22022P0504", "name": "B Usha Rani", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "22022P0505", "name": "G Naveen", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr. Salina Adinarayana", "coSupervisor": "Dr.R.Rajeswara Rao" },
    { "roll": "22022P0506", "name": "R Swetha", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr. Patchikolla Satish", "coSupervisor": "Dr.D.Rajyalakshmi" },
    { "roll": "22022P0507", "name": "V Pranav", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.Golagani A V R C Rao", "coSupervisor": "Dr.G.Jayasuma" },
    { "roll": "22022P0508", "name": "M Sharmila", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.Karimsetty Sujatha", "coSupervisor": "Dr.D.Rajyalakshmi" },
    { "roll": "22022P0509", "name": "D Suneel", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.Adimalla Rama Rao", "coSupervisor": "Dr.B.Tirumala Rao" },
    { "roll": "22022P0510", "name": "L Ramu", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.T.V.Madhusudhana Rao", "coSupervisor": "Dr.Ch.Bindu Madhuri" },
    { "roll": "22022P0511", "name": "B Kishore Kumar", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.K.N.Brahmaji Rao", "coSupervisor": "Dr.Ch.Bindu Madhuri" },
    { "roll": "22022P0512", "name": "B Srirama Durga Lakshmi", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.Ch.Ramesh", "coSupervisor": "Dr.Rajeswara Rao" },
    { "roll": "22022P0513", "name": "G Gayatri", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.R.Sivaranjani", "coSupervisor": "Dr.D.Rajyalakshmi" },
    { "roll": "22022P0514", "name": "N Ranga sree", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.Lakshmi Lydia", "coSupervisor": "Dr.P.Aruna Kumari" },
    { "roll": "22022P0515", "name": "S Kalyan", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr. Attada Venkataramana", "coSupervisor": "Dr.P.Aruna Kumari" },
    { "roll": "22022P0516", "name": "S Ratalu", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.P.Srinivasa Rao", "coSupervisor": "Dr.P.Aruna Kumari" },
    { "roll": "22022P0517", "name": "M Kishore Babu", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr. Challa Narasimham", "coSupervisor": "Dr.R.Rajeswara Rao" },
    { "roll": "22022P0518", "name": "G Lakshmana Rao", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr. Pendela Kanchnamala", "coSupervisor": "Dr.Ch.Bindu Madhuri" },
    { "roll": "22022P0519", "name": "Khasimbee Shaik", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.K.V.Satyanarayana", "coSupervisor": "Dr.B.Tirumala Rao" },
    { "roll": "22022P0520", "name": "S Sreenivasa Rao", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.M.Jayanthi Rao", "coSupervisor": "Dr.G.Jayasuma" },
    { "roll": "21022P0502", "name": "Y Kumar Sekhar", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "21022P0533", "name": "S Sree Latha", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.P.Satheesh", "coSupervisor": "Dr.Ch.Bindu Madhuri" },
    { "roll": "21022P0534", "name": "P Rajya Lakshmi", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.P.Aruna Kumari", "coSupervisor": "-" },
    { "roll": "21022P0547", "name": "Alamanda Sophia", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.B.Tirumala Rao", "coSupervisor": "-" },
    { "roll": "21022P0557", "name": "D Muninder", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.P.Aruna Kumari", "coSupervisor": "-" },
    { "roll": "21022P0535", "name": "Ch Lakshmi Bala", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "21022P0564", "name": "Pukkalla Bharathi", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.K.Sujatha", "coSupervisor": "Dr.D.Rajyalakshmi" },
    { "roll": "19022P0539", "name": "K Amruta Sagar", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.Pakkiluru Kiran Sree", "coSupervisor": "Dr.D.Rajyalakshmi" },
    { "roll": "19022P0550", "name": "B Siva Jyothi", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.G.Neelima", "coSupervisor": "Dr.D.Rajyalakshmi" },
    { "roll": "19022P0509", "name": "K Aravinda", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "19022P0562", "name": "G Gowri Pushpa", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.K.Jayasri", "coSupervisor": "Dr.Ch.Bindu Madhuri" },
    { "roll": "19022P0571", "name": "P S V Durga Gayatri", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.I Hemalatha", "coSupervisor": "Dr.Ch.Bindu Madhuri" },
    { "roll": "19022P0510", "name": "K Swathi", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "18022P0503", "name": "E Ramesh", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "18022P0518", "name": "Kishan Chand Kopila", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajyalakshmi", "coSupervisor": "-" },
    { "roll": "15022P0567", "name": "D Bhanu Mahesh", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.Ch.Bindu Madhuri", "coSupervisor": "Dr.D.Rajyalakshmi" },
    { "roll": "15022P0552", "name": "Suma Hasan S", "type": "PT", "dept": "Computer Science & Engineering", "supervisor": "Dr.D.Rajya Lakshmi", "coSupervisor": "-" },
    { "roll": "22022P1201", "name": "T Sivarama Krishna", "type": "PT", "dept": "Information technology", "supervisor": "Dr.G.Jayasuma", "coSupervisor": "-" },
    { "roll": "22022P1202", "name": "N Durga Devi", "type": "PT", "dept": "Information technology", "supervisor": "Dr.B.Tirumala Rao", "coSupervisor": "-" },
    { "roll": "19022PMET01", "name": "K Venkatesh", "type": "FT", "dept": "Metallurgical Engineering", "supervisor": "Dr.G.Swami Naidu", "coSupervisor": "-" },
    { "roll": "22022P0MG01", "name": "Hafsa Quaraishi", "type": "PT", "dept": "Master of Business Administration", "supervisor": "Dr.T.Archan Acharya", "coSupervisor": "Dr.P.Sreedevi" }
];

async function seedScholars() {
    try {
        console.log(`Starting seed of ${scholarsData.length} scholars...`);

        // Ensure table exists
        await db.execute(`
            CREATE TABLE IF NOT EXISTS scholars (
                id INT AUTO_INCREMENT PRIMARY KEY,
                scholar_name VARCHAR(255) NOT NULL,
                roll_number VARCHAR(100) UNIQUE NOT NULL,
                department VARCHAR(255),
                supervisor_name VARCHAR(255),
                co_supervisor_name VARCHAR(255),
                admission_year VARCHAR(50),
                admission_mode VARCHAR(100),
                email VARCHAR(255),
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check for missing columns (in case table existed with old schema)
        const [columns] = await db.execute('SHOW COLUMNS FROM scholars');
        const columnNames = columns.map(c => c.Field);

        const schemaFixes = [
            { name: 'scholar_name', type: 'VARCHAR(255) NOT NULL DEFAULT ""' },
            { name: 'roll_number', type: 'VARCHAR(100) UNIQUE NOT NULL DEFAULT ""' },
            { name: 'department', type: 'VARCHAR(255)' },
            { name: 'supervisor_name', type: 'VARCHAR(255)' },
            { name: 'co_supervisor_name', type: 'VARCHAR(255)' },
            { name: 'admission_year', type: 'VARCHAR(50)' },
            { name: 'admission_mode', type: 'VARCHAR(100)' }
        ];

        for (const fix of schemaFixes) {
            if (!columnNames.includes(fix.name)) {
                if (fix.name === 'scholar_name') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN scholar_name VARCHAR(255) NOT NULL DEFAULT ""`);
                }
                if (fix.name === 'roll_number') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN roll_number VARCHAR(100) UNIQUE NOT NULL DEFAULT ""`);
                }
                if (fix.name === 'department') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN department VARCHAR(255)`);
                }
                if (fix.name === 'supervisor_name') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN supervisor_name VARCHAR(255)`);
                }
                if (fix.name === 'co_supervisor_name') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN co_supervisor_name VARCHAR(255)`);
                }
                if (fix.name === 'admission_year') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN admission_year VARCHAR(50)`);
                }
                if (fix.name === 'admission_mode') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN admission_mode VARCHAR(100)`);
                }
                if (column_name === 'name') {
                    await db.execute(`DELETE `);
                }
                if (column_name === 'roll_number') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN roll_number VARCHAR(100) UNIQUE NOT NULL DEFAULT ""`);
                }
                if (column_name === 'department') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN department VARCHAR(255)`);
                }
                if (column_name === 'supervisor_name') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN supervisor_name VARCHAR(255)`);
                }
                if (column_name === 'co_supervisor_name') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN co_supervisor_name VARCHAR(255)`);
                }
                if (column_name === 'admission_year') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN admission_year VARCHAR(50)`);
                }
                if (column_name === 'admission_mode') {
                    await db.execute(`ALTER TABLE scholars ADD COLUMN admission_mode VARCHAR(100)`);
                }
                console.log(`Fixing schema: Adding missing column ${fix.name}...`);
                await db.execute(`ALTER TABLE scholars ADD COLUMN ${fix.name} ${fix.type}`);
            }
        }

        for (const s of scholarsData) {
            // Extract year from roll number (first 2 digits)
            let roll = s.roll || "";
            let year = '20' + roll.substring(0, 2);
            if (isNaN(parseInt(roll.substring(0, 2)))) year = '2023'; // fallback

            // Sanitize inputs to avoid undefined
            const name = s.name || "";
            const dept = s.dept || null;
            const supervisor = s.supervisor || null;
            const coSupervisor = s.coSupervisor || null;
            const mode = s.type === 'PT' ? 'Part-Time' : 'Full-Time';

            await db.execute(
                `INSERT INTO scholars
                    (scholar_name, roll_number, department, supervisor_name, co_supervisor_name, admission_mode, admission_year) 
                VALUES(?, ?, ?, ?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                scholar_name = VALUES(scholar_name),
                    department = VALUES(department),
                    supervisor_name = VALUES(supervisor_name),
                    co_supervisor_name = VALUES(co_supervisor_name),
                    admission_mode = VALUES(admission_mode),
                    admission_year = VALUES(admission_year)`,
                [name, roll, dept, supervisor, coSupervisor, mode, year]
            );
        }

        console.log("Seed completed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Seed failed:", err.message);
        process.exit(1);
    }
}

seedScholars();
