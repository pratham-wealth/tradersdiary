import { Mail, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function EmailVerificationSentPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-midnight-950 p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="p-3 bg-midnight-800 border border-midnight-700 rounded-2xl glow-gold">
                        <TrendingUp className="w-12 h-12 text-gold-400" />
                    </div>
                </div>

                {/* Animated Email Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gold-400/20 blur-2xl rounded-full animate-pulse"></div>
                        <div className="relative bg-midnight-800 p-6 rounded-full border-4 border-midnight-700">
                            <Mail className="w-16 h-16 text-gold-400" />
                        </div>
                        <div className="absolute -top-2 -right-2">
                            <CheckCircle className="w-8 h-8 text-emerald-400 bg-midnight-950 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-white">
                        Check Your Email
                    </h1>
                    <p className="text-lg text-slate-300">
                        We&apos;ve sent a verification link to your email address.
                    </p>
                    <p className="text-sm text-slate-400">
                        Click the link in the email to verify your account and get started with your 7-day Pro trial.
                    </p>
                </div>

                {/* Instructions */}
                <div className="bg-midnight-900 border border-midnight-700 rounded-2xl p-6 space-y-4 text-left">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Next Steps:</h3>
                    <ol className="space-y-3 text-sm text-slate-300">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-gold-400/20 text-gold-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <span>Check your inbox (and spam folder)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-gold-400/20 text-gold-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <span>Click the verification link in the email</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-gold-400/20 text-gold-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <span>You&apos;ll be automatically signed in</span>
                        </li>
                    </ol>
                </div>

                {/* Didn't receive email */}
                <div className="space-y-4">
                    <p className="text-sm text-slate-500">
                        Didn&apos;t receive the email?
                    </p>
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-slate-300 hover:bg-midnight-800 hover:text-white transition-all font-medium"
                    >
                        Try Again <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Back to login */}
                <p className="text-sm text-slate-500">
                    Already verified?{' '}
                    <Link href="/auth/login" className="text-gold-400 font-bold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
