'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export function LandingHero() {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-midnight-950">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-400/5 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-900/50 border border-midnight-700/50 backdrop-blur-md text-gold-400 text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-lg shadow-gold-400/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                        </span>
                        Built with real needs of 1000+ Professional Traders
                    </div>

                    {/* Hero Text */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 drop-shadow-2xl">
                        The Traders Diary
                    </h1>

                    <p className="text-2xl md:text-3xl text-gold-400 font-bold animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        A disciplined trading system — not just a journal.
                    </p>

                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-250 font-light">
                        Most traders don't fail because of bad strategies. <br />
                        They fail because they <span className="text-white font-medium">don't track, review, and learn</span>.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-base md:text-lg text-slate-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <span>👉 Record analysis</span>
                        <span>👉 Track strategies</span>
                        <span>👉 Log trades</span>
                        <span>👉 Review performance</span>
                        <span>👉 Improve consistently</span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link
                            href="/auth/register"
                            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold text-lg rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>No Live Data Pulling</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Simple Interface</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>AES-256 Encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Mobile Optimized</span>
                        </div>
                    </div>
                </div>

                {/* Hero Dashboard Preview with Glass/Tilt Effect */}
                <div className="mt-24 relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 group perspective-1000">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-indigo-500/20 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />

                    <div className="relative rounded-2xl border border-white/10 bg-midnight-900/60 backdrop-blur-xl p-3 shadow-2xl transform transition-transform duration-700 hover:rotate-x-2">
                        {/* Browser Bar */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-midnight-950/80 border-b border-white/5 rounded-t-xl flex items-center px-4 gap-2 z-20">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            <div className="ml-4 flex-1 h-6 bg-midnight-800/50 rounded-full border border-white/5"></div>
                        </div>

                        <div className="rounded-xl overflow-hidden relative aspect-[16/10] md:aspect-[21/9] border border-white/5 shadow-inner bg-midnight-950 mt-10">
                            <Image
                                src="/landing/dashboard.png"
                                alt="Traders Diary Dashboard"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
