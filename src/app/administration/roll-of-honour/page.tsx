import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Medal } from "lucide-react";

// Placeholder Data - User to populate
// Status can be "Regular" or "In-charge"
const formerVCs = [
    { id: 1, name: "Prof. K. venkata Subbayya ", period: "2022 - 2024", status: "Regular" },
    { id: 2, name: "Prof. D. Rajya Lakshmi", period: "2024 - 2025", status: "In-charge" },
];

const formerRegistrars = [
    { id: 1, name: "Prof. G. Swami Naidu", period: "2022 - 2024", status: "Regular" },
];

const formerDirectors = [
    { id: 1, name: "Dr. K. Babulu", period: "2022 - 2024", status: "In-charge" },

];

export default function RollOfHonourPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="bg-blue-950 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <Medal className="h-8 w-8 text-amber-500" />
                        <span className="text-amber-500 font-medium tracking-wide">UNIVERSITY LEADERSHIP</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-6">
                        Roll of Honour
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                    <p className="text-center text-blue-200 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        Honouring the distinguished Administration and Directors (R&D) who have shaped the legacy of JNTUGV.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">

                {/* Vice-Chancellors Section */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 bg-slate-50 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-blue-900">Former Vice-Chancellors</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">S.No</TableHead>
                                <TableHead className="w-[300px]">Name</TableHead>
                                <TableHead className="w-[150px]">Status</TableHead>
                                <TableHead className="text-right">Tenure</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formerVCs.map((person, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-slate-500">{index + 1}</TableCell>
                                    <TableCell className="font-semibold text-slate-900">{person.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={person.status === "Regular" ? "default" : "secondary"} className={person.status === "Regular" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}>
                                            {person.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-slate-700 font-mono text-sm">{person.period}</TableCell>
                                </TableRow>
                            ))}
                            {/* Empty State / Call to Action */}
                            {formerVCs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-slate-500 italic">
                                        Information to be updated.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </section>

                {/* Registrars Section */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 bg-slate-50 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-blue-900">Former Registrars</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">S.No</TableHead>
                                <TableHead className="w-[300px]">Name</TableHead>
                                <TableHead className="w-[150px]">Status</TableHead>
                                <TableHead className="text-right">Tenure</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formerRegistrars.map((person, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-slate-500">{index + 1}</TableCell>
                                    <TableCell className="font-semibold text-slate-900">{person.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={person.status === "Regular" ? "default" : "secondary"} className={person.status === "Regular" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}>
                                            {person.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-slate-700 font-mono text-sm">{person.period}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                {/* Directors Section */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 bg-slate-50 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-blue-900">Former Directors (R&D)</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">S.No</TableHead>
                                <TableHead className="w-[300px]">Name</TableHead>
                                <TableHead className="w-[150px]">Status</TableHead>
                                <TableHead className="text-right">Tenure</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formerDirectors.map((person, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-slate-500">{index + 1}</TableCell>
                                    <TableCell className="font-semibold text-slate-900">{person.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={person.status === "Regular" ? "default" : "secondary"} className={person.status === "Regular" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}>
                                            {person.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-slate-700 font-mono text-sm">{person.period}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

            </div>
        </div>
    );
}
