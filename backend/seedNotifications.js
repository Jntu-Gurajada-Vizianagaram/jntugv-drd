const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const notifications = [
    {
        title: "Enrollment in “Research Methodology” Course for Ph.D. Scholars admitted during the Academic Year 2024–25 – Reg.",
        date: "2025-05-01",
        category: "Coursework",
        link: "https://drd.jntugv.edu.in/wp-content/uploads/2025/05/Enrollement-for-Research-methodology.pdf"
    },
    {
        title: "JNTU GV-DR&D-Pre-Ph.D. Subjects",
        date: "2025-04-27",
        category: "Examinations",
        link: "https://drd.jntugv.edu.in/wp-content/uploads/2025/04/jntugvdrdpreph_d_subjectsregistrationform-1.zip"
    },
    {
        title: "JNTU GV-DR&D-Pre-Ph.D. Subjects Registration Form - April 2025",
        date: "2025-04-22",
        category: "Examinations",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSeF96lGn-uMKUjgg27lecwCwUBBpqVfC0D5ZHwdEQiuJFF7Hg/viewform?pli=1"
    },
    {
        title: "D R&D- Ph.D Regulations (2024-2025)",
        date: "2025-02-03",
        category: "Guidelines",
        link: "https://api.jntugv.edu.in/media/PhD%20programme%20guidelines.pdf?_gl=1*1sgmhm3*_ga*OTcyNTA3MzA2LjE3Mzc5NzYzMzg.*_ga_C7DF0JF0L1*MTczODU3NDc2Ny40LjAuMTczODU3NDc2Ny4wLjAuMA.."
    },
    {
        title: "D R&D-Schedule of Research Review Meetings Commencing from 16-12-2024",
        date: "2024-12-16",
        category: "Events",
        link: "https://api.jntugv.edu.in/media/RRM%20Schedule.pdf?_gl=1*nz4v0f*_ga*OTE1NDU2ODU3LjE3MzQ3NzUxODA.*_ga_C7DF0JF0L1*MTczNDc3NTE4MC4xLjEuMTczNDc3NTIxMS4wLjAuMA.."
    },
    {
        title: "Allotment of Supervisors for Research scholar admitted through APRCET-2023 - Communication of schedule - Reg",
        date: "2024-12-11",
        category: "Admissions",
        link: "https://drd.jntugv.edu.in/wp-content/uploads/2024/12/circular-for-supervisor-allotment-1.pdf"
    },
    {
        title: "RRM-Registration",
        date: "2024-11-10",
        category: "Events",
        link: "https://rrmregistration.jntugv.edu.in/"
    },
    {
        title: "R&D-Notification-Research Review Meeting-2024(for application and notification click here)",
        date: "2024-11-05",
        category: "Events",
        link: "https://api.jntugv.edu.in/media/RRM%20JNTUGV%20application%20notification.zip"
    }
];

async function seed() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'jntugv-rd',
            password: 'Jntugv@DRD2025',
            database: 'drd_jntugv'
        });

        console.log("Connected to database...");

        for (const note of notifications) {
            await connection.execute(
                'INSERT INTO notifications (title, category, link, date, created_at) VALUES (?, ?, ?, ?, ?)',
                [note.title, note.category, note.link, note.date, new Date(note.date)]
            );
            console.log(`Inserted: ${note.title}`);
        }

        console.log("Seed completed!");
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}

seed();
