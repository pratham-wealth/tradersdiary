'use client';

import { useState } from 'react';
import { WatchItem } from './watch-card';
import { WatchList } from './watch-list';
import { AddWatchForm } from './add-watch-form';
import { Eye } from 'lucide-react';

// Assuming Strategy type is defined elsewhere or will be imported
interface Strategy {
    id: string;
    name: string;
}

interface WatchPageClientProps {
    initialWatchList: WatchItem[];
    strategies: Strategy[];
    studies?: any[]; // Using any for now to avoid circular dependency or import issues, or define Interface
}

export function WatchPageClient({ initialWatchList, strategies, studies = [] }: WatchPageClientProps) {
    const [watchList, setWatchList] = useState<WatchItem[]>(initialWatchList);
    const [editingItem, setEditingItem] = useState<WatchItem | null>(null);

    const handleDelete = async (id: string) => {
        // Optimistic update
        setWatchList(prev => prev.filter(item => item.id !== id));
        const { deleteWatchItem } = await import('@/app/dashboard/watch/actions');
        await deleteWatchItem(id);
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Header Grid: Stats + Add Button in one line */}
            <div className="grid grid-cols-4 gap-2">
                {/* Stat: Stocks */}
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2 flex flex-col items-center justify-center shadow-sm">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Stocks</span>
                    <span className="text-sm font-bold text-white">{watchList.length}</span>
                </div>

                {/* Stat: Longs */}
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2 flex flex-col items-center justify-center shadow-sm">
                    <span className="text-[9px] text-emerald-400/80 font-bold uppercase tracking-wider">Longs</span>
                    <span className="text-sm font-bold text-white">{watchList.filter(i => i.direction === 'LONG').length}</span>
                </div>

                {/* Stat: Shorts */}
                <div className="bg-slate-800 border border-white/5 rounded-lg p-2 flex flex-col items-center justify-center shadow-sm">
                    <span className="text-[9px] text-rose-400/80 font-bold uppercase tracking-wider">Shorts</span>
                    <span className="text-sm font-bold text-white">{watchList.filter(i => i.direction === 'SHORT').length}</span>
                </div>

                {/* Add Button */}
                <AddWatchForm
                    strategies={strategies}
                    studies={studies}
                    triggerClassName="w-full h-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1"
                />
            </div>

            {/* Edit Modal */}
            {editingItem && (
                <AddWatchForm
                    isOpen={true}
                    onClose={() => setEditingItem(null)}
                    id={editingItem.id}
                    strategies={strategies}
                    studies={studies}
                    initialValues={{
                        instrument: editingItem.instrument,
                        direction: editingItem.direction,
                        currentPrice: editingItem.current_price,
                        entryLevel: editingItem.entry_level ?? undefined,
                        stopLoss: editingItem.stop_loss ?? undefined,
                        targetPrice: editingItem.target_price ?? undefined,
                        breakoutLevel: editingItem.breakout_level ?? undefined,
                        supportLevel: editingItem.support_level ?? undefined,
                        resistanceLevel: editingItem.resistance_level ?? undefined,
                        notes: editingItem.notes ?? undefined,
                        strategyId: editingItem.strategy?.id,
                        studyId: (editingItem as any).study_id // Assuming ID is available
                    }}
                />
            )}

            {watchList.length === 0 ? (
                <div className="text-center py-12 bg-midnight-900/50 rounded-xl border border-midnight-800 border-dashed">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-midnight-800 mb-4">
                        <Eye className="w-6 h-6 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">No items on watch</h3>
                    <p className="text-slate-400">Add incomplete setups to track them here</p>
                </div>
            ) : (
                <WatchList items={watchList} onDelete={handleDelete} onEdit={setEditingItem} />
            )}
        </div>
    );
}
