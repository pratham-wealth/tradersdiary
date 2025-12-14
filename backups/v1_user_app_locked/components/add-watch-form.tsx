'use client';

import { useState } from 'react';
import { addWatchItem, updateWatchItem } from '@/app/dashboard/watch/actions';
import { X } from 'lucide-react';

// Update imports if needed
import { Strategy } from '@/components/strategy-card';

// Define minimal Study interface locally or import
interface Study {
    id: string;
    title: string;
}

export interface AddWatchFormProps {
    id?: string; // New prop for edit mode
    strategies?: Strategy[];
    studies?: Study[];
    initialValues?: {
        instrument?: string;
        direction?: string;
        currentPrice?: number;
        entryLevel?: number;
        stopLoss?: number;
        targetPrice?: number;
        breakoutLevel?: number;
        supportLevel?: number;
        resistanceLevel?: number;
        studyId?: string;
        strategyId?: string;
        notes?: string;
    } | null;
    isOpen?: boolean;
    onClose?: () => void;
    triggerClassName?: string;
    triggerLabel?: string;
}

export function AddWatchForm({ id, strategies = [], studies = [], initialValues, isOpen: controlledIsOpen, onClose, triggerClassName, triggerLabel }: AddWatchFormProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Use controlled state if provided, otherwise internal
    const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    function closeForm() {
        if (onClose) onClose();
        else setInternalIsOpen(false);
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        let result;
        if (id) {
            result = await updateWatchItem(id, formData);
        } else {
            result = await addWatchItem(formData);
        }

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            closeForm();
            setLoading(false);
        }
    }

    if (!isModalOpen) {
        // If controlled (isOpen provided), don't render the default trigger button
        if (controlledIsOpen !== undefined) return null;

        return (
            <button
                onClick={() => setInternalIsOpen(true)}
                className={triggerClassName || "w-full px-4 py-2 bg-long text-white rounded-lg font-medium hover:bg-long-dark transition-colors"}
            >
                {triggerLabel || "+ Add to List"}
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-midnight-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-midnight-700 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {initialValues ? 'Add Study to Watchlist' : 'Add Watch Item'}
                    </h3>
                    <button
                        onClick={closeForm}
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
                                defaultValue={initialValues?.instrument}
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
                                defaultValue={initialValues?.direction || "LONG"}
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                                aria-label="Direction"
                            >
                                <option value="LONG">LONG</option>
                                <option value="SHORT">SHORT</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Price *
                            </label>
                            <input
                                type="number"
                                name="currentPrice"
                                step="0.01"
                                required
                                defaultValue={initialValues?.currentPrice}
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                                aria-label="Current Price"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Entry Level
                            </label>
                            <input
                                type="number"
                                name="entryLevel"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                                aria-label="Entry Level"
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
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                                aria-label="Target Price"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Breakout Level
                            </label>
                            <input
                                type="number"
                                name="breakoutLevel"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                                aria-label="Breakout Level"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Strategy (The Playbook)
                            </label>
                            <select
                                name="strategyId"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                                aria-label="Select Strategy"
                            >
                                <option value="">Select a Strategy...</option>
                                {strategies.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* NEW: Attach Study */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Attach Detailed Study / Analysis
                            </label>
                            <select
                                name="studyId"
                                defaultValue={initialValues?.studyId || ""}
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                                aria-label="Select Study"
                            >
                                <option value="">No Study Attached</option>
                                {studies.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.title}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500 mt-1">
                                Link a detailed research note ("Study") to this watchlist item.
                            </p>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Quick Notes
                            </label>
                            <textarea
                                name="notes"
                                rows={2}
                                defaultValue={initialValues?.notes}
                                placeholder="Why are you watching this? e.g. Wait for 15-min candle close."
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Support Level
                            </label>
                            <input
                                type="number"
                                name="supportLevel"
                                step="0.01"
                                defaultValue={initialValues?.supportLevel}
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Resistance Level
                            </label>
                            <input
                                type="number"
                                name="resistanceLevel"
                                step="0.01"
                                defaultValue={initialValues?.resistanceLevel}
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="alertEnabled"
                                    className="rounded border-gray-300 text-long focus:ring-long"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Enable price alerts (coming soon)
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={closeForm}
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-long text-white rounded-lg font-medium hover:bg-long-dark transition-colors disabled:opacity-50"
                        >
                            {loading ? (id ? 'Updating...' : 'Adding...') : (id ? 'Update Watch Item' : 'Add to Watch')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
