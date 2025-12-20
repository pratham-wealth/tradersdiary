'use client';

import { LayoutDashboard, BookOpen, Target, TrendingUp, Library, CheckCircle2 } from 'lucide-react';

export function LandingFeatures() {
    return (
        <section id="features" className="py-24 bg-midnight-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Key Features That Make Traders</span> <br />
                        <span className="text-gold-400">More Consistent</span>
                    </h2>
                    <p className="text-slate-400 text-xl max-w-3xl mx-auto font-light">
                        Everything you need to transform chaos into structure, emotions into discipline, and guesses into data-driven decisions.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {/* Dashboard Preview Card - Left Side */}
                    <div className="space-y-6">
                        <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8 hover:border-gold-400/20 transition-all">
                            <div className="w-14 h-14 rounded-xl bg-gold-400/10 flex items-center justify-center mb-6 border border-gold-400/20">
                                <LayoutDashboard className="w-7 h-7 text-gold-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Structured Market Analysis</h3>
                            <p className="text-lg text-gold-400 font-semibold mb-3">One Place for Everything</p>
                            <p className="text-slate-400 text-base mb-4 max-w-md leading-relaxed">
                                Record your analysis for <span className="text-white font-medium">any asset</span>: Stocks, Forex, Crypto, Commodities, Indices.
                            </p>
                            <p className="text-slate-400 text-base mb-4 max-w-md leading-relaxed">
                                Attach charts, write explanations, mention levels, patterns, indicators — and <span className="text-gold-400 font-medium">never lose your analysis again</span>. Every analysis becomes a permanent learning asset.
                            </p>
                        </div>

                        <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-400/20 transition-all">
                            <div className="w-14 h-14 rounded-xl bg-blue-400/10 flex items-center justify-center mb-6 border border-blue-400/20">
                                <BookOpen className="w-7 h-7 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">The Heart of Discipline</h3>
                            <p className="text-base text-blue-400 font-semibold mb-4">Manual Entry = Mental Commitment</p>
                            <p className="text-slate-400 text-base mb-4 leading-relaxed">
                                We intentionally avoid "auto-sync" features. Manually logging your trade forces you to review your logic, own your decision, and process the emotion.
                            </p>
                            <p className="text-slate-400 text-base mb-2 leading-relaxed">
                                <span className="text-blue-400 font-semibold">Psychology Tags:</span> Log how you <span className="italic">felt</span> (Anxious? FOMO? Confident?). Spot the emotional triggers that cause your losses.
                            </p>
                        </div>
                    </div>

                    {/* Strategy Lab Card - Right Side */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8 hover:border-purple-400/20 transition-all">
                        <div className="w-14 h-14 rounded-xl bg-purple-400/10 flex items-center justify-center mb-6 border border-purple-400/20">
                            <Target className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Strategy Lab</h3>
                        <p className="text-base text-purple-400 font-semibold mb-4">Build, Track, and Refine Your Edge</p>
                        <p className="text-slate-400 text-base mb-4 leading-relaxed">
                            Document your trading strategies in detail. Attach them to trades and analysis. Review performance strategy-wise.
                        </p>
                        <p className="text-slate-400 text-base mb-6 leading-relaxed">
                            Most traders use 3-5 strategies but never track them properly. This section solves that.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-base text-emerald-400">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <span className="font-medium">Tag strategies to every analysis and trade</span>
                            </div>
                            <div className="flex items-center gap-3 text-base text-emerald-400">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <span className="font-medium">See what works, what doesn't</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/20 transition-all">
                        <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-6 border border-cyan-400/20">
                            <TrendingUp className="w-7 h-7 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Performance Reports</h3>
                        <p className="text-base text-cyan-400 font-semibold mb-4">Turn Trades Into Insights</p>
                        <p className="text-slate-400 text-base mb-4 leading-relaxed">
                            Review your trade history, win rates, profit/loss patterns, strategy performance, and time-based analysis.
                        </p>
                        <p className="text-slate-400 text-base leading-relaxed">
                            Data doesn't lie. Emotions do. This is where traders find clarity.
                        </p>
                    </div>

                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8 hover:border-orange-400/20 transition-all">
                        <div className="w-14 h-14 rounded-xl bg-orange-400/10 flex items-center justify-center mb-6 border border-orange-400/20">
                            <Library className="w-7 h-7 text-orange-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Knowledge Vault</h3>
                        <p className="text-base text-orange-400 font-semibold mb-4">Your Personal Trading Library</p>
                        <p className="text-slate-400 text-base leading-relaxed">
                            Upload trading books, PDFs, and resources. Read them inside the app. Build your personal library.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
