'use client';

import { WatchItem } from './watch-card';
import { Trash2, TrendingUp, TrendingDown, BookOpen, FilePlus, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { SocialShareModal } from './social-share-modal';

interface WatchListProps {
    items: WatchItem[];
    onDelete: (id: string) => void;
    onEdit: (item: WatchItem) => void;
}

export function WatchList({ items, onDelete, onEdit }: WatchListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [shareItem, setShareItem] = useState<WatchItem | null>(null);

    // Helper to get share URL
    const getShareUrl = (item: WatchItem) => {
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://tradenote.app';
        // @ts-ignore
        if (item.study?.id) {
            // @ts-ignore
            return `${origin}/share/study/${item.study.id}`;
        }
        return origin; // Fallback
    };

    if (!items || items.length === 0) {
        return null;
    }

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => {
                const isLong = item.direction === 'LONG';
                // @ts-ignore
                const study = item.study;
                const isExpanded = expandedId === item.id;

                return (
                    <div
                        key={item.id}
                        className={`bg-slate-800/50 rounded-lg overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-2xl shadow-black/50 border border-white/10' : 'border border-transparent'}`}
                    >
                        {/* Collapsed Header */}
                        <div
                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
                            onClick={() => toggleExpand(item.id)}
                        >
                            {/* Left: Instrument + Strategy */}
                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-sm font-bold text-white leading-tight tracking-tight">
                                    {item.instrument}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isLong ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'} uppercase tracking-wider`}>
                                        {item.direction}
                                    </span>
                                    {item.strategy && (
                                        <span className="text-[9px] text-slate-400 font-medium tracking-tight">
                                            • {item.strategy.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Right: Price */}
                            <div className="text-right">
                                <p className="text-sm font-bold text-white tabular-nums leading-tight tracking-tight">
                                    {item.current_price ? `₹${item.current_price.toFixed(2)}` : '-'}
                                </p>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        <div
                            className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 p-3 pt-0' : 'grid-rows-[0fr] opacity-0 p-0 overflow-hidden'}`}
                        >
                            <div className="overflow-hidden space-y-2">
                                {/* Levels Grid: Low Visual Noise */}
                                {/* Levels Grid: Low Visual Noise */}
                                <div className="grid grid-cols-3 gap-2">
                                    {/* Row 1: The Basics */}
                                    <div className="bg-slate-800 rounded p-2 flex flex-col items-center justify-center">
                                        <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Entry</p>
                                        <p className="text-sm font-bold text-white tabular-nums tracking-tight">
                                            {item.entry_level ? item.entry_level.toFixed(2) : '-'}
                                        </p>
                                    </div>
                                    <div className="bg-slate-800 rounded p-2 flex flex-col items-center justify-center">
                                        <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Stop</p>
                                        <p className="text-sm font-bold text-white tabular-nums tracking-tight">
                                            {item.stop_loss ? item.stop_loss.toFixed(2) : '-'}
                                        </p>
                                    </div>
                                    <div className="bg-slate-800 rounded p-2 flex flex-col items-center justify-center">
                                        <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Target</p>
                                        <p className="text-sm font-bold text-white tabular-nums tracking-tight">
                                            {item.target_price ? item.target_price.toFixed(2) : '-'}
                                        </p>
                                    </div>

                                    {/* Row 2: Secondary Levels */}
                                    <div className="bg-slate-800/50 rounded p-2 flex flex-col items-center justify-center border border-white/5">
                                        <p className="text-[9px] text-slate-500 uppercase font-medium mb-0.5">Support</p>
                                        <p className="text-sm font-medium text-slate-300 tabular-nums tracking-tight">
                                            {item.support_level ? item.support_level.toFixed(2) : '-'}
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/50 rounded p-2 flex flex-col items-center justify-center border border-white/5">
                                        <p className="text-[9px] text-slate-500 uppercase font-medium mb-0.5">Resist</p>
                                        <p className="text-sm font-medium text-slate-300 tabular-nums tracking-tight">
                                            {item.resistance_level ? item.resistance_level.toFixed(2) : '-'}
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/50 rounded p-2 flex flex-col items-center justify-center border border-white/5">
                                        <p className="text-[9px] text-slate-500 uppercase font-medium mb-0.5">Break</p>
                                        <p className="text-sm font-medium text-slate-300 tabular-nums tracking-tight">
                                            {item.breakout_level ? item.breakout_level.toFixed(2) : '-'}
                                        </p>
                                    </div>
                                </div>

                                {/* Notes */}
                                {item.notes && (
                                    <div className="bg-slate-800/30 p-2.5 rounded-lg border border-white/5">
                                        <p className="text-sm font-medium text-white italic leading-relaxed">"{item.notes}"</p>
                                    </div>
                                )}

                                {/* Action Buttons - 3D Padded Row */}
                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="flex-1 bg-slate-800 hover:bg-blue-600 border border-white/5 text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <div className="w-3.5 h-3.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        </div>
                                        Edit
                                    </button>

                                    {study ? (
                                        <Link
                                            href={`/dashboard/studies/${study.id}`}
                                            className="flex-1 bg-slate-800 hover:bg-indigo-600 border border-white/5 text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <BookOpen className="w-3.5 h-3.5" />
                                            Study
                                        </Link>
                                    ) : (
                                        <div className="flex-1 bg-slate-800/50 text-slate-500 border border-white/5 text-[10px] font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed opacity-70">
                                            No Study
                                        </div>
                                    )}



                                    <Link
                                        href={`/dashboard/journal?watchItemId=${item.id}`}
                                        className="flex-[1.5] bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/50 text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-md hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <FilePlus className="w-3.5 h-3.5" />
                                        Log Trade
                                    </Link>

                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="bg-slate-800 hover:bg-rose-600 border border-white/5 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:shadow-rose-500/20 active:scale-95 transition-all duration-200"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            {/* Share Modal */}

        </div>
    );
}

