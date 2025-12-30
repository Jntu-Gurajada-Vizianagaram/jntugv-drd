"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Download, ExternalLink } from "lucide-react";
import { DownloadItem } from "@/lib/downloads-data";

export default function DownloadsPage() {
    const [downloadItems, setDownloadItems] = useState<DownloadItem[]>([]);

    const BACKEND_URL = "http://localhost:5000";

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const res = await fetch('/api/downloads', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setDownloadItems(data);
                }
            } catch (error) {
                console.error("Failed to fetch downloads", error);
            }
        };
        fetchDownloads();
    }, []);

    const getLink = (item: DownloadItem) => {
        if (item.file_path) {
            return `${BACKEND_URL}${item.file_path}`;
        }
        return item.link;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="bg-blue-950 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <FileDown className="h-8 w-8 text-amber-500" />
                        <span className="text-amber-500 font-medium tracking-wide">R&D CELL</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-6">
                        Downloads & Resources
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                    <p className="text-center text-blue-200 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        Access important forms, applications, and guidelines for research scholars and faculty.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                {downloadItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500">Loading resources...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {downloadItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                                            {item.category}
                                        </span>
                                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                            {item.type === "Form" || item.type === "DOCX" || item.type === "PDF" ? (
                                                <FileDown className="h-5 w-5 text-slate-500 group-hover:text-blue-600" />
                                            ) : (
                                                <ExternalLink className="h-5 w-5 text-slate-500 group-hover:text-blue-600" />
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-900 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Click below to download this document.
                                    </p>
                                </div>

                                <a
                                    href={getLink(item)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                >
                                    <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white group-hover:translate-y-[-2px] transition-all">
                                        <Download className="mr-2 h-4 w-4" />
                                        Access Document
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
