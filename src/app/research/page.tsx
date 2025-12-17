import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Download, FileText, CheckCircle2 } from "lucide-react";

export default function ResearchPage() {
    const departments = [
        { name: "Computer Science & Engineering", areas: ["AI/ML", "Data Science", "Cybersecurity", "IoT"] },
        { name: "Electronics & Comm. Engineering", areas: ["VLSI", "Signal Processing", "Embedded Systems", "Antenna Design"] },
        { name: "Mechanical Engineering", areas: ["Robotics", "Thermal Engineering", "Manufacturing", "Composite Materials"] },
        { name: "Information Technology", areas: ["Cloud Computing", "Big Data", "Network Security"] },
        { name: "Civil Engineering", areas: ["Structural Eng.", "Geotechnical", "Transportation", "Water Resources"] },
        { name: "Electrical & Electronics Eng.", areas: ["Power Systems", "Control Systems", "Power Electronics"] },
        { name: "Metallurgical Engineering", areas: ["Materials Science", "Extractive Metallurgy", "Physical Metallurgy", "Corrosion Eng."] }
    ];

    const guidelines = [
        { title: "Ph.D. Regulations 2024", type: "PDF" },
        { title: "Thesis Format Guidelines", type: "DOCX" },
        { title: "Plagiarism Policy", type: "PDF" },
        { title: "Research Ethics Committee Code", type: "PDF" },
        { title: "Supervisor Eligibility Criteria", type: "PDF" }
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
                {/* Guidelines Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Downloads & Guidelines</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guidelines.map((item, i) => (
                            <div key={i} className="group flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                        <FileText className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-slate-900 line-clamp-1">{item.title}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-blue-600">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>

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
                                <CardHeader className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-100 pb-4">
                                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                                        {dept.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="flex flex-wrap gap-2">
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
