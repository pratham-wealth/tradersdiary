'use client';

import { useState, useCallback } from 'react';
import { Plus, X, Check, Trash2, Calendar } from 'lucide-react';
import { updateThingsToDo } from '../app/dashboard/actions';
import { toast } from 'sonner';

// Define the type for a todo item
interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

export function ThingsToDo({ initialTodos = [] }: { initialTodos: TodoItem[] }) {
    const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
    const [newTodo, setNewTodo] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Debounced save function
    const saveTodos = useCallback(async (updatedTodos: TodoItem[]) => {
        setIsSaving(true);
        const result = await updateThingsToDo(updatedTodos);
        setIsSaving(false);
        if (result?.error) {
            toast.error('Failed to save todo');
            // Revert state if needed in advanced implementation
        }
    }, []);

    const addTask = () => {
        if (!newTodo.trim()) return;

        const updatedTodos = [...todos, { id: Date.now().toString(), text: newTodo, completed: false }];
        setTodos(updatedTodos);
        setNewTodo('');
        saveTodos(updatedTodos);
    };

    const toggleTask = (index: number) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    const deleteTask = (index: number) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Add a task..."
                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-long focus:border-transparent"
                />
                <button
                    onClick={addTask}
                    className="px-3 py-2 bg-long text-white rounded-lg hover:bg-long-dark transition-colors flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add</span>
                </button>
            </div>

            <ul className="space-y-2">
                {todos.map((todo, index) => (
                    <li key={todo.id || index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg group">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleTask(index)}
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${todo.completed
                                    ? 'bg-long border-long text-white'
                                    : 'border-gray-400 dark:border-gray-600 hover:border-long'
                                    }`}
                            >
                                {todo.completed && <Check className="w-3 h-3" />}
                            </button>
                            <span className={`text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                                {todo.text}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteTask(index)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </li>
                ))}
                {todos.length === 0 && (
                    <li className="text-center text-xs text-gray-400 py-2">No tasks for today yet.</li>
                )}
            </ul>
        </div>
    );
}
