'use client';

import { Youtube } from 'lucide-react';
import Link from 'next/link';

export function LandingFooter() {
    return (
        <footer className="bg-midnight-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <img src="/logo.png" alt="The Traders Diary" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-3xl font-bold text-white tracking-tight">The Traders Diary</span>
                        </div>
                        <p className="text-slate-400 max-w-sm text-lg leading-relaxed">
                            The ultimate professional trading journal and analysis platform. Built for traders who demand excellence and consistency.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/TradersDiaryApp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-400 hover:text-black transition-all duration-300 text-slate-400 group">
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@prathamwealthacademy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-400 hover:text-black transition-all duration-300 text-slate-400 group">
                                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/how-it-works" className="text-slate-400 hover:text-gold-400 transition-colors">How It Works</Link></li>
                            <li><Link href="#faq" className="text-slate-400 hover:text-gold-400 transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-gold-400 transition-colors">Contact</Link></li>
                            <li><Link href="/auth/register" className="text-slate-400 hover:text-gold-400 transition-colors">Get Started</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/legal/disclaimer" className="text-slate-400 hover:text-gold-400 transition-colors">Disclaimer</Link></li>
                            <li><Link href="/legal/privacy" className="text-slate-400 hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms" className="text-slate-400 hover:text-gold-400 transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm font-medium">
                    <p>&copy; {new Date().getFullYear()} Traders Diary. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        Made with <span className="text-red-500 animate-pulse">❤</span> by Traders, for Traders.
                    </p>
                </div>
            </div>
        </footer>
    );
}
