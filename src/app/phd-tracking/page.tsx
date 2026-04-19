"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Settings } from "lucide-react";

export default function PhdTrackingPage() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] bg-slate-50 font-sans">
            {/* Header Banner */}
            <div className="bg-blue-900 border-b-4 border-amber-500 py-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                        PhD Scholar Tracking System
                    </h1>
                    <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto">
                        Integrated Research Scholar Management Portal
                    </p>
                </div>
            </div>

            {/* Under Development Message */}
            <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 lg:p-16">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 md:p-16 text-center max-w-2xl relative overflow-hidden">
                    {/* Abstract design element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="h-24 w-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner border border-blue-100">
                            <Loader2 className="h-10 w-10 animate-spin opacity-40 absolute" />
                            <Settings className="h-12 w-12 relative z-10" />
                        </div>

                        <div className="inline-block px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-xs font-bold tracking-wider text-amber-700 mb-6 uppercase">
                            System Update Status
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-serif font-black text-slate-800 mb-4">
                            Under Development & Testing
                        </h2>

                        <p className="text-slate-500 text-base md:text-lg mb-8 leading-relaxed">
                            The PhD Scholar Tracking core module is currently undergoing essential infrastructure upgrades and beta testing to ensure a seamless portal experience.
                        </p>

                        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
