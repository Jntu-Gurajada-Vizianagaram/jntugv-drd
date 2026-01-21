"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { API_URL } from "@/lib/constants";

interface Subject {
    id: number;
    subject_code: string;
    subject_name: string;
    credits: number;
    department: string;
    type: string;
    file_path?: string;
}

export default function PrePhdPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

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
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const getLink = (path: string) => {
        if (path.startsWith('http')) return path;
        return `${API_URL}${path}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="bg-blue-950 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                        Pre-PhD Info
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                    <p className="text-blue-200 mt-4 text-lg">
                        Research and Development Cell
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">

                {/* Regulations Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-900 border-l-4 border-amber-500 pl-3">
                        Regulations
                    </h2>
                    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b text-center">
                                <tr>
                                    <th className="px-6 py-4 w-20">S.No</th>
                                    <th className="px-6 py-4 text-left">Description</th>
                                    <th className="px-6 py-4 w-40">Download</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-center font-medium text-slate-500">01</td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">
                                        JNTU-GV 2022 Admitted Ph.D Scholars
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="https://drive.google.com/file/d/100EBmm37-4PWZdkPMQnS8K-0g19X1JhD/view" target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                                                <Download className="h-4 w-4" /> Download
                                            </Button>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-center font-medium text-slate-500">02</td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">
                                        D R&D- Ph.D Regulations (2024-2025)
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="https://api.jntugv.edu.in/media/PhD%20programme%20guidelines.pdf" target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                                                <Download className="h-4 w-4" /> Download
                                            </Button>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Syllabus Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-900 border-l-4 border-amber-500 pl-3">
                        Syllabus
                    </h2>
                    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b text-center">
                                <tr>
                                    <th className="px-6 py-4 w-20">S.No</th>
                                    <th className="px-6 py-4 text-left">Subject</th>
                                    <th className="px-6 py-4 w-40">Download</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan={3} className="text-center py-8">Loading...</td></tr>
                                ) : subjects.length === 0 ? (
                                    <tr><td colSpan={3} className="text-center py-8 text-slate-500">No data found.</td></tr>
                                ) : (
                                    subjects.map((subject, index) => (
                                        <tr key={subject.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-center font-medium text-slate-500">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-800">
                                                {subject.subject_name}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {subject.file_path ? (
                                                    <a
                                                        href={getLink(subject.file_path)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                                                            <Download className="h-4 w-4" /> Download
                                                        </Button>
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400 text-xs">--</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
