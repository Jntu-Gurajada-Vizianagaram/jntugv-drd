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
    department: string;
    description: string;
    contact_info: string;

}

export default function AdminCentersPage() {
    const [centers, setCenters] = useState<Center[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Form
    const [formData, setFormData] = useState<Partial<Center>>({
        name: "", department: "", description: "", contact_info: ""
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
        setFormData({ name: "", department: "", description: "", contact_info: "" });
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
                            <Input name="name" placeholder="Institute Name (e.g. Aditya Institute of Technology...)" value={formData.name} onChange={handleChange} required />
                            <Input name="department" placeholder="Research Centre (Department) (e.g. Civil Engineering)" value={formData.department} onChange={handleChange} />
                            <Input name="contact_info" placeholder="Contact Info (Email/Phone)" value={formData.contact_info} onChange={handleChange} />
                            <Textarea name="description" placeholder="Description..." rows={4} value={formData.description} onChange={handleChange} />

                            <div className="flex gap-2 justify-end mt-4">
                                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                <Button type="submit">{editingId ? "Update" : "Add Center"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}



            {/* Pagination Logic */}
            {(() => {
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentCenters = centers.slice(indexOfFirstItem, indexOfLastItem);
                const totalPages = Math.ceil(centers.length / itemsPerPage);

                return (
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg shadow border overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                                    <tr>
                                        <th className="px-6 py-4">S.No</th>
                                        <th className="px-6 py-4">Name of the Research Centre</th>
                                        <th className="px-6 py-4">Name of the Institute</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {currentCenters.map((center, index) => (
                                        <tr key={center.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="px-6 py-4">{center.department}</td>
                                            <td className="px-6 py-4">{center.name}</td>
                                            <td className="px-6 py-4 text-right gap-2 flex justify-end">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(center)}><Edit className="h-4 w-4 text-blue-500" /></Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(center.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {currentCenters.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center py-10 text-slate-500">No research centers listed.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 p-4 border-t">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-sm text-slate-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
