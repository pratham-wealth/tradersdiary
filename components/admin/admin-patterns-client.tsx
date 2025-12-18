'use client';

import { useState } from 'react';
import { AddPatternModal, PatternInitialValues } from '@/components/add-pattern-modal';
import { PatternActions } from '@/components/admin/content-actions';
import { BarChart2, Flame, Plus } from 'lucide-react';
import Image from 'next/image';

interface Pattern {
    id: string;
    type: 'CHART' | 'CANDLESTICK';
    group_name: string;
    name: string;
    description: string;
    understanding: string;
    trading_rules: string;
    success_ratio: string | number;
    video_url: string | null;
    image_url: string | null;
    is_premium: boolean;
    created_at: string;
    // New Fields
    market_context?: string;
    invalidation_conditions?: string;
    timeframe_suitability?: string;
    volume_confirmation?: string;
    difficulty_level?: string;
}

interface AdminPatternsClientProps {
    patterns: Pattern[];
}

export function AdminPatternsClient({ patterns }: AdminPatternsClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPattern, setEditingPattern] = useState<PatternInitialValues | undefined>(undefined);

    const handleEdit = (pattern: any) => {
        setEditingPattern({
            id: pattern.id,
            type: pattern.type,
            groupName: pattern.group_name,
            name: pattern.name,
            description: pattern.description,
            understanding: pattern.understanding,
            tradingRules: pattern.trading_rules, // Corrected
            successRatio: String(pattern.success_ratio),
            videoUrl: pattern.video_url,
            imageUrl: pattern.image_url,
            isPremium: pattern.is_premium,
            marketContext: pattern.market_context,
            invalidationConditions: pattern.invalidation_conditions,
            timeframeSuitability: pattern.timeframe_suitability,
            volumeConfirmation: pattern.volume_confirmation,
            difficultyLevel: pattern.difficulty_level
        });
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingPattern(undefined);
        setIsModalOpen(true);
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Pattern Library</h2>
                    <p className="text-slate-400">Create new Chart and Candlestick learning modules.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-gold-400" />
                            Pattern Library ({patterns?.length || 0})
                        </h3>
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                        >
                            <Plus className="w-5 h-5" />
                            Create Pattern
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {patterns?.map((pattern: any) => (
                            <div key={pattern.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col gap-4 hover:border-slate-600 transition-colors group">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 bg-slate-800 rounded-lg flex-shrink-0 relative overflow-hidden border border-white/5">
                                        {pattern.image_url ? (
                                            <Image
                                                src={pattern.image_url}
                                                alt={pattern.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                {pattern.type === 'CANDLESTICK' ?
                                                    <Flame className="w-8 h-8 text-slate-600" /> :
                                                    <BarChart2 className="w-8 h-8 text-slate-600" />
                                                }
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <h4 className="font-bold text-slate-200 truncate pr-2">{pattern.name}</h4>
                                        </div>
                                        <p className="text-xs text-slate-400 mb-2 truncate">{pattern.group_name}</p>

                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] px-2 py-0.5 rounded border ${pattern.type === 'CANDLESTICK'
                                                ? 'bg-red-900/50 text-red-300 border-red-500/20'
                                                : 'bg-blue-900/50 text-blue-300 border-blue-500/20'
                                                }`}>
                                                {pattern.type}
                                            </span>
                                            {pattern.is_premium && (
                                                <span className="text-[10px] bg-amber-900/50 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
                                                    PREMIUM
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions area */}
                                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                                    <button
                                        onClick={() => handleEdit(pattern)}
                                        className="text-xs text-gold-400 hover:text-gold-300 font-medium"
                                    >
                                        Edit Module
                                    </button>
                                    <div className="scale-75 origin-right">
                                        <PatternActions patternId={pattern.id} name={pattern.name} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!patterns || patterns.length === 0) && (
                            <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-700 rounded-xl">
                                <p className="text-slate-400">No patterns found regarding your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <AddPatternModal
                    onClose={() => setIsModalOpen(false)}
                    initialValues={editingPattern}
                />
            )}
        </div>
    );
}
