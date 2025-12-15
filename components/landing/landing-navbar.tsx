import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';

export function LandingNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-midnight-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1.5 bg-gold-400/10 border border-gold-400/20 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-gold-400" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Traders Diary
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            How it Works
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Pricing
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/auth/login"
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/register"
                            className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-black text-sm font-bold rounded-full hover:bg-gold-500 transition-all shadow-lg shadow-gold-400/20"
                        >
                            Get Started <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
