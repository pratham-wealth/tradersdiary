'use client';

import { useState } from 'react';
import { Filter, Code, Trash2, Edit2, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { deleteScreener } from '@/app/dashboard/library/screeners/actions';

interface Screener {
    id: string;
    name: string;
    description: string;
    criteria: string[];
    code: string;
    success_rate: string;
}

interface ScreenerCardProps {
    screener: Screener;
    onEdit?: (screener: Screener) => void;
}

export function ScreenerCard({ screener, onEdit }: ScreenerCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        if (confirm('Are you sure you want to delete this screener?')) {
            setIsDeleting(true);
            await deleteScreener(screener.id);
            setIsDeleting(false);
        }
    }

    return (
        <div className="group bg-midnight-950/50 border border-midnight-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all shadow-lg hover:shadow-indigo-500/10 flex flex-col h-full relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full -mr-16 -mt-16 pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Filter className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">{screener.name}</h3>
                        <p className="text-slate-500 text-sm line-clamp-1">{screener.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(screener)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-midnight-800 rounded-lg transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-1.5 text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Success Rate Badge */}
            <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Trophy className="w-3 h-3" />
                    Success Rate: {screener.success_rate || 'N/A'}
                </div>
            </div>

            {/* Criteria List */}
            <div className="flex-1 space-y-3 mb-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Criteria</h4>
                <div className="space-y-2">
                    {screener.criteria && screener.criteria.length > 0 ? (
                        screener.criteria.slice(0, isExpanded ? undefined : 3).map((c, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>{c}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-600 italic text-sm">No criteria defined.</p>
                    )}
                    {screener.criteria && screener.criteria.length > 3 && !isExpanded && (
                        <p className="text-xs text-slate-500 italic">+ {screener.criteria.length - 3} more...</p>
                    )}
                </div>
            </div>

            {/* Code Snippet (Collapsible) */}
            {screener.code && (
                <div className="mt-auto pt-4 border-t border-midnight-800">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors w-full"
                    >
                        <Code className="w-3 h-3" />
                        {isExpanded ? 'Hide Code' : 'View Code'}
                        {isExpanded ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
                    </button>

                    {isExpanded && (
                        <div className="mt-3 bg-midnight-950 border border-midnight-900 rounded-lg p-3 overflow-x-auto">
                            <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed">
                                {screener.code}
                            </pre>
                        </div>
                    )}
                </div>
            )}

            {/* View Full Details expand toggler if no code but long list */}
            {(!screener.code && screener.criteria && screener.criteria.length > 3) && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors pt-4 border-t border-midnight-800"
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>
            )}

        </div>
    );
}
