
import { Metadata, ResolvingMetadata } from 'next';
import { getBookById } from '@/app/dashboard/library/actions';
import { notFound } from 'next/navigation';
import { notFound as notAuthorized } from 'next/navigation'; // Using notFound for unauthorized/private books too to prevent leaking existence
import { ArrowRight, BookOpen, Lock, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { id } = await params;
    const book = await getBookById(id);

    if (!book) return { title: 'Book Not Found' };

    return {
        title: `${book.title} by ${book.author || 'Unknown'} - Traders Diary Library`,
        description: book.description || `Read ${book.title} on Traders Diary.`,
        openGraph: {
            title: `${book.title} - Professional Trading Library`,
            description: `Read this premium trading resource on Traders Diary.`,
            url: `https://tradediary.equitymarvels.com/share/book/${id}`,
            type: 'book',
            // images: Automatically handled by opengraph-image.tsx
        },
        twitter: {
            card: 'summary_large_image',
            title: `${book.title} | Premium Library`,
            description: `Read ${book.title} by ${book.author} on Traders Diary.`,
            // images: Automatically handled by opengraph-image.tsx
        }
    };
}

export default async function ShareBookPage({ params }: Props) {
    const { id } = await params;
    const book = await getBookById(id);

    if (!book) return notFound();

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">

                {/* Book Cover Container */}
                <div className="relative group perspective-1000 mx-auto md:mx-0">
                    <div className={`
                        relative w-[280px] h-[420px] rounded-r-xl rounded-l-sm bg-slate-800 shadow-2xl 
                        transform transition-transform duration-500 hover:rotate-y-6 hover:scale-105
                        border-r-4 border-b-4 border-slate-900/50 flex items-center justify-center overflow-hidden
                    `}>
                        {/* Book Spine Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/20 to-transparent z-20 mix-blend-overlay"></div>

                        {book.cover_url ? (
                            <img
                                src={book.cover_url}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-6 text-center h-full bg-slate-800 text-slate-400">
                                <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                                <span className="font-serif text-xl font-bold">{book.title}</span>
                            </div>
                        )}

                        {/* Premium Badge */}
                        <div className="absolute top-4 right-4 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            PREMIUM
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6 text-center md:text-left">
                    <div>
                        <div className="text-amber-500 text-sm font-bold tracking-widest uppercase mb-2">Traders Diary Library</div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">{book.title}</h1>
                        <p className="text-xl text-slate-400 font-medium">{book.author}</p>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 text-sm text-slate-300 leading-relaxed">
                        {book.description || "Unlock the secrets of trading with this premium resource. Available exclusively on Traders Diary."}
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="https://tradediary.equitymarvels.com/dashboard/library"
                            className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-amber-950 font-black h-14 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/20 px-8 text-lg"
                        >
                            <BookOpen className="w-5 h-5" />
                            Read Now
                        </Link>

                        <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>Verified Official Content</span>
                            <span className="mx-2">•</span>
                            <span>{book.is_global ? 'Global Library' : 'Premium Collection'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
