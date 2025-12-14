import { Suspense } from 'react';
import { getProfile } from './actions';
import { ProfileForm } from '@/components/profile-form';
import { Skeleton } from '@/components/ui/skeletons';

export default async function ProfilePage() {
    const profile = await getProfile();

    return (
        <div className="space-y-6 max-w-2xl mx-auto py-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Profile
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your account information
                </p>
            </div>

            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <ProfileForm initialProfile={profile} />
            </Suspense>
        </div>
    );
}
