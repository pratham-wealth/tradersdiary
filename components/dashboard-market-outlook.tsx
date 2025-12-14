'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import Link from 'next/link';

interface DashboardMarketOutlookProps {
    analysis: string | null;
}

export function DashboardMarketOutlook({ analysis }: DashboardMarketOutlookProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="card-midnight rounded-2xl overflow-hidden mt-6 transition-all duration-300 border border-white/5">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gold-400" />
                    <h3 className="font-bold text-gold-400 tracking-wide text-sm uppercase">Market Outlook</h3>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
            </button>

            {isExpanded && (
                <div className="p-6 border-t border-white/5 bg-midnight-900/30 animate-in slide-in-from-top-2 duration-200">
                    {analysis ? (
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap font-light text-sm">
                            {analysis}
                        </p>
                    ) : (
                        <p className="text-slate-500 italic text-sm">No market analysis added for today.</p>
                    )}
                    <div className="mt-4 pt-4 border-t border-midnight-700">
                        <Link href="/dashboard/diary" className="text-sm font-medium text-gold-400 hover:text-gold-300 flex items-center gap-1 group">
                            Edit Analysis
                            <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
