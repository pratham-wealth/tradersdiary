import { getWatchList } from './actions';
import { getStrategies } from '@/app/dashboard/strategies/actions';
import { getActiveStudies } from '@/app/dashboard/studies/actions';
import { WatchPageClient } from '@/components/watch-page-client';

export default async function WatchPage() {
    const result = await getWatchList();
    const watchList = result.data || [];

    const strategiesResult = await getStrategies();
    const strategies = strategiesResult || [];

    const studiesResult = await getActiveStudies();
    const activeStudies = studiesResult.data || [];

    return (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Watch List</h1>
                <p className="mt-1 text-sm text-slate-400">
                    Monitor potential setups and key levels
                </p>
            </div>

            <WatchPageClient
                initialWatchList={watchList}
                strategies={strategies}
                studies={activeStudies}
            />
        </div>
    );
}
