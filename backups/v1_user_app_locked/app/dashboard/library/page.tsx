import { Plus, BookOpen, BarChart3, LineChart, Flame, Target, Filter } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getUserBooks } from './actions';
import { LibraryClientWrapper } from '@/components/library-client-wrapper';

export default async function LibraryPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch User Books
    const books = await getUserBooks();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Traders Library</h1>
                    <p className="text-slate-400">Your centralized hub for trading knowledge and resources.</p>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/learn/chart-patterns" className="p-6 bg-slate-800 border border-white/5 rounded-xl hover:border-gold-400/50 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-gold-400/10 transition-colors">
                            <LineChart className="w-6 h-6 text-gold-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Chart Patterns</h3>
                            <p className="text-xs text-slate-400">Classical Formations</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gold-400/50"></div>
                    </div>
                </Link>

                <Link href="/dashboard/learn/candlesticks" className="p-6 bg-slate-800 border border-white/5 rounded-xl hover:border-red-400/50 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-red-400/10 transition-colors">
                            <Flame className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Candlestick Patterns</h3>
                            <p className="text-xs text-slate-400">Price Action Logic</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-red-400/50"></div>
                    </div>
                </Link>

                <Link href="/dashboard/strategies" className="p-6 bg-slate-800 border border-white/5 rounded-xl hover:border-blue-400/50 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-blue-400/10 transition-colors">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Trading Strategies</h3>
                            <p className="text-xs text-slate-400">Your Playbooks & Rules</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-blue-400/50"></div>
                    </div>
                </Link>

                <Link href="/dashboard/library/screeners" className="p-6 bg-slate-800 border border-white/5 rounded-xl hover:border-purple-400/50 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-purple-400/10 transition-colors">
                            <Filter className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Fundamental Screeners</h3>
                            <p className="text-xs text-slate-400">Stock Selection Criteria</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-purple-400/50"></div>
                    </div>
                </Link>
            </div>

            {/* My Book Collection */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-slate-400" />
                        <h2 className="text-xl font-bold text-white">My Book Collection</h2>
                        <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded-full">{books.length} Books</span>
                    </div>
                </div>

                {/* Client Side Wrapper handles Add Modal & Grid */}
                <LibraryClientWrapper
                    initialBooks={books}
                    userEmail={user?.email || 'Unknown'}
                />
            </div>
        </div>
    );
}
