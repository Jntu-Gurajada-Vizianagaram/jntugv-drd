"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Admissions");

    // Mock fetch for demo
    useEffect(() => {
        fetch('http://localhost:5000/api/notifications')
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(err => console.error("Failed to fetch", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, get token from secure storage/cookie
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";

        try {
            const res = await fetch('http://localhost:5000/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    category,
                    link: '#'
                })
            });

            if (res.ok) {
                const newNote = await res.json();
                setNotifications([newNote, ...notifications]);
                setTitle("");
            } else {
                console.error("Failed to add notification");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";
        try {
            const res = await fetch(`http://localhost:5000/api/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setNotifications(notifications.filter(n => n.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Manage Notifications</h1>
                <p className="text-muted-foreground">Add or remove circulars and updates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Add Form */}
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Add New</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Enter notification title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="Admissions">Admissions</option>
                                    <option value="Examinations">Examinations</option>
                                    <option value="Events">Events</option>
                                    <option value="Guidelines">Guidelines</option>
                                </select>
                            </div>
                            <Button type="submit" className="w-full">Publish</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* List */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>All Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {notifications.map((note) => (
                                <div key={note.id} className="flex items-start justify-between p-4 border rounded-lg">
                                    <div>
                                        <h4 className="font-bold text-foreground">{note.title}</h4>
                                        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                            <span>{note.date}</span>
                                            <span>•</span>
                                            <span className="text-primary bg-primary/10 px-1 rounded">{note.category}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(note.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {notifications.length === 0 && <p className="text-muted-foreground text-center">No notifications found.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
