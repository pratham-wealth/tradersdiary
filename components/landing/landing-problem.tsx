'use client';

import { X, AlertTriangle } from 'lucide-react';

export function LandingProblem() {
    return (
        <section className="py-24 bg-midnight-900/50 relative overflow-hidden">
            {/* Subtle red glow for "danger" feeling */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <AlertTriangle className="w-4 h-4" />
                        The Trader's Trap
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Why Do Most Traders <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Never Become Profitable?</span>
                    </h2>

                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                        It isn't a lack of charts. <span className="text-white font-medium">It's a lack of process.</span>
                        <br />Most traders are stuck in a cycle of:
                    </p>
                </div>

                {/* Problem Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Problem 1 */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-midnight-950/80 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-red-500/40 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                                <X className="w-6 h-6 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Impulsive Execution</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Taking trades based on <span className="text-red-400 font-medium">feelings</span>, not rules.
                                FOMO entries. Revenge trading. No plan, just reactions.
                            </p>
                        </div>
                    </div>

                    {/* Problem 2 */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-midnight-950/80 border border-orange-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-orange-500/40 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                                <X className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Scattered Data</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Analysis lost in Telegram chats, messy Excel sheets, and <span className="text-orange-400 font-medium">mental notes</span>.
                                No single source of truth.
                            </p>
                        </div>
                    </div>

                    {/* Problem 3 */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-midnight-950/80 border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-yellow-500/40 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6 border border-yellow-500/20">
                                <X className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Strategy Hopping</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Changing systems every week because you don't know <span className="text-yellow-400 font-medium">what actually works</span>.
                                Chasing gurus instead of tracking data.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        You don't need another indicator.
                    </h3>
                    <p className="text-xl text-gold-400 font-bold">
                        You need a Headquarters.
                    </p>
                </div>
            </div>
        </section>
    );
}
