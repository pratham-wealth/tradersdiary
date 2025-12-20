'use client';

import Image from 'next/image';
import { BarChart2, BookOpen, Fingerprint, Layers, LayoutDashboard, LineChart, MoveRight, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';

export function LandingFeatures() {
    return (
        <section id="features" className="py-32 bg-midnight-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">One Ecosystem.</span> <br />
                        <span className="text-gold-400">Total Control.</span>
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
                        The Traders Diary isn't just a logbook. It is a <span className="text-white font-medium">mirror of your trading mind</span>, designed to enforce discipline where it matters most.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">

                    {/* Item 1: Main Dashboard (Large Span) */}
                    <div className="col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-midnight-900/50 hover:bg-midnight-900 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="p-8 h-full flex flex-col relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center mb-6 border border-gold-400/20">
                                <LayoutDashboard className="w-6 h-6 text-gold-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Master Your Edge</h3>
                            <p className="text-lg text-gold-400 font-semibold mb-2">The Daily Ritual</p>
                            <p className="text-slate-400 text-lg mb-8 max-w-md">
                                Start every session with a <span className="text-white font-medium">clear mind</span>. The dashboard forces you to review your rules before you ever look at a chart. Zero noise. Pure focus.
                            </p>

                            <div className="flex-1 w-full relative rounded-t-xl overflow-hidden border-t border-l border-r border-white/10 shadow-2xl translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                                <Image
                                    src="/landing/dashboard.png"
                                    alt="Dashboard Interface"
                                    fill
                                    className="object-cover object-left-top"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Item 2: Journaling (Tall) */}
                    <div className="col-span-1 row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-midnight-900/50 hover:bg-midnight-900 transition-colors">
                        <div className="p-8 h-full flex flex-col relative z-10">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                                <BookOpen className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The Heart of Discipline</h3>
                            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                <span className="text-white font-semibold">Manual Entry = Mental Commitment</span>
                                <br />We intentionally avoid "auto-sync" features. Manually logging your trade forces you to review your logic, own your decision, and process the emotion.
                            </p>
                            <p className="text-slate-400 text-xs mb-6">
                                <span className="text-blue-400 font-semibold">Psychology Tags:</span> Log how you <em>felt</em> (Anxious? FOMO? Confident?). Spot the emotional triggers that cause your losses.
                            </p>

                            <div className="flex-1 w-full relative rounded-xl overflow-hidden shadow-2xl border border-white/5">
                                <Image
                                    src="/landing/journal.png"
                                    alt="Journal Log"
                                    fill
                                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Item 3: Strategies (Wide) */}
                    <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-midnight-900/50 hover:bg-midnight-900 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div className="flex-1 space-y-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                    <Fingerprint className="w-5 h-5 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">The Strategy Lab</h3>
                                <p className="text-lg text-purple-400 font-semibold">Stop Guessing. Know Your Win Rate.</p>
                                <p className="text-slate-400">
                                    <span className="text-white font-medium">Document Your Edge:</span> Clearly define Entry/Exit criteria, Risk/Reward ratios, and "Must-Follow" rules.
                                </p>
                                <p className="text-slate-400">
                                    <span className="text-white font-medium">Data-Backed Confidence:</span> Tag every trade to a strategy. Discover if your "Asian Session Breakout" actually makes money, or if it's bleeding your account.
                                </p>
                                <p className="text-slate-400 text-sm">
                                    <span className="text-purple-400 font-semibold">Iterate & Improve:</span> Use data to refine your strategies, not gut feelings.
                                </p>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-mono border border-green-500/20">Win %</span>
                                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono border border-red-500/20">Drawdown</span>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 md:h-48 relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                <Image
                                    src="/landing/strategies.png"
                                    alt="Strategy Builder"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Item 4: Library */}
                    <div className="col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-midnight-900/50 hover:bg-midnight-900 transition-colors">
                        <div className="p-8 h-full flex flex-col">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                                <Layers className="w-5 h-5 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Knowledge Vault</h3>
                            <p className="text-sm text-orange-400 font-semibold mb-4">Your Personal Trading Library</p>
                            <div className="text-slate-400 text-sm space-y-3 mb-4 flex-1">
                                <p>📚 Upload Reference Books and create your own Book Library. Every book at your fingertips, properly organized.</p>
                                <p>📊 Library of Chart Patterns & Candlestick Patterns.</p>
                                <p>🔍 Create Screeners for Fundamental Analysis. Never lose a high-conviction investment idea again.</p>
                                <p className="text-gold-400/80 italic text-xs">Much More to Come in this Section...</p>
                            </div>
                            <Link href="/auth/register" className="inline-flex items-center text-gold-400 text-sm font-bold group-hover:gap-2 transition-all">
                                Explore Library <MoveRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Item 5: Mobile */}
                    <div className="col-span-1 md:col-span-3 relative group overflow-hidden rounded-3xl border border-gold-400/20 bg-gradient-to-r from-midnight-900 to-midnight-950 p-12 text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50"></div>
                        <Zap className="w-12 h-12 text-gold-400 mx-auto mb-6 animate-pulse" />
                        <h3 className="text-3xl font-bold text-white mb-4">Ready to Level Up?</h3>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join the top 10% of traders who treat this as a business. Your journey to consistency starts here.</p>
                        <Link
                            href="/auth/register"
                            className="inline-flex items-center px-8 py-4 bg-gold-400 text-black font-bold rounded-full hover:bg-gold-500 transition-all shadow-lg hover:shadow-gold-400/20 hover:scale-105"
                        >
                            Get Started Now
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
