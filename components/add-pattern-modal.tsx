'use client';

import { useState } from 'react';
import { createPattern, updatePattern } from '@/app/dashboard/admin/actions';
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export interface PatternInitialValues {
    id?: string;
    type: 'CHART' | 'CANDLESTICK';
    groupName: string;
    name: string;
    description: string;
    understanding: string;
    tradingRules: string;
    successRatio: number;
    videoUrl?: string | null;
    imageUrl?: string | null;
    isPremium: boolean;
}

interface AddPatternModalProps {
    onClose: () => void;
    initialValues?: PatternInitialValues;
}

export function AddPatternModal({ onClose, initialValues }: AddPatternModalProps) {
    const isEditing = !!initialValues?.id;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                toast.error('You must be logged in.');
                setIsLoading(false);
                return;
            }

            // 1. Upload Image (Optional but recommended)
            let imageUrl = initialValues?.imageUrl || null;
            if (imageFile) {
                const imageFileName = `${user.id}/${crypto.randomUUID()}.${imageFile.name.split('.').pop()}`;
                const { error: imageError } = await supabase.storage
                    .from('tradenote-images')
                    .upload(imageFileName, imageFile);

                if (imageError) {
                    throw new Error(`Image Upload Failed: ${imageError.message}`);
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('tradenote-images')
                    .getPublicUrl(imageFileName);
                imageUrl = publicUrl;
            }

            const payload = {
                type: formData.get('type') as 'CHART' | 'CANDLESTICK',
                groupName: formData.get('groupName') as string,
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                understanding: formData.get('understanding') as string,
                tradingRules: formData.get('tradingRules') as string,
                successRatio: parseFloat(formData.get('successRatio') as string),
                imageUrl,
                videoUrl: formData.get('videoUrl') as string || null,
                isPremium: formData.get('isPremium') === 'on'
            };

            if (isEditing && initialValues?.id) {
                const res = await updatePattern(initialValues.id, payload);
                if (res.error) throw new Error(res.error);
                toast.success('Pattern Updated Successfully!');
            } else {
                const res = await createPattern(payload);
                if (res.error) throw new Error(res.error);
                toast.success('Pattern Created Successfully!');
            }

            router.refresh();
            onClose();

        } catch (err: any) {
            console.error('Upload Error:', err);
            toast.error(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900 sticky top-0 z-10">
                    <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Pattern' : 'Create Learning Pattern'}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 max-h-[85vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Pattern Type</label>
                                    <select defaultValue={initialValues?.type} name="type" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none">
                                        <option value="CHART">Chart Pattern</option>
                                        <option value="CANDLESTICK">Candlestick Pattern</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Group Name</label>
                                    <input defaultValue={initialValues?.groupName} name="groupName" required placeholder="e.g. Reversal Patterns" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Pattern Name</label>
                                    <input defaultValue={initialValues?.name} name="name" required placeholder="e.g. Double Top" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" />
                                </div>
                            </div>

                            {/* Metrics & Media */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Success Ratio (%)</label>
                                    <input defaultValue={initialValues?.successRatio} name="successRatio" type="number" step="0.1" required placeholder="e.g. 75.5" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Video URL (Optional)</label>
                                    <input defaultValue={initialValues?.videoUrl || ''} name="videoUrl" type="url" placeholder="https://youtube.com/..." className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" />
                                </div>
                                <div className="flex items-center gap-2 pt-8">
                                    <input type="checkbox" name="isPremium" id="isPremium" defaultChecked={initialValues ? initialValues.isPremium : true} className="w-5 h-5 accent-red-500 bg-slate-950 border-white/10 rounded" />
                                    <label htmlFor="isPremium" className="text-sm text-slate-300 font-medium cursor-pointer">Premium Only Content</label>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Content */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Short Description</label>
                                <textarea defaultValue={initialValues?.description} name="description" required rows={2} placeholder="Brief summary shown on card..." className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Understanding (The Logic)</label>
                                <textarea defaultValue={initialValues?.understanding} name="understanding" required rows={4} placeholder="Explain the psychology behind the pattern..." className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Trading Rules (One per line)</label>
                                <textarea defaultValue={initialValues?.tradingRules} name="tradingRules" required rows={5} placeholder="1. Identify trend...&#10;2. Wait for breakout...&#10;3. Set stop loss..." className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none font-mono text-sm" />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className={cn(
                            "border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500/50 transition-colors h-40 relative",
                            imageFile && "border-green-500/50 bg-green-500/5"
                        )}>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <ImageIcon className={cn("w-10 h-10 mb-3", imageFile ? "text-green-500" : "text-slate-500")} />
                            <span className="text-sm text-slate-400 font-medium">
                                {imageFile ? imageFile.name : (isEditing ? "Replace Diagram (Optional)" : "Upload Pattern Diagram")}
                            </span>
                            {!imageFile && <span className="text-xs text-slate-600 mt-2">Recommended: 16:9 Aspect Ratio</span>}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 text-lg shadow-lg shadow-red-900/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    {isEditing ? 'Updating...' : 'Creating Pattern...'}
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5 mr-2" />
                                    {isEditing ? 'Save Changes' : 'Publish Pattern Module'}
                                </>
                            )}
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    );
}
