import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, CheckCircle2 } from "lucide-react";

export default function ResearchPage() {
    const departments = [
        {
            name: "Civil Engineering",
            areas: ["Structural Engineering", "Geotechnical Engineering", "Water Resources Engineering", "Transportation Engineering", "Environmental Engineering"]
        },
        {
            name: "Electrical and Electronics Engineering",
            areas: ["Power Systems", "Power Electronics", "Control Systems", "Electrical Drives", "High Voltage Engineering"]
        },
        {
            name: "Mechanical Engineering",
            areas: ["Thermal Engineering", "Machine Design", "Manufacturing Technology", "Robotics and Automation", "Industrial Engineering"]
        },
        {
            name: "Electronics and Communication Engineering",
            areas: ["VLSI Design", "Signal Processing", "Embedded Systems", "Communication Systems", "Antenna Design"]
        },
        {
            name: "Computer Science and Engineering",
            areas: ["Artificial Intelligence & ML", "Data Science", "Cyber Security", "Cloud Computing", "Software Engineering"]
        },
        {
            name: "Information Technology",
            areas: ["Network Security", "Internet of Things (IoT)", "Big Data Analytics", "Web Technologies", "Information Retrieval"]
        },
        {
            name: "Metallurgical Engineering",
            areas: ["Material Science", "Nano Technology", "Physical Metallurgy", "Corrosion Engineering", "Ceramics"]
        },
        {
            name: "Mathematics",
            areas: ["Applied Mathematics", "Computational Fluid Dynamics", "Operations Research", "Mathematical Modeling", "Algebra and Analysis"]
        },
        {
            name: "Chemistry",
            areas: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry", "Nano Materials"]
        },
        {
            name: "Physics",
            areas: ["Condensed Matter Physics", "Nuclear Physics", "Optical Physics", "Material Science", "Electronics"]
        },
        {
            name: "Management Studies",
            areas: ["Human Resource Management", "Financial Management", "Marketing Management", "Operations Management", "Strategic Management"]
        },
        {
            name: "Pharmaceutical Sciences",
            areas: ["Pharmaceutics", "Pharmaceutical Analysis", "Pharmacology", "Medicinal Chemistry", "Pharmacognosy"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="bg-blue-950 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <FlaskConical className="h-8 w-8 text-amber-500" />
                        <span className="text-amber-500 font-medium tracking-wide">R&D CELL</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-6">
                        Research @ JNTUGV
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                    <p className="text-center text-blue-200 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        Fostering a vibrant research culture and solving real-world challenges through interdisciplinary innovation across engineering and technology.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Departments Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <CheckCircle2 className="h-6 w-6 text-amber-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Key Research Areas</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dept, i) => (
                            <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden">
                                <CardHeader className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-100 pb-4 h-24 flex items-center justify-center">
                                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-blue-900 transition-colors text-center leading-tight">
                                        {dept.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {dept.areas.map((area, j) => (
                                            <span key={j} className="px-3 py-1 bg-white text-slate-600 text-xs font-semibold rounded-full border border-slate-200 shadow-sm group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
