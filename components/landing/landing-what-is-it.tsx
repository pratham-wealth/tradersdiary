'use client';

import { FileText, Target, List, BarChart3, TrendingUp, BookOpen } from 'lucide-react';

export function LandingWhatIsIt() {
    return (
        <section className="py-24 bg-midnight-900 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-gold-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        What Is <span className="text-gold-400">The Traders Diary?</span>
                    </h2>

                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        A smart <span className="text-white font-medium">trading journal</span> + <span className="text-white font-medium">analysis tracker</span> + <span className="text-white font-medium">strategy vault</span> + <span className="text-white font-medium">book library</span>, built into a single intuitive WebApp.
                    </p>
                </div>

                {/* What It Helps You Do */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { icon: FileText, text: "Record your market analysis with charts and notes" },
                        { icon: Target, text: "Define, tag, and reuse trading strategies" },
                        { icon: List, text: "Track watchlists and upcoming trade opportunities" },
                        { icon: BarChart3, text: "Log every trade with full context" },
                        { icon: TrendingUp, text: "Analyze performance with detailed reports" },
                        { icon: BookOpen, text: "Build your personal trading library inside the app" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-midnight-950/50 border border-white/5 hover:border-gold-400/20 transition-all group">
                            <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center border border-gold-400/20 group-hover:scale-110 transition-transform shrink-0">
                                <item.icon className="w-5 h-5 text-gold-400" />
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* Closing Statement */}
                <div className="mt-16 text-center space-y-4">
                    <p className="text-slate-500 text-sm">
                        This is not a signal platform. This is not an advisory service.
                    </p>
                    <p className="text-2xl text-white font-bold">
                        It is your <span className="text-gold-400">personal trading database</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
