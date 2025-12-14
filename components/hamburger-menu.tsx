'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, CreditCard, Calendar, Mail, Settings, LogOut, ClipboardList, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/app/auth/actions';
import { AdBanner } from '@/components/ad-banner';
import { createClient } from '@/lib/supabase/client';

const menuItems = [
    {
        name: 'Tasks & Planning',
        href: '/dashboard/tasks',
        icon: ClipboardList,
    },
    {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: User,
    },
    {
        name: 'Subscription Plan',
        href: '/dashboard/subscription',
        icon: CreditCard,
    },
    {
        name: 'Plan Validity',
        href: '/dashboard/validity',
        icon: Calendar,
    },
    {
        name: 'Contact Support',
        href: '/dashboard/contact',
        icon: Mail,
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
    },
];

export function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState<{
        fullName: string;
        email: string;
        role?: string;
    }>({
        fullName: 'Trader',
        email: 'trader@example.com',
        role: 'user',
    });

    useEffect(() => {
        async function fetchUserData() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: settings } = await supabase
                    .from('user_settings')
                    .select('full_name, role')
                    .eq('id', user.id)
                    .single();

                setUserData({
                    fullName: settings?.full_name || 'Trader',
                    email: user.email || 'trader@example.com',
                    role: settings?.role || 'user',
                });
            }
        }

        fetchUserData();
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Menu"
            >
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 transition-opacity bg-black bg-opacity-80"
                    onClick={closeMenu}
                />
            )}

            {/* Slide-in Menu - COMPLETELY OPAQUE */}
            <div
                className={cn(
                    'fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-slate-600',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
                style={{
                    backgroundColor: 'rgb(15, 20, 25)',
                    backgroundImage: 'none'
                }}
            >
                {/* User Info & Header */}
                <div
                    className="p-4 border-b border-slate-600 flex items-start justify-between"
                    style={{ backgroundColor: 'rgb(15, 20, 25)' }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <p className="font-bold text-white">{userData.fullName}</p>
                            <p className="text-sm text-slate-400">{userData.email}</p>
                            {userData.role === 'super_admin' && (
                                <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold ml-[-2px] mt-1 inline-block">
                                    SUPER ADMIN
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={closeMenu}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors -mr-2 -mt-2"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Ad Banner (Moved Up) */}
                <AdBanner location="sidebar_bottom" className="mx-4 mt-4" />

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto p-2">
                    {/* Admin Section */}
                    {userData.role === 'super_admin' && (
                        <div className="mb-2 pb-2 border-b border-slate-700/50">
                            <Link
                                href="/dashboard/admin"
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-900/10 hover:bg-red-900/20 border border-red-500/20 transition-all group"
                            >
                                <Lock className="w-5 h-5 text-red-500 group-hover:text-red-400" />
                                <span className="text-red-100 group-hover:text-white transition-colors font-bold">
                                    Admin Command Center
                                </span>
                            </Link>
                        </div>
                    )}

                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors group"
                            >
                                <Icon className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                                <span className="text-slate-200 group-hover:text-white transition-colors font-medium">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-slate-600">
                    <button
                        onClick={async () => {
                            await signOut();
                        }}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-900/20 transition-colors group"
                    >
                        <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-400" />
                        <span className="text-slate-200 group-hover:text-red-400 font-medium">
                            Logout
                        </span>
                    </button>
                </div>

                {/* Copyright Footer */}
                <div className="p-4 pt-2 text-center border-t border-slate-800/50 mt-auto">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-xs font-bold text-slate-200">© Pratham Wealth Academy</p>
                        <p className="text-[11px] font-medium text-slate-400">Created by : ARP Infotech</p>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 py-0.5">
                            <span>Traders Diary (V 1.0)</span>
                            <span>•</span>
                            <span>Dec. 2025</span>
                        </div>

                        <p className="text-xs font-bold text-amber-500 pt-1">Proudly Made in India with Love !! 🇮🇳</p>
                    </div>
                </div>
            </div>
        </>
    );
}
