'use client';

import { signIn, signInWithGoogle } from '../actions';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null); // Fixed: Defined error state
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);

    async function handleManualSubmit() {
        if (!formRef.current) return;

        // Basic Client-side validation
        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        const formData = new FormData(formRef.current);
        setLoading(true);
        setError(null);

        try {
            const result = await signIn(formData);

            if (result?.error) {
                setError(result.error);
                toast.error(result.error);
                setLoading(false);
            } else {
                toast.success('Welcome back!');
                // Wait for potential redirect or push manually
                router.push('/welcome');
            }
        } catch (e: unknown) {
            if ((e as { digest?: string })?.digest?.startsWith('NEXT_REDIRECT')) {
                throw e;
            }
            console.error('Unexpected error:', e);
            toast.error('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        const result = await signInWithGoogle();
        if (result?.error) {
            setError(result.error);
            toast.error(result.error);
        }
    }

    return (
        <div className="min-h-screen flex bg-midnight-950">
            {/* Left Side - Visual & Brand */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-midnight-900 overflow-hidden border-r border-midnight-700">
                <div className="absolute inset-0 bg-midnight-gradient opacity-90"></div>

                {/* Decorative Elements - Gold Accents */}
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gold-400/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

                <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-midnight-800 border border-midnight-700 rounded-lg glow-gold">
                                <TrendingUp className="w-8 h-8 text-gold-400" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">Traders Diary</span>
                        </div>
                        <h2 className="text-5xl font-bold leading-tight mb-4 tracking-tight">
                            Your Personal <br />
                            <span className="text-gold-400">Trading Companion</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-md">
                            Join thousands of elite traders who use Traders Diary to journal, analyze, and refine their strategies.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-midnight-800/50 p-4 rounded-xl backdrop-blur-sm border border-midnight-700">
                            <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center font-bold text-lg text-gold-400 border border-gold-400/20">
                                JD
                            </div>
                            <div>
                                <p className="font-semibold text-slate-200">&quot;Traders Diary completely changed how I review my trades.&quot;</p>
                                <p className="text-sm text-gold-400">John Doe, Pro Trader</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-midnight-950">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mt-2">Welcome Back</h2>
                        <p className="text-slate-400 mt-2">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    {error && (
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
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-400 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <a href="/auth/forgot-password" className="text-sm text-gold-400 hover:text-gold-300 font-medium transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleManualSubmit}
                            disabled={loading}
                            className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-xl font-bold text-lg shadow-lg shadow-gold-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-midnight-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-midnight-950 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-3 bg-midnight-900 border border-midnight-700 rounded-xl font-semibold text-slate-200 hover:bg-midnight-800 transition-colors flex items-center justify-center gap-3 group"
                    >
                        <svg className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        Don&apos;t have an account?{' '}
                        <a href="/auth/register" className="text-gold-400 font-bold hover:underline">
                            Sign up for free
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
