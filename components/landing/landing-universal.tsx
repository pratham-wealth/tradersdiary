'use client';

import Link from 'next/link';
import { BarChart, Database, Eye, FileText, List, TrendingUp, ArrowRight, Globe } from 'lucide-react';

export function LandingUniversal() {
    return (
        <section className="py-24 bg-midnight-950 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-500/5 to-transparent blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Universal Markets */}
                <div className="text-center mb-16 space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">All Markets</span>.
                        <br />Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-400">All Traders</span>.
                    </h2>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {['Stock Market', 'Forex', 'Crypto', 'Commodities', 'Indices'].map((market, i) => (
                            <div key={i} className="px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold">
                                ✔ {market}
                            </div>
                        ))}
                    </div>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        <span className="text-white font-medium">One app. One workflow.</span> Universal trading discipline.
                    </p>
                </div>

                {/* Beginner Friendly */}
                <div className="max-w-4xl mx-auto bg-midnight-900/50 border border-gold-400/20 rounded-3xl p-12 text-center">
                    <h3 className="text-3xl font-bold text-white mb-6">
                        Even If You Are <span className="text-gold-400">Not an Analyst</span>
                    </h3>

                    <div className="space-y-4 text-left max-w-2xl mx-auto">
                        <p className="text-slate-300 leading-relaxed">
                            You don't need to be an expert. You can:
                        </p>
                        <ul className="space-y-3">
                            {[
                                'Record analysis shared by others',
                                'Track trade ideas you follow',
                                'Save important levels and setups',
                                'Maintain discipline even as a learning trader'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <ArrowRight className="w-3 h-3 text-gold-400" />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Beginners', icon: '📚' },
                            { label: 'Part-Time Traders', icon: '⏰' },
                            { label: 'System Traders', icon: '🤖' },
                            { label: 'Discretionary', icon: '🎯' }
                        ].map((type, i) => (
                            <div key={i} className="p-4 rounded-xl bg-midnight-950/80 border border-white/5">
                                <div className="text-3xl mb-2">{type.icon}</div>
                                <div className="text-sm text-slate-400">{type.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Build Healthy Habits */}
                <div className="mt-24 text-center space-y-8">
                    <h3 className="text-3xl md:text-4xl font-black text-white">
                        Build Healthy Trading Habits <span className="text-gold-400">Automatically</span>
                    </h3>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        When your system is structured, discipline becomes natural.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
                        {[
                            { icon: '🎯', title: 'Reduce emotional trading', desc: 'Data over feelings' },
                            { icon: '🔄', title: 'Stop repeating mistakes', desc: 'Learn from your own data' },
                            { icon: '💎', title: 'Trade with clarity', desc: 'Not confusion' },
                            { icon: '📈', title: 'Trade better', desc: 'Not just more' }
                        ].map((benefit, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-midnight-900/50 border border-white/5 hover:border-gold-400/20 transition-all text-center group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                                <h4 className="text-white font-bold mb-2">{benefit.title}</h4>
                                <p className="text-slate-500 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-24 text-center space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Your Trading Journey Deserves <span className="text-gold-400">Structure</span>
                    </h3>

                    <p className="text-lg text-slate-400">
                        Markets reward <span className="text-white font-medium">preparation</span>, not chaos.
                    </p>

                    <Link
                        href="/auth/register"
                        className="inline-flex items-center px-8 py-4 bg-gold-400 text-black font-bold text-lg rounded-xl hover:bg-gold-500 transition-all shadow-lg hover:shadow-gold-400/20 hover:scale-105 gap-2"
                    >
                        Start Recording. Start Learning
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
