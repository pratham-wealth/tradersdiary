import { getAllPatterns } from '@/app/dashboard/admin/actions';
import { AdminPatternsClient } from '@/components/admin/admin-patterns-client';

export default async function AdminPatternsPage() {
    const { patterns, error } = await getAllPatterns();

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return <AdminPatternsClient patterns={patterns || []} />;
}
