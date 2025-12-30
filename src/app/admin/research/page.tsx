"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus, Image as ImageIcon } from "lucide-react";

interface ResearchArea {
    id: number;
    title: string;
    description: string;
    image_path?: string;
}

export default function AdminAreasPage() {
    const [areas, setAreas] = useState<ResearchArea[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetch('/api/areas')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setAreas(data);
                } else {
                    console.error("API returned non-array:", data);
                    setAreas([]);
                }
            })
            .catch(err => {
                console.error(err);
                setAreas([]);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (file) formData.append('file', file);

        try {
            const url = editingId ? `/api/areas/${editingId}` : '/api/areas';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                const updated = await res.json();
                if (editingId) {
                    setAreas(areas.map(a => a.id === editingId ? updated : a));
                } else {
                    setAreas([updated, ...areas]);
                }
                resetForm();
            } else {
                alert("Failed to save area.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this research area?")) return;
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        try {
            const res = await fetch(`/api/areas/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setAreas(areas.filter(a => a.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (area: ResearchArea) => {
        setEditingId(area.id);
        setTitle(area.title);
        setDescription(area.description);
        setFile(null);
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setFile(null);
        setShowForm(false);
    };

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Research Areas</h1>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Area
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8 border-blue-200 shadow-md">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Research Area" : "New Research Area"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input placeholder="Area Title" value={title} onChange={e => setTitle(e.target.value)} required />
                            <Textarea placeholder="Description" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cover Image</label>
                                <Input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
                            </div>

                            <div className="flex gap-2 justify-end mt-4">
                                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                <Button type="submit">{editingId ? "Update" : "Add Area"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areas.map(area => (
                    <Card key={area.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-32 bg-slate-100 relative">
                            {area.image_path ? (
                                <img src={`http://localhost:5000${area.image_path}`} alt={area.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-300">
                                    <ImageIcon className="h-10 w-10" />
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-2">{area.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{area.description}</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(area)}>Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(area.id)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
