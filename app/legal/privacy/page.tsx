import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingFooter } from '@/components/landing/landing-footer';

export const metadata = {
    title: 'Privacy Policy | The Traders Diary',
    description: 'Privacy Policy explaining how The Traders Diary collects, uses, and protects your information.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-midnight-950 text-white">
            <LandingNavbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-slate-400">
                        At The Traders Diary, your privacy is important to us.
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none space-y-8">
                    {/* Information We Collect */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Information We Collect</h2>
                        <p className="text-slate-300 mb-4">We may collect the following information:</p>
                        <ul className="space-y-2 text-slate-300">
                            <li>• Name and email address during account registration</li>
                            <li>• Login credentials (securely encrypted)</li>
                            <li>• User-generated data such as analysis notes, trade logs, strategies, watchlists, and uploaded documents</li>
                            <li>• Basic usage data for platform improvement</li>
                        </ul>
                    </div>

                    {/* How We Use Your Information */}
                    <div className="bg-midnight-900/50 border border-blue-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">How We Use Your Information</h2>
                        <p className="text-slate-300 mb-4">Your data is used solely to:</p>
                        <ul className="space-y-2 text-slate-300">
                            <li>• Provide access to the platform</li>
                            <li>• Store and display your journal entries</li>
                            <li>• Improve app functionality and user experience</li>
                            <li>• Communicate important service-related updates</li>
                        </ul>
                    </div>

                    {/* Data Protection */}
                    <div className="bg-midnight-900/50 border border-green-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Data Protection</h2>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>All user data is stored <span className="text-green-400 font-semibold">securely</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>We <span className="text-green-400 font-semibold">do not sell, rent, or share</span> user data with third parties</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>We do not access or use your trading data for any advisory purpose</span>
                            </li>
                        </ul>
                    </div>

                    {/* User Control */}
                    <div className="bg-midnight-900/50 border border-gold-400/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">User Control</h2>
                        <ul className="space-y-2 text-slate-300">
                            <li>• Your trading data remains <span className="text-gold-400 font-semibold">private and accessible only to you</span></li>
                            <li>• You may request account deletion by contacting support</li>
                            <li>• Upon deletion, your stored data will be permanently removed, subject to technical limitations</li>
                        </ul>
                    </div>

                    {/* Cookies */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
                        <p className="text-slate-300">
                            We may use cookies or similar technologies to improve user experience and platform functionality.
                        </p>
                    </div>

                    {/* Third-Party Services */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                        <p className="text-slate-300">
                            We may use trusted third-party tools for hosting, analytics, and payment processing. These services follow industry-standard security practices.
                        </p>
                    </div>

                    {/* Changes to Policy */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                        <p className="text-slate-300">
                            This Privacy Policy may be updated periodically. Continued use of the platform constitutes acceptance of any changes.
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
