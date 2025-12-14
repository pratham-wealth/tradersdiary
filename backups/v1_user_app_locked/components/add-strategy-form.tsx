'use client';

import { useState } from 'react';
import { createStrategy } from '@/app/dashboard/strategies/actions';
import { Plus, X, ListChecks } from 'lucide-react';
import { toast } from 'sonner';

interface AddStrategyFormProps {
    triggerClassName?: string;
}

export function AddStrategyForm({ triggerClassName }: AddStrategyFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await createStrategy(formData);

        if (result?.error) {
            toast.error(result.error);
            setLoading(false);
        } else {
            toast.success('Strategy created successfully');
            setIsOpen(false);
            setLoading(false);
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={triggerClassName || "flex items-center gap-2 px-4 py-2 bg-long text-white rounded-lg hover:bg-green-600 transition-colors"}
            >
                <Plus className="w-4 h-4" />
                {triggerClassName ? "New Strategy" : "New Strategy"}
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-long" />
                        Add New Strategy
                    </h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        title="Close Form"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form action={handleSubmit} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Strategy Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="e.g., Gap Up Reversal"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Timeframe
                            </label>
                            <select
                                name="timeframe"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            >
                                <option value="">Select...</option>
                                <option value="Intraday">Intraday (1m-15m)</option>
                                <option value="Swing">Swing (1h-Daily)</option>
                                <option value="Positional">Positional (Weekly+)</option>
                                <option value="Scalping">Scalping (Sec-1m)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Holding Period
                            </label>
                            <input
                                name="holdingPeriod"
                                type="text"
                                placeholder="e.g., 2-5 Days"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Risk Profile
                            </label>
                            <select
                                name="riskProfile"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            >
                                <option value="">Select...</option>
                                <option value="Low">Low Risk</option>
                                <option value="Medium">Medium Risk</option>
                                <option value="High">High Risk</option>
                                <option value="Degen">Degen (Very High)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Success Rate (Est.)
                            </label>
                            <select
                                name="successRate"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            >
                                <option value="Medium">Select...</option>
                                <option value="High">High (~70%+)</option>
                                <option value="Medium">Medium (~50-70%)</option>
                                <option value="Low">Low (&lt;50%)</option>
                                <option value="Variable">Variable</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Quick Summary / Description
                        </label>
                        <textarea
                            name="description"
                            rows={2}
                            placeholder="Briefly describe the core concept..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                        />
                    </div>

                    {/* Detailed Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Required Parameters
                            </label>
                            <textarea
                                name="requiredParameters"
                                rows={3}
                                placeholder="Indicators, moving averages, etc."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Execution Method
                            </label>
                            <textarea
                                name="executionMethod"
                                rows={3}
                                placeholder="Limit orders, market execution..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Rules & Checklist
                            </label>
                            <textarea
                                name="rules"
                                rows={3}
                                placeholder="Step-by-step entry rules..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Exclusions / Avoid When
                            </label>
                            <textarea
                                name="exclusions"
                                rows={3}
                                placeholder="News events, low volume..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Trading Guide / Mentality
                        </label>
                        <textarea
                            name="tradingGuide"
                            rows={3}
                            placeholder="Psychology tips, when to be aggressive..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-long/20"
                        />
                    </div>

                    <div className="flex gap-3 pt-2 sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-2 -mx-4 -mb-4">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-long text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Strategy'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
