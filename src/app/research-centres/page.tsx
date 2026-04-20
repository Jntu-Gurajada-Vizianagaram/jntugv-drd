"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Building2, Search, MapPin, ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { API_URL } from "@/lib/constants";

interface ResearchCenter {
    id: number;
    name: string;      // Institute Name
    department: string; // Specialization
    center_name?: string; // Legacy/Optional
    place?: string;       // Legacy/Optional
    code?: string;
}

const ITEMS_PER_PAGE = 10;

export default function ResearchCentresPage() {
    const [centers, setCenters] = useState<ResearchCenter[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");

    // Fetch Data
    const fetchCenters = async () => {
        setLoading(true);
        setError("");
        try {
            // Using relative path for client-side which goes through Next.js proxy
            const res = await fetch(`${API_URL}/api/centers`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch data");
            const data = await res.json();
            setCenters(data);
        } catch (err) {
            console.error("Error fetching centers:", err);
            setError("Unable to load research centers. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCenters();
    }, []);

    // Filter & Search Logic
    const filteredCenters = centers.filter((center) =>
        (center.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (center.department?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        const nameComparison = (a.name || "").localeCompare(b.name || "");
        if (nameComparison !== 0) return nameComparison;
        return (a.department || "").localeCompare(b.department || "");
    });

    // Pagination Logic
    const totalPages = Math.max(1, Math.ceil(filteredCenters.length / ITEMS_PER_PAGE));
    const paginatedCenters = filteredCenters.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* HERITAGE HEADER */}
            <div className="bg-[#0a1e3f] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md border border-amber-500/30">
                        <Building2 className="h-3 w-3" /> Academic Infrastructure
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">
                        Research Centres
                    </h1>
                    <p className="text-blue-200/80 max-w-2xl mx-auto text-lg leading-relaxed">
                        Explore our network of recognized research institutes and laboratories dedicated to fostering innovation and advanced study.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20 max-w-6xl">
                {/* TOOLBAR CARD */}
                <Card className="border-none shadow-xl bg-white mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-bold text-sm border border-blue-100">
                                    {filteredCenters.length}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Total Centres</span>
                                    <span className="text-xs text-slate-500">Active & Recognized</span>
                                </div>
                            </div>

                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    placeholder="Search by center name or location..."
                                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-300 transition-all rounded-lg"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1); // Reset to page 1 on search
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CONTENT AREA */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                        <p className="text-sm font-medium">Loading research centres directory...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-red-100 shadow-xs">
                        <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Connection Error</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-6">{error}</p>
                        <Button onClick={fetchCenters} variant="outline" className="gap-2">
                            <RefreshCw className="h-4 w-4" /> Retry
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-slate-50/80 backdrop-blur-sm">
                                        <TableRow className="hover:bg-slate-50">
                                            <TableHead className="w-[80px] font-bold text-slate-700 uppercase text-xs tracking-wider text-center py-5">S.No</TableHead>
                                            <TableHead className="font-bold text-slate-700 uppercase text-xs tracking-wider py-5">Institute Name</TableHead>
                                            <TableHead className="w-[300px] font-bold text-slate-700 uppercase text-xs tracking-wider py-5">Specialization</TableHead>
                                            <TableHead className="w-[150px] font-bold text-slate-700 uppercase text-xs tracking-wider text-center py-5">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedCenters.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                                                    No centres found. Try adjusting your search.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedCenters.map((center, index) => (
                                                <TableRow key={center.id} className="group hover:bg-blue-50/30 transition-colors border-slate-100">
                                                    <TableCell className="text-center font-mono text-xs font-semibold text-slate-400 group-hover:text-blue-600">
                                                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        <div className="font-semibold text-slate-800 text-base mb-1 group-hover:text-blue-800 transition-colors leading-snug">
                                                            {center.name}
                                                        </div>

                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                            <Building2 className="h-4 w-4 text-amber-500/70" />
                                                            {center.department}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 px-3 py-1">
                                                            Active
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* Pagination Controls */}
                        {filteredCenters.length > ITEMS_PER_PAGE && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-4">
                                <p className="text-sm text-slate-500">
                                    Showing <span className="font-bold text-slate-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold text-slate-800">{Math.min(currentPage * ITEMS_PER_PAGE, filteredCenters.length)}</span> of {filteredCenters.length} centres
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="h-10 w-10 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                                            .map((page, i, visiblePages) => (
                                                <div key={page} className="flex">
                                                    {i > 0 && visiblePages[i - 1] !== page - 1 && (
                                                        <span className="px-2 text-slate-400">...</span>
                                                    )}
                                                    <Button
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`h-10 w-10 ${currentPage === page ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-400'}`}
                                                    >
                                                        {page}
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="h-10 w-10 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
