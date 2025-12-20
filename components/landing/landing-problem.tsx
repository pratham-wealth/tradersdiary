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
                        Why The Traders Diary Exists
                    </h2>

                    <p className="text-2xl text-red-400 font-bold max-w-3xl mx-auto leading-relaxed">
                        Every trader knows this problem.
                    </p>

                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Trading becomes <span className="text-white font-medium">emotional and unstructured</span> — not because of lack of skill, but <span className="text-red-400 font-semibold">lack of system</span>.
                    </p>
                </div>

                {/* Problem Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Scattered Analysis",
                            desc: "Analysis gets scattered across notebooks and screenshots",
                            color: "red"
                        },
                        {
                            title: "Undocumented Strategies",
                            desc: "Strategies remain in the head, not documented",
                            color: "orange"
                        },
                        {
                            title: "Forgotten Setups",
                            desc: "Good setups are forgotten",
                            color: "yellow"
                        },
                        {
                            title: "Repeated Mistakes",
                            desc: "Mistakes repeat without awareness",
                            color: "red"
                        },
                        {
                            title: "Emotional Trading",
                            desc: "Trades happen emotionally, not systematically",
                            color: "orange"
                        }
                    ].map((problem, i) => (
                        <div key={i} className="relative group">
                            <div className={`absolute -inset-1 bg-gradient-to-r from-${problem.color}-500/20 to-${problem.color}-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className={`relative bg-midnight-950/80 border border-${problem.color}-500/20 rounded-2xl p-6 backdrop-blur-sm hover:border-${problem.color}-500/40 transition-all`}>
                                <div className={`w-10 h-10 rounded-xl bg-${problem.color}-500/10 flex items-center justify-center mb-4 border border-${problem.color}-500/20`}>
                                    <X className={`w-5 h-5 text-${problem.color}-400`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{problem.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing Statement */}
                <div className="mt-16 text-center space-y-4">
                    <p className="text-xl md:text-2xl text-slate-400 font-light italic max-w-2xl mx-auto">
                        "Without a structured record, learning stops."
                    </p>
                    <p className="text-2xl text-white font-bold">
                        The Traders Diary was created to solve <span className="text-gold-400">this exact problem</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
