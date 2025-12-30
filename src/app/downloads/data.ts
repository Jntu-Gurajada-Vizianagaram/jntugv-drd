export interface DownloadItem {
    id: number;
    title: string;
    category: string;
    link: string;
    type: "PDF" | "DOCX" | "Form" | "Link";
}

export const downloadItems: DownloadItem[] = [
    {
        id: 1,
        title: "Application for No Dues Certificate",
        category: "Certificates",
        link: "/downloads/1-ApplicationforNoDuesCertificate.docx",
        type: "DOCX"
    },
    {
        id: 2,
        title: "Application for Anti-Plagiarism Check",
        category: "Plagiarism",
        link: "/downloads/2-ApplicationforAnti_PlagiarismCheck.docx",
        type: "DOCX"
    },
    {
        id: 3,
        title: "Issue of Original Certificates (Admission Cancellation)",
        category: "Certificates",
        link: "/downloads/3-IssueofOriginalCertificatesAdmissionCancellation.docx",
        type: "DOCX"
    },
    {
        id: 4,
        title: "Application for Resubmission of Thesis",
        category: "Thesis",
        link: "/downloads/4-ApplicationforResubmissionofThesis.docx",
        type: "DOCX"
    },
    {
        id: 5,
        title: "Application for Submission of Thesis for Evaluation",
        category: "Thesis",
        link: "/downloads/5-ApplicationforSubmissionofThesisforEvaluation.docx",
        type: "DOCX"
    },
    {
        id: 6,
        title: "Application for Extension of Time",
        category: "General",
        link: "/downloads/6-ApplicationforExtensionofTime.docx",
        type: "DOCX"
    },
    {
        id: 7,
        title: "Issue of Certificate(s) for Temporary Purpose",
        category: "Certificates",
        link: "/downloads/7-IssueofCertificate(s)forTemporaryPurpose.docx",
        type: "DOCX"
    },
    {
        id: 8,
        title: "Application for Re-Submission of Original Certificates",
        category: "Certificates",
        link: "/downloads/8-ApplicationforRe_SubmissionofOriginalCertificates.docx",
        type: "DOCX"
    },
    {
        id: 9,
        title: "Application form for Ph.D Coursework",
        category: "Coursework",
        link: "/downloads/9-ApplicationformforPh.DCoursework.docx",
        type: "DOCX"
    },
    {
        id: 10,
        title: "Application for Change of Title/Topic",
        category: "General",
        link: "/downloads/10-ApplicationforchangeofTitle,Topic.docx",
        type: "DOCX"
    },
    {
        id: 11,
        title: "Application for Colloquium",
        category: "General",
        link: "/downloads/11-ApplicationforColloquium.docx",
        type: "DOCX"
    }
];
