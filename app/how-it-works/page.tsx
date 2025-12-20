import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingHowItWorks } from '@/components/landing/landing-how-it-works';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-midnight-950 text-white selection:bg-gold-400/30">
            <LandingNavbar />
            <div className="pt-20">
                <LandingHowItWorks />
            </div>
            <LandingFooter />
        </main>
    );
}
