export interface SponsoredProject {
    id: number;
    title: string;
    principalInvestigator: string;
    piDesignation?: string;
    coInvestigator: string;
    coPiDesignation?: string;
    budgetInLakhs: string;
    sponsoringAgency: string;
    period: string;
    status: "Completed" | "On-going";
}

export const sponsoredProjects: SponsoredProject[] = [
    {
        id: 1,
        title: "Synthesis and characterization of nanoredmud particle reinforced aluminium matrix composites",
        principalInvestigator: "Dr. Swami Naidu Gurugubelli",
        piDesignation: "Professor in Metallurgical Engineering, JNTUGV College of Engineering, Vizianagaram",
        coInvestigator: "Prof. N. R. M. R. Bhargava",
        coPiDesignation: "Professor in Metallurgical Engineering (Rtd), AU College of Engineering, Visakhapatnam",
        budgetInLakhs: "13.902",
        sponsoringAgency: "UGC, New Delhi",
        period: "2013-16",
        status: "Completed",
    },
    {
        id: 2,
        title: "A novel ECAR technique to produce AA5083 aluminum alloy with high deformation homogeneity and improved mechanical properties for naval applications",
        principalInvestigator: "Dr. Swami Naidu Gurugubelli",
        piDesignation: "Professor in Metallurgical Engineering, JNTUGV College of Engineering, Vizianagaram",
        coInvestigator: "Dr. K. Srinivas Prasad",
        coPiDesignation: "Assistant Professor in Mechanical Engineering, JNTUGV College of Engineering, Vizianagaram",
        budgetInLakhs: "33.628",
        sponsoringAgency: "Naval Research Board",
        period: "2019-21",
        status: "Completed",
    },
    {
        id: 3,
        title: "Characterisation of nanostructured redbud particle dispersed AlFeTiCoCr high entropy alloy synthesized by mechanical alloying and spark plasma sintering",
        principalInvestigator: "Dr. Swami Naidu Gurugubelli",
        piDesignation: "Professor in Metallurgical Engineering, JNTUGV College of Engineering, Vizianagaram",
        coInvestigator: "—",
        budgetInLakhs: "29.00",
        sponsoringAgency: "SERB, New Delhi",
        period: "2023-26",
        status: "On-going",
    },
    {
        id: 4,
        title: "Solid state recycling of aerospace Al alloys by a Novel ECAR technique",
        principalInvestigator: "Dr. Swami Naidu Gurugubelli",
        piDesignation: "Professor in Metallurgical Engineering, JNTUGV College of Engineering, Vizianagaram",
        coInvestigator: "—",
        budgetInLakhs: "10.00",
        sponsoringAgency: "RUSA",
        period: "2024-26",
        status: "On-going",
    },
    {
        id: 5,
        title: "A performance investigation of a four-switch-based three-phase grid-connected inverter for residential applications",
        principalInvestigator: "Dr. V. S. Vakula",
        piDesignation: "Assistant Professor in EEE, JNTUGV College of Engineering, Vizianagaram",
        coInvestigator: "—",
        budgetInLakhs: "10.00",
        sponsoringAgency: "RUSA",
        period: "2024-26",
        status: "On-going",
    },
    {
        id: 6,
        title: "Control-oriented lavonoid and predictive analysis of new hybrid natural fibre composites for biomechanical applications",
        principalInvestigator: "Dr. CH. Neelima Devi",
        piDesignation: "Assistant Professor in Mechanical Engineering, JNTUGV College of Engineering, Vizianagaram",
        coInvestigator: "—",
        budgetInLakhs: "10.00",
        sponsoringAgency: "RUSA",
        period: "2024-26",
        status: "On-going",
    },
];
