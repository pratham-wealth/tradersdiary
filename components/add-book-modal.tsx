import { useState } from 'react';
import { createBook } from '@/app/dashboard/library/actions';
import { updateGlobalBook } from '@/app/dashboard/admin/actions';
import { X, Upload, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface BookInitialValues {
    id?: string;
    title: string;
    author: string;
    description: string;
    isPublic: boolean;
    accessLevel: 'free' | 'premium' | 'paid';
    price?: number;
    priceUsd?: number;
    pdfUrl?: string;
    coverUrl?: string | null;
}

interface AddBookModalProps {
    onClose: () => void;
    isAdmin?: boolean;
    initialValues?: BookInitialValues;
}

export function AddBookModal({ onClose, isAdmin = false, initialValues }: AddBookModalProps) {
    const isEditing = !!initialValues?.id;
    const [isUploading, setIsUploading] = useState(false);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    // Initial load for validation logic if needed

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsUploading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;

        // Defaults
        let isPublic = false;
        let accessLevel: 'free' | 'premium' | 'paid' = 'free';
        let price = 0;
        let priceUsd = 0;

        if (isAdmin) {
            isPublic = formData.get('isPublic') === 'true';
            accessLevel = formData.get('accessLevel') as 'free' | 'premium' | 'paid';
            price = formData.get('price') ? parseFloat(formData.get('price') as string) : 0;
            priceUsd = formData.get('priceUsd') ? parseFloat(formData.get('priceUsd') as string) : 0;
        }

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // If Editing, we might not have new files
        let finalPdfPath = initialValues?.pdfUrl?.replace(process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/books/', '') || ''; // Approximate path retrieval or just keep URL if strictly updating metadata
        // Actually, actions expect path typically if uploading new, or we send URL if existing?
        // Let's handle file uploads first.

        let hasNewPdf = false;

        if (pdfFile) {
            const pdfFileName = `${uuidv4()}.pdf`;
            const { error: uploadError } = await supabase.storage
                .from('books')
                .upload(`${user.id}/${pdfFileName}`, pdfFile);

            if (uploadError) {
                alert('Failed to upload PDF.');
                setIsUploading(false);
                return;
            }
            finalPdfPath = `${user.id}/${pdfFileName}`;
            hasNewPdf = true;
        } else if (!isEditing) {
            alert('Please select a PDF file.');
            setIsUploading(false);
            return;
        }

        // If editing and no new PDF, we keep existing. 
        // Note: createBook expects 'pdfPath' (relative) but updateGlobalBook logic in actions.ts handles specific field updates. 
        // We will need to be careful about what we send.

        let coverUrl = initialValues?.coverUrl || null;
        if (coverFile && coverFile.size > 0) {
            const coverName = `${uuidv4()}.${coverFile.name.split('.').pop()}`;
            const { data: coverData, error: coverError } = await supabase.storage
                .from('book_covers')
                .upload(`${user.id}/${coverName}`, coverFile);

            if (!coverError && coverData) {
                const { data: { publicUrl } } = supabase.storage
                    .from('book_covers')
                    .getPublicUrl(`${user.id}/${coverName}`);
                coverUrl = publicUrl;
            }
        }

        if (isEditing && initialValues?.id) {
            const res = await updateGlobalBook(initialValues.id, {
                title,
                author,
                description,
                pdfPath: hasNewPdf ? finalPdfPath : undefined, // Only send if changed
                coverUrl,
                accessLevel,
                price,
                priceUsd
            });
            if (res.error) alert(res.error);
            else onClose();
        } else {
            // Create
            // Re-construct full pdfPath for create logic if needed or usage
            const res = await createBook({
                title,
                author,
                description,
                pdfPath: finalPdfPath,
                coverUrl,
                isPublic,
                accessLevel,
                price,
                priceUsd
            });
            if (res.error) alert(res.error);
            else onClose();
        }

        setIsUploading(false);
    }

    const handleAccessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const priceInput = document.getElementById('price-input');
        if (priceInput) {
            priceInput.style.display = e.target.value === 'paid' ? 'block' : 'none';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Book' : 'Add to Library'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Book Title</label>
                            <input defaultValue={initialValues?.title} name="title" required className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600" placeholder="e.g. Trading in the Zone" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Author</label>
                            <input defaultValue={initialValues?.author} name="author" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600" placeholder="e.g. Mark Douglas" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                            <textarea defaultValue={initialValues?.description} name="description" rows={3} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600" placeholder="Brief summary..." />
                        </div>
                    </div>

                    {/* Admin Only Fields */}
                    {isAdmin && (
                        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Visibility</label>
                                <select defaultValue={initialValues ? String(initialValues.isPublic) : "false"} name="isPublic" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none">
                                    <option value="false">Private (Only Me)</option>
                                    <option value="true">Public (Everyone)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Access Level</label>
                                <select defaultValue={initialValues?.accessLevel || 'free'} name="accessLevel" onChange={handleAccessChange} className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none">
                                    <option value="free">Free</option>
                                    <option value="premium">Premium Only</option>
                                    <option value="paid">Paid Book</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {isAdmin && (
                        <div id="price-input" style={{ display: (initialValues?.accessLevel === 'paid') ? 'block' : 'none' }} className="space-y-4 p-4 bg-slate-950/50 rounded-xl border border-white/5 border-t-0 mt-0">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Razorpay Price (INR)</label>
                                <input
                                    defaultValue={initialValues?.price}
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="e.g. 499.00"
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">PayPal Price (USD)</label>
                                <input
                                    defaultValue={initialValues?.priceUsd}
                                    name="priceUsd"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="e.g. 9.99"
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 focus:outline-none placeholder:text-slate-600"
                                />
                            </div>
                        </div>
                    )}

                    {/* File Uploads */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* PDF Upload */}
                        <div className={cn(
                            "border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gold-400/50 transition-colors h-32 relative",
                            pdfFile && "border-green-500/50 bg-green-500/5"
                        )}>
                            <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                required={!isEditing}
                                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <FileText className={cn("w-8 h-8 mb-2", pdfFile ? "text-green-500" : "text-slate-500")} />
                            <span className="text-xs text-slate-400 font-medium">
                                {pdfFile ? pdfFile.name : (isEditing ? "Replace PDF (Optional)" : "Upload PDF Book")}
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
                                name="cover"
                                accept="image/*"
                                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <ImageIcon className={cn("w-8 h-8 mb-2", coverFile ? "text-green-500" : "text-slate-500")} />
                            <span className="text-xs text-slate-400 font-medium">
                                {coverFile ? coverFile.name : (isEditing ? "Replace Cover (Optional)" : "Upload Cover")}
                            </span>
                            {!coverFile && <span className="text-[10px] text-slate-600 mt-1">Optional (Image)</span>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-black font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {isEditing ? 'Updating...' : 'Uploading...'}
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                {isEditing ? 'Save Changes' : 'Add Book to Library'}
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
