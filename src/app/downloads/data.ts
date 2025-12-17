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
        title: "Application for NO DUES Certificate",
        category: "Certificates",
        link: "https://drive.google.com/open?id=17R7Pd3tqYJGrq17WHXAkMI5ZvBRkIUar&usp=drive_copy",
        type: "Form"
    },
    {
        id: 2,
        title: "Application for Anti – Plagiarism Check (1st/2nd/3rd time)",
        category: "Plagiarism",
        link: "https://drive.google.com/open?id=1NBZ5WnVsRszek9p7FPLwbg8d7jnVXu6J&usp=drive_copy",
        type: "Form"
    },
    {
        id: 3,
        title: "Research Document / Form 3",
        category: "General",
        link: "https://drive.google.com/open?id=1jk_Nr2AvTu3zvgNXbqCubjmeYvUCkop3&usp=drive_copy",
        type: "Link"
    },
    {
        id: 4,
        title: "Research Document / Form 4",
        category: "General",
        link: "https://drive.google.com/open?id=1szV-5tsSXDRyfbzN51g92ahn6Fy0YgSr&usp=drive_copy",
        type: "Link"
    },
    {
        id: 5,
        title: "Research Document / Form 5",
        category: "General",
        link: "https://drive.google.com/open?id=1kI2dtGW5820rrMP_cKRVSo4iTgfARraE&usp=drive_copy",
        type: "Link"
    },
    {
        id: 6,
        title: "Research Document / Form 6",
        category: "General",
        link: "https://drive.google.com/open?id=1AIgRiiEcvKP85fVUHPs4qo_CLDp1VXUr&usp=drive_copy",
        type: "Link"
    },
    {
        id: 7,
        title: "Research Document / Form 7",
        category: "General",
        link: "https://drive.google.com/open?id=1plGgF2Nm78VpEUCWTVrcFDuQZE-ygDB7&usp=drive_copy",
        type: "Link"
    },
    {
        id: 8,
        title: "Research Document / Form 8",
        category: "General",
        link: "https://drive.google.com/open?id=1qXE7KwK0IWlG6n_yBEphc1umX8dsiYXn&usp=drive_copy",
        type: "Link"
    },
    {
        id: 9,
        title: "Research Document / Form 9",
        category: "General",
        link: "https://drive.google.com/open?id=1PnY84pGLpFAGj1uEWaOfuhdSPgt4VWkx&usp=drive_copy",
        type: "Link"
    },
    {
        id: 10,
        title: "Research Document / Form 10",
        category: "General",
        link: "https://drive.google.com/open?id=1ED5C4oqC1UJ3K6-ZgEJN7AQwRcYW4K4F&usp=drive_copy",
        type: "Link"
    }
];
