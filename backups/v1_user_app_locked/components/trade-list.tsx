'use client';

import { Trade } from './trade-card';
import { TrendingUp, TrendingDown, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TradeListProps {
    trades: Trade[];
    onEdit: (trade: Trade) => void;
    onDelete: (id: string) => void;
}

export function TradeList({ trades, onEdit, onDelete }: TradeListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (!trades || trades.length === 0) {
        return null;
    }

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="flex flex-col gap-2">
            {trades.map((trade) => {
                const isLong = trade.direction === 'LONG';
                const isOpen = trade.outcome === 'OPEN';
                const isWin = trade.outcome === 'WIN';
                const isLoss = trade.outcome === 'LOSS';
                const isExpanded = expandedId === trade.id;

                return (
                    <div
                        key={trade.id}
                        className={`bg-slate-800/50 rounded-lg overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-2xl shadow-black/50 border border-white/10' : 'border border-transparent'}`}
                    >
                        {/* Header Row */}
                        <div
                            className="p-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
                            onClick={() => toggleExpand(trade.id)}
                        >
                            {/* Left: Symbol & Direction */}
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-bold text-white leading-tight tracking-tight">
                                    {trade.instrument}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold ${isLong ? 'text-emerald-400' : 'text-rose-400'} uppercase tracking-wider`}>
                                        {trade.direction}
                                    </span>
                                    <span className="text-[9px] text-slate-500 font-medium tracking-tight">
                                        {new Date(trade.entry_date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Right: P&L + Status (No helper labels, No arrow) */}
                            <div className="flex items-center gap-4 text-right">
                                <span className={`text-sm font-bold tabular-nums leading-tight tracking-tight ${trade.pnl_points && trade.pnl_points > 0 ? 'text-emerald-400' :
                                    trade.pnl_points && trade.pnl_points < 0 ? 'text-rose-400' : 'text-slate-400'
                                    }`}>
                                    {trade.pnl_points ? (trade.pnl_points > 0 ? '+' : '') + trade.pnl_points.toFixed(2) : '0.00'}
                                </span>

                                <span
                                    className={`inline-block px-1.5 py-0.5 text-[9px] font-bold rounded ${isOpen ? 'bg-blue-500/10 text-blue-400' :
                                        isWin ? 'bg-emerald-500/10 text-emerald-400' :
                                            isLoss ? 'bg-rose-500/10 text-rose-400' :
                                                'bg-slate-700/50 text-slate-400'
                                        }`}
                                >
                                    {trade.outcome}
                                </span>
                            </div>
                        </div>

                        {/* Expanded Details - Matches Watchlist Grid */}
                        {isExpanded && (
                            <div className="p-3 pt-0 animate-in slide-in-from-top-2 duration-200">
                                {/* Values Grid */}
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <div className="bg-slate-800 rounded p-2 flex flex-col items-center justify-center">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold">Entry</span>
                                        <span className="text-sm font-bold text-white tabular-nums tracking-tight">{trade.entry_price.toFixed(2)}</span>
                                    </div>
                                    <div className="bg-slate-800 rounded p-2 flex flex-col items-center justify-center">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold">Stop</span>
                                        <span className={`text-sm font-bold tabular-nums tracking-tight ${trade.stop_loss ? 'text-rose-400' : 'text-slate-600'}`}>
                                            {trade.stop_loss?.toFixed(2) || '-'}
                                        </span>
                                    </div>
                                    <div className="bg-slate-800 rounded p-2 flex flex-col items-center justify-center">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold">Target</span>
                                        <span className={`text-sm font-bold tabular-nums tracking-tight ${trade.target_price ? 'text-emerald-400' : 'text-slate-600'}`}>
                                            {trade.target_price?.toFixed(2) || '-'}
                                        </span>
                                    </div>
                                </div>

                                {/* Strategy / Notes */}
                                <div className="space-y-2 mb-3">
                                    {trade.strategy && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] text-indigo-400 font-bold uppercase bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                                Strategy
                                            </span>
                                            <span className="text-xs text-slate-300 font-medium">{trade.strategy.name}</span>
                                        </div>
                                    )}
                                    {trade.notes && (
                                        <div className="bg-slate-800/50 p-2.5 rounded border border-white/5">
                                            <p className="text-sm text-white font-medium leading-snug">"{trade.notes}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons - 3D Style */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(trade)}
                                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 rounded shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                        Edit / Close
                                    </button>
                                    <button
                                        onClick={() => onDelete(trade.id)}
                                        className="w-10 flex items-center justify-center bg-rose-900/30 hover:bg-rose-900/50 text-rose-400 rounded shadow-sm active:scale-95 transition-all border border-rose-500/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

