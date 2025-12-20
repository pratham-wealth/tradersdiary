import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingHero } from '@/components/landing/landing-hero';
import { LandingProblem } from '@/components/landing/landing-problem';
import { LandingWhatIsIt } from '@/components/landing/landing-what-is-it';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingUniversal } from '@/components/landing/landing-universal';
import { LandingSecurity } from '@/components/landing/landing-security';
import { LandingTestimonials } from '@/components/landing/landing-testimonials';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-midnight-950 text-white selection:bg-gold-400/30">
            <LandingNavbar />
            <LandingHero />
            <div id="how-it-works"></div> {/* Anchor for navigation */}
            <LandingProblem />
            <LandingWhatIsIt />
            <LandingFeatures />
            <LandingUniversal />
            <LandingSecurity />
            <LandingTestimonials />
            <div id="pricing"></div> {/* Placeholder for pricing anchor if needed later */}
            <LandingFooter />
        </main>
    );
}
