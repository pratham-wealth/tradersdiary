'use client';

import { updatePassword } from '../forgot-password/actions';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff, ArrowRight, TrendingUp } from 'lucide-react';

export default function ResetPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formRef.current) return;

        const formData = new FormData(formRef.current);

        setLoading(true);
        const result = await updatePassword(formData);
        setLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Password updated successfully!');
            setTimeout(() => {
                router.push('/auth/login');
            }, 1500);
        }
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
                    <h1 className="text-3xl font-bold text-white">Reset Password</h1>
                    <p className="text-slate-400">
                        Enter your new password below
                    </p>
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* New Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-300">New Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-400 transition-colors" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                minLength={8}
                                className="w-full pl-10 pr-12 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-gold-400 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <p className="text-xs text-slate-500">Minimum 8 characters</p>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-300">Confirm New Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-400 transition-colors" />
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                name="confirmPassword"
                                required
                                minLength={8}
                                className="w-full pl-10 pr-12 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-gold-400 transition-colors"
                            >
                                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-xl font-bold text-lg shadow-lg shadow-gold-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {loading ? 'Updating...' : 'Update Password'} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                {/* Security Note */}
                <div className="bg-midnight-900 border border-midnight-700 rounded-xl p-4">
                    <p className="text-xs text-slate-400 text-center">
                        🔒 Your password must be at least 8 characters long
                    </p>
                </div>
            </div>
        </div>
    );
}
