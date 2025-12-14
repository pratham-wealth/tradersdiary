import { Suspense } from 'react';
import { getSettings } from './actions';
import { SettingsForm } from '@/components/settings-form';
import { Skeleton } from '@/components/ui/skeletons';

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="space-y-6 max-w-2xl mx-auto py-8">
            <div>
                <h2 className="text-2xl font-bold text-white">
                    Settings
                </h2>
                <p className="text-slate-400">
                    Configure your app preferences
                </p>
            </div>

            <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
                <SettingsForm initialSettings={settings} />
            </Suspense>
        </div>
    );
}
