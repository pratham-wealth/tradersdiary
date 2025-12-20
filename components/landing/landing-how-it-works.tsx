'use client';

import { FileText, Tag, Eye, DollarSign, TrendingUp, BookOpen, ChevronRight } from 'lucide-react';
export function LandingHowItWorks() {
    const steps = [
        {
            number: 1,
            icon: FileText,
            title: 'Record Your Market Analysis',
            subtitle: 'Every trade begins with an idea.',
            description: 'With The Traders Diary, you can:',
            points: [
                'Record analysis for any market or instrument',
                'Add charts, notes, levels, patterns, or logic',
                'Capture your thinking before the trade'
            ],
            footer: 'Your ideas don\'t disappear — they become part of your learning database.'
        },
        {
            number: 2,
            icon: Tag,
            title: 'Define & Tag Your Trading Strategies',
            subtitle: 'Most traders use strategies without documenting them.',
            description: 'The Traders Diary helps you:',
            points: [
                'Write your trading strategies clearly',
                'Tag each analysis and trade with the strategy used',
                'Maintain consistency in execution'
            ],
            footer: 'This turns trading from intuition into process-based decision-making.'
        },
        {
            number: 3,
            icon: Eye,
            title: 'Create Watchlists for Upcoming Opportunities',
            subtitle: 'Markets offer opportunities — but only to prepared traders.',
            description: 'You can:',
            points: [
                'Add instruments to watchlists',
                'Save important levels and notes',
                'Track setups as they develop'
            ],
            footer: 'Your watchlist becomes your pre-trade planning zone.'
        },
        {
            number: 4,
            icon: DollarSign,
            title: 'Log Every Trade With Full Context',
            subtitle: 'A trade without documentation teaches nothing.',
            description: 'After execution, you can log:',
            points: [
                'Entry, stop loss, and targets',
                'Strategy used',
                'Linked analysis',
                'Trade outcome and remarks'
            ],
            footer: 'Each trade becomes a data point, a learning event, and a reference for future decisions.'
        },
        {
            number: 5,
            icon: TrendingUp,
            title: 'Review Performance Through Reports',
            subtitle: 'Improvement happens during review — not execution.',
            description: 'The Traders Diary helps you:',
            points: [
                'Review complete trade history',
                'Analyze strategy-wise performance',
                'Identify patterns in wins and losses'
            ],
            footer: 'Instead of guessing why results fluctuate, you see the reasons clearly. This is where real growth begins.'
        },
        {
            number: 6,
            icon: BookOpen,
            title: 'Build Your Personal Trading Library',
            subtitle: 'Learning is part of trading.',
            description: 'Inside The Traders Diary, you can:',
            points: [
                'Upload your trading books and PDFs',
                'Organize them neatly',
                'Read them directly within the app'
            ],
            footer: 'No more wasted time searching folders. Knowledge is always accessible when needed.'
        }
    ];

    return (
        <section className="py-24 bg-midnight-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider mb-6">
                        🔁 How It Works
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-relaxed">
                        How The <span className="text-gold-400">Traders Diary</span> Works
                    </h2>
                    <p className="text-xl text-slate-400">
                        A simple system designed to build discipline, clarity, and consistency in your trading journey.
                    </p>
                </div>

                {/* Steps */}
                <div className="max-w-6xl mx-auto space-y-12 mb-20">
                    {steps.map((step, i) => (
                        <div key={i} className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                            {/* Step Number & Icon - Side by Side */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gold-400/10 border-2 border-gold-400/30 flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-black text-gold-400">{step.number}</span>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-midnight-900/50 border border-gold-400/20 flex items-center justify-center shrink-0">
                                    <step.icon className="w-6 h-6 text-gold-400" />
                                </div>
                                <div className="flex-1" />
                            </div>

                            {/* Step Content */}
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-lg text-slate-400 italic mb-6">{step.subtitle}</p>

                                <p className="text-white font-semibold mb-3">{step.description}</p>
                                <ul className="space-y-3 mb-6">
                                    {step.points.map((point, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-300">
                                            <ChevronRight className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-base text-gold-400 font-semibold bg-gold-400/5 border-l-4 border-gold-400 pl-4 py-2">
                                    {step.footer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Who This System Is For */}
                <div className="max-w-6xl mx-auto bg-midnight-900/50 border border-white/10 rounded-3xl p-10 mb-12">
                    <h3 className="text-3xl font-black text-white mb-4 text-center">Who This System Is For</h3>
                    <p className="text-lg text-slate-300 text-center mb-8">The Traders Diary works whether you are:</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {[
                            { icon: '📚', text: 'A beginner learning the basics' },
                            { icon: '⏰', text: 'A part-time trader' },
                            { icon: '💼', text: 'A full-time trader' },
                            { icon: '🎯', text: 'A discretionary or system-based trader' }
                        ].map((item, i) => (
                            <div key={i} className="bg-midnight-950/80 border border-gold-400/20 rounded-xl p-6 hover:border-gold-400/40 transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{item.icon}</span>
                                    <p className="text-white font-semibold text-lg">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-slate-400 text-base">
                            You don't need to trade daily <span className="text-slate-600 mx-2">•</span> You don't need to be an analyst
                        </p>
                        <p className="text-gold-400 font-bold text-xl">You just need the willingness to track and review.</p>
                    </div>
                </div>

                {/* What This System Is NOT */}
                <div className="max-w-6xl mx-auto bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/30 rounded-3xl p-10 mb-12">
                    <h3 className="text-3xl font-black text-white mb-8 text-center">What This System Is NOT</h3>
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        {[
                            'Not a signal service',
                            'Not an advisory platform',
                            'Not a guarantee of profits'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-2xl text-red-400">❌</span>
                                <p className="text-lg text-red-400 font-bold">{item}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-2xl text-white font-bold text-center">
                        It is a <span className="text-gold-400">discipline and documentation system</span>.
                    </p>
                </div>

                {/* Why This Process Works */}
                <div className="max-w-6xl mx-auto bg-gradient-to-br from-gold-500/10 to-amber-500/10 border border-gold-400/30 rounded-3xl p-10 mb-12">
                    <h3 className="text-3xl font-black text-white mb-8 text-center">Why This Process Works</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {[
                            { label: 'Structure reduces emotion', icon: '🎯' },
                            { label: 'Documentation reveals mistakes', icon: '📝' },
                            { label: 'Review creates improvement', icon: '📈' },
                            { label: 'Consistency builds confidence', icon: '💪' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-midnight-900/30 rounded-xl p-4">
                                <span className="text-3xl">{item.icon}</span>
                                <p className="text-lg text-white font-semibold">{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xl text-center text-slate-300 italic">
                        Trading success is not built in a single trade — it is built over many reviewed decisions.
                    </p>
                </div>

                {/* Start the Process */}
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-3xl font-black text-white mb-4">Start the Process</h3>
                    <p className="text-lg text-slate-400 mb-6">The system is simple:</p>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {['Record', 'Track', 'Review', 'Improve'].map((step, i) => (
                            <div key={i} className="px-8 py-3 bg-gold-400/10 border border-gold-400/30 rounded-xl">
                                <span className="text-xl font-bold text-gold-400">{step}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-2xl text-white font-bold">
                        The Traders Diary helps you do this — <span className="text-gold-400">consistently</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
