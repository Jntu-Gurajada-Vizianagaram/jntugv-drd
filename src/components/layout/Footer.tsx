import { ChevronRight, Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-[#0f172a] text-slate-300 font-sans border-t border-slate-800 print:hidden">
            {/* Upper Footer */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Column 1: Institute Brand */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-1.5 rounded-lg flex-shrink-0">
                                <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-lg text-white leading-tight">JNTU-GV</h3>
                                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Directorate of R&D</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Fostering excellence in research and development, aiming to bridge the gap between academic innovation and societal needs.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {/* Social Icons Placeholder */}
                            <Link href="https://jntugv.edu.in/" target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                                <Globe className="h-4 w-4" />
                            </Link>
                            <Link href="https://www.facebook.com/jntugv/" target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link href="https://twitter.com/jntugv" target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="https://www.linkedin.com/school/jntugv/" target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                            <Link href="https://www.instagram.com/jntu_gurajada/" target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-colors">
                                <Instagram className="h-4 w-4" />
                            </Link>

                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 border-l-4 border-amber-500 pl-3">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/research" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> Research Areas</Link></li>
                            <li><Link href="/notifications" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> Notifications</Link></li>
                            <li><Link href="/downloads" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> Circulars & Downloads</Link></li>
                            <li><Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: UGC Mandatory */}
                    <div>
                        <h4 className="font-bold text-white mb-6 border-l-4 border-amber-500 pl-3">Mandatory Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="https://jntugv.edu.in/rti" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> RTI Act</a></li>
                            <li><a href="https://jntugv.edu.in/grievance" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> Grievance Redressal</a></li>
                            <li><a href="https://jntugv.edu.in/mandatory-disclosure" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> Mandatory Disclosure</a></li>
                            <li><a href="https://jntugv.edu.in/anti-ragging" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3" /> Anti-Ragging Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6 border-l-4 border-amber-500 pl-3">Contact Us</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-400">
                                    JNTU-GV, Dwarapudi,<br />
                                    Vizianagaram, Andhra Pradesh<br />
                                    India - 535003
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                <a href="mailto:dr@jntugv.edu.in" className="text-slate-400 hover:text-white transition-colors">
                                    dr@jntugv.edu.in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#020617] py-6 border-t border-slate-900/50">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Directorate of Research & Development, JNTU-GV. All Rights Reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-300">Terms of Use</Link>
                        <span>Designed and Developed by  <a href="https://dmc.jntugv.edu.in" target="_blank" rel="noopener noreferrer">Digital Monitoring Cell JNTU-GV</a></span>
                    </div>
                </div>
            </div>
        </footer >
    );
}
