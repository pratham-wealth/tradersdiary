'use client';

import { TrendingUp, Twitter, Youtube, Instagram, Linkedin, Mail } from 'lucide-react';
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
                            <div className="p-2 bg-gold-400/10 border border-gold-400/20 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-gold-400" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">Traders Diary</span>
                        </div>
                        <p className="text-slate-400 max-w-sm text-lg leading-relaxed">
                            The ultimate professional trading journal and analysis platform. Built for traders who demand excellence and consistency.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Youtube, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-400 hover:text-black transition-all duration-300 text-slate-400 group">
                                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation columns removed for now */}
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
