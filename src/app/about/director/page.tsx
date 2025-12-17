import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function DirectorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-blue-950 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Director, R&D</h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-slate-100 relative">
                            <img
                                src="https://jntugv.edu.in/static/media/dr&d.06287b589b1153fcddb4.jpg"
                                alt="Dr. G. Swami Naidu"
                                className="w-full h-full object-cover min-h-[300px]"
                            />
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-1">Dr. G. Swami Naidu</h2>
                            <p className="text-amber-600 font-medium text-lg mb-6">Director, Research & Development</p>

                            <div className="space-y-4 text-slate-600 mb-8">
                                <p className="leading-relaxed">
                                    Dr. G. Swami Naidu is a distinguished academician and administrator with extensive experience in research and engineering education. As the Director of R&D, he spearheads the university's mission to foster a vibrant research ecosystem, encouraging interdisciplinary collaboration and innovation.
                                </p>
                                <p className="leading-relaxed">
                                    Under his leadership, the directorate aims to streamline research processes, support scholars in their doctoral journeys, and facilitate high-impact publications and patents.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <span>dr@jntugv.edu.in</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <span>+91 8922-222606</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <span>JNTU-GV, Vizianagaram, Andhra Pradesh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
