'use client';

import { useState } from 'react';
import { addTrade } from '@/app/dashboard/journal/actions';
import { X } from 'lucide-react';

interface AddTradeFormProps {
    strategies: Array<{ id: string; name: string }>;
    studies?: Array<{ id: string; title: string }>;
    watchListId?: string;
    watchItem?: {
        instrument: string;
        direction: string;
        entry_level: number | null;
        stop_loss: number | null;
        target_price: number | null;
        strategy_id?: string;
        study_id?: string;
    };
    triggerClassName?: string;
    triggerLabel?: string;
}

export function AddTradeForm({ strategies, studies = [], watchListId, watchItem, triggerClassName, triggerLabel }: AddTradeFormProps) {
    const [isOpen, setIsOpen] = useState(!!watchItem);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        if (watchListId) {
            formData.append('watchListId', watchListId);
        }

        const result = await addTrade(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setIsOpen(false);
            setLoading(false);
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={triggerClassName || "w-full px-4 py-2 bg-long text-white rounded-lg font-medium hover:bg-long-dark transition-colors"}
            >
                {triggerLabel || "+ Log New Trade"}
            </button>
        );
    }

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Log Trade
                </h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            <form action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Instrument *
                        </label>
                        <input
                            type="text"
                            name="instrument"
                            required
                            defaultValue={watchItem?.instrument || ''}
                            placeholder="e.g., NIFTY, BANKNIFTY, RELIANCE"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            aria-label="Instrument"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Direction *
                        </label>
                        <select
                            name="direction"
                            required
                            defaultValue={watchItem?.direction || 'LONG'}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            aria-label="Direction"
                        >
                            <option value="LONG">LONG</option>
                            <option value="SHORT">SHORT</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Entry Price *
                        </label>
                        <input
                            type="number"
                            name="entryPrice"
                            step="0.01"
                            required
                            defaultValue={watchItem?.entry_level || ''}
                            placeholder="0.00"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            aria-label="Entry Price"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Stop Loss
                        </label>
                        <input
                            type="number"
                            name="stopLoss"
                            step="0.01"
                            defaultValue={watchItem?.stop_loss || ''}
                            placeholder="0.00"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            aria-label="Stop Loss"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Target Price
                        </label>
                        <input
                            type="number"
                            name="targetPrice"
                            step="0.01"
                            defaultValue={watchItem?.target_price || ''}
                            placeholder="0.00"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            aria-label="Target Price"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Strategy
                        </label>
                        <select
                            name="strategyId"
                            defaultValue={watchItem?.strategy_id || ''}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            aria-label="Strategy"
                        >
                            <option value="">No strategy</option>
                            {strategies.map((strategy) => (
                                <option key={strategy.id} value={strategy.id}>
                                    {strategy.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Linked Study
                        </label>
                        <select
                            name="studyId"
                            defaultValue={watchItem?.study_id || ''}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            aria-label="Linked Study"
                        >
                            <option value="">No study attached</option>
                            {studies.map((study) => (
                                <option key={study.id} value={study.id}>
                                    {study.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            rows={3}
                            placeholder="Why did you take this trade? What was your reasoning?"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-3 bg-long text-white rounded-lg font-medium hover:bg-long-dark transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging...' : 'Log Trade'}
                    </button>
                </div>
            </form>
        </div>
    );
}
