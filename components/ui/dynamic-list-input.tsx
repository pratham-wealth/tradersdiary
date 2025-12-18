'use client';

import { useState, useEffect } from 'react';
import { Plus, X, GripVertical } from 'lucide-react';

interface DynamicListInputProps {
    defaultValue?: string; // Newline separated string
    name: string;
    placeholder?: string;
    label?: string;
}

export function DynamicListInput({ defaultValue = '', name, placeholder = 'Enter item...', label }: DynamicListInputProps) {
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        if (defaultValue) {
            setItems(defaultValue.split('\n'));
        }
    }, [defaultValue]);

    const handleAdd = () => {
        setItems([...items, '']);
    };

    const handleRemove = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    return (
        <div className="space-y-3">
            {label && <label className="block text-xs font-medium text-slate-400">{label}</label>}

            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                        <GripVertical className="w-4 h-4 text-slate-600 cursor-grab" />
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors font-medium px-2 py-1"
            >
                <Plus className="w-4 h-4" />
                Add Item
            </button>

            {/* Hidden Input for Form Submission */}
            <input type="hidden" name={name} value={items.join('\n')} />
        </div>
    );
}
