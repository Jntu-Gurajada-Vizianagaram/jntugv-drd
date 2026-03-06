"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Download, ExternalLink } from "lucide-react";

interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
    link: string;
    external_text?: string;
    external_link?: string;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch('/api/notifications', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 space-y-8">
            <div className="text-center max-w-4xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold text-slate-900">Notifications & Circulars</h1>
                <p className="text-lg text-slate-600">
                    Stay updated with the latest announcements, examination schedules, and research guidelines from the Directorate.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader className="bg-slate-50 border-b">
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-600" />
                                Latest Updates
                            </CardTitle>
                            <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border">
                                {loading ? "Loading..." : `${notifications.length} Total`}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-8 text-center text-slate-500">Loading notifications...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">No active notifications found.</div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {notifications.map((note) => (
                                    <div key={note.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary" className={`
                                                    ${note.category === 'Admissions' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                                        note.category === 'Examinations' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                                                            'bg-blue-100 text-blue-700 hover:bg-blue-100'} border-none
                                                `}>
                                                    {note.category}
                                                </Badge>
                                                <span className="text-sm text-slate-400 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> {new Date(note.date).toLocaleDateString('en-GB')}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                                                {note.title}
                                            </h3>
                                        </div>

                                        {note.external_link ? (
                                            <a
                                                href={note.external_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all"
                                            >
                                                <ExternalLink className="h-4 w-4" /> {note.external_text || "Open Link"}
                                            </a>
                                        ) : note.link && note.link !== '#' ? (
                                            <a
                                                href={note.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all"
                                            >
                                                <ExternalLink className="h-4 w-4" /> View Details
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">No Link</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
