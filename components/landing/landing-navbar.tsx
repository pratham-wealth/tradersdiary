'use client';

import Link from 'next/link';
import { ArrowRight, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-950 border-b border-white/5 py-4 shadow-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 group-hover:scale-105 transition-transform">
                            <img src="/logo.png" alt="The Traders Diary" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:to-white transition-all">
                            The Traders Diary
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
                        <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-gold-400 transition-colors">Features</Link>
                        <Link href="/how-it-works" className="text-sm font-medium text-slate-400 hover:text-gold-400 transition-colors">How it Works</Link>
                        <Link href="#faq" className="text-sm font-medium text-slate-400 hover:text-gold-400 transition-colors">FAQ</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/auth/login"
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block px-4 py-2 hover:bg-white/5 rounded-lg"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/register"
                            className="flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-black text-sm font-bold rounded-full hover:bg-gold-500 transition-all shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] hover:scale-105"
                        >
                            Get Started <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
