
'use client';

import { useState } from 'react';
import { deleteBook, deletePattern } from '@/app/dashboard/admin/actions';
import { Trash2, Loader2, Edit, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function BookActions({ bookId, title }: { bookId: string, title: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

        setIsDeleting(true);
        const result = await deleteBook(bookId);

        if (result.success) {
            toast.success('Book deleted successfully');
            router.refresh(); // Refresh to remove from list
        } else {
            toast.error(result.error || 'Failed to delete book');
            setIsDeleting(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                <DropdownMenuItem disabled className="text-slate-500 cursor-not-allowed">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit (Coming Soon)
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                    {isDeleting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                    )}
                    Delete Book
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function PatternActions({ patternId, name }: { patternId: string, name: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;

        setIsDeleting(true);
        const result = await deletePattern(patternId);

        if (result.success) {
            toast.success('Pattern deleted successfully');
            router.refresh();
        } else {
            toast.error(result.error || 'Failed to delete pattern');
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <button
                title="Edit (Coming Soon)"
                disabled
                className="p-2 text-slate-600 cursor-not-allowed"
            >
                <Edit className="w-4 h-4" />
            </button>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors"
                title="Delete Pattern"
            >
                {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                ) : (
                    <Trash2 className="w-4 h-4" />
                )}
            </button>
        </div>
    );
}
