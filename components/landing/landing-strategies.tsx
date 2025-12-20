'use client';

import { Target, Tag, TrendingUp, CheckCircle2 } from 'lucide-react';

export function LandingStrategies() {
    return (
        <section className="py-24 bg-midnight-900 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-relaxed">
                        Document & Track Your <span className="text-gold-400 whitespace-nowrap">Trading Strategies</span>
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Most traders use multiple strategies — but never know which one truly works.
                    </p>
                </div>

                {/* Balanced Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Combined Benefits */}
                    <div className="space-y-6">
                        <div className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">The Traders Diary allows you to:</h3>
                            <ul className="space-y-4">
                                {[
                                    'Write strategies in detail',
                                    'Tag every analysis and trade with the strategy used',
                                    'Review strategy-wise performance over time'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 text-base">
                                        <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-midnight-950/50 border border-gold-400/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">This helps you clearly see:</h3>
                            <ul className="space-y-3">
                                {[
                                    { icon: TrendingUp, text: 'What works for you', color: 'text-green-400' },
                                    { icon: Tag, text: 'What needs refinement', color: 'text-yellow-400' },
                                    { icon: Target, text: 'What should be avoided', color: 'text-red-400' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300 text-base">
                                        <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: Key Message */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-3xl p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                                <Target className="w-10 h-10 text-blue-400" />
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Trading stops being <span className="text-red-400">guesswork</span>
                            </p>
                            <p className="text-2xl md:text-3xl font-bold text-white">
                                and becomes <span className="text-gold-400">data-driven</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
