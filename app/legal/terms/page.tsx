import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingFooter } from '@/components/landing/landing-footer';

export const metadata = {
    title: 'Terms and Conditions | The Traders Diary',
    description: 'Terms and Conditions for using The Traders Diary platform.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-midnight-950 text-white">
            <LandingNavbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Terms and Conditions
                    </h1>
                    <p className="text-lg text-slate-400">
                        By accessing or using The Traders Diary, you agree to the following terms
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none space-y-8">
                    {/* Nature of Service */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Nature of Service</h2>
                        <p className="text-slate-300 mb-3">
                            The Traders Diary is a digital subscription-based software platform providing tools for trading documentation and personal record-keeping only.
                        </p>
                        <p className="text-red-400 font-semibold">
                            This platform does not offer financial advice or trading services.
                        </p>
                    </div>

                    {/* User Responsibilities */}
                    <div className="bg-midnight-900/50 border border-blue-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">User Responsibilities</h2>

                        <p className="text-slate-300 mb-4 font-semibold">Users agree to:</p>
                        <ul className="space-y-2 text-slate-300 mb-6">
                            <li>• Use the platform only for lawful purposes</li>
                            <li>• Enter accurate and lawful information</li>
                            <li>• Not misuse the platform for fraudulent or harmful activities</li>
                        </ul>

                        <p className="text-slate-300 mb-4 font-semibold">Users are solely responsible for:</p>
                        <ul className="space-y-2 text-slate-300">
                            <li>• The content they upload</li>
                            <li>• Their trading decisions</li>
                            <li>• Compliance with local laws and regulations</li>
                        </ul>
                    </div>

                    {/* Subscription & Access */}
                    <div className="bg-midnight-900/50 border border-gold-400/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Subscription & Access</h2>
                        <ul className="space-y-2 text-slate-300">
                            <li>• Access to The Traders Diary is provided on a <span className="text-gold-400 font-semibold">subscription basis</span></li>
                            <li>• Subscription fees grant digital access only</li>
                            <li>• No physical product or service delivery is involved</li>
                        </ul>
                    </div>

                    {/* No Refund Policy */}
                    <div className="bg-midnight-900/50 border border-red-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">No Refund Policy</h2>
                        <p className="text-slate-300 mb-4">Due to the nature of digital subscriptions:</p>
                        <ul className="space-y-2 text-slate-300 mb-4">
                            <li>• All payments are <span className="text-red-400 font-semibold">final</span></li>
                            <li>• No refunds or cancellations are offered once access is granted</li>
                        </ul>
                        <p className="text-slate-400 text-sm italic">
                            Users are encouraged to review platform details carefully before subscribing.
                        </p>
                    </div>

                    {/* Intellectual Property */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                        <p className="text-slate-300">
                            All platform content, branding, design, and software belong to The Traders Diary. Users may not copy, distribute, or reproduce any part of the platform without written permission.
                        </p>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="bg-midnight-900/50 border border-yellow-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                        <p className="text-slate-300 mb-4">The Traders Diary shall not be liable for:</p>
                        <ul className="space-y-2 text-slate-300 mb-4">
                            <li>• Trading losses</li>
                            <li>• Data interpretation errors</li>
                            <li>• Service interruptions</li>
                            <li>• User misuse of the platform</li>
                        </ul>
                        <p className="text-yellow-400 font-semibold">
                            Use of the platform is at your own risk.
                        </p>
                    </div>

                    {/* Termination */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                        <p className="text-slate-300">
                            We reserve the right to suspend or terminate accounts found violating these terms, without prior notice.
                        </p>
                    </div>

                    {/* Governing Law */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                        <p className="text-slate-300">
                            These terms shall be governed by and interpreted in accordance with applicable laws of <span className="text-white font-semibold">India</span>, without regard to conflict of law principles.
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-12 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>

            <LandingFooter />
        </main>
    );
}
