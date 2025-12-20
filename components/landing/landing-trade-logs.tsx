'use client';

import { FileText, Link2, MessageSquare, CheckCircle2 } from 'lucide-react';

export function LandingTradeLogs() {
    return (
        <section className="py-24 bg-midnight-900 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-relaxed">
                        Log Every Trade With <span className="text-green-400 whitespace-nowrap">Full Context</span>
                    </h2>
                    <p className="text-2xl text-red-400 font-semibold italic">
                        A trade without context teaches nothing.
                    </p>
                </div>

                {/* Balanced Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: What You Can Log */}
                    <div className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">The Traders Diary lets you log:</h3>
                        <ul className="space-y-4">
                            {[
                                { icon: FileText, text: 'Entry, stop loss, targets' },
                                { icon: CheckCircle2, text: 'Strategy used' },
                                { icon: Link2, text: 'Linked analysis' },
                                { icon: MessageSquare, text: 'Outcome and remarks' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-300 text-base">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                                        <item.icon className="w-5 h-5 text-green-400" />
                                    </div>
                                    <span className="mt-2">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: What It Becomes */}
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Over time, your trade log becomes:</h3>
                        <ul className="space-y-4">
                            {[
                                'A reflection of your discipline',
                                'A record of your decisions',
                                'A source of powerful insights'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-base">
                                    <div className="w-2 h-2 rounded-full bg-gold-400 shrink-0 mt-3" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
