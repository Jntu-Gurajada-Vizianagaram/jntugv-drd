"use client";

import { useState, useEffect } from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Scholar {
    id: number;
    name: string;
    roll_number: string;
    department: string;
    supervisor: string;
    co_supervisor?: string;
    status: string;
}

export default function PhDScholarData() {
    const [scholars, setScholars] = useState<Scholar[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

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
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(scholars.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentScholars = scholars.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner - matching other pages */}
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-center">
                        PhD Scholar Data
                    </h1>
                    <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <User className="h-5 w-5 text-amber-600" />
                            Registered Scholars List
                        </h2>
                        <div className="text-sm text-slate-500">
                            Total Scholars: <span className="font-bold text-blue-900">{scholars.length}</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-center whitespace-nowrap w-16">S.No</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Roll Number</th>
                                    <th className="px-4 py-3 min-w-[200px]">Scholar Name</th>
                                    <th className="px-4 py-3 text-center">Type</th>
                                    <th className="px-4 py-3 min-w-[200px]">Department</th>
                                    <th className="px-4 py-3 min-w-[200px]">Supervisor</th>
                                    <th className="px-4 py-3 min-w-[200px]">Co-Supervisor</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8">Loading scholars...</td>
                                    </tr>
                                ) : currentScholars.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-slate-500">No scholars found.</td>
                                    </tr>
                                ) : (
                                    currentScholars.map((scholar, index) => (
                                        <tr
                                            key={scholar.id}
                                            className="hover:bg-blue-50/50 transition-colors odd:bg-white even:bg-slate-50"
                                        >
                                            <td className="px-4 py-3 text-center font-medium text-slate-600">
                                                {indexOfFirstItem + index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-slate-800">
                                                {scholar.roll_number}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-blue-900">
                                                {scholar.name}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${scholar.status === 'Full-Time' || scholar.status === 'FT'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-amber-100 text-amber-800'
                                                    }`}>
                                                    {scholar.status === 'Full-Time' ? 'FT' : scholar.status === 'Part-Time' ? 'PT' : scholar.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-700">
                                                {scholar.department}
                                            </td>
                                            <td className="px-4 py-3 text-slate-700">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{scholar.supervisor}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {scholar.co_supervisor && scholar.co_supervisor !== "-" ? (
                                                    <span className="font-medium">{scholar.co_supervisor}</span>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {!loading && totalPages > 1 && (
                        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, scholars.length)} of {scholars.length} entries
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </Button>
                                <span className="text-sm font-medium text-slate-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-center text-slate-500">
                        Data valid as of latest update. For corrections, please contact Directorate of Research & Development.
                    </div>
                </div>
            </div>
        </div>
    );
}
