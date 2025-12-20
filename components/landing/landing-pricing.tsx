'use client';

import { TrendingUp, Globe, DollarSign } from 'lucide-react';

export function LandingPricing() {
    return (
        <section className="py-16 bg-midnight-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-relaxed">
                        Simple, Affordable & <span className="text-blue-400">Globally Accessible</span>
                    </h2>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
                    {[
                        { icon: TrendingUp, title: 'Easy to use', desc: 'Clean, intuitive interface' },
                        { icon: Globe, title: 'Globally accessible', desc: 'Available worldwide' },
                        { icon: DollarSign, title: 'Affordable', desc: 'Minimal monthly cost' }
                    ].map((item, i) => (
                        <div key={i} className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8 text-center hover:border-blue-400/20 transition-all">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-blue-400/10 flex items-center justify-center border border-blue-400/20">
                                <item.icon className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl text-white font-bold mb-3">{item.title}</h3>
                            <p className="text-base text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Key Message */}
                <div className="text-center">
                    <p className="text-3xl md:text-4xl text-gold-400 font-bold">
                        Discipline should not be expensive.
                    </p>
                </div>
            </div>
        </section>
    );
}
