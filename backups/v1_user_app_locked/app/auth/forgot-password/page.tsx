'use client';

import { resetPassword } from './actions';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Mail, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const emailValue = formData.get('email') as string;

        setLoading(true);
        const result = await resetPassword(formData);
        setLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            setEmail(emailValue);
            setEmailSent(true);
            toast.success('Password reset email sent!');
        }
    }

    if (emailSent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-midnight-950 p-4">
                <div className="max-w-md w-full space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <div className="p-3 bg-midnight-800 border border-midnight-700 rounded-2xl glow-gold">
                            <TrendingUp className="w-12 h-12 text-gold-400" />
                        </div>
                    </div>

                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full animate-pulse"></div>
                            <div className="relative bg-midnight-800 p-6 rounded-full border-4 border-midnight-700">
                                <CheckCircle className="w-16 h-16 text-emerald-400" />
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
                        <p className="text-slate-300">
                            We've sent a password reset link to:
                        </p>
                        <p className="text-gold-400 font-semibold flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            {email}
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-midnight-900 border border-midnight-700 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold">Next Steps:</h3>
                        <ol className="text-slate-300 text-sm space-y-2 list-decimal list-inside">
                            <li>Check your email inbox (and spam folder)</li>
                            <li>Click the reset password link</li>
                            <li>Create a new password</li>
                        </ol>
                        <p className="text-xs text-slate-500 pt-4 border-t border-midnight-700">
                            The link expires in 60 minutes
                        </p>
                    </div>

                    {/* Back to Login */}
                    <div className="text-center">
                        <Link
                            href="/auth/login"
                            className="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                        >
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-midnight-950 p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="p-3 bg-midnight-800 border border-midnight-700 rounded-2xl glow-gold">
                        <TrendingUp className="w-12 h-12 text-gold-400" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">Forgot Password?</h1>
                    <p className="text-slate-400">
                        No worries! Enter your email and we'll send you a reset link.
                    </p>
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-300">Email Address</label>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-xl font-bold text-lg shadow-lg shadow-gold-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                {/* Back to Login */}
                <div className="text-center">
                    <Link
                        href="/auth/login"
                        className="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                    >
                        ← Back to Login
                    </Link>
                </div>

                {/* Help Text */}
                <div className="bg-midnight-900 border border-midnight-700 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-400">
                        Remember your password?{' '}
                        <Link href="/auth/login" className="text-gold-400 hover:text-gold-300">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
