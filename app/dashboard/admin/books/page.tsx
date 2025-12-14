import { getGlobalBooks } from '@/app/dashboard/admin/actions';
import { AdminBookUploader } from '@/components/admin/admin-book-uploader';
import { BookActions } from '@/components/admin/content-actions';
import { BookOpen, FileText } from 'lucide-react';
import Image from 'next/image';

export default async function AdminBooksPage() {
    const { books, error } = await getGlobalBooks();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Content Library</h2>
                    <p className="text-slate-400">Manage Global Books and Resources</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Uploader Section */}
                <div className="xl:col-span-1">
                    <AdminBookUploader />
                </div>

                {/* List Section */}
                <div className="xl:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-gold-400" />
                        Global Library ({books?.length || 0})
                    </h3>

                    {error && (
                        <div className="p-4 bg-red-900/20 text-red-200 rounded-lg border border-red-500/50">
                            Error loading books: {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {books?.map((book: any) => (
                            <div key={book.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex gap-4 hover:border-slate-600 transition-colors">
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
                                            PUBLIC
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {new Date(book.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div>
                                    <BookActions bookId={book.id} title={book.title} />
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
        </div>
    );
}
