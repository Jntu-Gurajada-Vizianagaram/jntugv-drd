"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, FileDown, ExternalLink } from "lucide-react";
import { DownloadItem } from "@/lib/downloads-data";

export default function AdminDownloadsPage() {
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Certificates");
    const [type, setType] = useState<"DOCX" | "PDF" | "Form" | "Link">("DOCX");
    const [link, setLink] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const res = await fetch('/api/downloads');
                if (!res.ok) {
                    console.error("Downloads fetch failed:", res.status, await res.text());
                    setDownloads([]);
                    return;
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setDownloads(data);
                } else {
                    console.error("Downloads API returned non-array:", data);
                    setDownloads([]);
                }
            } catch (err) {
                console.error("Fetch failure:", err);
                setDownloads([]);
            }
        };
        fetchDownloads();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('type', type);
        formData.append('link', link);
        if (file) {
            formData.append('file', file);
        }

        try {
            const url = editingId ? `/api/downloads/${editingId}` : '/api/downloads';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                const updatedItem = await res.json();
                if (editingId) {
                    setDownloads(downloads.map(d => d.id === editingId ? updatedItem : d));
                } else {
                    setDownloads([updatedItem, ...downloads]);
                }
                resetForm();
            } else {
                console.error("Failed to save download");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setTitle("");
        setCategory("Certificates");
        setType("DOCX");
        setLink("");
        setFile(null);
        setEditingId(null);
    };

    const handleEdit = (item: DownloadItem) => {
        setEditingId(item.id);
        setTitle(item.title);
        setCategory(item.category);
        setType(item.type);
        setLink(item.link || "");
        setFile(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";

        try {
            const res = await fetch(`/api/downloads/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setDownloads(downloads.filter(d => d.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Manage Downloads</h1>
                <p className="text-muted-foreground">Add or update downloadable resources.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Download" : "Add New"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input value={title} onChange={e => setTitle(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select className="w-full border rounded px-3 py-2 text-sm" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="Certificates">Certificates</option>
                                    <option value="Plagiarism">Plagiarism</option>
                                    <option value="Thesis">Thesis</option>
                                    <option value="General">General</option>
                                    <option value="Coursework">Coursework</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Type</label>
                                <select className="w-full border rounded px-3 py-2 text-sm" value={type} onChange={e => setType(e.target.value as any)}>
                                    <option value="DOCX">DOCX</option>
                                    <option value="PDF">PDF</option>
                                    <option value="Form">Form</option>
                                    <option value="Link">External Link</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">File (Optional if Link provided)</label>
                                <Input key={editingId ? `edit-${editingId}` : 'add'} type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">External Link (Optional)</label>
                                <Input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="w-full">{editingId ? "Update" : "Add"}</Button>
                                {editingId && <Button type="button" variant="outline" onClick={resetForm} className="w-full">Cancel</Button>}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader><CardTitle>Existing Downloads</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {downloads.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded">
                                            {item.type === "Link" ? <ExternalLink className="h-5 w-5" /> : <FileDown className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{item.title}</h4>
                                            <div className="flex gap-2 text-xs text-muted-foreground">
                                                <span className="bg-blue-50 text-blue-700 px-1 rounded">{item.category}</span>
                                                <span>{item.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
