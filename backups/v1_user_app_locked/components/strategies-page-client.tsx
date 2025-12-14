'use client';

import { useState } from 'react';
import { Strategy } from '@/components/strategy-card';
import { StrategyCard } from '@/components/strategy-card';
import { AddStrategyForm } from '@/components/add-strategy-form';
import { Search } from 'lucide-react';

interface StrategiesPageClientProps {
    strategies: Strategy[];
}

export function StrategiesPageClient({ strategies }: StrategiesPageClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStrategies = strategies.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rules?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">
                    Strategy Vault
                </h1>
                <p className="text-sm text-slate-400">
                    Your playbook needed for execution.
                </p>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center gap-3 w-full">
                {/* Search */}
                <div className="relative flex-1 min-w-0">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search strategies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider py-2 pl-9 pr-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-transparent transition-all placeholder:text-slate-600 shadow-sm"
                    />
                </div>

                {/* Add Button */}
                <AddStrategyForm
                    triggerClassName="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 border border-emerald-400/20 whitespace-nowrap"
                />
            </div>

            {/* Strategy List */}
            <div className="bg-slate-800/20 rounded-xl border border-white/5 overflow-hidden">
                {filteredStrategies.length > 0 ? (
                    <div className="divide-y divide-white/5">
                        {filteredStrategies.map((strategy) => (
                            <StrategyCard key={strategy.id} strategy={strategy} />
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-500">
                        <p className="text-sm italic">No strategies found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
