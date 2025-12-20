'use client';

import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

export function LandingTestimonials() {
    return (
        <section className="py-24 bg-midnight-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Trusted by Serious Traders</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Join a community of disciplined traders who treat their craft like a business.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            name: "Alex M.",
                            role: "Forex Scalper",
                            subtitle: "Data Over Feelings",
                            text: "Before Traders Diary, I was just guessing. The strategy tagging feature specifically helped me realize my 'Asian Session Breakout' had a 30% win rate. Dropped it and my PL doubled.",
                            initials: "AM",
                            color: "bg-blue-500"
                        },
                        {
                            name: "Vikram M.",
                            role: "Equity Trader",
                            subtitle: "A Personal Risk Manager",
                            text: "The morning routine checklist is non-negotiable for me now. I don't take a single trade until I've checked every box. This app acts like my personal risk manager.",
                            initials: "VM",
                            color: "bg-orange-500"
                        },
                        {
                            name: "David R.",
                            role: "Swing Trader",
                            subtitle: "Clean & Focused",
                            text: "Cleanest journal I've used. Most apps are too cluttered. This gives me exactly what I need: Charts, Rules, and Data. The dark mode is also easy on the eyes.",
                            initials: "DR",
                            color: "bg-emerald-500"
                        }
                    ].map((testimonial, i) => (
                        <div key={i} className="group relative bg-midnight-900/50 border border-white/5 p-8 rounded-3xl hover:bg-midnight-900 hover:border-gold-400/20 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-8 right-8 text-white/5 group-hover:text-gold-400/10 transition-colors">
                                <Quote className="w-12 h-12 fill-current" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-gold-400 text-gold-400" />
                                ))}
                            </div>

                            <p className="text-white font-bold text-lg mb-3">
                                "{testimonial.subtitle}"
                            </p>

                            <p className="text-slate-300 mb-8 leading-relaxed relative z-10">
                                &quot;{testimonial.text}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/10`}>
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-gold-400 transition-colors">{testimonial.name}</h4>
                                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
