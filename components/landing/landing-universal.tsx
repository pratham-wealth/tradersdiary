'use client';

import { Check } from 'lucide-react';

export function LandingUniversal() {
    return (
        <section className="py-24 bg-midnight-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-relaxed mb-2">
                        Built for <span className="text-blue-400">All Markets</span>.
                    </h2>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-relaxed mb-8">
                        Built for <span className="text-gold-400">All Traders</span>.
                    </h2>
                    <p className="text-xl text-slate-400">
                        One app. One workflow. <span className="text-white font-semibold">Universal trading discipline.</span>
                    </p>
                </div>

                {/* Markets Grid */}
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {['Stock Market', 'Forex', 'Crypto', 'Commodities', 'Indices'].map((market) => (
                        <div key={market} className="px-8 py-4 bg-midnight-900/50 border border-white/10 rounded-xl text-white text-lg font-bold hover:border-blue-400/30 transition-all">
                            <Check className="w-5 h-5 inline mr-2 text-blue-400" />
                            {market}
                        </div>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Even Beginners */}
                    <div className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Even If You Are <span className="text-gold-400">Not an Analyst</span>
                        </h3>
                        <p className="text-slate-400 text-base mb-6">
                            You don't need to be an expert. You can:
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Record analysis shared by others',
                                'Track trade ideas you follow',
                                'Save important levels and setups',
                                'Maintain discipline even as a learning trader'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-base">
                                    <div className="w-6 h-6 rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-gold-400" />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Who It's For */}
                    <div className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Perfect For <span className="text-blue-400">Every Type</span> of Trader
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { emoji: '📚', label: 'Beginners' },
                                { emoji: '⏰', label: 'Part-Time' },
                                { emoji: '🎯', label: 'System Traders' },
                                { emoji: '🎨', label: 'Discretionary' }
                            ].map((type) => (
                                <div key={type.label} className="text-center p-4 bg-midnight-900/50 border border-white/5 rounded-xl hover:border-blue-400/20 transition-all">
                                    <div className="text-4xl mb-2">{type.emoji}</div>
                                    <p className="text-white font-semibold text-base">{type.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
