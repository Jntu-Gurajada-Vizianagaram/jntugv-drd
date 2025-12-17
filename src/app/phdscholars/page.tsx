import { SCHOLARS } from "./data";
import { User } from "lucide-react";

export default function PhDScholarData() {
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
                            Total Scholars: <span className="font-bold text-blue-900">{SCHOLARS.length}</span>
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
                                {SCHOLARS.map((scholar) => (
                                    <tr
                                        key={scholar.sno}
                                        className="hover:bg-blue-50/50 transition-colors odd:bg-white even:bg-slate-50"
                                    >
                                        <td className="px-4 py-3 text-center font-medium text-slate-600">
                                            {scholar.sno}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-slate-800">
                                            {scholar.roll}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-blue-900">
                                            {scholar.name}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${scholar.type === 'FT'
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                {scholar.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-700">
                                            {scholar.dept}
                                        </td>
                                        <td className="px-4 py-3 text-slate-700">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{scholar.supervisor}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {scholar.coSupervisor !== "-" ? (
                                                <span className="font-medium">{scholar.coSupervisor}</span>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-center text-slate-500">
                        Data valid as of latest update. For corrections, please contact Directorate of Research & Development.
                    </div>
                </div>
            </div>
        </div>
    );
}
