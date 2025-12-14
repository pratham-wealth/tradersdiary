'use client';

import { signUp, signInWithGoogle } from '../actions';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, Lock, User as UserIcon, ArrowRight, CheckCircle, TrendingUp, Shield, Phone } from 'lucide-react';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleManualSubmit() {
        if (!formRef.current) {
            console.error('Form Ref is missing');
            return;
        }

        // Basic Client-side validation
        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        const formData = new FormData(formRef.current);
        setLoading(true);
        setError(null);

        try {
            console.log('=== STARTING REGISTRATION ===');
            const result = await signUp(formData);
            console.log('Result from signUp:', result);
            console.log('Result type:', typeof result);
            console.log('Result error:', result?.error);
            console.log('Result error type:', typeof result?.error);

            // Only handle errors - successful registration will redirect via server action
            if (result?.error) {
                console.log('Error detected, setting error state');
                const errorText = typeof result.error === 'string' ? result.error : 'Registration failed. Please try again.';
                setError(errorText);
                toast.error(errorText);
                setLoading(false);
            } else {
                console.log('No error in result, should redirect...');
            }
        } catch (e: unknown) {
            console.log('=== CAUGHT EXCEPTION ===');
            console.log('Exception:', e);
            console.log('Exception type:', typeof e);
            console.log('Exception digest:', (e as { digest?: string })?.digest);

            // Next.js redirect - this is expected, just re-throw it
            if ((e as { digest?: string })?.digest?.startsWith('NEXT_REDIRECT')) {
                console.log('Redirect detected, rethrowing');
                throw e;
            }

            // Only handle actual errors
            console.log('Actual error caught, handling it');
            const errorMsg = e instanceof Error ? e.message : 'Registration failed. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
            setLoading(false);
        }
    }

    async function handleGoogleSignUp() {
        setError(null);
        const result = await signInWithGoogle();
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className="min-h-screen flex bg-midnight-950">
            {/* Left Side - Visual & Brand */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-midnight-900 overflow-hidden border-r border-midnight-700">
                <div className="absolute inset-0 bg-midnight-gradient opacity-90"></div>

                {/* Decorative Elements - Gold Accents */}
                <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gold-400/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none transform rotate-180"></div>

                <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-midnight-800 border border-midnight-700 rounded-lg glow-gold">
                                <TrendingUp className="w-8 h-8 text-gold-400" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">Traders Diary</span>
                        </div>
                        <h2 className="text-5xl font-bold leading-tight mb-4 tracking-tight">
                            Start Your <br />
                            <span className="text-gold-400">Profitable Journey</span>
                        </h2>
                        <ul className="space-y-4 mt-8">
                            <li className="flex items-center gap-3 text-lg text-slate-300">
                                <CheckCircle className="w-6 h-6 text-gold-400" />
                                <span>Advanced Trade Logging</span>
                            </li>
                            <li className="flex items-center gap-3 text-lg text-slate-300">
                                <CheckCircle className="w-6 h-6 text-gold-400" />
                                <span>Automated Analytics</span>
                            </li>
                            <li className="flex items-center gap-3 text-lg text-slate-300">
                                <CheckCircle className="w-6 h-6 text-gold-400" />
                                <span>Strategy Tracking</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-midnight-800/80 p-6 rounded-2xl backdrop-blur-md border border-midnight-700 shadow-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-gold-400" />
                            <span className="font-bold text-white">Pro Trial Included</span>
                        </div>
                        <p className="text-sm text-slate-300">
                            Get 7 days of full premium access when you sign up today. No credit card required.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-midnight-950">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mt-2">Create Account</h2>
                        <p className="text-slate-400 mt-2">
                            Join the community of focused traders.
                        </p>
                    </div>

                    {error && typeof error === 'string' && error.trim() !== '' && (
                        <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400 text-sm flex items-center gap-2">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    <form
                        ref={formRef}
                        className="space-y-5"
                        action="javascript:void(0);"
                        method="POST"
                        onSubmit={(e) => { e.preventDefault(); }}
                    >
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <div className="relative group">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-400 transition-colors" />
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-400 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                    placeholder="trader@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Mobile Number</label>
                            <div className="relative group">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-400 transition-colors" />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    pattern="[+]?[0-9]{10,15}"
                                    onChange={(e) => {
                                        // Auto-add +91 if user types without +
                                        const value = e.target.value;
                                        if (value && !value.startsWith('+') && !value.startsWith('0')) {
                                            e.target.value = '+91' + value;
                                        }
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                    placeholder="+919876543210"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Start typing your number, +91 will be added automatically</p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-400 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    minLength={8}
                                    className="w-full pl-10 pr-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Min. 8 chars</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <input type="checkbox" id="terms" required className="mt-1 rounded border-midnight-700 bg-midnight-800 checked:bg-gold-500 accent-gold-500" />
                            <div className="text-sm text-slate-400 leading-tight">
                                <label htmlFor="terms" className="mr-1 hover:cursor-pointer">I agree to the</label>
                                <a href="/terms" className="text-gold-400 hover:underline">Terms of Service</a>
                                <span className="mx-1">and</span>
                                <a href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</a>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleManualSubmit}
                            disabled={loading}
                            className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-xl font-bold text-lg shadow-lg shadow-gold-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Creating Account...' : 'Get Started'} <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-midnight-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-midnight-950 text-slate-500">Or sign up with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full py-3 bg-midnight-900 border border-midnight-700 rounded-xl font-semibold text-slate-200 hover:bg-midnight-800 transition-colors flex items-center justify-center gap-3 group"
                    >
                        <svg className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-gold-400 font-bold hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
