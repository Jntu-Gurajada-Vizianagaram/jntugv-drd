"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Bell, Mail, Calendar, Download, Users, School } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { url } from "inspector";

interface Notification {
    date: string;
    category: string;
    title: string;
    link?: string;
    file_path?: string;
    external_text?: string;
    external_link?: string;
}


interface HomeClientProps {
    notifications: Notification[];
}

export default function HomeClient({ notifications }: HomeClientProps) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            {/* HERO SECTION - ACADEMIC STYLE */}
            <section className="relative h-[500px] lg:h-[600px] flex items-center justify-center bg-[#0a1e3f] overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

                <div className="container mx-auto px-6 relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-blue-400 bg-blue-900/30 backdrop-blur-xs text-sm font-medium tracking-wide text-blue-200 mb-4">
                            Directorate of Research & Development
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black leading-tight">
                            Fostering Innovation <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                Empowering Research
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                            Jawaharlal Nehru Technological University - Gurajada Vizianagaram is dedicated to advancing interdisciplinary research and nurturing scholarly excellence.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Link href="/research">
                                <Button size="lg" className="bg-amber-500 text-white font-bold hover:bg-amber-600 shadow-lg shadow-amber-500/20 px-8">
                                    Research Programs
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button size="lg" variant="outline" className=" bg-blue-500/30 border-blue-500/30 text-white hover:bg-blue-500/10 backdrop-blur-xs">
                                    About Directorate
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* NOTIFICATIONS & ANNOUNCEMENTS */}
            <section className="py-16 md:py-20 relative -mt-16 z-20">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 lg:p-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-slate-100">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                                    <Bell className="h-6 w-6 text-amber-500" /> Latest Updates
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Stay informed with the latest circulars and announcements.</p>
                            </div>
                            <Link href="/notifications" className="hidden md:flex items-center text-blue-700 font-semibold hover:text-blue-900 text-sm mt-4 md:mt-0 group">
                                View Archive <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid gap-6">
                            {notifications.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <Bell className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                    No recent updates available at this moment.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {notifications.slice(0, 3).map((note, idx) => (
                                        <div key={idx} className="group flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300">
                                            <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center min-w-[80px]">
                                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                                                    {new Date(note.date).toLocaleString('default', { month: 'short' })}
                                                </span>
                                                <span className="text-xl font-bold leading-none">
                                                    {new Date(note.date).getDate()}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide">
                                                        {note.category || "General"}
                                                    </span>
                                                    {/* New Badge Logic could go here */}
                                                </div>
                                                <h3 className="text-base font-semibold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                                                    {note.title}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Published on {new Date(note.date).toLocaleDateString('en-GB')}</span>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 flex items-center gap-2 flex-wrap justify-end">
                                                {note.external_link && (
                                                    <Link href={note.external_link} target="_blank">
                                                        <Button variant="outline" size="sm" className="h-8 border-slate-200 hover:border-blue-300 text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                                                            {note.external_text || "Open Link"} <ArrowRight className="h-3 w-3 ml-2" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                {note.file_path && (
                                                    <Link href={note.file_path} target="_blank">
                                                        <Button variant="outline" size="sm" className="h-8 border-slate-200 hover:border-blue-300 text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                                                            Download File <Download className="h-3 w-3 ml-2" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                {!note.external_link && !note.file_path && note.link && note.link !== "#" && (
                                                    <Link href={note.link} target="_blank">
                                                        <Button variant="outline" size="sm" className="h-8 border-slate-200 hover:border-blue-300 text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                                                            Open Link <ArrowRight className="h-3 w-3 ml-2" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                {!note.external_link && !note.file_path && (!note.link || note.link === "#") && (
                                                    <Button variant="ghost" size="sm" className="h-8 text-slate-400 cursor-not-allowed">
                                                        Info Only
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/notifications" className="md:hidden flex items-center justify-center text-blue-700 font-semibold text-sm mt-6 border-t pt-4 w-full">
                            View Archive <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Academic & Research Services</h2>
                        <p className="text-slate-600">Comprehensive support for scholars, faculty, and researchers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-xs hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <BookOpen className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Ph.D. Programs</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                Guidelines, admission procedures, and regulations for Full-time and Part-time Ph.D. scholars.
                            </p>
                            <Link href="/research" className="text-blue-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Learn More <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-xs hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                <School className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Recognized Centres</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                List of approved research centres and affiliated laboratories for advanced studies.
                            </p>
                            <Link href="/research-centres" className="text-amber-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Centres <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-xs hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                <Download className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Downloads</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                Access important forms, circulars, and templates for research submissions.
                            </p>
                            <Link href="/downloads" className="text-green-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Access Files <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* LEADERSHIP SECTION */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-wider text-xs mb-2">Administration</span>
                        <h2 className="text-3xl lg:text-4xl font-serif font-black text-slate-900 text-center">University Leadership</h2>
                        <div className="w-20 h-1 bg-amber-500 mt-6 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[{
                            name: "Just. Syed Abdul Nazeer",
                            title: "Hon'ble Chancellor",
                            position: "Chancellor",
                            role: "Governor of Andhra Pradesh",
                            image: "https://jntugv.edu.in/static/media/chancellor.2ed91f57067384cddd59.jpeg",
                            url: "/administration/chancellor"
                        }, {
                            name: "Prof. V.V. Subba Rao",
                            title: "Hon'ble Vice-Chancellor",
                            position: "Vice Chancellor",
                            role: "JNTU-GV",
                            image: "https://jntugv.edu.in/static/media/vc.1d93f5ebef1ab0a5e73b.png",
                            url: "/administration/vice-chancellor"
                        }, {
                            name: "Prof. G. Jaya Suma",
                            title: "Hon'ble Registrar",
                            position: "Professor of Information Technology",
                            role: "JNTU-GV",
                            image: "https://jntugv.edu.in/static/media/registrar.25e0843f00d08ee20077.jpeg",
                            url: "/administration/registrar"
                        }, {
                            name: "Dr. G. Swami Naidu",
                            title: "Director of Research & Development",
                            position: "Professor of Metallurgical Engineering",
                            role: "JNTU-GV",
                            image: "https://jntugv.edu.in/static/media/dr&d.06287b589b1153fcddb4.jpg",
                            url: "/about/director"
                        }].map((admin, idx) => (
                            <div key={idx} className="group relative">
                                <div className="absolute inset-x-4 -bottom-4 bg-slate-900/5 h-24 rounded-b-xl blur-lg transition-all group-hover:bg-blue-900/10" />
                                <Card className="border-none shadow-none bg-white overflow-hidden text-center h-full hover:-translate-y-2 transition-transform duration-300">
                                    <div className="aspect-[4/5] w-full relative overflow-hidden bg-slate-200">
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10" />
                                        <img
                                            src={admin.image}
                                            alt={admin.name}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <CardContent className="pt-6 pb-8 px-4 relative z-20 -mt-16 text-white">
                                        <div className="translate-y-0 transition-transform">
                                            <p className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 opacity-90">{admin.title}</p>
                                            <h3 className="text-lg font-bold leading-tight mb-2 drop-shadow-md">{admin.name}</h3>
                                            <h5 className="text-xs text-blue-600 font-semibold">{admin.position}</h5>
                                            <p className="text-xs text-blue-600 font-semibold">{admin.role}</p>
                                        </div>
                                    </CardContent>
                                    {admin.url && (
                                        <div className="px-4 pb-6 relative z-30 md:opacity-100 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                                            <Link href={admin.url}>
                                                <Button variant="outline" size="sm" className="w-full bg-white border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                                    View Profile <ArrowRight className="h-3 w-3 ml-2" />
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
