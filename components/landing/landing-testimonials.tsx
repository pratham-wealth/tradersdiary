'use client';

import { Star, Quote } from 'lucide-react';

export function LandingTestimonials() {
    return (
        <section className="py-24 bg-midnight-950/50 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Trusted by Serious Traders</h2>
                    <p className="text-slate-400">Join a community of traders who treat their craft like a business.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Alex M.",
                            role: "Forex Trader",
                            text: "Before Traders Diary, I was just guessing. Now I have a playbook. The ability to tag strategies has completely changed my P&L."
                        },
                        {
                            name: "Sarah K.",
                            role: "Options Specialist",
                            text: "The morning routine checklist keeps me disciplined. I don't take a trade until I've checked every box. This app acts like my risk manager."
                        },
                        {
                            name: "David R.",
                            role: "Swing Trader",
                            text: "Cleanest journal I've used. Dark mode is perfect for late-night analysis, and the analytics are actually useful, not just noise."
                        }
                    ].map((testimonial, i) => (
                        <div key={i} className="bg-slate-900 border border-white/10 p-8 rounded-2xl relative">
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-gold-400/20" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 fill-gold-400 text-gold-400" />
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                &quot;{testimonial.text}&quot;
                            </p>
                            <div>
                                <h4 className="font-bold text-white">{testimonial.name}</h4>
                                <p className="text-sm text-gold-400">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
