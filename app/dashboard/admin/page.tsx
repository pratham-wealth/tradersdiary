import { Users, CreditCard, BookOpen, Activity } from 'lucide-react';
import Link from 'next/link';
import { AnnouncementManager } from './announcement-manager';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Admin Command Center</h2>
                <p className="text-slate-400">Manage users, content, and revenue from one place.</p>
            </div>

            {/* Announcement Manager */}
            <AnnouncementManager />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Users Card */}
                <Link href="/dashboard/admin/users" className="group">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">User Management</h3>
                        <p className="text-sm text-slate-400">View all members, ban users, upgrade plans.</p>
                    </div>
                </Link>

                {/* Sales Card */}
                <Link href="/dashboard/admin/sales" className="group">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                            <CreditCard className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Sales & Revenue</h3>
                        <p className="text-sm text-slate-400">Track payments, download reports, view metrics.</p>
                    </div>
                </Link>

                {/* Content Card */}
                <Link href="/dashboard/admin/books" className="group">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                            <BookOpen className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Book Library</h3>
                        <p className="text-sm text-slate-400">Upload Books, PDFs, and Resources.</p>
                    </div>
                </Link>

                {/* Patterns Card */}
                <Link href="/dashboard/admin/patterns" className="group">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10">
                        <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                            <Activity className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Pattern Library</h3>
                        <p className="text-sm text-slate-400">Create Chart & Candlestick learning modules.</p>
                    </div>
                </Link>

                {/* Ads Card */}
                <Link href="/dashboard/admin/ads" className="group">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                            <Activity className="w-6 h-6 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Ads Manager</h3>
                        <p className="text-sm text-slate-400">Manage banner ads and promotional links.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
