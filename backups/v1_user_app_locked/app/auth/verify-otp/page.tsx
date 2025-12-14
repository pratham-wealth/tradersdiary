'use client';

import { verifyOTP, resendOTP } from './actions';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, Shield, ArrowRight, RefreshCw, TrendingUp } from 'lucide-react';

export default function VerifyOTPPage() {
    const searchParams = useSearchParams();
    const email = searchParams?.get('email') || '';
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Development mode
    const isDev = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();

        // In dev mode, show instructions
        if (isDev) {
            toast.info('DEV MODE: Use code 123456 for testing', {
                duration: 10000,
            });
        }
    }, [isDev]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.charAt(0);
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
        setOtp(newOtp);

        // Focus last filled input or first empty
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            toast.error('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('otp', otpValue);

        const result = await verifyOTP(formData);

        if (result?.error) {
            toast.error(result.error);
            setLoading(false);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } else {
            toast.success('Email verified successfully!');
            // Redirect handled by server action
        }
    }

    async function handleResend() {
        setResending(true);
        const result = await resendOTP(email);
        setResending(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('New OTP sent to your email!');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
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

                {/* Development Mode Banner */}
                {isDev && (
                    <div className="bg-amber-900/20 border-2 border-amber-500 rounded-xl p-4 text-center space-y-2">
                        <p className="text-amber-400 font-bold text-sm uppercase tracking-wider">🔧 Development Mode</p>
                        <p className="text-amber-200 text-sm">Use test code: <span className="font-mono font-bold text-lg">123456</span></p>
                        <p className="text-amber-300/70 text-xs">Email delivery not configured</p>
                    </div>
                )}

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gold-400/20 blur-2xl rounded-full animate-pulse"></div>
                        <div className="relative bg-midnight-800 p-6 rounded-full border-4 border-midnight-700">
                            <Shield className="w-16 h-16 text-gold-400" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">
                        Verify Your Email
                    </h1>
                    <p className="text-slate-300">
                        We&apos;ve sent a 6-digit code to
                    </p>
                    <p className="text-gold-400 font-semibold flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        {email}
                    </p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 text-center text-2xl font-bold bg-midnight-900 border-2 border-midnight-700 rounded-xl text-white focus:border-gold-400 focus:ring-2 focus:ring-gold-400/50 outline-none transition-all"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-xl font-bold text-lg shadow-lg shadow-gold-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {loading ? 'Verifying...' : 'Verify & Continue'} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                {/* Resend */}
                <div className="text-center space-y-4">
                    <p className="text-sm text-slate-500">
                        Didn&apos;t receive the code?
                    </p>
                    <button
                        onClick={handleResend}
                        disabled={resending}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-midnight-900 border border-midnight-700 rounded-xl text-slate-300 hover:bg-midnight-800 hover:text-white transition-all font-medium disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
                        {resending ? 'Sending...' : 'Resend Code'}
                    </button>
                </div>

                {/* Help Text */}
                <div className="bg-midnight-900 border border-midnight-700 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-400">
                        Check your spam folder if you don&apos;t see the email.
                        <br />
                        The code expires in 60 minutes.
                    </p>
                </div>
            </div>
        </div>
    );
}
