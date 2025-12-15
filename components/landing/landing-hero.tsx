'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export function LandingHero() {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-gold-400/20 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
                        Trusted by 1000+ Elite Traders
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Stop Gambling. <br />
                        <span className="text-gold-400">Start Trading.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        The professional's edge for journaling trades, analyzing mistakes, and building profitable strategies.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link
                            href="/auth/register"
                            className="w-full sm:w-auto px-8 py-4 bg-gold-400 text-black font-bold text-lg rounded-full hover:bg-gold-500 transition-all shadow-xl shadow-gold-400/20 hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Start Your Free Trial <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold text-lg rounded-full border border-white/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            <PlayCircle className="w-5 h-5 text-gold-400" />
                            How it Works
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center justify-center gap-8 text-slate-500 text-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold-400" />
                            <span>No Credit Card Req.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold-400" />
                            <span>Secure & Private</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold-400" />
                            <span>Mobile Optimized</span>
                        </div>
                    </div>
                </div>

                {/* Hero Dashboard Preview */}
                <div className="mt-20 relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    <div className="absolute inset-0 bg-gold-400/20 blur-[100px] -z-10 rounded-full h-full w-full"></div>
                    <div className="bg-slate-950 border border-white/10 rounded-2xl p-2 shadow-2xl">
                        <div className="bg-slate-900 rounded-xl overflow-hidden relative aspect-[16/9] md:aspect-[21/9]">
                            <Image
                                src="/landing/dashboard.png"
                                alt="Traders Diary Dashboard"
                                fill
                                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
