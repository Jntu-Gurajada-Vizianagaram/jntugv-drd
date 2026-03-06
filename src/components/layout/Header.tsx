"use client";

import { Button } from "@/components/ui/button";
import {
    Accessibility,
    Bell,
    BookOpen,
    Building2,
    ChevronDown,
    Download,
    FileText,
    FlaskConical,
    GraduationCap,
    Home,
    Info,
    Languages,
    Menu,
    Minus,
    Phone,
    Plus,
    ScrollText,
    Search,
    Target,
    Type,
    User,
    Users,
    X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Define Navigation Structure
type NavItem = {
    label: string;
    href?: string;
    icon: any;
    children?: { label: string; href: string; icon: any }[];
};

const NAV_ITEMS: NavItem[] = [
    { href: "/", label: "Home", icon: Home },
    {
        label: "About",
        icon: Info,
        children: [
            { href: "/about", label: "About R&D", icon: Info },
            { href: "/about#vision", label: "Vision", icon: ScrollText },
            { href: "/about#mission", label: "Mission", icon: Target },
            { href: "/about/director", label: "Director", icon: User },
        ]
    },
    {
        label: "Administration",
        icon: Users,
        children: [
            // { href: "/administration/chancellor", label: "Chancellor", icon: User },
            // { href: "/administration/vice-chancellor", label: "Vice Chancellor", icon: User },
            // { href: "/administration/registrar", label: "Registrar", icon: User },
            { href: "/about/director", label: "Director", icon: User },
            // { href: "/administration/roll-of-honour", label: "Roll of Honour", icon: Medal },
        ]
    },
    {
        label: "Research",
        icon: FlaskConical,
        children: [
            { href: "/research", label: "Overview", icon: FlaskConical },
            { href: "/sponsored-research", label: "Sponsored Research", icon: FileText },
            { href: "/research-centres", label: "Research Centres", icon: Building2 },
        ]
    },
    {
        label: "Academics",
        icon: GraduationCap,
        children: [
            { href: "/programs", label: "Programs Offered", icon: BookOpen },
            { href: "/phdprograms-regulations", label: "PhD Program Regulations", icon: BookOpen },
            { href: "/phdscholars", label: "PhD Scholars", icon: GraduationCap },
        ]
    },
    {
        label: "Downloads",
        icon: Download,
        href: "/downloads",
    },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/contact", label: "Contact Us", icon: Phone },
];

export function Header() {
    const [open, setOpen] = useState(false);
    const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState(100);

    const adjustFont = (amount: number) => {
        const newSize = Math.max(80, Math.min(130, fontSize + amount));
        setFontSize(newSize);
        document.documentElement.style.fontSize = `${newSize}%`;
    };

    const toggleMobileSubmenu = (label: string) => {
        setExpandedMobile(expandedMobile === label ? null : label);
    };

    return (
        <header className="w-full flex-none z-50 shadow-sm print:hidden">
            {/* ACCESSIBILITY & UTILITY BAR (UGC Norm) */}
            <div className="bg-slate-900 text-slate-200 text-xs py-1.5 border-b border-slate-700">
                <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-y-2">
                    <div className="flex items-center gap-4">
                        <Link href="#main-content" className="hover:text-amber-400 focus:outline-hidden focus:text-amber-400 transition-colors">
                            Skip to Main Content
                        </Link>
                        <span className="text-slate-600">|</span>
                        <div className="flex items-center gap-2" title="Text Size">
                            <span className="sr-only">Text Size</span>
                            <button onClick={() => adjustFont(-10)} className="hover:text-amber-400 p-1"><Minus className="h-3 w-3" /></button>
                            <Type className="h-3 w-3" />
                            <button onClick={() => adjustFont(10)} className="hover:text-amber-400 p-1"><Plus className="h-3 w-3" /></button>
                        </div>
                        <span className="text-slate-600">|</span>
                        <button className="flex items-center gap-1 hover:text-amber-400">
                            <Accessibility className="h-3 w-3" /> <span className="hidden sm:inline">Screen Reader</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 hover:text-amber-400 cursor-pointer">
                            <Languages className="h-3 w-3" />
                            <select className="bg-transparent border-none text-xs focus:ring-0 cursor-pointer py-0 pl-1">
                                <option className="text-black">English</option>
                                <option className="text-black">తెలుగు</option>
                                <option className="text-black">हिंदी</option>
                            </select>
                        </div>
                        <span className="text-slate-600">|</span>
                        <Link href="/admin/login" className="hover:text-amber-400 font-semibold">
                            Faculty Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* BRANDING SECTION */}
            <div className="bg-white py-4 relative z-20">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        {/* Placeholder for Logo if not exists, but maintaining layout */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative">
                            <img src="/logo.png" alt="JNTU-GV Logo" className="w-full h-full object-contain" />
                        </div>

                        <div className="flex flex-col justify-center">
                            <h2 className="text-xs sm:text-sm font-bold text-slate-600 tracking-wider">
                                JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY - GURAJADA VIZIANAGARAM
                            </h2>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-blue-900 leading-tight group-hover:text-blue-800 transition-colors">
                                Directorate of <br className="sm:hidden" />
                                <span className="text-amber-600">Research & Development</span>
                            </h1>
                        </div>
                    </Link>

                    {/* UGC / Govt Logos could go here on the right */}
                    <div className="hidden lg:flex items-center gap-4 opacity-80">
                        {/* Example placeholder for emblem */}
                        {/* <img src="/emblem.png" className="h-14 w-auto grayscale hover:grayscale-0 transition" /> */}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md"
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                </div>
            </div>

            {/* NAVIGATION BAR */}
            <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-40 print:hidden">
                <div className="container mx-auto px-4">
                    <div className="hidden lg:flex items-center justify-between h-14">
                        <ul className="flex items-center gap-1 h-full">
                            {NAV_ITEMS.map((item, index) => (
                                <li key={index} className="h-full relative group">
                                    {item.children ? (
                                        <>
                                            <button className="h-full px-5 flex items-center gap-2 text-sm font-medium hover:bg-white/10 hover:text-amber-400 transition-colors cursor-pointer">
                                                <item.icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                                                {item.label}
                                                <ChevronDown className="h-3 w-3 ml-0.5 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-0 w-64 bg-white rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border-t-2 border-amber-500 overflow-hidden">
                                                {item.children.map((child, childIndex) => (
                                                    <Link
                                                        key={childIndex}
                                                        href={child.href}
                                                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors border-b border-slate-50 last:border-0"
                                                    >
                                                        <child.icon className="h-4 w-4 text-blue-500/70" />
                                                        <span className="text-sm font-medium">{child.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            className="h-full px-5 flex items-center gap-2 text-sm font-medium hover:bg-white/10 hover:text-amber-400 transition-colors relative group"
                                        >
                                            <item.icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                                            {item.label}
                                            <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center bg-blue-950/50 rounded-full px-3 py-1.5 border border-blue-800/50 focus-within:border-amber-400/50 transition-colors">
                            <Search className="h-4 w-4 text-blue-300" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-hidden text-sm px-2 text-white placeholder:text-blue-300/70 w-32 focus:w-48 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col">
                        <div className="p-4 border-b flex items-center justify-between bg-slate-50">
                            <span className="font-bold text-lg text-blue-900">Menu</span>
                            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto py-4">
                            <ul className="space-y-1 px-3">
                                {NAV_ITEMS.map((item, index) => (
                                    <li key={index}>
                                        {item.children ? (
                                            <div>
                                                <button
                                                    onClick={() => toggleMobileSubmenu(item.label)}
                                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 font-medium transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className="h-5 w-5" />
                                                        {item.label}
                                                    </div>
                                                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedMobile === item.label ? "rotate-180" : ""}`} />
                                                </button>

                                                {/* Mobile Submenu */}
                                                {expandedMobile === item.label && (
                                                    <div className="ml-4 pl-4 border-l-2 border-slate-100 space-y-1 mt-1">
                                                        {item.children.map((child, childIndex) => (
                                                            <Link
                                                                key={childIndex}
                                                                href={child.href}
                                                                onClick={() => setOpen(false)}
                                                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50/50 text-sm font-medium block"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href!}
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                                            >
                                                <item.icon className="h-5 w-5" />
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <hr className="my-4 border-slate-100" />

                            <div className="px-6 space-y-4">
                                <Link onClick={() => setOpen(false)} href="/auth/login" className="flex items-center justify-center w-full py-2.5 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800">
                                    Faculty Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
