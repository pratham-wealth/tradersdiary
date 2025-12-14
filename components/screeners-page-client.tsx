'use client';

import { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { ScreenerCard } from '@/components/screener-card';
import { AddScreenerForm } from '@/components/add-screener-form';

interface ScreenersPageClientProps {
    screeners: any[];
}

export function ScreenersPageClient({ screeners }: ScreenersPageClientProps) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingScreener, setEditingScreener] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredScreeners = screeners.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function handleEdit(screener: any) {
        setEditingScreener(screener);
        setIsAddOpen(true);
    }

    function handleClose() {
        setIsAddOpen(false);
        setEditingScreener(null);
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">
                    Fundamental Screeners
                </h1>
                <p className="text-sm text-slate-400">
                    Library of your stock selection criteria and algorithms.
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
                        placeholder="Search screeners..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider py-2 pl-9 pr-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-transparent transition-all placeholder:text-slate-600 shadow-sm"
                    />
                </div>

                {/* Add Button */}
                <button
                    onClick={() => setIsAddOpen(true)}
                    className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold uppercase tracking-wider text-xs shadow-lg shadow-purple-600/20 transition-all active:scale-95 border border-purple-500/20 whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    Add Screener
                </button>
            </div>

            {/* List */}
            {/* Note: Strategies used a divide-y list. Screeners were cards. 
                 If we want "Views Like Strategies", we should probably make it a stacked list. 
                 However, `ScreenerCard` was designed as a box. 
                 I'll wrap them in the same container style but keep the Cards for now, just stacked. */}
            <div className="space-y-4">
                {filteredScreeners.length > 0 ? (
                    filteredScreeners.map((screener) => (
                        <ScreenerCard
                            key={screener.id}
                            screener={screener}
                            onEdit={handleEdit}
                        />
                    ))
                ) : (
                    <div className="bg-slate-800/20 rounded-xl border border-white/5 p-12 text-center text-slate-500">
                        <Filter className="w-12 h-12 mb-4 opacity-50 mx-auto" />
                        <h3 className="text-lg font-bold text-white mb-2">No Screeners Found</h3>
                        <p className="max-w-md mx-auto mb-6 text-sm">Create your first fundamental screener to track your stock selection criteria.</p>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="px-4 py-2 text-purple-400 hover:text-purple-300 font-medium text-sm"
                        >
                            + Create New Screener
                        </button>
                    </div>
                )}
            </div>

            <AddScreenerForm
                isOpen={isAddOpen}
                onClose={handleClose}
                editingScreener={editingScreener}
            />
        </div>
    );
}
