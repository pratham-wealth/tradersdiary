'use client';

import { useState } from 'react';
import { createBook } from '@/app/dashboard/library/actions';
import { X, Upload, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

interface AddBookModalProps {
    onClose: () => void;
}

export function AddBookModal({ onClose }: AddBookModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. Capture Form Data Synchronously (before any await)
        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        const title = formData.get('title') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;

        if (!pdfFile) {
            alert('Please select a PDF file.');
            return;
        }

        setIsLoading(true);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert('You must be logged in to upload.');
                setIsLoading(false);
                return;
            }

            // 1. Upload PDF (Client Side)
            const pdfFileName = `${user.id}/${crypto.randomUUID()}.pdf`;
            const { error: pdfError } = await supabase.storage
                .from('books')
                .upload(pdfFileName, pdfFile);

            if (pdfError) {
                throw new Error(`PDF Upload Failed: ${pdfError.message}`);
            }

            // 2. Upload Cover (Optional)
            let coverUrl = null;
            if (coverFile) {
                const coverFileName = `${user.id}/${crypto.randomUUID()}.png`;
                const { error: coverError } = await supabase.storage
                    .from('book_covers')
                    .upload(coverFileName, coverFile);

                if (coverError) {
                    // Start cleanup of PDF if cover fails? optional
                    throw new Error(`Cover Upload Failed: ${coverError.message}`);
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('book_covers')
                    .getPublicUrl(coverFileName);
                coverUrl = publicUrl;
            }

            // 3. Create DB Record (Server Action)
            const res = await createBook({
                title,
                author,
                description,
                pdfPath: pdfFileName,
                coverUrl,
            });

            if (res.error) {
                throw new Error(res.error);
            }

            onClose();

        } catch (err: any) {
            console.error('Upload Error:', err);
            alert(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in" onClick={onClose} />

            <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Add to Library</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Metadata */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Book Title</label>
                        <input
                            name="title"
                            type="text"
                            required
                            placeholder="e.g. Trading in the Zone"
                            className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Author</label>
                        <input
                            name="author"
                            type="text"
                            placeholder="e.g. Mark Douglas"
                            className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Description (Optional)</label>
                        <textarea
                            name="description"
                            rows={2}
                            placeholder="Brief summary..."
                            className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600 resize-none"
                        />
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* PDF Upload */}
                        <div className={cn(
                            "border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gold-400/50 transition-colors h-32 relative",
                            pdfFile && "border-green-500/50 bg-green-500/5"
                        )}>
                            <input
                                type="file"
                                name="pdfFile"
                                accept=".pdf"
                                required
                                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <FileText className={cn("w-8 h-8 mb-2", pdfFile ? "text-green-500" : "text-slate-500")} />
                            <span className="text-xs text-slate-400 font-medium">
                                {pdfFile ? pdfFile.name : "Upload PDF Book"}
                            </span>
                            {!pdfFile && <span className="text-[10px] text-slate-600 mt-1">.pdf only</span>}
                        </div>

                        {/* Cover Upload */}
                        <div className={cn(
                            "border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gold-400/50 transition-colors h-32 relative",
                            coverFile && "border-green-500/50 bg-green-500/5"
                        )}>
                            <input
                                type="file"
                                name="coverFile"
                                accept="image/*"
                                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <ImageIcon className={cn("w-8 h-8 mb-2", coverFile ? "text-green-500" : "text-slate-500")} />
                            <span className="text-xs text-slate-400 font-medium">
                                {coverFile ? coverFile.name : "Upload Cover"}
                            </span>
                            {!coverFile && <span className="text-[10px] text-slate-600 mt-1">Optional (Image)</span>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-black font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                Add Book to Library
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
