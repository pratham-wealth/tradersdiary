'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Eye, BookOpen, FileText, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    {
        name: 'Home',
        href: '/dashboard',
        icon: Home,
    },
    {
        name: 'Watch',
        href: '/dashboard/watch',
        icon: Eye,
    },
    {
        name: 'Journal',
        href: '/dashboard/journal',
        icon: BookOpen,
    },
    {
        name: 'Studies',
        href: '/dashboard/studies',
        icon: FileText,
    },
    {
        name: 'More',
        href: '/dashboard/more',
        icon: MoreHorizontal,
    },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-midnight-950 border-t border-midnight-700 bottom-nav shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-300',
                                'rounded-lg hover:bg-midnight-900',
                                isActive
                                    ? 'text-gold-400 font-bold'
                                    : 'text-slate-500 hover:text-slate-300'
                            )}
                        >
                            <Icon className={cn('w-6 h-6 transition-transform duration-300', isActive && 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]')} />
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
