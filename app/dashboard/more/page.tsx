import Link from 'next/link';
import { BarChart3, FileText, Target, Settings, LineChart, Flame } from 'lucide-react';

const moreItems = [
    {
        name: 'Reports & Analytics',
        description: 'View performance reports',
        href: '/dashboard/reports',
        icon: BarChart3,
        color: 'text-emerald-500',
    },
    {
        name: 'Strategies',
        description: 'Manage your trading strategies',
        href: '/dashboard/strategies',
        icon: Target,
        color: 'text-blue-600',
    },
    {
        name: 'Trading Library',
        description: 'Books, Patterns & Resources',
        href: '/dashboard/library',
        icon: FileText,
        color: 'text-orange-500',
    },
    {
        name: 'Export Data',
        description: 'Download your trading data',
        href: '/dashboard/export',
        icon: FileText,
        color: 'text-purple-600',
    },
    {
        name: 'Settings',
        description: 'App preferences and configuration',
        href: '/dashboard/settings',
        icon: Settings,
        color: 'text-gray-600',
    },
];

export default function MorePage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    More
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Additional features and settings
                </p>
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
                {moreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="card p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
                        >
                            <div className={`${item.color}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
