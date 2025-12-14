'use client';

import { useState } from 'react';
import { toggleTask } from '@/app/dashboard/tasks/actions';
import { CheckCircle2, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TodoItem {
    text: string;
    completed: boolean;
}

interface DashboardFocusListProps {
    initialTasks: TodoItem[];
    date: string;
}

export default function DashboardFocusList({ initialTasks, date }: DashboardFocusListProps) {
    const [tasks, setTasks] = useState<TodoItem[]>(initialTasks);
    const router = useRouter();

    async function handleToggle(index: number, currentStatus: boolean) {
        // Optimistic update: Remove from list immediately if marking complete
        if (!currentStatus) {
            // Marking as complete -> Remove from view
            setTasks(prev => prev.filter((_, i) => i !== index));
        } else {
            // Marking as incomplete (unlikely in this view, but handled)
            setTasks(prev => prev.map((t, i) => i === index ? { ...t, completed: !currentStatus } : t));
        }

        // Server action
        await toggleTask(date, index, !currentStatus);

        // Refresh to ensure sync
        router.refresh();
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-slate-500 italic text-center py-4">
                No focus items set.
            </div>
        );
    }

    // Filter out completed tasks just in case they were passed in
    const visibleTasks = tasks.map((task, index) => ({ ...task, originalIndex: index }))
        .filter(t => !t.completed);

    if (visibleTasks.length === 0) {
        return (
            <div className="text-slate-500 italic text-center py-4">
                All tasks completed! Great job. 🎉
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
            {visibleTasks.map((todo) => (
                <li key={todo.originalIndex} className="flex items-start gap-3 p-3 bg-midnight-950/50 rounded-lg border border-midnight-800 group hover:border-gold-400/30 transition-colors cursor-pointer"
                    onClick={() => handleToggle(todo.originalIndex, todo.completed)}
                >
                    <button
                        className="mt-1 w-5 h-5 rounded border border-slate-600 flex items-center justify-center transition-colors shrink-0 group-hover:border-gold-400 text-transparent group-hover:text-gold-400/50"
                    >
                        <div className="w-2.5 h-2.5 bg-currentColor rounded-sm" />
                    </button>
                    <span className="text-sm opacity-100 text-slate-200 group-hover:text-white transition-colors">
                        {todo.text}
                    </span>
                </li>
            ))}
        </ul>
    );
}
