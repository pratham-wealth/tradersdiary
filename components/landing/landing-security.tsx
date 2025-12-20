'use client';

import { Lock, Cloud, Smartphone, Shield } from 'lucide-react';

export function LandingSecurity() {
    return (
        <section className="py-24 bg-midnight-950 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Enterprise-Grade Privacy <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">for Your Edge</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Your strategy is your <span className="text-white font-medium">intellectual property</span>. We keep it that way.
                    </p>
                </div>

                {/* Security Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {/* Feature 1: Encryption */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-midnight-900/50 border border-white/10 rounded-2xl p-8 text-center hover:bg-midnight-900 hover:border-blue-400/30 transition-all">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                                <Lock className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">AES-256 Encryption</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                The same security standard used by <span className="text-blue-400 font-medium">banks</span> to protect your data.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Cloud Sync */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-midnight-900/50 border border-white/10 rounded-2xl p-8 text-center hover:bg-midnight-900 hover:border-cyan-400/30 transition-all">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                <Cloud className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">Cloud Sync</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Access your journal from <span className="text-cyan-400 font-medium">any device</span>—Mobile, Tablet, or Desktop.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Mobile Optimized */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-midnight-900/50 border border-white/10 rounded-2xl p-8 text-center hover:bg-midnight-900 hover:border-teal-400/30 transition-all">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 border border-teal-500/20 group-hover:scale-110 transition-transform">
                                <Smartphone className="w-8 h-8 text-teal-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">Mobile Optimized</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Log trades <span className="text-teal-400 font-medium">on the go</span> without losing functionality.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4: No Data Selling */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-green-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-midnight-900/50 border border-white/10 rounded-2xl p-8 text-center hover:bg-midnight-900 hover:border-emerald-400/30 transition-all">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                <Shield className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">No Data Selling</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Your trade data is <span className="text-emerald-400 font-medium">yours</span>. We never sell it to brokers or third parties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        🔒 Your edge stays your edge. Always.
                    </p>
                </div>
            </div>
        </section>
    );
}
