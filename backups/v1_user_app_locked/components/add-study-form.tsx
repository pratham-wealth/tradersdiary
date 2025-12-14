'use client';

import { useState } from 'react';
import { createStudy } from '@/app/dashboard/studies/actions';
import { X } from 'lucide-react';
import { ImageUpload } from './image-upload';
import { Strategy } from './strategy-card';

interface AddStudyFormProps {
    strategies: Strategy[];
    triggerClassName?: string;
    triggerLabel?: string;
}

export function AddStudyForm({ strategies, triggerClassName, triggerLabel }: AddStudyFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        // Add images to form data
        formData.append('images', JSON.stringify(images));

        const result = await createStudy(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setIsOpen(false);
            setLoading(false);
            setImages([]); // Reset images
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={triggerClassName || "w-full md:w-auto px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 border border-emerald-400/20"}
            >
                {triggerLabel || "+ Create New Study"}
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-midnight-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-midnight-700 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Create Study
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Stock Name *
                            </label>
                            <input
                                type="text"
                                name="instrument"
                                required
                                placeholder="e.g. HCL Technologies"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                step="0.05"
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Direction
                            </label>
                            <select
                                name="direction"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            >
                                <option value="NEUTRAL">Neutral</option>
                                <option value="LONG">Long (Buy)</option>
                                <option value="SHORT">Short (Sell)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Probability
                            </label>
                            <select
                                name="probability"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            >
                                <option value="">Select...</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                                <option value="RISKY">Risky</option>
                                <option value="WATCH_ONLY">Watch Only</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Strategy (Optional)
                            </label>
                            <select
                                name="strategyId"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                            >
                                <option value="">Select a Strategy...</option>
                                {strategies.map((strategy) => (
                                    <option key={strategy.id} value={strategy.id}>
                                        {strategy.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Study Headline *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="e.g., Golden Crossover Analysis"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category *
                        </label>
                        <select
                            name="studyType"
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                        >
                            <option value="MARKET_ANALYSIS">Market Analysis</option>
                            <option value="CHART_PATTERN">Chart Pattern</option>
                            <option value="TECHNICAL_SETUP">Technical Setup</option>
                            <option value="FUNDAMENTAL_ANALYSIS">Fundamental Analysis</option>
                            <option value="STOCK_ANALYSIS">Stock Analysis</option>
                            <option value="NEWS_IMPACT">News Impact</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Analysis / Notes *
                        </label>
                        <textarea
                            name="content"
                            required
                            rows={8}
                            placeholder="Describe technicals, moving averages, etc."
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Images (Max 5)
                        </label>
                        <ImageUpload
                            onImagesChange={setImages}
                            existingImages={images}
                            maxImages={5}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="e.g., nifty, breakout, bullish"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Strategy name will be auto-added to tags if selected.
                        </p>
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
                            {loading ? 'Creating...' : 'Create Study'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
