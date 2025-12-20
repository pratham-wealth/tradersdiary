'use client';

import { BookOpen, Upload, FolderOpen } from 'lucide-react';

export function LandingBookLibrary() {
    return (
        <section className="py-24 bg-midnight-900 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-relaxed">
                        Your Personal<br />
                        <span className="text-cyan-400">Trading Books Library</span><br />
                        Right inside the App
                    </h2>
                    <p className="text-xl text-slate-400 italic mt-6">
                        Knowledge is useless if you can't access it when needed.
                    </p>
                </div>

                {/* Balanced Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: What You Can Do */}
                    <div className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Inside The Traders Diary, you can:</h3>
                        <ul className="space-y-4">
                            {[
                                { icon: Upload, text: 'Upload your trading books and PDFs' },
                                { icon: FolderOpen, text: 'Organize them neatly like a digital bookshelf' },
                                { icon: BookOpen, text: 'Read them directly within the app' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-300 text-base">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                                        <item.icon className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <span className="mt-2">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Two Column Comparison */}
                    <div className="bg-midnight-950/50 border border-white/10 rounded-2xl p-8">
                        <div className="grid grid-cols-2 divide-x divide-white/10 h-full">
                            {/* Wrong Column */}
                            <div className="flex flex-col items-center justify-center text-center pr-6">
                                <span className="text-5xl mb-6">❌</span>
                                <div className="space-y-5">
                                    <p className="text-xl text-white font-semibold">Searching folders</p>
                                    <p className="text-xl text-white font-semibold">Wasted time</p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col items-center justify-center text-center pl-6">
                                <span className="text-5xl mb-6">✅</span>
                                <div className="space-y-5">
                                    <p className="text-xl text-white font-semibold">
                                        Right <span className="text-cyan-400">knowledge</span>
                                    </p>
                                    <p className="text-xl text-white font-semibold">
                                        Right <span className="text-gold-400">moment</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
