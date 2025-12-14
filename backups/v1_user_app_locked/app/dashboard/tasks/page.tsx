import { Suspense } from 'react';
import { getUpcomingTasks } from './actions';
import TasksPageClient from '@/components/tasks-page-client';

export default async function TasksPage() {
    const { data: tasks } = await getUpcomingTasks();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tasks & Planning</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your schedule and trading goals</p>
            </div>

            <Suspense fallback={<div>Loading tasks...</div>}>
                <TasksPageClient initialTasks={tasks || []} />
            </Suspense>
        </div>
    );
}
