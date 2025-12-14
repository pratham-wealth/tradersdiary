'use client';

import { useState } from 'react';
import { closeTrade, deleteTrade, updateTrade } from '../app/dashboard/journal/actions';
import { TrendingUp, TrendingDown, X, Edit2, Trash2, FileText } from 'lucide-react';
import { ShareWithSocials } from './share-with-socials';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TradeReportPDF } from './trade-report-pdf';

export interface Trade {
    id: string;
    instrument: string;
    direction: string;
    entry_date: string;
    entry_price: number;
    exit_date: string | null;
    exit_price: number | null;
    stop_loss: number | null;
    target_price: number | null;
    outcome: string;
    pnl_points: number | null;
    notes: string | null;
    strategy: { id: string; name: string } | null;
    watch_list: { id: string } | null;
    study: { id: string; title: string } | null;
}

interface TradeCardProps {
    trade: Trade;
}

export function TradeCard({ trade }: TradeCardProps) {
    const [showCloseForm, setShowCloseForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const isOpen = trade.outcome === 'OPEN';
    const isLong = trade.direction === 'LONG';
    const isWin = trade.outcome === 'WIN';
    const isLoss = trade.outcome === 'LOSS';

    // Generate share text for closed trades
    const shareText = !isOpen && trade.pnl_points
        ? `Just closed a trade on $${trade.instrument}! ${trade.pnl_points > 0 ? '🚀' : '📉'
        } P&L: ${trade.pnl_points > 0 ? '+' : ''}${trade.pnl_points} points. ${isWin ? 'Target Hit! 🎯' : 'Stop Hit.'
        } Logged via @TradeNoteApp`
        : '';

    async function handleClose(formData: FormData) {
        setLoading(true);
        await closeTrade(trade.id, formData);
        setShowCloseForm(false);
        setLoading(false);
    }

    async function handleDelete() {
        if (!confirm('Delete this trade permanently?')) return;
        setLoading(true);
        await deleteTrade(trade.id);
    }

    async function handleUpdate(formData: FormData) {
        setLoading(true);
        const result = await updateTrade(trade.id, formData);

        if (result?.error) {
            // We might need a toast here, but for now simple alert or just console
            console.error(result.error);
        } else {
            setIsEditing(false);
        }
        setLoading(false);
    }

    // Edit Form Modal
    if (isEditing) {
        return (
            <div className="card p-4 border-2 border-indigo-500 shadow-xl relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={() => setIsEditing(false)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-lg mb-4 text-indigo-600">Edit Trade</h3>

                <form action={handleUpdate} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Instrument</label>
                            <input
                                name="instrument"
                                defaultValue={trade.instrument}
                                required
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 font-bold"
                                aria-label="Instrument"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Direction</label>
                            <select
                                name="direction"
                                defaultValue={trade.direction}
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                aria-label="Direction"
                            >
                                <option value="LONG">LONG</option>
                                <option value="SHORT">SHORT</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Entry</label>
                            <input
                                type="number"
                                step="0.01"
                                name="entryPrice"
                                defaultValue={trade.entry_price}
                                required
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                aria-label="Entry Price"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-red-500 uppercase">Stop Loss</label>
                            <input
                                type="number"
                                step="0.01"
                                name="stopLoss"
                                defaultValue={trade.stop_loss || ''}
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-red-600 font-medium"
                                aria-label="Stop Loss"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-green-500 uppercase">Target</label>
                            <input
                                type="number"
                                step="0.01"
                                name="targetPrice"
                                defaultValue={trade.target_price || ''}
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-green-600 font-medium"
                                aria-label="Target Price"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Note / Reason</label>
                        <textarea
                            name="notes"
                            defaultValue={trade.notes || ''}
                            rows={3}
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm"
                        />
                    </div>

                    {/* Strategy Selection is a bit tricky since we need the list. For now, we omit strategy editing or pass it in. Check props. */}
                    {/* Since we don't have strategies passed to TradeCard, we'll skip editing strategy ID for this quick fix or just keep it current. */}
                    {trade.strategy?.name && (
                        <div className="text-xs text-gray-400">
                            Strategy: {trade.strategy.name} (cannot change in quick edit)
                        </div>
                    )}
                    {/* Hidden input to keep existing strategy if we don't change it, or handle in backend optionally if null */}
                    <input type="hidden" name="strategyId" value={trade.strategy_id || (trade.strategy ? (trade.strategy as any).id : '')} />
                    <input type="hidden" name="studyId" value={trade.study_id || (trade.study ? (trade.study as any).id : '')} />


                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="card p-4 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl relative group">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {trade.instrument}
                    </h3>
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${isLong ? 'bg-long/10 text-long' : 'bg-short/10 text-short'
                            }`}
                    >
                        {isLong ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
                        {' '}{trade.direction}
                    </span>
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${isOpen
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            : isWin
                                ? 'bg-long/10 text-long'
                                : isLoss
                                    ? 'bg-short/10 text-short'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                    >
                        {trade.outcome}
                    </span>
                    { /* Share Button Logic kept same */}
                    {!isOpen && (
                        <ShareWithSocials
                            title="Share Trade"
                            text={shareText}
                            hashTags={['trading', 'finance', trade.instrument.toLowerCase().replace(/[^a-z0-9]/g, '')]}
                        />
                    )}
                </div>

                {/* Edit/Delete Menu - Only visible on hover or if Menu is open */}
                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="Edit Trade"
                        aria-label="Edit Trade"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <PDFDownloadLink
                        document={<TradeReportPDF title={`Trade Report: ${trade.instrument}`} trades={[trade]} />}
                        fileName={`Trade_Report_${trade.instrument}_${trade.id.slice(0, 4)}.pdf`}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors flex items-center justify-center"
                        title="Download Report"
                        aria-label="Download Report"
                    >
                        {/* We use specific typing or just render icon. TS might complain about children args if strictly typed, but let's try standard. */}
                        <FileText className="w-4 h-4" />
                    </PDFDownloadLink>
                    {!showCloseForm && (
                        <button
                            onClick={handleDelete}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Trade"
                            aria-label="Delete Trade"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Trade Details */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Entry</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                        ₹{trade.entry_price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                        {new Date(trade.entry_date).toLocaleDateString()}
                    </p>
                </div>

                {trade.exit_price && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Exit</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            ₹{trade.exit_price.toFixed(2)}
                        </p>
                        {trade.exit_date && (
                            <p className="text-xs text-gray-400">
                                {new Date(trade.exit_date).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                )}

                {trade.stop_loss && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Stop Loss</p>
                        <p className="font-semibold text-short">₹{trade.stop_loss.toFixed(2)}</p>
                    </div>
                )}

                {trade.target_price && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Target</p>
                        <p className="font-semibold text-long">₹{trade.target_price.toFixed(2)}</p>
                    </div>
                )}

                {trade.pnl_points !== null && (
                    <div className="col-span-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg mt-1">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">P&L Points</p>
                            <p
                                className={`text-lg font-bold ${trade.pnl_points > 0
                                    ? 'text-long'
                                    : trade.pnl_points < 0
                                        ? 'text-short'
                                        : 'text-gray-600'
                                    }`}
                            >
                                {trade.pnl_points > 0 ? '+' : ''}
                                {trade.pnl_points.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Strategy */}
            {trade.strategy && (
                <div className="mb-3">
                    <span className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded font-medium">
                        📋 {trade.strategy.name}
                    </span>
                </div>
            )}

            {/* Study */}
            {trade.study && (
                <div className="mb-3">
                    <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 px-2 py-1 rounded font-medium">
                        📚 {trade.study.title}
                    </span>
                </div>
            )}

            {/* Notes */}
            {trade.notes && (
                <div className="mb-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">&quot;{trade.notes}&quot;</p>
                </div>
            )}

            {/* Close Form */}
            {showCloseForm && isOpen && (
                <form action={handleClose} className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3 bg-gray-50 dark:bg-gray-800/30 -mx-4 -mb-4 p-4 rounded-b-xl">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Close this trade</h4>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">
                            Exit Price *
                        </label>
                        <input
                            type="number"
                            name="exitPrice"
                            step="0.01"
                            required
                            placeholder="Enter execution price"
                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            aria-label="Exit Price"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">
                            Outcome *
                        </label>
                        <select
                            name="outcome"
                            required
                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            aria-label="Outcome"
                        >
                            <option value="WIN">Win (Hit Target)</option>
                            <option value="LOSS">Loss (Hit Stop)</option>
                            <option value="BREAKEVEN">Breakeven</option>
                            <option value="MANUAL_EXIT">Manual Exit</option>
                        </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setShowCloseForm(false)}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-3 py-2 text-sm bg-long text-white rounded-lg hover:bg-long-dark disabled:opacity-50 font-medium"
                        >
                            {loading ? 'Closing...' : 'Confirm Close'}
                        </button>
                    </div>
                </form>
            )}

            {/* Actions Footer */}
            {!showCloseForm && isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <button
                        onClick={() => setShowCloseForm(true)}
                        className="px-4 py-2 text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm hover:shadow-md"
                    >
                        Close Trade
                    </button>
                </div>
            )}
        </div>
    );
}
