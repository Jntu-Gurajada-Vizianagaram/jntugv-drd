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
    const [file, setFile] = useState<File | null>(null);
    const [externalText, setExternalText] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    // Mock fetch for demo
    useEffect(() => {
        fetch('/api/notifications')
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(err => console.error("Failed to fetch", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('link', '#');
        if (externalText) formData.append('external_text', externalText);
        if (externalLink) formData.append('external_link', externalLink);
        if (file) {
            formData.append('file', file);
        }

        try {
            const url = editingId ? `/api/notifications/${editingId}` : '/api/notifications';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                const updatedNote = await res.json();
                if (editingId) {
                    setNotifications(notifications.map(n => n.id === editingId ? updatedNote : n));
                } else {
                    setNotifications([updatedNote, ...notifications]);
                }
                resetForm();
            } else {
                console.error("Failed to save notification");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setTitle("");
        setCategory("Admissions");
        setFile(null);
        setExternalText("");
        setExternalLink("");
        setEditingId(null);
        // Reset file input value manually if possible, or key-based reset
    };

    const handleEdit = (note: any) => {
        setEditingId(note.id);
        setTitle(note.title);
        setCategory(note.category);
        setExternalText(note.external_text || "");
        setExternalLink(note.external_link || "");
        setFile(null); // File input cannot be programmatically set
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";
        try {
            const res = await fetch(`/api/notifications/${id}`, {
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
                <p className="text-muted-foreground">Add, edit or remove circulars and updates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Add/Edit Form */}
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Notification" : "Add New"}</CardTitle>
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
                                    <option value="Circulars">Circulars</option>
                                    <option value="Updates">Updates</option>
                                    <option value="Results">Results</option>
                                    <option value="CourseWork">CourseWork</option>
                                    <option value="Guidelines">Guidelines</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Attachment (PDF/Image)</label>
                                <Input
                                    key={editingId ? `edit-${editingId}` : 'add'}
                                    type="file"
                                    onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                                    className="cursor-pointer"
                                />
                                {editingId && <p className="text-xs text-muted-foreground">Leave empty to keep existing file</p>}
                                <p className="text-xs text-muted-foreground mt-1">If both file and external link are set, external link may be shown or preferred.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">External Link Text (Optional)</label>
                                <Input
                                    value={externalText}
                                    onChange={e => setExternalText(e.target.value)}
                                    placeholder="e.g. Apply Now, Click Here"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">External Link URL (Optional)</label>
                                <Input
                                    value={externalLink}
                                    onChange={e => setExternalLink(e.target.value)}
                                    placeholder="https://..."
                                    type="url"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="w-full">{editingId ? "Update" : "Publish"}</Button>
                                {editingId && (
                                    <Button type="button" variant="outline" onClick={resetForm} className="w-full">Cancel</Button>
                                )}
                            </div>
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
                                            <span>{new Date(note.date).toLocaleDateString('en-GB')}</span>
                                            <span>•</span>
                                            <span className="text-primary bg-primary/10 px-1 rounded">{note.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(note)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                            Edit
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(note.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
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
