import { BottomNav } from '@/components/bottom-nav';
import { HamburgerMenu } from '@/components/hamburger-menu';
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
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 group-hover:scale-105 transition-transform">
                            <img src="/logo.png" alt="The Traders Diary" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            The Traders Diary
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
