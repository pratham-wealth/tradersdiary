'use client';

import { useState } from 'react';
import { deleteStrategy, updateStrategy } from '@/app/dashboard/strategies/actions';
import { Trash2, Edit2, Check, X, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export interface Strategy {
    id: string;
    name: string;
    rules: string | null;
    timeframe?: string;
    risk_profile?: string;
    success_rate?: string;
    description?: string;
    required_parameters?: string;
    execution_method?: string;
    holding_period?: string;
    exclusions?: string;
    trading_guide?: string;
    is_active: boolean;
    created_at: string;
}

export function StrategyCard({ strategy }: { strategy: Strategy }) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    async function handleDelete() {
        if (!confirm('Are you sure? Unlike trades, this will not execute if linked trades exist.')) return;

        setLoading(true);
        const result = await deleteStrategy(strategy.id);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Strategy deleted');
        }
        setLoading(false);
    }

    async function handleUpdate(formData: FormData) {
        setLoading(true);
        const result = await updateStrategy(strategy.id, formData);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Strategy updated');
            setIsEditing(false);
        }
        setLoading(false);
    }

    // Risk-based styling
    const getRiskStyle = (risk?: string) => {
        switch (risk) {
            case 'Low': return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', icon: ShieldCheck };
            case 'Medium': return { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20', icon: ShieldCheck };
            case 'High': return { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20', icon: ShieldCheck };
            case 'Degen': return { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20', icon: ShieldCheck };
            default: return { bg: 'bg-slate-700/30', text: 'text-slate-400', border: 'border-slate-700/50', icon: ShieldCheck };
        }
    };

    const style = getRiskStyle(strategy.risk_profile);
    const Icon = style.icon;

    if (isEditing) {
        return (
            <div className="bg-slate-800/80 rounded-xl border border-white/10 p-4 shadow-lg mb-4">
                <form action={handleUpdate} className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Strategy Name</label>
                            <input
                                name="name"
                                defaultValue={strategy.name}
                                required
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-medium"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timeframe</label>
                            <textarea
                                name="timeframe"
                                defaultValue={strategy.timeframe || ''}
                                rows={2}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-medium resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Holding Period</label>
                            <textarea
                                name="holdingPeriod"
                                defaultValue={strategy.holding_period || ''}
                                rows={2}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-medium resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Profile</label>
                            <select
                                name="riskProfile"
                                defaultValue={strategy.risk_profile || ''}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-xs font-bold uppercase"
                            >
                                <option value="">Select...</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Degen">Degen</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Success Rate</label>
                            <select
                                name="successRate"
                                defaultValue={strategy.success_rate || ''}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-xs font-bold uppercase"
                            >
                                <option value="Medium">Select...</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                                <option value="Variable">Variable</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Summary</label>
                        <textarea
                            name="description"
                            defaultValue={strategy.description || ''}
                            rows={2}
                            className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-medium"
                        />
                    </div>

                    {/* Detailed Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Parameters</label>
                            <textarea
                                name="requiredParameters"
                                defaultValue={strategy.required_parameters || ''}
                                rows={3}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-mono leading-relaxed"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Execution Method</label>
                            <textarea
                                name="executionMethod"
                                defaultValue={strategy.execution_method || ''}
                                rows={3}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-mono leading-relaxed"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rules</label>
                            <textarea
                                name="rules"
                                defaultValue={strategy.rules || ''}
                                rows={3}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-mono leading-relaxed"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Exclusions</label>
                            <textarea
                                name="exclusions"
                                defaultValue={strategy.exclusions || ''}
                                rows={3}
                                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-mono leading-relaxed"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trading Guide</label>
                        <textarea
                            name="tradingGuide"
                            defaultValue={strategy.trading_guide || ''}
                            rows={3}
                            className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 text-sm font-mono leading-relaxed"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            value="true"
                            defaultChecked={strategy.is_active}
                            id={`active-${strategy.id}`}
                            className="rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                        />
                        <label htmlFor={`active-${strategy.id}`} className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Active Strategy
                        </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/20"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="group bg-slate-800/50 hover:bg-slate-800/80 border-b border-white/5 last:border-0 transition-all duration-200">
            {/* Header / Summary Row */}
            <div
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-4 p-4 cursor-pointer"
            >
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.text} border ${style.border} shadow-sm group-hover:shadow-md transition-all`}>
                    <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                            {strategy.name}
                        </h3>
                        {!strategy.is_active && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400 border border-white/5">
                                Inactive
                            </span>
                        )}
                    </div>
                    {/* Row 2: Risk & Success */}
                    <div className="flex items-center gap-2 mt-1">
                        {strategy.risk_profile && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                                {strategy.risk_profile} Risk
                            </span>
                        )}
                        {strategy.success_rate && (
                            <>
                                <span className="text-slate-600 text-[10px]">•</span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${strategy.success_rate === 'High' ? 'text-emerald-400' :
                                    strategy.success_rate === 'Low' ? 'text-slate-400' :
                                        'text-blue-400'
                                    }`}>
                                    Success: {strategy.success_rate}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Chevron */}
                <div className={`text-slate-500 transition-transform duration-300 ${expanded ? 'rotate-180 text-emerald-500' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Expanded Content */}
            {expanded && (
                <div className="px-4 pb-6 pl-[4.5rem] animate-in slide-in-from-top-2 duration-200 cursor-default">

                    <div className="space-y-6">
                        {/* 1. Quick Summary */}
                        {strategy.description && (
                            <div>
                                <h4 className="flex items-center gap-2 text-base font-bold text-white uppercase tracking-wide mb-2">
                                    <Check className="w-4 h-4 text-emerald-500" /> Quick Summary
                                </h4>
                                <div className="text-sm text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                                    {strategy.description}
                                </div>
                            </div>
                        )}

                        {/* 2. Timeframe */}
                        {strategy.timeframe && (
                            <div>
                                <h4 className="flex items-center gap-2 text-base font-bold text-white uppercase tracking-wide mb-2">
                                    <Check className="w-4 h-4 text-emerald-500" /> Timeframe
                                </h4>
                                <div className="text-sm text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                                    {strategy.timeframe}
                                </div>
                            </div>
                        )}

                        {/* 3. Holding Period */}
                        {strategy.holding_period && (
                            <div>
                                <h4 className="flex items-center gap-2 text-base font-bold text-white uppercase tracking-wide mb-2">
                                    <Check className="w-4 h-4 text-emerald-500" /> Holding Period
                                </h4>
                                <div className="text-sm text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                                    {strategy.holding_period}
                                </div>
                            </div>
                        )}

                        {/* 4. Parameters */}
                        {strategy.required_parameters && (
                            <div>
                                <h4 className="flex items-center gap-2 text-base font-bold text-white uppercase tracking-wide mb-2">
                                    <Check className="w-4 h-4 text-emerald-500" /> Required Parameters
                                </h4>
                                <div className="text-sm text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                                    {strategy.required_parameters}
                                </div>
                            </div>
                        )}

                        {/* 5. Execution Method */}
                        {strategy.execution_method && (
                            <div>
                                <h4 className="flex items-center gap-2 text-base font-bold text-white uppercase tracking-wide mb-2">
                                    <Check className="w-4 h-4 text-emerald-500" /> Execution Method
                                </h4>
                                <div className="text-sm text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                                    {strategy.execution_method}
                                </div>
                            </div>
                        )}

                        {/* 6. Special Sections (Colored) */}
                        <div className="space-y-6 pt-2">
                            {/* Rules - Green */}
                            {strategy.rules && (
                                <div className="bg-emerald-500/5 border-l-2 border-emerald-500/30 pl-4 py-3 rounded-r-lg">
                                    <h4 className="flex items-center gap-2 text-base font-bold text-emerald-500 uppercase tracking-wide mb-2">
                                        <Check className="w-4 h-4" /> Execution Rules & Checklist
                                    </h4>
                                    <div className="text-sm text-slate-200 whitespace-pre-wrap font-medium leading-relaxed">
                                        {strategy.rules}
                                    </div>
                                </div>
                            )}

                            {/* Exclusions - Red */}
                            {strategy.exclusions && (
                                <div className="bg-rose-500/5 border-l-2 border-rose-500/30 pl-4 py-3 rounded-r-lg">
                                    <h4 className="flex items-center gap-2 text-base font-bold text-rose-400 uppercase tracking-wide mb-2">
                                        <Check className="w-4 h-4" /> Exclusions (Avoid)
                                    </h4>
                                    <div className="text-sm text-slate-200 whitespace-pre-wrap font-medium leading-relaxed">
                                        {strategy.exclusions}
                                    </div>
                                </div>
                            )}

                            {/* Guide - Amber */}
                            {strategy.trading_guide && (
                                <div className="bg-amber-500/5 border-l-2 border-amber-500/30 pl-4 py-3 rounded-r-lg">
                                    <h4 className="flex items-center gap-2 text-base font-bold text-amber-400 uppercase tracking-wide mb-2">
                                        <Check className="w-4 h-4" /> Trading Guide / Mentality
                                    </h4>
                                    <div className="text-sm text-slate-200 whitespace-pre-wrap font-medium leading-relaxed">
                                        {strategy.trading_guide}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/5 text-xs font-bold text-slate-400 hover:text-white transition-all uppercase tracking-wider"
                        >
                            <Edit2 className="w-3 h-3" /> Edit Strategy
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/20 border border-white/5 text-xs font-bold text-slate-400 hover:text-rose-400 transition-all uppercase tracking-wider"
                        >
                            <Trash2 className="w-3 h-3" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
