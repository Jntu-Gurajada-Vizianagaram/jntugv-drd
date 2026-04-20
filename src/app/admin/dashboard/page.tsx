"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, FileText, Users, Eye, Plus, Calendar, FileDown, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
}

interface DownloadItem {
    id: number;
    title: string;
    category: string;
    type: string;
    created_at?: string;
}

export default function DashboardPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [scholarsCount, setScholarsCount] = useState(0);
    const [areasCount, setAreasCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [notifRes, downRes, scholRes, areaRes] = await Promise.all([
                    fetch('/api/notifications', { cache: 'no-store' }),
                    fetch('/api/downloads', { cache: 'no-store' }),
                    fetch('/api/scholars', { cache: 'no-store' }),
                    fetch('/api/areas', { cache: 'no-store' })
                ]);

                if (notifRes.ok) setNotifications(await notifRes.json());
                if (downRes.ok) setDownloads(await downRes.json());
                if (scholRes.ok) {
                    const scholars = await scholRes.json();
                    setScholarsCount(scholars.length);
                }
                if (areaRes.ok) {
                    const areas = await areaRes.json();
                    setAreasCount(areas.length);
                }

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-sm md:text-base text-slate-500">Overview of university R&D portal.</p>
                </div>
                <div className="text-sm text-slate-500 shrink-0">
                    <span className="font-semibold text-slate-700">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Notifications" value={notifications.length} icon={Bell} trend="Total Posted" color="bg-blue-500" />
                <StatsCard title="Downloads" value={downloads.length} icon={FileDown} trend="Resources" color="bg-amber-500" />
                <StatsCard title="Scholars" value={scholarsCount} icon={Users} trend="Registered" color="bg-purple-500" />
                <StatsCard title="Research Areas" value={areasCount} icon={FileText} trend="Active Areas" color="bg-emerald-500" />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickAction
                    title="Post Notification"
                    desc="Announce new updates or circulars."
                    href="/admin/notifications"
                    icon={Plus}
                    cta="Create New"
                />
                <QuickAction
                    title="Upload Download"
                    desc="Add new forms or documents."
                    href="/admin/downloads"
                    icon={FileDown}
                    cta="Upload File"
                />
                <QuickAction
                    title="Manage Research"
                    desc="Update research areas and topics."
                    href="/admin/research"
                    icon={FileText}
                    cta="View Areas"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Notifications */}
                <Card className="shadow-sm border-slate-200 h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold">Recent Notifications</CardTitle>
                        <Link href="/admin/notifications" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                            View All <ArrowRight className="h-3 w-3" />
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {loading ? <p className="text-sm text-slate-500">Loading...</p> : (
                            <div className="space-y-4">
                                {notifications.slice(0, 5).map(note => (
                                    <div key={note.id} className="flex justify-between items-start border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                        <div>
                                            <p className="font-medium text-sm text-slate-800 line-clamp-1">{note.title}</p>
                                            <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                                <span>{new Date(note.date).toLocaleDateString('en-GB')}</span>
                                                <span className="bg-slate-100 px-1.5 rounded">{note.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {notifications.length === 0 && <p className="text-sm text-slate-400">No notifications.</p>}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Downloads */}
                <Card className="shadow-sm border-slate-200 h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold">Recent Uploads</CardTitle>
                        <Link href="/admin/downloads" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                            View All <ArrowRight className="h-3 w-3" />
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {loading ? <p className="text-sm text-slate-500">Loading...</p> : (
                            <div className="space-y-4">
                                {downloads.slice(0, 5).map(item => (
                                    <div key={item.id} className="flex justify-between items-start border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                        <div>
                                            <p className="font-medium text-sm text-slate-800 line-clamp-1">{item.title}</p>
                                            <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                                <span className="bg-slate-100 px-1.5 rounded">{item.type}</span>
                                                <span className="text-blue-600 bg-blue-50 px-1.5 rounded">{item.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {downloads.length === 0 && <p className="text-sm text-slate-400">No downloads.</p>}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, trend, color }: any) {
    return (
        <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{trend}</p>
                </div>
                <div className={`h-10 w-10 text-white rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    )
}

function QuickAction({ title, desc, href, icon: Icon, cta }: any) {
    return (
        <Link href={href}>
            <Card className="shadow-sm border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer h-full group">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-slate-800">{title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{desc}</p>
                    <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {cta} <ArrowRight className="h-3 w-3" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
