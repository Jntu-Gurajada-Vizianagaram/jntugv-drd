"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { sponsoredProjects } from "./data";
import { FileText, Search, PieChart, Wallet, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SponsoredResearchPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = sponsoredProjects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.sponsoringAgency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate statistics
    const totalProjects = sponsoredProjects.length;
    const completedProjects = sponsoredProjects.filter(p => p.status === "Completed").length;
    const ongoingProjects = sponsoredProjects.filter(p => p.status === "On-going").length;
    const totalBudget = sponsoredProjects.reduce((acc, curr) => acc + parseFloat(curr.budgetInLakhs), 0).toFixed(2);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="bg-blue-950 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <FileText className="h-8 w-8 text-amber-500" />
                        <span className="text-amber-500 font-medium tracking-wide">R&D CELL</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-6">
                        Sponsored Research Projects
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">

                {/* Dashboard Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Projects</p>
                                <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-full">
                                <PieChart className="h-6 w-6 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Budget</p>
                                <p className="text-2xl font-bold text-slate-900">₹{totalBudget} L</p>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-full">
                                <Wallet className="h-6 w-6 text-emerald-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Completed</p>
                                <p className="text-2xl font-bold text-slate-900">{completedProjects}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-full">
                                <CheckCircle2 className="h-6 w-6 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">On-going</p>
                                <p className="text-2xl font-bold text-slate-900">{ongoingProjects}</p>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-full">
                                <Clock className="h-6 w-6 text-amber-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search & Table */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-800">
                            Project List
                        </h2>
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search projects..."
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
                                    <TableHead className="w-[50px] font-bold text-slate-900">S.No</TableHead>
                                    <TableHead className="w-[300px] font-bold text-slate-900">Title of the Project</TableHead>
                                    <TableHead className="w-[250px] font-bold text-slate-900">Principal Investigator</TableHead>
                                    <TableHead className="w-[250px] font-bold text-slate-900">Co-Investigator</TableHead>
                                    <TableHead className="w-[100px] font-bold text-slate-900 text-right">Budget (Lakhs)</TableHead>
                                    <TableHead className="w-[150px] font-bold text-slate-900">Sponsoring Agency</TableHead>
                                    <TableHead className="w-[100px] font-bold text-slate-900">Period</TableHead>
                                    <TableHead className="w-[100px] font-bold text-slate-900">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project) => (
                                        <TableRow key={project.id} className="hover:bg-blue-50/50 transition-colors">
                                            <TableCell className="font-medium text-slate-500">{project.id}</TableCell>
                                            <TableCell className="font-medium text-slate-900 leading-relaxed">
                                                {project.title}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-blue-900">{project.principalInvestigator}</div>
                                                {project.piDesignation && (
                                                    <div className="text-xs text-slate-500 mt-1">{project.piDesignation}</div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {project.coInvestigator !== "—" ? (
                                                    <>
                                                        <div className="font-semibold text-slate-700">{project.coInvestigator}</div>
                                                        {project.coPiDesignation && (
                                                            <div className="text-xs text-slate-500 mt-1">{project.coPiDesignation}</div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-slate-400">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right font-mono font-medium text-slate-700">
                                                {project.budgetInLakhs}
                                            </TableCell>
                                            <TableCell className="text-slate-700">
                                                {project.sponsoringAgency}
                                            </TableCell>
                                            <TableCell className="text-slate-600 whitespace-nowrap">
                                                {project.period}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={project.status === "Completed" ? "default" : "secondary"}
                                                    className={
                                                        project.status === "Completed"
                                                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200"
                                                            : "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
                                                    }
                                                >
                                                    {project.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center text-slate-500">
                                            No projects found matching your search.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-center text-slate-500">
                        Showing {filteredProjects.length} of {totalProjects} projects
                    </div>
                </div>
            </div>
        </div>
    );
}
