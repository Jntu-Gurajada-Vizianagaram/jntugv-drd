import { Mail } from "lucide-react";

export default function ViceChancellorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-blue-950 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hon'ble Vice-Chancellor</h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-slate-100 relative">
                            <img
                                src="https://jntugv.edu.in/static/media/vc.1d93f5ebef1ab0a5e73b.png"
                                alt="Prof. V.V. Subba Rao"
                                className="w-full h-full object-cover min-h-[300px] object-top"
                            />
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-1">Prof. V.V. Subba Rao</h2>
                            <p className="text-amber-600 font-medium text-lg mb-6">Vice-Chancellor, JNTU-GV</p>

                            <div className="space-y-4 text-slate-600 mb-8">
                                <p className="leading-relaxed">
                                    Prof. Venkata Subba Rao is a distinguished academician and researcher with over three decades of experience in teaching and administration. As the Vice-Chancellor of JNTU-GV, he is committed to transforming the university into a hub of excellence in engineering and technology education.
                                </p>
                                <p className="leading-relaxed">
                                    His vision focuses on integrating modern pedagogical methods with robust research initiatives to produce industry-ready graduates and innovative scholars.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <span>vc@jntugv.edu.in</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
