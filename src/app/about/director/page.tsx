"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Quote, Award, BookOpen } from "lucide-react";

export default function DirectorPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with Premium Gradient */}
            <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">Director, R&D</h1>
                        <div className="w-32 h-1.5 bg-amber-500 mx-auto rounded-full shadow-lg shadow-amber-500/30" />
                        <p className="mt-6 text-blue-100 text-lg md:text-xl font-light max-w-2xl mx-auto">
                            Leading Innovation & Excellence in Research
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 md:-mt-24 relative z-20 pb-20">
                <motion.div
                    className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100/50"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row min-h-[600px]">
                        {/* Image Section - Fixed Layout Issue */}
                        <div className="md:w-5/12 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img
                                src="https://jntugv.edu.in/static/media/dr&d.06287b589b1153fcddb4.jpg"
                                alt="Dr. G. Swami Naidu"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 p-6 z-20 text-white transform translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-serif italic text-lg opacity-90">"Research is seeing what everybody else has seen and thinking what nobody else has thought."</p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-7/12 p-8 md:p-12 lg:p-16 bg-white flex flex-col justify-center">
                            <motion.div
                                {...fadeIn}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-6">
                                    ADMINISTRATION
                                </div>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 font-serif">
                                    Dr. G. Swami Naidu
                                </h2>
                                <p className="text-amber-600 font-medium text-xl mb-8 flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    Director, Research & Development
                                </p>

                                <div className="prose prose-lg text-slate-600 mb-10 leading-relaxed">
                                    <p className="mb-6 relative pl-6 border-l-4 border-blue-200">
                                        <Quote className="absolute -top-2 -left-2 w-4 h-4 text-blue-200 -z-10 bg-white" />
                                        Dr. G. Swami Naidu is a distinguished academician and administrator with extensive experience in research and engineering education. As the Director of R&D, he spearheads the university's mission to foster a vibrant research ecosystem, encouraging interdisciplinary collaboration and innovation.
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <BookOpen className="w-6 h-6 text-blue-900 shrink-0 mt-1" />
                                        <span>
                                            Under his leadership, the directorate aims to streamline research processes, support scholars in their doctoral journeys, and facilitate high-impact publications and patents.
                                        </span>
                                    </p>
                                </div>

                                {/* Contact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-100">
                                    <a href="mailto:dr@jntugv.edu.in" className="group flex items-center p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300">
                                        <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email</p>
                                            <p className="text-slate-700 font-medium">dr@jntugv.edu.in</p>
                                        </div>
                                    </a>
                                    {/* 
                                    <a href="tel:+918922222606" className="group flex items-center p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300">
                                        <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Phone</p>
                                            <p className="text-slate-700 font-medium">+91 8922-222606</p>
                                        </div>
                                    </a> */}

                                    <div className="md:col-span-2 group flex items-start p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300">
                                        <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Location</p>
                                            <p className="text-slate-700 font-medium">JNTU-GV, Vizianagaram, Andhra Pradesh</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
