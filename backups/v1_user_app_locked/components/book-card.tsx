'use client';

import { UserBook, deleteBook, getBookDownloadUrl } from '@/app/dashboard/library/actions';
import { Book, Trash2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { PDFReader } from './pdf-reader';

interface BookCardProps {
    book: UserBook;
    userEmail: string;
}

export function BookCard({ book, userEmail }: BookCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [readUrl, setReadUrl] = useState<string | null>(null);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this book?')) return;

        setIsDeleting(true);
        await deleteBook(book.id, book.pdf_url, book.cover_url);
        setIsDeleting(false);
    };

    const handleRead = async () => {
        // Fetch signed URL
        const url = await getBookDownloadUrl(book.pdf_url);
        if (url) {
            setReadUrl(url);
            setIsReading(true);
        } else {
            alert('Could not load book. Please try again.');
        }
    };

    return (
        <>
            <div
                onClick={handleRead}
                className="group relative flex flex-col bg-slate-800 border border-white/5 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gold-400/5 transition-all cursor-pointer h-full"
            >
                {/* Cover Image */}
                <div className="aspect-[3/4] bg-slate-900 relative overflow-hidden">
                    {book.cover_url ? (
                        <img
                            src={book.cover_url}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-800 to-slate-900">
                            <Book className="w-12 h-12 text-slate-600 mb-2" />
                            <span className="text-slate-500 text-xs text-center px-2 line-clamp-2">{book.title}</span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[1px]">
                        <button
                            className="p-3 bg-gold-400 text-black rounded-full hover:bg-gold-300 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            title="Read Book"
                        >
                            <BookOpen className="w-5 h-5" />
                        </button>
                        {!book.is_global && (
                            <button
                                onClick={handleDelete}
                                className="p-3 bg-red-500/80 text-white rounded-full hover:bg-red-500 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Badges */}
                    {book.access_level === 'premium' && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-300 to-gold-500 text-black text-[10px] font-black tracking-wider px-2 py-1 rounded shadow-lg border-b-2 border-amber-600">
                            PREMIUM
                        </div>
                    )}
                    {(book.is_global && book.access_level !== 'premium') && (
                        <div className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg backdrop-blur-sm border border-emerald-400/30">
                            FREE
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="p-3 bg-slate-800 border-t border-white/5">
                    <h3 className="font-bold text-slate-200 text-sm line-clamp-1 mb-0.5" title={book.title}>{book.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-1">{book.author || 'Unknown Author'}</p>
                    {book.description && (
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-2 border-t border-white/5 pt-1 mt-1">
                            {book.description}
                        </p>
                    )}
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-600">
                        <span>PDF Book</span>
                        <span>{new Date(book.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Reader Modal */}
            {isReading && readUrl && (
                <PDFReader
                    url={readUrl}
                    title={book.title}
                    userEmail={userEmail}
                    onClose={() => setIsReading(false)}
                />
            )}
        </>
    );
}
