'use client';

import { useState } from 'react';
import { closeWatchItem, deleteWatchItem } from '../app/dashboard/watch/actions';
import { Edit, X, TrendingUp, TrendingDown, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { SocialShareModal } from './social-share-modal';

export interface WatchItem {
    id: string;
    instrument: string;
    direction: string;
    current_price: number;
    entry_level: number | null;
    stop_loss: number | null;
    target_price: number | null;
    breakout_level: number | null;
    support_level: number | null;
    resistance_level: number | null;
    notes: string | null;
    alert_enabled: boolean;
    created_at: string;
    strategy?: { id: string; name: string };
}

interface WatchCardProps {
    item: WatchItem;
}

export function WatchCard({ item }: WatchCardProps) {
    const [loading, setLoading] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    async function handleClose() {
        if (!confirm('Close this watch item?')) return;
        setLoading(true);
        await closeWatchItem(item.id);
    }

    async function handleDelete() {
        if (!confirm('Delete this watch item permanently?')) return;
        setLoading(true);
        await deleteWatchItem(item.id);
    }

    function handleShare(e: React.MouseEvent) {
        e.stopPropagation();
        setShowShareModal(true);
    }


    const isLong = item.direction === 'LONG';

    return (
        <div
            id={`watch-card-${item.id}`}
            className="card p-4 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {item.instrument}
                        </h3>
                        <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${isLong
                                ? 'bg-long/10 text-long'
                                : 'bg-short/10 text-short'
                                }`}
                        >
                            {isLong ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
                            {' '}{item.direction}
                        </span>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-0.5">
                        Added: {new Date(item.created_at).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleShare}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        title="Share Setup"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        title="Close watch"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Current Price</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                        ₹{item.current_price.toFixed(2)}
                    </p>
                </div>
                {item.entry_level && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Entry Level</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            ₹{item.entry_level.toFixed(2)}
                        </p>
                    </div>
                )}
                {item.stop_loss && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Stop Loss</p>
                        <p className="font-semibold text-short">
                            ₹{item.stop_loss.toFixed(2)}
                        </p>
                    </div>
                )}
                {item.target_price && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Target</p>
                        <p className="font-semibold text-long">
                            ₹{item.target_price.toFixed(2)}
                        </p>
                    </div>
                )}
                {item.breakout_level && (
                    <div className="col-span-2">
                        <p className="text-gray-500 dark:text-gray-400">Breakout Level</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            ₹{item.breakout_level.toFixed(2)}
                        </p>
                    </div>
                )}
            </div>

            {item.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">&quot;{item.notes}&quot;</p>
                </div>
            )}

            {item.strategy && (
                <div className="mt-2 text-xs bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-300 p-2 rounded">
                    <strong>Strategy:</strong> {item.strategy.name}
                </div>
            )}

            <div className="mt-3 flex gap-2">
                <button
                    onClick={() => window.location.href = `/dashboard/journal?watchItemId=${item.id}`}
                    className="flex-1 px-3 py-2 text-sm border border-long text-long rounded-lg hover:bg-long hover:text-white transition-colors"
                >
                    Take Trade
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
