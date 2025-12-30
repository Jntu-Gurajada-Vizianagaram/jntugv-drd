"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus, MapPin } from "lucide-react";

interface Center {
    id: number;
    name: string;
    coordinator: string;
    location: string;
    description: string;
    contact_info: string;
}

export default function AdminCentersPage() {
    const [centers, setCenters] = useState<Center[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form
    const [formData, setFormData] = useState<Partial<Center>>({
        name: "", coordinator: "", location: "", description: "", contact_info: ""
    });

    useEffect(() => {
        fetch('/api/centers')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCenters(data);
                } else {
                    console.error("API returned non-array:", data);
                    setCenters([]);
                }
            })
            .catch(err => {
                console.error(err);
                setCenters([]);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        try {
            const url = editingId ? `/api/centers/${editingId}` : '/api/centers';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const updated = await res.json();
                if (editingId) {
                    setCenters(centers.map(c => c.id === editingId ? updated : c));
                } else {
                    setCenters([updated, ...centers]);
                }
                resetForm();
            } else {
                alert("Failed to save center.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this center?")) return;
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        try {
            const res = await fetch(`/api/centers/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setCenters(centers.filter(c => c.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (center: Center) => {
        setEditingId(center.id);
        setFormData(center);
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ name: "", coordinator: "", location: "", description: "", contact_info: "" });
        setShowForm(false);
    };

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Research Centers</h1>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Center
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8 border-blue-200 shadow-md">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Center" : "New Research Center"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input name="name" placeholder="Center Name (e.g. Center for Sustainable Energy)" value={formData.name} onChange={handleChange} required />
                            <Input name="coordinator" placeholder="Coordinator Name" value={formData.coordinator} onChange={handleChange} />
                            <Input name="location" placeholder="Location/Building" value={formData.location} onChange={handleChange} />
                            <Input name="contact_info" placeholder="Contact Info (Email/Phone)" value={formData.contact_info} onChange={handleChange} />
                            <Textarea name="description" placeholder="Description of activities..." rows={4} value={formData.description} onChange={handleChange} />

                            <div className="flex gap-2 justify-end mt-4">
                                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                <Button type="submit">{editingId ? "Update" : "Add Center"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                {centers.map(center => (
                    <Card key={center.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-xl text-slate-800">{center.name}</h3>
                                    <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {center.location}</span>
                                        <span>Coord: {center.coordinator}</span>
                                    </div>
                                    <p className="mt-3 text-slate-600 max-w-3xl">{center.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(center)}><Edit className="h-4 w-4 text-blue-500" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(center.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {centers.length === 0 && <p className="text-center text-slate-500 py-10">No research centers listed.</p>}
            </div>
        </div>
    );
}
