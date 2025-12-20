'use client';

import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LandingFinalCTA() {
    return (
        <section className="py-24 bg-midnight-900 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-gold-500/10 to-transparent blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-relaxed">
                            Start Building a<br />
                            <span className="text-gold-400">Disciplined Trading System</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-4">
                            If you are serious about:
                        </p>
                    </div>

                    {/* 4 Column Benefits */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            'Improving consistency',
                            'Understanding your trading behavior',
                            'Turning experience into insight',
                            'Building a long-term edge'
                        ].map((item, i) => (
                            <div key={i} className="bg-midnight-950/50 border border-gold-400/20 rounded-2xl p-6 text-center">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-400/10 border-2 border-gold-400 flex items-center justify-center">
                                    <Check className="w-6 h-6 text-gold-400" />
                                </div>
                                <p className="text-white text-base font-semibold">{item}</p>
                            </div>
                        ))}
                    </div>

                    {/* Key Message */}
                    <div className="text-center mb-12 space-y-4">
                        <p className="text-2xl text-slate-400">
                            Then journaling is <span className="text-red-400 font-bold">not optional</span>.
                        </p>
                        <p className="text-2xl text-white font-semibold">
                            The Traders Diary helps you do it <span className="text-gold-400">right</span>.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mb-16">
                        <Link
                            href="/auth/register"
                            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-gold-400 to-gold-600 text-black text-xl font-bold rounded-xl hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] transition-all transform hover:-translate-y-1"
                        >
                            Start Recording. Start Reviewing. Start Improving
                            <ArrowRight className="w-6 h-6" />
                        </Link>

                        <p className="text-xs text-slate-500 mt-6">
                            By signing up, you agree to our{' '}
                            <a href="/legal/terms" className="text-slate-400 hover:text-gold-400 underline">Terms & Conditions</a>
                            {' '}and{' '}
                            <a href="/legal/privacy" className="text-slate-400 hover:text-gold-400 underline">Privacy Policy</a>.
                        </p>
                    </div>

                    {/* Tagline - Big and Impactful */}
                    <div className="text-center border-t border-white/10 pt-12">
                        <p className="text-4xl md:text-5xl font-black text-white mb-4">
                            The Traders Diary
                        </p>
                        <p className="text-2xl md:text-3xl text-gold-400 font-bold">
                            A disciplined trader's most powerful tool.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
