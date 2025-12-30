"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus, Search } from "lucide-react";

interface Scholar {
    id: number;
    name: string;
    roll_number: string;
    department: string;
    supervisor: string;
    admission_year: string;
    status: string;
    email: string;
    phone: string;
}

export default function AdminScholarsPage() {
    const [scholars, setScholars] = useState<Scholar[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    // Form Stats
    const [formData, setFormData] = useState<Partial<Scholar>>({
        name: "", roll_number: "", department: "", supervisor: "", admission_year: "", status: "Full-Time", email: "", phone: ""
    });

    useEffect(() => {
        fetch('/api/scholars')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setScholars(data);
                } else {
                    console.error("API returned non-array:", data);
                    setScholars([]);
                }
            })
            .catch(err => {
                console.error(err);
                setScholars([]);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        try {
            const url = editingId ? `/api/scholars/${editingId}` : '/api/scholars';
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
                    setScholars(scholars.map(s => s.id === editingId ? updated : s));
                } else {
                    setScholars([updated, ...scholars]);
                }
                resetForm();
            } else {
                alert("Failed to save scholar.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this scholar?")) return;
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        try {
            const res = await fetch(`/api/scholars/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setScholars(scholars.filter(s => s.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (scholar: Scholar) => {
        setEditingId(scholar.id);
        setFormData(scholar);
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ name: "", roll_number: "", department: "", supervisor: "", admission_year: "", status: "Full-Time", email: "", phone: "" });
        setShowForm(false);
    };

    const filteredScholars = scholars.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.roll_number.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Research Scholars</h1>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Scholar
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8 border-blue-200 shadow-md">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Scholar" : "New Scholar Registration"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                            <Input name="roll_number" placeholder="Roll Number" value={formData.roll_number} onChange={handleChange} required />
                            <Input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                            <Input name="supervisor" placeholder="Supervisor Name" value={formData.supervisor} onChange={handleChange} />
                            <select name="status" className="border rounded px-3 py-2 text-sm" value={formData.status} onChange={handleChange}>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                            </select>
                            <Input name="admission_year" placeholder="Admission Year (e.g. 2023)" value={formData.admission_year} onChange={handleChange} />
                            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />

                            <div className="md:col-span-2 flex gap-2 justify-end mt-4">
                                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                <Button type="submit">{editingId ? "Update" : "Register"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
                <Search className="h-5 w-5 text-slate-400" />
                <Input
                    placeholder="Search by Name or Roll Number..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border-0 focus-visible:ring-0"
                />
            </div>

            <div className="bg-white rounded-lg shadow border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                        <tr>
                            <th className="px-6 py-4">Name / Roll No</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Supervisor</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredScholars.map(scholar => (
                            <tr key={scholar.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{scholar.name}</div>
                                    <div className="text-xs text-slate-500">{scholar.roll_number}</div>
                                </td>
                                <td className="px-6 py-4">{scholar.department}</td>
                                <td className="px-6 py-4">{scholar.supervisor}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${scholar.status === 'Full-Time' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {scholar.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right gap-2 flex justify-end">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(scholar)}><Edit className="h-4 w-4 text-blue-500" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(scholar.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                </td>
                            </tr>
                        ))}
                        {filteredScholars.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-slate-500">No scholars found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
