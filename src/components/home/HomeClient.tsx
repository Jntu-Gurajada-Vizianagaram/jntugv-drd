"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bell, BookOpen, Building2, Download, School } from "lucide-react";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
// import { Calendar } from "lucide-react";



interface Notification {
    id?: number;
    date: string;
    category: string;
    title: string;
    link?: string;
    file_path?: string;
    external_text?: string;
    external_link?: string;
}

const getFileUrl = (path: string | undefined) => {
    if (!path || path === "null") return "";
    if (path.startsWith('http')) return path;

    let normalizedPath = path.replace(/\\/g, '/').replace(/\/+/g, '/');

    if (normalizedPath.startsWith('uploads/')) {
        normalizedPath = '/' + normalizedPath;
    }

    if (normalizedPath.includes('.') && !normalizedPath.includes('/')) {
        return `/uploads/${normalizedPath}`;
    }

    return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
};


interface HomeClientProps {
    notifications: Notification[];
    referenceTime: number;
}

const monthFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    timeZone: 'UTC',
});

export default function HomeClient({ notifications: initialNotifications, referenceTime }: HomeClientProps) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications || []);

    useEffect(() => {
        const controller = new AbortController();

        const refreshNotifications = async () => {
            try {
                const response = await fetch('/api/notifications', {
                    cache: 'no-store',
                    signal: controller.signal,
                });

                if (!response.ok) return;

                const contentType = response.headers.get('content-type') || '';
                if (!contentType.includes('application/json')) {
                    console.error('Notification feed returned a non-JSON response.');
                    return;
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setNotifications(data);
                }
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Failed to refresh home notifications:', error);
                }
            }
        };

        refreshNotifications();
        const interval = setInterval(refreshNotifications, 60_000);

        return () => {
            controller.abort();
            clearInterval(interval);
        };
    }, []);

    const latestNotifications = useMemo(
        () => notifications
            .filter(note => note?.title && String(note.title).toLowerCase() !== "null")
            .slice(0, 5),
        [notifications]
    );

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




            {/* TWO COLUMN CONTENT (NOTIFICATIONS & VIDEO) */}
            <section className="container mx-auto px-4 lg:px-6 py-10 relative z-30 -mt-12 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: NOTIFICATIONS (70%) */}
                    <div className="lg:col-span-6 flex flex-col justify-start">
                        <Card className="border-t-4 border-t-blue-400 shadow-xl bg-white flex flex-col min-h-[400px] lg:h-[450px] overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 pt-5 px-6 shrink-0 gap-4">
                                <div className="flex items-center gap-3">
                                    <Bell className="h-6 w-6 text-amber-500 shrink-0" />
                                    <div>
                                        <CardTitle className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                                            Latest Circulars & Notifications
                                        </CardTitle>
                                    </div>
                                </div>
                                {notifications && notifications.length > 5 && (
                                    <Link href="/notifications" className="hidden sm:flex shrink-0 text-sm font-semibold text-blue-700 hover:text-blue-900 items-center bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                        View Archive <ArrowRight className="h-4 w-4 ml-1" />
                                    </Link>
                                )}
                            </CardHeader>
                            <CardContent className="p-0 overflow-y-auto w-full flex-1 custom-scrollbar">
                                {latestNotifications.length === 0 ? (
                                    <div className="p-12 text-center text-slate-500">
                                        No recent updates available at this moment.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {latestNotifications.map((note, idx) => (
                                            <div key={note.id ?? idx} className="p-5 hover:bg-blue-50/50 transition-colors flex flex-col sm:flex-row items-start gap-4">
                                                <div className="flex flex-col items-center justify-center bg-slate-100 border border-slate-200 text-slate-700 w-16 h-16 rounded-md flex-shrink-0">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                        {monthFormatter.format(new Date(note.date))}
                                                    </span>
                                                    <span className="text-lg font-black leading-none text-blue-900">
                                                        {new Date(note.date).getUTCDate()}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <Badge variant="outline" className="text-[10px] font-bold px-2 py-0 border-blue-200 text-blue-800 bg-blue-50">
                                                            {note.category || "General"}
                                                        </Badge>
                                                        {(() => {
                                                            const diffDays = Math.ceil(Math.abs(referenceTime - new Date(note.date).getTime()) / (1000 * 60 * 60 * 24));
                                                            if (diffDays <= 7) {
                                                                return (
                                                                    <Badge className="bg-red-500 hover:bg-red-600 text-[9px] px-1.5 py-0 h-4 animate-pulse">
                                                                        NEW
                                                                    </Badge>
                                                                );
                                                            }
                                                            return null;
                                                        })()}
                                                    </div>
                                                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5 leading-snug">
                                                        {note.title}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-xs flex-wrap">
                                                        {note.external_link && (
                                                            <a href={note.external_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                                                                <ExternalLink className="h-3 w-3 mr-1" /> {note.external_text || "View Link"}
                                                            </a>
                                                        )}
                                                        {note.file_path && (
                                                            <a href={getFileUrl(note.file_path)} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline flex items-center">
                                                                <Download className="h-3 w-3 mr-1" /> Download Attachment
                                                            </a>
                                                        )}
                                                        {!note.external_link && !note.file_path && note.link && note.link !== "#" && (
                                                            <a href={getFileUrl(note.link)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                                                                <ExternalLink className="h-3 w-3 mr-1" /> View Details
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            <div className="bg-slate-50 p-3 sm:hidden border-t text-center">
                                {notifications && notifications.length > 5 && (
                                    <Link href="/notifications" className="text-sm font-semibold text-blue-700">
                                        View All Announcements
                                    </Link>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: VIDEO & LINKS (30%) */}
                    <div className="lg:col-span-6 space-y-6">
                        <Card className="border-t-4 border-t-amber-500 shadow-xl bg-white">
                            <CardHeader className="bg-slate-50 border-b pb-3 pt-4 px-5">
                                <CardTitle className="text-base font-serif font-bold text-slate-800 flex items-center gap-2">
                                    <PlayCircle className="h-5 w-5 text-blue-600" />
                                    University Presentation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="aspect-video rounded-md overflow-hidden bg-black border border-slate-200">
                                    <video
                                        src="/home-video.mp4"
                                        poster="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1"
                                        controls
                                        className="w-full h-full object-cover"
                                    >
                                        <source src="/home-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div className="mt-3 text-xs text-slate-500 text-center leading-relaxed">
                                    Explore JNTU-GV&apos;s campus infrastructure and research facilities.
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-4 bg-slate-50">
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
                        <h2 className="text-3xl lg:text-4xl font-serif font-black text-slate-900 text-center">Director of R&D</h2>
                        <div className="w-20 h-1 bg-amber-500 mt-6 rounded-full" />
                    </div>

                    <div className="flex justify-center max-w-5xl mx-auto">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100 flex flex-col md:flex-row items-stretch group">
                            {/* Left: Image Container */}
                            <div className="w-full md:w-2/5 min-h-[400px] overflow-hidden relative">
                                <img
                                    src="/assets/images/director.jpg"
                                    alt="Dr. G. Swami Naidu"
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply" />
                            </div>

                            {/* Right: Content */}
                            <div className="w-full md:w-3/5 p-8 lg:p-12 flex flex-col justify-center space-y-6">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
                                        University Leadership
                                    </span>
                                    <h3 className="text-3xl lg:text-4xl font-serif font-black text-slate-900 mb-2 leading-tight">Dr. G. Swami Naidu</h3>
                                    <p className="text-amber-600 font-bold text-lg lg:text-xl leading-tight">Director of Research & Development</p>
                                    <div className="w-16 h-1 bg-amber-500 mt-6 rounded-full" />
                                </div>

                                <div className="space-y-4 text-slate-600">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <School className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Department</p>
                                            <p className="text-sm font-bold text-slate-700">Professor of Metallurgical Engineering</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Institution</p>
                                            <p className="text-sm font-bold text-slate-700">JNTU-GV, Vizianagaram</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Link href="/about/director">
                                        <Button className="bg-blue-900 hover:bg-slate-900 text-white px-8 py-6 rounded-xl shadow-lg shadow-blue-900/20 group text-sm font-bold uppercase tracking-wider h-auto transition-all duration-300">
                                            View Full Profile <ArrowRight className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
