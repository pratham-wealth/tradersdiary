import { getAdminUsers, getAdminStats } from '@/app/dashboard/admin/actions';
import { UsersTable } from '@/components/admin/users-table';
import { AlertCircle, Users, Ghost, Activity, BookOpen } from 'lucide-react';

export default async function AdminUsersPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; query?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const query = params?.query || '';

    // Parallel Data Fetching
    const [usersRes, statsRes] = await Promise.all([
        getAdminUsers({ page, perPage: 50, query }),
        getAdminStats()
    ]);

    const { users, total, error } = usersRes;
    const { stats, error: statsError } = statsRes;

    if (error || statsError) {
        return (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>Error: {error || statsError}</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Command Center
                    </h2>
                    <p className="text-slate-400 mt-1">User behavior analytics and management.</p>
                </div>

                {stats && (
                    <div className="flex items-stretch gap-3">
                        {/* Total Population */}
                        <div className="bg-slate-900/50 backdrop-blur-xl px-4 py-3 rounded-xl border border-slate-700/50 flex flex-col items-center min-w-[90px] shadow-lg">
                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <Users className="w-3 h-3" /> Total
                            </span>
                            <span className="text-2xl font-bold text-white tabular-nums tracking-tight">{stats.totalUsers}</span>
                        </div>

                        {/* Active Today */}
                        <div className="bg-slate-900/50 backdrop-blur-xl px-4 py-3 rounded-xl border border-emerald-500/20 flex flex-col items-center min-w-[90px] shadow-lg">
                            <span className="text-emerald-500/80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <Activity className="w-3 h-3" /> 24h Active
                            </span>
                            <span className="text-2xl font-bold text-emerald-400 tabular-nums tracking-tight">{stats.activeToday}</span>
                        </div>

                        {/* Diary Usage */}
                        <div className="bg-slate-900/50 backdrop-blur-xl px-4 py-3 rounded-xl border border-blue-500/20 flex flex-col items-center min-w-[90px] shadow-lg">
                            <span className="text-blue-500/80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <BookOpen className="w-3 h-3" /> Traders
                            </span>
                            <span className="text-2xl font-bold text-blue-400 tabular-nums tracking-tight">{stats.diaryUsage}</span>
                        </div>

                        {/* Ghost Accounts */}
                        <div className="bg-slate-900/50 backdrop-blur-xl px-4 py-3 rounded-xl border border-rose-500/20 flex flex-col items-center min-w-[90px] shadow-lg">
                            <span className="text-rose-500/80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <Ghost className="w-3 h-3" /> Ghosts
                            </span>
                            <span className="text-2xl font-bold text-rose-400 tabular-nums tracking-tight">{stats.ghostAccounts}</span>
                        </div>
                    </div>
                )}
            </div>

            <UsersTable
                initialUsers={users}
                totalUsers={total}
                currentPage={page}
                perPage={50}
                currentQuery={query}
            />
        </div>
    );
}
