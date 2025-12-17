"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, FileText, Users, Eye, Trash2, Plus, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/token";

interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
    link: string;
}

export default function DashboardPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [formData, setFormData] = useState({ title: "", category: "General", link: "" });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchNotifications();
    }, []);

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

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this notification?")) return;

        // Get token
        const token = getToken();
        if (!token) {
            alert("No session found. Please login again.");
            return;
        }

        try {
            const res = await fetch(`/api/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setNotifications(prev => prev.filter(n => n.id !== id));
            } else {
                alert("Failed to delete. You might need to re-login.");
            }
        } catch (error) {
            console.error("Error deleting", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getToken();
        if (!token) {
            alert("No session found. Please login again.");
            return;
        }

        try {
            const res = await fetch('/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const newNote = await res.json();
                setNotifications([newNote, ...notifications]);
                setFormData({ title: "", category: "General", link: "" });
            } else {
                alert("Failed to add. You might need to re-login.");
            }
        } catch (error) {
            console.error("Error adding", error);
        }
    };

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, Admin. Manage your site content here.</p>
                </div>
                <div className="text-sm text-slate-500">
                    Last login: Today, {new Date().toLocaleTimeString()}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Notifications" value={notifications.length} icon={Bell} trend="Dynamic" />
                <StatsCard title="Research Areas" value="24" icon={FileText} trend="Stable" />
                <StatsCard title="Faculty Members" value="48" icon={Users} trend="+1 new" />
                <StatsCard title="Site Visits" value="1,204" icon={Eye} trend="+12% vs last month" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Notification Form */}
                <div className="lg:col-span-1">
                    <Card className="shadow-md border-border">
                        <CardHeader>
                            <CardTitle>Post New Notification</CardTitle>
                            <CardDescription>Announce updates to the university website.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Admission Notification..."
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        placeholder="Admissions, Exams, etc."
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="link">Link (Optional)</Label>
                                    <Input
                                        id="link"
                                        placeholder="https://..."
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                    <Plus className="mr-2 h-4 w-4" /> Publish Notification
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Notifications List */}
                <div className="lg:col-span-2">
                    <Card className="shadow-md border-border h-full">
                        <CardHeader>
                            <CardTitle>Recent Notifications</CardTitle>
                            <CardDescription>Manage publicly visible notifications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <p className="text-center text-slate-500 py-10">Loading notifications...</p>
                            ) : notifications.length === 0 ? (
                                <p className="text-center text-slate-500 py-10">No notifications found.</p>
                            ) : (
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                    {notifications.map((note) => (
                                        <div key={note.id} className="flex items-start justify-between p-4 rounded-lg border border-slate-100 bg-white hover:shadow-sm transition-shadow">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${note.category === 'Admissions' ? 'bg-green-100 text-green-700' :
                                                        note.category === 'Examinations' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {note.category}
                                                    </span>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" /> {note.date}
                                                    </span>
                                                </div>
                                                <h4 className="font-medium text-slate-900 leading-tight">{note.title}</h4>
                                                {note.link && note.link !== '#' && (
                                                    <a href={note.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                                                        View Resource
                                                    </a>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(note.id)}
                                                className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, trend }: any) {
    return (
        <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6 flex items-center justify-between space-x-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
                    <p className="text-xs text-green-600 mt-1 font-medium">{trend}</p>
                </div>
                <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
                    <Icon className="h-6 w-6" />
                </div>
            </CardContent>
        </Card>
    )
}
