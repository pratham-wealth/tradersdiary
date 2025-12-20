'use client';

import { BarChart3, TrendingUp, Target } from 'lucide-react';

export function LandingReports() {
    return (
        <section className="py-24 bg-midnight-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-relaxed">
                        Review Performance With <span className="text-orange-400 whitespace-nowrap">Meaningful Reports</span>
                    </h2>
                    <p className="text-2xl text-slate-400 font-semibold">
                        Numbers don't lie — <span className="text-red-400">emotions do</span>.
                    </p>
                </div>

                {/* Balanced Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left: What You Review */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">The Traders Diary helps you review:</h3>
                        <ul className="space-y-4">
                            {[
                                { icon: BarChart3, text: 'Trade history with complete context' },
                                { icon: Target, text: 'Strategy-wise outcomes' },
                                { icon: TrendingUp, text: 'Success ratios and patterns' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-300 text-base">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                                        <item.icon className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <span className="mt-2">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Key Message */}
                    <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-400/30 rounded-3xl p-10">
                        <p className="text-xl text-white mb-4 leading-relaxed">
                            Instead of <span className="text-red-400 font-semibold">wondering</span> why results fluctuate,
                        </p>
                        <p className="text-2xl text-white font-bold leading-relaxed mb-6">
                            you see the reasons <span className="text-gold-400">clearly</span>.
                        </p>
                        <p className="text-base text-slate-400 italic">
                            This is where real improvement begins.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
