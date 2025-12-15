'use client';

import { TrendingUp, Twitter, Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';

export function LandingFooter() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 bg-gold-400/10 border border-gold-400/20 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-gold-400" />
                            </div>
                            <span className="text-xl font-bold text-white">Traders Diary</span>
                        </div>
                        <p className="text-slate-400 max-w-sm">
                            The ultimate professional trading journal and analysis platform. Built for traders who demand excellence.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold-400/20 hover:text-gold-400 transition-colors text-slate-400">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold-400/20 hover:text-gold-400 transition-colors text-slate-400">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold-400/20 hover:text-gold-400 transition-colors text-slate-400">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link href="#features" className="hover:text-gold-400 transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-gold-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Roadmap</Link></li>
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Traders Diary. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
