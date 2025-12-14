'use client';

import { useState } from 'react';
import { LearningPattern } from '@/app/dashboard/learn/actions';
import { PatternCard } from '@/components/pattern-card';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PatternGroupAccordionProps {
    groupName: string;
    patterns: LearningPattern[];
    icon: React.ReactNode;
    isLocked?: boolean;
}

export function PatternGroupAccordion({ groupName, patterns, icon, isLocked = false }: PatternGroupAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (isLocked) return;
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-800/20">
            {/* Header / Trigger */}
            <button
                onClick={handleToggle}
                className={cn(
                    "w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-left",
                    isOpen && "bg-slate-800/50",
                    isLocked && "opacity-75 cursor-not-allowed hover:bg-transparent"
                )}
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-800 rounded-lg border border-white/5">
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">{groupName}</h2>
                        <p className="text-xs text-slate-400 mt-1">{patterns.length} Patterns</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isLocked ? (
                        <div className="flex items-center gap-2 px-3 py-1 bg-gold-400/10 border border-gold-400/20 rounded-full">
                            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">Premium</span>
                            <Lock className="w-3 h-3 text-gold-400" />
                        </div>
                    ) : (
                        isOpen ? (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        )
                    )}
                </div>
            </button>

            {/* Content (Accordion Body) */}
            {isOpen && (
                <div className="p-6 border-t border-white/5 bg-slate-900/20 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {patterns.map((pattern) => (
                            <div key={pattern.id} className="h-full">
                                <PatternCard pattern={pattern} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
