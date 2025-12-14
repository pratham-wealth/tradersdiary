'use client';

import { useState } from 'react';
import { X, Filter, Save, Code, Trophy, List } from 'lucide-react';
import { createScreener, updateScreener } from '@/app/dashboard/library/screeners/actions';
import { useRouter } from 'next/navigation';

interface AddScreenerFormProps {
    isOpen: boolean;
    onClose: () => void;
    editingScreener?: any; // Pass this if editing
}

export function AddScreenerForm({ isOpen, onClose, editingScreener }: AddScreenerFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        let result;

        if (editingScreener) {
            result = await updateScreener(editingScreener.id, formData);
        } else {
            result = await createScreener(formData);
        }

        if (result?.error) {
            alert(result.error);
        } else {
            onClose();
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-midnight-950 border border-midnight-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <form action={handleSubmit} className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Filter className="w-5 h-5 text-indigo-400" />
                            {editingScreener ? 'Edit Screener' : 'Add New Screener'}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Name & Rate Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">Screener Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingScreener?.name}
                                    required
                                    placeholder="e.g. Magic Formula"
                                    className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                                    <Trophy className="w-3 h-3" /> Likely Success Ratio
                                </label>
                                <input
                                    type="text"
                                    name="successRate"
                                    defaultValue={editingScreener?.success_rate}
                                    placeholder="e.g. 70-80%"
                                    className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        {/* Quick Summary */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Quick Summary</label>
                            <input
                                type="text"
                                name="description"
                                defaultValue={editingScreener?.description}
                                placeholder="Brief description of what this scans for..."
                                className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Criteria */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                                <List className="w-3 h-3" /> Criteria's Used (One per line)
                            </label>
                            <textarea
                                name="criteria"
                                defaultValue={editingScreener?.criteria?.join('\n')}
                                rows={5}
                                placeholder="- ROE > 15%&#10;- Debt to Equity < 0.5&#10;- PE Ratio < 20"
                                className="w-full p-3 bg-midnight-900 border border-midnight-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono text-sm"
                            />
                        </div>

                        {/* Code */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                                <Code className="w-3 h-3" /> Screener Code
                            </label>
                            <textarea
                                name="code"
                                defaultValue={editingScreener?.code}
                                rows={6}
                                placeholder="Paste your Pine Script, Python, or proprietary screener code here..."
                                className="w-full p-3 bg-midnight-950 border border-midnight-700 rounded-lg text-emerald-400 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 border border-midnight-700 text-slate-300 rounded-lg font-bold hover:bg-midnight-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Saving...' : <><Save className="w-4 h-4" /> Save Screener</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
