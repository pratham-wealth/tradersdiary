'use client';

import { Eye, Save, Target, Shield } from 'lucide-react';

export function LandingWatchlist() {
    return (
        <section className="py-24 bg-midnight-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-relaxed">
                        Create Smart <span className="text-purple-400 whitespace-nowrap">Watchlists</span> for Upcoming Opportunities
                    </h2>
                    <p className="text-xl text-slate-400 italic">
                        "How many times have you seen a perfect setup — and missed it later?"
                    </p>
                </div>

                {/* Balanced Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left: Benefits List */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6">With structured watchlists:</h3>
                        <ul className="space-y-4">
                            {[
                                { icon: Eye, text: 'Track instruments where opportunities are nearing' },
                                { icon: Save, text: 'Save key levels and notes' },
                                { icon: Target, text: 'Avoid repeated re-analysis' },
                                { icon: Shield, text: 'Stay prepared instead of reactive' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-300 text-base">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                                        <item.icon className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <span className="mt-2">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Key Message Card */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-3xl p-12">
                        <p className="text-2xl md:text-3xl font-bold text-white text-center leading-relaxed">
                            Your watchlist becomes your <span className="text-purple-400">preparation zone</span>,
                            <br />
                            not a <span className="text-red-400">random list</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
