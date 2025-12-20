import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingHero } from '@/components/landing/landing-hero';
import { LandingProblem } from '@/components/landing/landing-problem';
import { LandingWhatIsIt } from '@/components/landing/landing-what-is-it';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingStrategies } from '@/components/landing/landing-strategies';
import { LandingWatchlist } from '@/components/landing/landing-watchlist';
import { LandingTradeLogs } from '@/components/landing/landing-trade-logs';
import { LandingReports } from '@/components/landing/landing-reports';
import { LandingBookLibrary } from '@/components/landing/landing-book-library';
import { LandingUniversal } from '@/components/landing/landing-universal';
import { LandingBenefits } from '@/components/landing/landing-benefits';
import { LandingPricing } from '@/components/landing/landing-pricing';
import { LandingSecurity } from '@/components/landing/landing-security';
import { LandingTestimonials } from '@/components/landing/landing-testimonials';
import { LandingFAQ } from '@/components/landing/landing-faq';
import { LandingFinalCTA } from '@/components/landing/landing-final-cta';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-midnight-950 text-white selection:bg-gold-400/30">
            <LandingNavbar />
            <LandingHero />
            <LandingProblem />
            <LandingWhatIsIt />
            <LandingFeatures />
            <LandingStrategies />
            <LandingWatchlist />
            <LandingTradeLogs />
            <LandingReports />
            <LandingBookLibrary />
            <LandingUniversal />
            <LandingBenefits />
            <LandingPricing />
            <LandingSecurity />
            <LandingTestimonials />
            <LandingFAQ />
            <LandingFinalCTA />
            <div id="pricing"></div>
            <LandingFooter />
        </main>
    );
}
