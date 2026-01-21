"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus, BookOpen } from "lucide-react";

interface Subject {
    id: number;
    subject_code: string;
    subject_name: string;
    credits: number;
    department: string;
    type: string;
    file_path?: string;
}

export default function AdminSubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form
    const [formData, setFormData] = useState<Partial<Subject>>({
        subject_code: "", subject_name: "", credits: 3, department: "", type: "Core"
    });

    useEffect(() => {
        fetch('/api/subjects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSubjects(data);
                } else {
                    console.error("API returned non-array:", data);
                    setSubjects([]);
                }
            })
            .catch(err => {
                console.error(err);
                setSubjects([]);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        try {
            const url = editingId ? `/api/subjects/${editingId}` : '/api/subjects';
            const method = editingId ? 'PUT' : 'POST';

            const formDataToSend = new FormData();
            formDataToSend.append('subject_code', formData.subject_code || "");
            formDataToSend.append('subject_name', formData.subject_name || "");
            formDataToSend.append('credits', String(formData.credits || 0));
            formDataToSend.append('department', formData.department || "");
            formDataToSend.append('type', formData.type || "Core");

            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput && fileInput.files && fileInput.files[0]) {
                formDataToSend.append('file', fileInput.files[0]);
            }

            // Headers: Do NOT set Content-Type for FormData, browser sets it with boundary
            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (res.ok) {
                const updated = await res.json();
                if (editingId) {
                    setSubjects(subjects.map(s => s.id === editingId ? updated : s));
                } else {
                    setSubjects([updated, ...subjects]);
                }
                resetForm();
            } else {
                alert("Failed to save subject.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this subject?")) return;
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

        try {
            const res = await fetch(`/api/subjects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setSubjects(subjects.filter(s => s.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (subject: Subject) => {
        setEditingId(subject.id);
        setFormData(subject);
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ subject_code: "", subject_name: "", credits: 3, department: "", type: "Core" });
        setShowForm(false);
    };

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Subjects (Pre-PhD)</h1>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Subject
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8 border-blue-200 shadow-md">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Subject" : "New Subject"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input name="subject_code" placeholder="Subject Code (e.g. CSE101)" value={formData.subject_code} onChange={handleChange} required />
                            <Input name="subject_name" placeholder="Subject Name" value={formData.subject_name} onChange={handleChange} required />
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Department</label>
                                <Input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Credits</label>
                                <Input type="number" name="credits" placeholder="Credits" value={formData.credits} onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Type</label>
                                <select name="type" className="w-full border rounded px-3 py-2 text-sm" value={formData.type} onChange={handleChange}>
                                    <option value="Core">Core</option>
                                    <option value="Elective">Elective</option>
                                    <option value="Audit">Audit</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Syllabus / File (Optional)</label>
                                <Input type="file" name="file" accept=".pdf,.doc,.docx" />
                                {editingId && (formData as any).file_path && (
                                    <p className="text-xs text-green-600 mt-1">Current file: {(formData as any).file_path.split('/').pop()}</p>
                                )}
                            </div>

                            <div className="md:col-span-2 flex gap-2 justify-end mt-4">
                                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                <Button type="submit">{editingId ? "Update" : "Add Subject"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="bg-white rounded-lg shadow border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                        <tr>
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4">Subject Name</th>
                            <th className="px-6 py-4">Dept</th>
                            <th className="px-6 py-4">Credits</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {subjects.map(subject => (
                            <tr key={subject.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{subject.subject_code}</td>
                                <td className="px-6 py-4 font-medium">{subject.subject_name}</td>
                                <td className="px-6 py-4">{subject.department}</td>
                                <td className="px-6 py-4">{subject.credits}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">{subject.type}</span>
                                </td>
                                <td className="px-6 py-4 text-right gap-2 flex justify-end">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(subject)}><Edit className="h-4 w-4 text-blue-500" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(subject.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                </td>
                            </tr>
                        ))}
                        {subjects.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-slate-500">No subjects listed.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
