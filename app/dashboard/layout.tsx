import { BottomNav } from '@/components/bottom-nav';
import { HamburgerMenu } from '@/components/hamburger-menu';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-midnight-950">
            {/* Top Bar */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-midnight-900 border-b border-midnight-700 shadow-lg shadow-black/20">
                <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-midnight-800 border border-midnight-600 rounded-lg group-hover:border-gold-400/50 transition-colors">
                            <TrendingUp className="w-5 h-5 text-gold-400" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            Traders Diary
                        </h1>
                    </Link>
                    <HamburgerMenu />
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-14 pb-20 min-h-screen">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
