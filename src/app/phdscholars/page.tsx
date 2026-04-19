"use client";

import { useState, useEffect } from "react";
import { User, ChevronLeft, ChevronRight, Search } from "lucide-react";
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
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 20;

    // Reset pagination when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

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

    // Filter scholars
    const filteredScholars = scholars.filter((s) => {
        const q = searchQuery.toLowerCase();
        return (
            s.name.toLowerCase().includes(q) ||
            s.roll_number.toLowerCase().includes(q) ||
            s.supervisor.toLowerCase().includes(q)
        );
    });

    // Calculate total pages based on filtered results
    const totalPages = Math.ceil(filteredScholars.length / itemsPerPage) || 1;

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentScholars = filteredScholars.slice(indexOfFirstItem, indexOfLastItem);

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
                        
                        <div className="flex items-center gap-6">
                            <div className="relative group hidden sm:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by Name/Roll/Supervisor..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                            <div className="text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                Total: <span className="font-bold text-blue-900">{filteredScholars.length}</span>
                            </div>
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
                                Showing {filteredScholars.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredScholars.length)} of {filteredScholars.length} entries
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
