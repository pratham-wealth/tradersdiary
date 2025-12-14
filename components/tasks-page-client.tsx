'use client';

import { useState } from 'react';
import { addTask, toggleTask, type TodoItem } from '@/app/dashboard/tasks/actions';
import { CalendarIcon, Plus, CheckCircle2, Circle, Clock } from 'lucide-react';

interface TasksPageClientProps {
    initialTasks: {
        entry_date: string;
        things_to_do: TodoItem[];
    }[];
}

export default function TasksPageClient({ initialTasks }: TasksPageClientProps) {
    const [isLoading, setIsLoading] = useState(false);
    // Use simple date string YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);

    async function handleAddTask(formData: FormData) {
        setIsLoading(true);
        await addTask(formData);
        setIsLoading(false);
        // Reset form or show success toast (optional)
        const form = document.getElementById('add-task-form') as HTMLFormElement;
        if (form) form.reset();
        // Reset date to selected
        if (form) {
            const dateInput = form.elements.namedItem('date') as HTMLInputElement;
            if (dateInput) dateInput.value = selectedDate;
        }
    }

    async function handleToggle(date: string, index: number, currentStatus: boolean) {
        await toggleTask(date, index, !currentStatus);
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Add Task Form */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="card-midnight p-6 sticky top-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-gold-400" />
                            Add New Task
                        </h3>
                        <form id="add-task-form" action={handleAddTask} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full pl-10 p-3 bg-midnight-950 border border-midnight-700 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all text-white placeholder-slate-600"
                                        required
                                    />
                                    <CalendarIcon className="w-5 h-5 text-gold-500/50 absolute left-3 top-3.5" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Task Description
                                </label>
                                <textarea
                                    name="task"
                                    placeholder="What needs to be done?"
                                    className="w-full p-3 bg-midnight-950 border border-midnight-700 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all min-h-[100px] resize-none text-white placeholder-slate-600"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-gold-400 hover:bg-gold-300 text-midnight-950 rounded-xl font-bold transition-all shadow-lg shadow-gold-400/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Adding...' : 'Add to Schedule'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Task List */}
                <div className="w-full md:w-2/3 space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Upcoming Schedule</h2>

                    {initialTasks.length === 0 ? (
                        <div className="text-center py-12 bg-midnight-900/50 rounded-2xl border-dashed border-2 border-midnight-700">
                            <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                            <p className="text-slate-400 font-medium">No upcoming tasks scheduled.</p>
                            <p className="text-sm text-slate-500">Add a task to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {initialTasks.map((entry) => (
                                <div key={entry.entry_date} className="bg-midnight-900 rounded-2xl border border-midnight-700 shadow-xl overflow-hidden">
                                    <div className="px-6 py-3 bg-midnight-950 border-b border-midnight-700 flex items-center justify-between">
                                        <h4 className="font-bold text-gold-100">
                                            {new Date(entry.entry_date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                        </h4>
                                        {entry.entry_date === today && (
                                            <span className="px-2 py-1 bg-gold-400/10 text-gold-400 border border-gold-400/20 text-xs font-bold rounded uppercase tracking-wide">
                                                Today
                                            </span>
                                        )}
                                    </div>
                                    <div className="divide-y divide-midnight-800">
                                        {entry.things_to_do?.map((todo: TodoItem, index: number) => (
                                            <div key={index} className="p-4 flex items-start gap-4 hover:bg-midnight-800/50 transition-colors group">
                                                <button
                                                    onClick={() => handleToggle(entry.entry_date, index, todo.completed)}
                                                    className={`mt-0.5 flex-shrink-0 transition-colors ${todo.completed ? 'text-emerald-400' : 'text-slate-600 hover:text-gold-400'}`}
                                                >
                                                    {todo.completed ? (
                                                        <CheckCircle2 className="w-6 h-6" />
                                                    ) : (
                                                        <Circle className="w-6 h-6" />
                                                    )}
                                                </button>
                                                <div className="flex-1">
                                                    <p className={`text-sm transition-all ${todo.completed ? 'line-through text-slate-600' : 'text-slate-300'}`}>
                                                        {todo.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
