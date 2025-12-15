'use client';

import { useState } from 'react';
import { AddBookModal, BookInitialValues } from '@/components/add-book-modal';
import { BookActions } from '@/components/admin/content-actions';
import { BookOpen, FileText, Plus } from 'lucide-react';
import Image from 'next/image';

interface AdminBooksClientProps {
    books: any[];
}

export function AdminBooksClient({ books }: AdminBooksClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<BookInitialValues | undefined>(undefined);

    const handleEdit = (book: any) => {
        setEditingBook({
            id: book.id,
            title: book.title,
            author: book.author || '',
            description: book.description || '',
            isPublic: book.is_public,
            accessLevel: book.access_level || 'free',
            price: book.price || 0,
            priceUsd: book.price_usd || 0,
            pdfUrl: book.pdf_url,
            coverUrl: book.cover_url
        });
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingBook(undefined);
        setIsModalOpen(true);
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Content Library</h2>
                    <p className="text-slate-400">Manage Global Books and Resources</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Uploader Section - Now just a persistent 'Add' card or we keep the separate uploader component? */}
                {/* To adapt existing UI, we can keep the Uploader on the left if desired, OR move to a Modal-only approach. 
                    Given we modified the Modal to be reusable, Modal-only is cleaner for Edit/Create.
                    Let's use a "Add New" card in the grid or a button.
                */}

                <div className="xl:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-gold-400" />
                            Global Library ({books?.length || 0})
                        </h3>
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-black font-bold rounded-lg hover:bg-gold-500 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Book
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {books?.map((book: any) => (
                            <div key={book.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col gap-4 hover:border-slate-600 transition-colors relative group">
                                <div className="flex gap-4">
                                    {/* Cover Helper */}
                                    <div className="w-16 h-20 bg-slate-800 rounded-lg flex-shrink-0 relative overflow-hidden">
                                        {book.cover_url ? (
                                            <Image
                                                src={book.cover_url}
                                                alt={book.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FileText className="w-8 h-8 text-slate-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-200 truncate">{book.title}</h4>
                                        <p className="text-sm text-slate-400 truncate">{book.author}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] bg-green-900/50 text-green-300 px-2 py-0.5 rounded border border-green-500/20">
                                                {book.access_level?.toUpperCase() || 'FREE'}
                                            </span>
                                            {book.price > 0 && (
                                                <span className="text-[10px] text-slate-400">
                                                    ₹{book.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Area */}
                                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="text-xs text-gold-400 hover:text-gold-300 font-medium"
                                    >
                                        Edit Details
                                    </button>
                                    <div className="scale-75 origin-right">
                                        <BookActions bookId={book.id} title={book.title} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!books || books.length === 0) && (
                            <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-700 rounded-xl">
                                <p className="text-slate-400">No global books found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <AddBookModal
                    isAdmin={true}
                    onClose={() => setIsModalOpen(false)}
                    initialValues={editingBook}
                />
            )}
        </div>
    );
}
