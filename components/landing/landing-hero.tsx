'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LandingHero() {
    return (
        <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-midnight-950">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-400/5 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center space-y-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight-900/50 border border-midnight-700/50 backdrop-blur-md text-gold-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-gold-400/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                        </span>
                        Built with real needs of 1000+ Professional Traders
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] drop-shadow-2xl">
                        The Traders Diary
                    </h1>

                    {/* Subheading */}
                    <p className="text-2xl md:text-3xl lg:text-4xl text-gold-400 font-bold max-w-4xl mx-auto">
                        A disciplined trading system — not just a journal.
                    </p>

                    {/* Problem Statement */}
                    <div className="max-w-3xl mx-auto space-y-3 pt-4">
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                            Most traders don't fail because of bad strategies.
                        </p>
                        <p className="text-xl md:text-2xl text-white font-semibold">
                            They fail because they <span className="text-gold-400">don't track, review, and learn</span>.
                        </p>
                    </div>

                    {/* Feature List & CTA - 2 Column Layout */}
                    <div className="max-w-5xl mx-auto pt-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left: Feature List */}
                            <div className="flex justify-center">
                                <div className="space-y-2 text-left">
                                    {[
                                        '👉 Record analysis',
                                        '👉 Track strategies',
                                        '👉 Log trades',
                                        '👉 Review performance',
                                        '👉 Improve consistently'
                                    ].map((item, i) => (
                                        <p key={i} className="text-lg text-slate-200 font-medium">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Right: CTA Button */}
                            <div className="flex flex-col items-center justify-center">
                                <Link
                                    href="/auth/register"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold text-xl rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-[0_0_50px_-10px_rgba(251,191,36,0.7)] group"
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <p className="text-xs text-slate-500 max-w-2xl mx-auto pt-6 leading-relaxed">
                        By signing up, you agree to our{' '}
                        <a href="/legal/terms" className="text-slate-400 hover:text-gold-400 underline transition-colors">Terms & Conditions</a>
                        {' '}and{' '}
                        <a href="/legal/privacy" className="text-slate-400 hover:text-gold-400 underline transition-colors">Privacy Policy</a>.
                        {' '}Read our{' '}
                        <a href="/legal/disclaimer" className="text-slate-400 hover:text-gold-400 underline transition-colors">Disclaimer</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
