'use client';

import { useState } from 'react';
import { createGlobalBook } from '@/app/dashboard/admin/actions';
import { X, Upload, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function AdminBookUploader({ onSuccess }: { onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Form State
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        const title = formData.get('title') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;

        const accessLevel = formData.get('accessLevel') as 'free' | 'premium' | 'paid';
        const price = formData.get('price') ? parseFloat(formData.get('price') as string) : 0;
        const priceUsd = formData.get('priceUsd') ? parseFloat(formData.get('priceUsd') as string) : 0;

        if (!pdfFile) {
            toast.error('Please select a PDF file.');
            return;
        }

        setIsLoading(true);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                toast.error('You must be logged in.');
                setIsLoading(false);
                return;
            }

            // 1. Upload PDF (Admin uploads are owned by them, accessible via createSignedUrl by Admin Client)
            const pdfFileName = `${user.id}/${crypto.randomUUID()}.pdf`;
            const { error: pdfError } = await supabase.storage
                .from('books')
                .upload(pdfFileName, pdfFile);

            if (pdfError) {
                throw new Error(`PDF Upload Failed: ${pdfError.message}`);
            }

            // 2. Upload Cover
            let coverUrl = null;
            if (coverFile) {
                const coverFileName = `${user.id}/${crypto.randomUUID()}.png`;
                const { error: coverError } = await supabase.storage
                    .from('book_covers')
                    .upload(coverFileName, coverFile);

                if (coverError) {
                    throw new Error(`Cover Upload Failed: ${coverError.message}`);
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('book_covers')
                    .getPublicUrl(coverFileName);
                coverUrl = publicUrl;
            }

            // 3. Create GLOBAL DB Record
            const res = await createGlobalBook({
                title,
                author,
                description,
                pdfPath: pdfFileName,
                coverUrl,
                accessLevel,
                price,
                priceUsd
            });

            if (res.error) {
                throw new Error(res.error);
            }

            toast.success('Global Book Added Successfully!');

            // Reset form
            formElement.reset();
            setPdfFile(null);
            setCoverFile(null);
            router.refresh();

            if (onSuccess) onSuccess();

        } catch (err: any) {
            console.error('Upload Error:', err);
            toast.error(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Upload Public Book</h3>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Book Title</label>
                    <input
                        name="title"
                        type="text"
                        required
                        placeholder="e.g. Master Trader 2.0"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none placeholder:text-slate-600"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Author</label>
                    <input
                        name="author"
                        type="text"
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none placeholder:text-slate-600"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea
                    name="description"
                    rows={2}
                    placeholder="Brief summary..."
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none placeholder:text-slate-600 resize-none"
                />
            </div>

            {/* Access & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Access Level</label>
                    <select
                        name="accessLevel"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none"
                        onChange={(e) => {
                            const priceContainer = document.getElementById('admin-price-container');
                            if (priceContainer) {
                                priceContainer.style.display = e.target.value === 'paid' ? 'grid' : 'none';
                            }
                        }}
                    >
                        <option value="free">Free</option>
                        <option value="premium">Premium Only</option>
                        <option value="paid">Paid (One-time)</option>
                    </select>
                </div>
            </div>

            <div id="admin-price-container" style={{ display: 'none' }} className="grid grid-cols-2 gap-4 p-4 bg-slate-950/30 rounded-lg border border-white/5">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Razorpay (INR)</label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="499"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">PayPal (USD)</label>
                    <input
                        name="priceUsd"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="9.99"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-2 gap-4">
                {/* PDF Upload */}
                <div className={cn(
                    "border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500/50 transition-colors h-32 relative",
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
                        {pdfFile ? pdfFile.name : "Select PDF"}
                    </span>
                </div>

                {/* Cover Upload */}
                <div className={cn(
                    "border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500/50 transition-colors h-32 relative",
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
                        {coverFile ? coverFile.name : "Select Cover"}
                    </span>
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading to Global Library...
                    </>
                ) : (
                    <>
                        <Upload className="w-4 h-4 mr-2" />
                        Publish Book
                    </>
                )}
            </Button>
        </form>
    );
}
