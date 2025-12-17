"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { researchCentres } from "./data";
import { Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ResearchCentresPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCentres = researchCentres.filter((centre) =>
        centre.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        centre.institute.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="bg-blue-950 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <Building2 className="h-8 w-8 text-amber-500" />
                        <span className="text-amber-500 font-medium tracking-wide">R&D CELL</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-6">
                        List of Research Centres
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-slate-800">
                                Recognized Research Centres
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                                {researchCentres.length}
                            </span>
                        </div>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search centres or institutes..."
                                className="pl-9 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[80px] font-bold text-slate-900 text-center">S.No</TableHead>
                                    <TableHead className="w-[300px] font-bold text-slate-900">Name of the Research Centre</TableHead>
                                    <TableHead className="font-bold text-slate-900">Name of the Institute</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCentres.length > 0 ? (
                                    filteredCentres.map((centre) => (
                                        <TableRow key={centre.id} className="hover:bg-blue-50/50 transition-colors">
                                            <TableCell className="font-medium text-slate-500 text-center">{centre.id}</TableCell>
                                            <TableCell className="font-semibold text-blue-900 leading-relaxed">
                                                {centre.specialization}
                                            </TableCell>
                                            <TableCell className="text-slate-700 leading-relaxed">
                                                {centre.institute}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center text-slate-500">
                                            No research centres found matching "{searchTerm}"
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-center text-slate-500">
                        Data is subject to change. Please contact the Directorate for the most recent list.
                    </div>
                </div>
            </div>
        </div>
    );
}
