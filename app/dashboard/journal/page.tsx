import { Suspense } from 'react';
import { getTrades, getStrategies } from '@/app/dashboard/journal/actions';
import { getStudies } from '@/app/dashboard/studies/actions';
import JournalPageClient from '@/components/journal-page-client';
import { TradeCardSkeleton } from '@/components/ui/skeletons';

import { createClient } from '@/lib/supabase/server';

export default async function JournalPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const supabase = await createClient();
    const { watchItemId } = await searchParams;

    const [tradesResult, strategiesResult, studiesResult] = await Promise.all([
        getTrades(),
        getStrategies(),
        getStudies('all')
    ]);

    // Extract data from the result objects
    const trades = tradesResult.data || [];
    const strategies = strategiesResult.data || [];
    const studies = studiesResult.data || [];

    let initialWatchItem = undefined;

    if (watchItemId) {
        try {
            const { data: watchItem, error } = await supabase
                .from('watch_list')
                .select('*')
                .eq('id', watchItemId)
                .single();

            if (watchItem && !error) {
                initialWatchItem = {
                    instrument: watchItem.instrument,
                    direction: watchItem.direction,
                    entry_level: watchItem.entry_level,
                    stop_loss: watchItem.stop_loss,
                    target_price: watchItem.target_price,
                    strategy_id: watchItem.strategy_id,
                    study_id: watchItem.study_id,
                };
            }
        } catch (error) {
            console.error('Error fetching watch item:', error);
            // Fail silently and load journal without pre-fill
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Trade Journal</h1>
                <p className="mt-1 text-sm text-slate-400">
                    Log, track, and analyze your trading journey
                </p>
            </div>

            <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <TradeCardSkeleton key={i} />
                    ))}
                </div>
            }>
                <JournalPageClient
                    initialTrades={trades || []}
                    strategies={strategies || []}
                    studies={studies || []}
                    initialWatchItem={initialWatchItem}
                />
            </Suspense>
        </div>
    );
}
