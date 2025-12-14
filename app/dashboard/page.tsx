import { getTodaysDiary, getDashboardStats, getUserSettings } from './actions';
import DashboardFocusList from '@/components/dashboard-focus-list';
import { DashboardMarketOutlook } from '@/components/dashboard-market-outlook';
import { DailyRoutine } from '@/components/daily-routine';
import { DashboardTimeDisplay } from '@/components/dashboard-time-display';

export default async function DashboardPage() {
    // Force rebuild
    const [diaryResult, stats, settingsResult] = await Promise.all([
        getTodaysDiary(),
        getDashboardStats(),
        getUserSettings(),
    ]);

    const diary = diaryResult.data;
    const userSettings = settingsResult.data;
    const recentTrades = stats.recentTrades || [];

    // Get greeting based on time
    const hour = new Date().getHours();
    const greeting =
        hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {greeting}, <span className="text-gold-400">{userSettings?.full_name?.split(' ')[0] || 'Trader'}</span>
                    </h1>
                    <DashboardTimeDisplay />
                </div>

                {/* Quick Actions Bar (Minimal) */}
                <div className="flex gap-3">
                    <a href="/dashboard/journal" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg shadow-emerald-500/20 active:scale-95">
                        <span>+ Log Trade</span>
                    </a>
                </div>
            </div>

            {/* Main Stats Grid - Compact 3D Style */}
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Open</p>
                    <p className="text-lg font-bold text-white leading-none">{stats.openTrades}</p>
                </div>
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Watch</p>
                    <p className="text-lg font-bold text-white leading-none">{stats.watchingCount}</p>
                </div>
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Tasks</p>
                    <p className="text-lg font-bold text-white leading-none">
                        {diary?.things_to_do?.filter((t: any) => !t.completed).length || 0}
                    </p>
                </div>
            </div>

            {/* Permanent Daily Routine Checklist */}
            <DailyRoutine />

            {/* Today's Focus (Moved Up) */}
            <div className="bg-midnight-900/50 border border-midnight-800 rounded-xl p-4 md:p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-gold-400/10 transition-colors"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
                    <h3 className="font-bold text-lg text-white">Today&apos;s Focus</h3>
                    <a href="/dashboard/diary" className="text-sm font-medium text-gold-400 hover:text-gold-300">
                        Manage Plan &rarr;
                    </a>
                </div>

                <DashboardFocusList
                    initialTasks={diary?.things_to_do || []}
                    date={diary?.entry_date || new Date().toISOString().split('T')[0]}
                />
            </div>

            {/* Market Analysis (Expandable) */}
            <DashboardMarketOutlook analysis={diary?.market_analysis ?? null} />
        </div>
    );
}
