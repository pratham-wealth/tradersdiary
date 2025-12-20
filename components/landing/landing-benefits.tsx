'use client';

import { Heart, Brain, Target, TrendingUp, Shield } from 'lucide-react';

export function LandingBenefits() {
    return (
        <section className="py-24 bg-midnight-900 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-relaxed">
                        Why Traders Use <span className="text-gold-400">The Traders Diary</span>
                    </h2>
                    <p className="text-xl text-slate-400">
                        Because it helps them:
                    </p>
                </div>

                {/* Benefits Grid - 3 columns */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                        { icon: Heart, title: 'Build healthy trading habits', color: 'gold' },
                        { icon: Brain, title: 'Reduce emotional decisions', color: 'blue' },
                        { icon: Target, title: 'Stop repeating the same mistakes', color: 'purple' }
                    ].map((benefit, i) => (
                        <div key={i} className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8 text-center hover:border-gold-400/20 transition-all">
                            <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-${benefit.color}-400/10 flex items-center justify-center border border-${benefit.color}-400/20`}>
                                <benefit.icon className={`w-8 h-8 text-${benefit.color}-400`} />
                            </div>
                            <h3 className="text-xl text-white font-bold">{benefit.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Bottom Row - 2 columns */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
                    {[
                        { icon: TrendingUp, title: 'Learn from their own data', color: 'green' },
                        { icon: Shield, title: 'Trade with clarity and confidence', color: 'cyan' }
                    ].map((benefit, i) => (
                        <div key={i} className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8 text-center hover:border-gold-400/20 transition-all">
                            <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-${benefit.color}-400/10 flex items-center justify-center border border-${benefit.color}-400/20`}>
                                <benefit.icon className={`w-8 h-8 text-${benefit.color}-400`} />
                            </div>
                            <h3 className="text-xl text-white font-bold">{benefit.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Key Message */}
                <div className="max-w-3xl mx-auto bg-gradient-to-br from-gold-500/10 to-amber-500/10 border border-gold-400/30 rounded-3xl p-10 text-center">
                    <p className="text-2xl text-slate-300 mb-3">
                        Consistency doesn't come from <span className="text-red-400 font-bold">motivation</span>.
                    </p>
                    <p className="text-3xl text-white font-black">
                        It comes from <span className="text-gold-400">structure</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
