'use client';

import { useState } from 'react';
import { updateStudy } from '@/app/dashboard/studies/actions';
import { X, Edit2 } from 'lucide-react';
import { ImageUpload } from './image-upload';
import { Strategy } from './strategy-card';
import { useRouter } from 'next/navigation';

interface EditStudyFormProps {
    study: any; // We can improve typing later
    strategies: Strategy[];
}

export function EditStudyForm({ study, strategies }: EditStudyFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>(study.images || []);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        // Add images to form data
        formData.append('images', JSON.stringify(images));

        const result = await updateStudy(study.id, formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setIsOpen(false);
            setLoading(false);
            router.refresh();
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-midnight-800 hover:bg-midnight-700 text-slate-300 rounded-lg transition-colors border border-midnight-700"
            >
                <Edit2 className="w-4 h-4" />
                Edit Study
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-midnight-950 border border-midnight-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">
                            Edit Study
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                            <p className="text-sm text-rose-400">{error}</p>
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Stock Name
                                </label>
                                <input
                                    type="text"
                                    name="instrument"
                                    defaultValue={study.instrument}
                                    required
                                    className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Current Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    step="0.05"
                                    defaultValue={study.price}
                                    className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Direction
                                </label>
                                <select
                                    name="direction"
                                    defaultValue={study.direction || 'NEUTRAL'}
                                    className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none appearance-none"
                                >
                                    <option value="NEUTRAL">Neutral</option>
                                    <option value="LONG">Long (Buy)</option>
                                    <option value="SHORT">Short (Sell)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Probability
                                </label>
                                <select
                                    name="probability"
                                    defaultValue={study.probability || ''}
                                    className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none appearance-none"
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
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Strategy (Optional)
                                </label>
                                <select
                                    name="strategyId"
                                    defaultValue={study.strategy_id || ''}
                                    className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none appearance-none"
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
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                Headline
                            </label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={study.title}
                                required
                                className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                Analysis / Content
                            </label>
                            <textarea
                                name="content"
                                defaultValue={study.content}
                                required
                                rows={8}
                                className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                Images (Max 5)
                            </label>
                            <ImageUpload
                                onImagesChange={setImages}
                                existingImages={images}
                                maxImages={5}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                Tags (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                defaultValue={study.tags?.join(', ')}
                                className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 px-4 py-3 border border-midnight-700 text-slate-300 rounded-lg font-bold hover:bg-midnight-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-gold-400 text-midnight-950 rounded-lg font-bold hover:bg-gold-500 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
