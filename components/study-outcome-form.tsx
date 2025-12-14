'use client';

import { useState } from 'react';
import { FileText, CheckCircle, XCircle, MinusCircle, Save } from 'lucide-react';
import { updateStudyOutcome } from '@/app/dashboard/studies/actions';

interface StudyOutcomeFormProps {
    studyId: string;
    initialOutcome?: 'SUCCESS' | 'FAILURE' | 'NEUTRAL' | null;
    initialRemarks?: string | null;
}

export function StudyOutcomeForm({ studyId, initialOutcome, initialRemarks }: StudyOutcomeFormProps) {
    const [outcome, setOutcome] = useState<'SUCCESS' | 'FAILURE' | 'NEUTRAL' | null>(initialOutcome || null);
    const [remarks, setRemarks] = useState(initialRemarks || '');
    const [isEditing, setIsEditing] = useState(!initialOutcome && !initialRemarks);
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        if (!outcome && !remarks) return;
        setLoading(true);
        await updateStudyOutcome(studyId, outcome, remarks);
        setLoading(false);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div className="bg-midnight-950/50 border border-midnight-800 rounded-xl p-6 animate-in fade-in duration-200">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Enter Outcome & Remarks
                </h3>

                <div className="space-y-4">
                    {/* Outcome Selection */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Result</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setOutcome('SUCCESS')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${outcome === 'SUCCESS' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-midnight-900 border-midnight-700 text-slate-400 hover:bg-midnight-800'}`}
                            >
                                <CheckCircle className="w-4 h-4" />
                                Success
                            </button>
                            <button
                                onClick={() => setOutcome('FAILURE')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${outcome === 'FAILURE' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-midnight-900 border-midnight-700 text-slate-400 hover:bg-midnight-800'}`}
                            >
                                <XCircle className="w-4 h-4" />
                                Failure
                            </button>
                            <button
                                onClick={() => setOutcome('NEUTRAL')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${outcome === 'NEUTRAL' ? 'bg-slate-500/20 border-slate-500 text-slate-300' : 'bg-midnight-900 border-midnight-700 text-slate-400 hover:bg-midnight-800'}`}
                            >
                                <MinusCircle className="w-4 h-4" />
                                Neutral
                            </button>
                        </div>
                    </div>

                    {/* Remarks Textarea */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Detailed Remarks</label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="What happened? Did you follow existing rules? Lessons learned?"
                            rows={4}
                            className="w-full p-4 bg-midnight-900 border border-midnight-700 rounded-lg text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none text-sm leading-relaxed"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-2">
                        {(initialOutcome || initialRemarks) && (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <span className="animate-spin">⏳</span> : <Save className="w-4 h-4" />}
                            Save Outcome
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // View Mode
    return (
        <div className="bg-midnight-950/50 border border-midnight-800 rounded-xl p-6 group">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Trade Outcome & Remarks
                </h3>
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    Edit Outcome
                </button>
            </div>

            <div className="grid md:grid-cols-[200px,1fr] gap-6">
                <div>
                    <div className={`inline-flex flex-col items-center justify-center p-4 rounded-xl border w-full h-full min-h-[100px] ${outcome === 'SUCCESS' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                        outcome === 'FAILURE' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                            outcome === 'NEUTRAL' ? 'bg-slate-500/10 border-slate-500/30 text-slate-400' :
                                'bg-midnight-900 border-midnight-700 text-slate-500'
                        }`}>
                        {outcome === 'SUCCESS' ? <CheckCircle className="w-8 h-8 mb-2" /> :
                            outcome === 'FAILURE' ? <XCircle className="w-8 h-8 mb-2" /> :
                                outcome === 'NEUTRAL' ? <MinusCircle className="w-8 h-8 mb-2" /> :
                                    <div className="text-2xl mb-1">❓</div>}
                        <span className="font-bold text-lg">{outcome || 'Pending'}</span>
                    </div>
                </div>
                <div className="bg-midnight-900/50 rounded-xl p-4 border border-midnight-800/50">
                    {remarks ? (
                        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{remarks}</p>
                    ) : (
                        <p className="text-slate-600 italic text-sm">No detailed remarks added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
