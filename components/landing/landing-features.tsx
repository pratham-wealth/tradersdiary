'use client';

import Image from 'next/image';
import { BarChart2, BookOpen, Fingerprint, Layers, LayoutDashboard, LineChart } from 'lucide-react';

export function LandingFeatures() {
    return (
        <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        The Ultimate <span className="text-gold-400">Trader&apos;s Command Center</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Everything you need to execute, analyze, and improve—all in one place.
                    </p>
                </div>

                <div className="space-y-32">
                    {/* Feature 1: Dashboard */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400 mb-4 border border-gold-400/20">
                                <LayoutDashboard className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Total Market Awareness</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Start your day with a clear view of the market. Our dashboard brings together your daily routine checklist, real-time market outlook market sentiment, and live ticker performance.
                            </p>
                            <ul className="space-y-3 pt-4">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                    Daily Routine Checklist
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                    Live Market Sentiment
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                    Performance Analytics
                                </li>
                            </ul>
                        </div>
                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-4 bg-gradient-to-r from-gold-400/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl transform transition-transform duration-500 hover:rotate-y-2">
                                <Image
                                    src="/landing/dashboard.png"
                                    alt="Dashboard"
                                    width={800}
                                    height={500}
                                    className="rounded-xl w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Journaling */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                        <div className="order-last lg:order-first relative group perspective-1000">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl transform transition-transform duration-500 hover:-rotate-y-2">
                                <Image
                                    src="/landing/journal-modal.png"
                                    alt="Journal Entry"
                                    width={800}
                                    height={500}
                                    className="rounded-xl w-full h-auto"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Precision Journaling</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Don&apos;t just track P&L. Track your psychology, execution quality, and mistakes. Our rich-text journal allows you to embed charts, tag setups, and review your thought process.
                            </p>
                            <ul className="space-y-3 pt-4">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    Rich Text Editor & Chart Uploads
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    Tag by Strategy & Outcome
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    Filter & Search History
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Feature 3: Strategy Lab */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                                <Fingerprint className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Strategy Lab</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Define your edge. detailed strategy cards let you codify your rules, track win-rates, and identify which setups are printing money and which are burning capital.
                            </p>
                            <ul className="space-y-3 pt-4">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    Win Rate Tracking
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    Risk/Reward Ratios
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    Rule Definition Checklist
                                </li>
                            </ul>
                        </div>
                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl transform transition-transform duration-500 hover:rotate-y-2">
                                <Image
                                    src="/landing/strategies.png"
                                    alt="Strategies"
                                    width={800}
                                    height={500}
                                    className="rounded-xl w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
