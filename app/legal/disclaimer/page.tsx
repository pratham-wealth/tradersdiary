import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingFooter } from '@/components/landing/landing-footer';

export const metadata = {
    title: 'Disclaimer | The Traders Diary',
    description: 'Important disclaimer and legal information for The Traders Diary platform users.',
};

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-midnight-950 text-white">
            <LandingNavbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Disclaimer
                    </h1>
                    <p className="text-lg text-slate-400">
                        Important information about The Traders Diary platform
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none space-y-8">
                    {/* Introduction */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <p className="text-slate-300 leading-relaxed">
                            The Traders Diary is a digital journaling and documentation platform designed solely for recording, organizing, and reviewing trading-related information entered by users.
                        </p>
                    </div>

                    {/* What We Don't Provide */}
                    <div className="bg-midnight-900/50 border border-red-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">The Traders Diary does not provide:</h2>
                        <ul className="space-y-3">
                            {[
                                'Investment advice',
                                'Trading recommendations',
                                'Buy/Sell/Hold calls',
                                'Portfolio management services',
                                'Financial, legal, or tax advice'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <span className="text-red-400 mt-1">✗</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* User Generated Content */}
                    <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-8">
                        <p className="text-slate-300 leading-relaxed mb-4">
                            All content, data, analysis, strategies, trade logs, and notes recorded within the application are <span className="text-gold-400 font-semibold">user-generated</span> and are meant strictly for personal documentation, learning, and record-keeping purposes.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            Trading and investing in financial markets involve <span className="text-red-400 font-semibold">risk</span>. Users are solely responsible for their trading decisions, actions, and outcomes.
                        </p>
                    </div>

                    {/* Liability */}
                    <div className="bg-midnight-900/50 border border-yellow-500/20 rounded-2xl p-8">
                        <p className="text-slate-300 leading-relaxed">
                            The Traders Diary, its creators, owners, and affiliates <span className="text-yellow-400 font-semibold">shall not be held responsible or liable</span> for any financial loss, trading loss, or damages arising directly or indirectly from the use of this platform.
                        </p>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-midnight-900/50 border border-blue-500/20 rounded-2xl p-8">
                        <p className="text-slate-300 leading-relaxed">
                            Users are advised to consult a <span className="text-blue-400 font-semibold">registered financial professional</span> before making any investment or trading decisions.
                        </p>
                    </div>

                    {/* Acknowledgment */}
                    <div className="bg-midnight-900/50 border border-gold-400/30 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">By using this platform, you acknowledge that:</h2>
                        <ul className="space-y-3">
                            {[
                                'You understand the risks involved in trading',
                                'You are using the platform at your own discretion',
                                'You accept full responsibility for your actions'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <span className="text-gold-400 mt-1">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
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
