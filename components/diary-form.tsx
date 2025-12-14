'use client';

import { useState } from 'react';
import { updateDiary } from '@/app/dashboard/actions';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface DiaryFormProps {
    initialData: {
        market_analysis: string;
        notes: string;
        mood?: string | null;
    };
}

export function DiaryForm({ initialData }: DiaryFormProps) {
    const [isSaving, setIsSaving] = useState(false);

    // We use a form action directly or handle onSubmit
    async function handleSubmit(formData: FormData) {
        setIsSaving(true);
        const result = await updateDiary(formData);
        setIsSaving(false);

        if (result?.error) {
            toast.error('Failed to save diary');
        } else {
            toast.success('Diary saved successfully');
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Market Analysis */}
                <div className="space-y-2">
                    <label htmlFor="marketAnalysis" className="block text-sm font-medium text-slate-400">
                        Market Analysis & Outlook
                    </label>
                    <textarea
                        id="marketAnalysis"
                        name="marketAnalysis"
                        defaultValue={initialData.market_analysis}
                        className="w-full h-64 p-4 bg-midnight-950 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                        placeholder="What is your bias today? Key levels to watch? News events?"
                    />
                </div>

                {/* Notes & thoughts */}
                <div className="space-y-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-slate-400">
                        Daily Notes & Thoughts
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        defaultValue={initialData.notes}
                        className="w-full h-64 p-4 bg-midnight-950 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                        placeholder="Psychology check. Lessons learned. Random thoughts."
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-lg font-bold transition-colors disabled:opacity-50 shadow-lg shadow-gold-400/20"
                >
                    <Save className="w-5 h-5" />
                    {isSaving ? 'Saving...' : 'Save Entry'}
                </button>
            </div>
        </form>
    );
}
