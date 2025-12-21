'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Target } from 'lucide-react';
import DashboardFocusList from './dashboard-focus-list';
import Link from 'next/link';

interface TodoItem {
    text: string;
    completed: boolean;
}

interface DashboardTodaysFocusProps {
    initialTasks: TodoItem[];
    date: string;
}

export function DashboardTodaysFocus({ initialTasks, date }: DashboardTodaysFocusProps) {
    const [isExpanded, setIsExpanded] = useState(true); // Default expanded

    return (
        <div className="bg-midnight-900/50 border border-midnight-800 rounded-xl shadow-xl relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-gold-400/10 transition-colors pointer-events-none"></div>

            {/* Header - Clickable */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors relative z-10"
            >
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-gold-500/10 rounded-lg">
                        <Target className="w-4 h-4 text-gold-400" />
                    </div>
                    <h3 className="font-bold text-lg text-white">Today's Focus</h3>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/diary"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm font-medium text-gold-400 hover:text-gold-300"
                    >
                        Manage Plan →
                    </Link>
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                </div>
            </button>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="px-4 pb-4 relative z-10">
                    <DashboardFocusList
                        initialTasks={initialTasks}
                        date={date}
                    />
                </div>
            )}
        </div>
    );
}
