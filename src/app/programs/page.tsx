import { BookOpen, CheckCircle, Award } from "lucide-react";

export default function ProgramsOffered() {
    const departments = [
        "Computer Science & Engineering",
        "Electronics & Communication Engineering",
        "Information Technology",
        "Mechanical Engineering",
        "Civil Engineering",
        "Metallurgical Engineering",
        "Electrical & Electronic Engineering"
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-center">
                        Programs Offered Ph.D
                    </h1>
                    <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-8">
                    <div className="p-8 border-b border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                            <BookOpen className="h-6 w-6 text-amber-600" />
                            Departments Offering Ph.D. Programme
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            {departments.map((dept, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                                >
                                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                                    <span className="font-medium text-slate-700">{dept}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-8">
                    <div className="flex items-start gap-4">
                        <Award className="h-10 w-10 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                First Ph.D. Awarded by JNTU-GV
                            </h3>
                            <p className="text-slate-700 leading-relaxed text-lg">
                                The first Ph.D. degree by the JNTU-GV University was awarded in the month of
                                <span className="font-semibold text-blue-900"> December 2023 </span>
                                to
                                <span className="font-semibold text-blue-900"> Dr. R. Gurunadha</span>,
                                Vice-Principal & Controller of Examinations of JNTU-GV for his research on
                                <span className="italic text-slate-900"> “Analog Fault Modeling” </span>
                                under the esteemed guidance of
                                <span className="font-semibold text-blue-900"> Prof. K. Babulu </span>
                                of ECE Dept & Director Admissions and R&D, JNTU-GV.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
