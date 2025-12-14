'use client';

import { useState } from 'react';
import { UserBook } from '@/app/dashboard/library/actions';
import { BookCard } from './book-card';
import { AddBookModal } from './add-book-modal';
import { Plus, BookX } from 'lucide-react';

interface LibraryClientWrapperProps {
    initialBooks: UserBook[];
    userEmail: string;
}

export function LibraryClientWrapper({ initialBooks, userEmail }: LibraryClientWrapperProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // In a real app we might use optimistic updates, but here we rely on revalidatePath in actions
    // and passing fresh data from the server component (initialBooks). 
    // Since revalidatePath re-runs the page, initialBooks will be fresh after add/delete.

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

                {/* Add New Button Card */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-gold-400/50 hover:bg-gold-400/5 transition-all group cursor-pointer"
                >
                    <div className="p-4 bg-slate-800 rounded-full group-hover:bg-gold-400 text-slate-400 group-hover:text-black transition-colors shadow-lg">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-400 group-hover:text-gold-400">Add New Book</span>
                </button>

                {/* Books */}
                {initialBooks.map((book) => (
                    <div key={book.id} className="h-full">
                        <BookCard book={book} userEmail={userEmail} />
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {initialBooks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <BookX className="w-16 h-16 text-slate-600 mb-4" />
                    <p className="text-slate-500">No books in your collection yet.</p>
                </div>
            )}

            {/* Modal */}
            {isAddModalOpen && (
                <AddBookModal onClose={() => setIsAddModalOpen(false)} />
            )}
        </>
    );
}
