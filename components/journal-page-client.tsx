'use client';

import { useState } from 'react';
import { getTrades } from '@/app/dashboard/journal/actions';
import { AddTradeForm } from '@/components/add-trade-form';
import { TradeCard, Trade } from '@/components/trade-card';
import { TradeList } from '@/components/trade-list';
import { Strategy } from '@/components/strategy-card';
import { Study } from '@/components/study-card';
import { BookOpen } from 'lucide-react';

// Define the shape expected by AddTradeForm
interface PreFillWatchItem {
    instrument: string;
    direction: string;
    entry_level: number | null;
    stop_loss: number | null;
    target_price: number | null;
    strategy_id?: string;
    study_id?: string;
    created_at?: string;
}

interface JournalPageProps {
    initialTrades: Trade[];
    strategies: Strategy[];
    studies: Study[];
    initialWatchItem?: PreFillWatchItem;
}

export default function JournalPageClient({ initialTrades, strategies, studies, initialWatchItem }: JournalPageProps) {
    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('open');
    const [trades, setTrades] = useState(initialTrades.filter(t => t.outcome === 'OPEN'));
    const [editingTrade, setEditingTrade] = useState<Trade | null>(null);

    // Derived Stats
    const totalTrades = trades.length;
    const winRate = totalTrades > 0
        ? ((trades.filter(t => t.outcome === 'WIN').length / trades.filter(t => t.outcome !== 'OPEN').length) * 100).toFixed(1)
        : '0.0';
    const netPnL = trades.reduce((sum, t) => sum + (t.pnl_points || 0), 0).toFixed(2);

    async function handleFilterChange(newFilter: 'all' | 'open' | 'closed') {
        setFilter(newFilter);
        const result = await getTrades(newFilter);
        if (result.data) {
            setTrades(result.data);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this trade permanently?')) return;
        // In a real app, you'd call a server action here directly or pass it down
        // For this refactor, we are using the TradeList primarily for display but need to hook up actions.
        // Since TradeCard had the logic internally, we should probably lift it or expose the action.
        // Re-using the logic from TradeCard requires importing the action.
        const { deleteTrade } = await import('@/app/dashboard/journal/actions');
        await deleteTrade(id);
        setTrades(trades.filter(t => t.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Summary Strip */}
            {/* Summary Strip - 3D Style */}
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Total Trades</p>
                    <p className="text-sm font-bold text-white leading-none">{totalTrades}</p>
                </div>
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Win Rate</p>
                    <p className="text-sm font-bold text-gold-400 leading-none">{winRate}%</p>
                </div>
            </div>

            {/* Controls Bar */}
            {/* Controls Bar */}
            <div className="flex items-center gap-3 w-full py-2">
                {/* Filters (Dropdown) */}
                <div className="relative flex-1 min-w-0">
                    <select
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value as any)}
                        className="w-full appearance-none bg-slate-800 border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-transparent transition-all cursor-pointer shadow-sm hover:bg-slate-700"
                    >
                        <option value="all" className="bg-slate-800 text-slate-300">All Trades</option>
                        <option value="open" className="bg-slate-800 text-slate-300">Open Trades</option>
                        <option value="closed" className="bg-slate-800 text-slate-300">Closed Trades</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <AddTradeForm
                    strategies={strategies}
                    studies={studies}
                    watchItem={initialWatchItem}
                    triggerClassName="flex-1 w-full flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 border border-emerald-400/20 whitespace-nowrap"
                    triggerLabel="+ New Trade"
                />
            </div>

            {/* Trades Table */}
            {trades.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-midnight-700 rounded-xl bg-midnight-900/50">
                    <BookOpen className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                        No trades found
                    </h3>
                    <p className="text-slate-400">
                        Try adjusting filters or log a new trade.
                    </p>
                </div>
            ) : (
                <TradeList
                    trades={trades}
                    onEdit={(trade) => setEditingTrade(trade)}
                    onDelete={handleDelete}
                />
            )}

            {/* Edit Modal Logic would go here - utilizing TradeCard's edit mode logic or a separate modal */}
            {editingTrade && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg">
                        <TradeCard trade={editingTrade} /> {/* Re-using TradeCard for full edit functionality as it has the form built-in */}
                        {/* Note: This is a bit hacky. Ideally, we extract the EditForm. For now, TradeCard handles edits internal state. 
                            But TradeCard assumes it's in a list. We might need a wrapper to close this modal when done. 
                           Better approach: Extract EditTradeForm. 
                           Quick fix: Allow user to close modal.
                        */}
                        <button
                            onClick={() => setEditingTrade(null)}
                            className="mt-4 w-full py-3 bg-midnight-800 text-white rounded-xl font-bold hover:bg-midnight-700"
                        >
                            Close Editor
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
