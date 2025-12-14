import { getPatternsByType } from '../actions';
import { PatternGroupAccordion } from '@/components/pattern-group-accordion';
import { Flame, Lock } from 'lucide-react';

export default async function CandlestickPatternsPage() {
    const groupedPatterns = await getPatternsByType('CANDLESTICK');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        Candlestick Patterns
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-400/10 text-red-400 border border-red-400/20 uppercase tracking-widest">
                            Premium Library
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm">Understand market psychology through single and multi-candle formations.</p>
                </div>
                {/* Locked Indicator */}
                <div className="p-2 bg-slate-800 rounded-full border border-white/5">
                    <Lock className="w-5 h-5 text-slate-500" />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {Object.entries(groupedPatterns).map(([group, patterns]) => (
                    <PatternGroupAccordion
                        key={group}
                        groupName={group}
                        patterns={patterns}
                        icon={<Flame className="w-5 h-5 text-red-400" />}
                        isLocked={true}
                    />
                ))}

                {Object.keys(groupedPatterns).length === 0 && (
                    <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-white/5 border-dashed">
                        <p className="text-slate-500">No candlestick patterns found in the library explicitly yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
