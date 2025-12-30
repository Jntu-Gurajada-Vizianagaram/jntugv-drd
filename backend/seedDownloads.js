const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const downloadItems = [
    {
        title: "Application for No Dues Certificate",
        category: "Certificates",
        link: "/downloads/1-ApplicationforNoDuesCertificate.docx",
        type: "DOCX"
    },
    {
        title: "Application for Anti-Plagiarism Check",
        category: "Plagiarism",
        link: "/downloads/2-ApplicationforAnti_PlagiarismCheck.docx",
        type: "DOCX"
    },
    {
        title: "Issue of Original Certificates (Admission Cancellation)",
        category: "Certificates",
        link: "/downloads/3-IssueofOriginalCertificatesAdmissionCancellation.docx",
        type: "DOCX"
    },
    {
        title: "Application for Resubmission of Thesis",
        category: "Thesis",
        link: "/downloads/4-ApplicationforResubmissionofThesis.docx",
        type: "DOCX"
    },
    {
        title: "Application for Submission of Thesis for Evaluation",
        category: "Thesis",
        link: "/downloads/5-ApplicationforSubmissionofThesisforEvaluation.docx",
        type: "DOCX"
    },
    {
        title: "Application for Extension of Time",
        category: "General",
        link: "/downloads/6-ApplicationforExtensionofTime.docx",
        type: "DOCX"
    },
    {
        title: "Issue of Certificate(s) for Temporary Purpose",
        category: "Certificates",
        link: "/downloads/7-IssueofCertificate(s)forTemporaryPurpose.docx",
        type: "DOCX"
    },
    {
        title: "Application for Re-Submission of Original Certificates",
        category: "Certificates",
        link: "/downloads/8-ApplicationforRe_SubmissionofOriginalCertificates.docx",
        type: "DOCX"
    },
    {
        title: "Application form for Ph.D Coursework",
        category: "Coursework",
        link: "/downloads/9-ApplicationformforPh.DCoursework.docx",
        type: "DOCX"
    },
    {
        title: "Application for Change of Title/Topic",
        category: "General",
        link: "/downloads/10-ApplicationforchangeofTitle,Topic.docx",
        type: "DOCX"
    },
    {
        title: "Application for Colloquium",
        category: "General",
        link: "/downloads/11-ApplicationforColloquium.docx",
        type: "DOCX"
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

        // Clear existing to avoid duplicates? Or just insert.
        // Let's truncate for clean slate or check existence.
        // Simply inserting for now.

        for (const item of downloadItems) {
            // Check if link starts with /downloads, implies it's a file path potentially?
            // Current setup: link column stores the link. 
            // BUT, if it's a local file, we might want to store it in file_path?
            // The frontend logic: if(file_path) use BACKEND_URL + file_path.
            // These DOCX files are in PUBLIC folder of NEXTJS, not BACKEND UPLOADS.
            // So we should treat them as External Links (type Link or DOCX) with 'link' property pointing to relative URL.
            // Wait, getLink function uses BACKEND_URL if file_path exists.
            // If we put these in 'link', it returns item.link.
            // These links are relative to Next.js root: /downloads/...
            // So they work fine as 'link'.

            await connection.execute(
                'INSERT INTO downloads (title, category, type, link) VALUES (?, ?, ?, ?)',
                [item.title, item.category, item.type, item.link]
            );
            console.log(`Inserted: ${item.title}`);
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
