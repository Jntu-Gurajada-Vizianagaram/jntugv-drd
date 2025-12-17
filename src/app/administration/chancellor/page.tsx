import { Mail } from "lucide-react";

export default function ChancellorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-blue-950 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hon'ble Chancellor</h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-slate-100 relative">
                            <img
                                src="https://jntugv.edu.in/static/media/chancellor.2ed91f57067384cddd59.jpeg"
                                alt="Just. Syed Abdul Nazeer"
                                className="w-full h-full object-cover min-h-[300px] object-top"
                            />
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-1">Just. Syed Abdul Nazeer</h2>
                            <p className="text-amber-600 font-medium text-lg mb-6">Governor of Andhra Pradesh & Chancellor, JNTU-GV</p>

                            <div className="space-y-4 text-slate-600 mb-8">
                                <p className="leading-relaxed">
                                    Justice Syed Abdul Nazeer is a former judge of the Supreme Court of India and currently serves as the 24th Governor of Andhra Pradesh. As the Chancellor of Jawaharlal Nehru Technological University - Gurajada Vizianagaram, he provides visionary guidance and leadership to the university system.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <span className="text-sm">Raj Bhavan, Vijayawada, Andhra Pradesh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
