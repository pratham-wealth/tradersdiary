'use client';

import { useState, useEffect } from 'react';
import { getAds, updateAd, AppAd } from './actions';
import { Globe, Save, Loader2, ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Define the available ad slots in the application
const AD_SLOTS = [
    { id: 'dashboard_banner', name: 'Dashboard Main Banner', description: 'Appears at the top of the main dashboard. Recommended size: 1200x200px.' },
    { id: 'sidebar_ad', name: 'Sidebar Ad', description: 'Small square ad in the navigation sidebar. Recommended size: 300x300px.' },
    { id: 'library_banner', name: 'Library Banner', description: 'Banner shown in the Books/Library section. Recommended size: 1200x200px.' }
];

export default function AdsManagerPage() {
    const [ads, setAds] = useState<Record<string, AppAd>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    // Form State (Local edits)
    const [formData, setFormData] = useState<Record<string, { image_url: string, link_url: string, is_active: boolean }>>({});

    useEffect(() => {
        loadAds();
    }, []);

    const loadAds = async () => {
        const data = await getAds();
        const adsMap: Record<string, AppAd> = {};
        const formMap: Record<string, Record<string, any>> = {};

        data.forEach(ad => {
            adsMap[ad.location] = ad;
        });

        // Initialize form data for all known slots
        AD_SLOTS.forEach(slot => {
            const existing = adsMap[slot.id];
            formMap[slot.id] = {
                image_url: existing?.image_url || '',
                link_url: existing?.link_url || '',
                is_active: existing ? existing.is_active : true
            };
        });

        setAds(adsMap);
        setFormData(formMap);
        setLoading(false);
    };

    const handleSave = async (slotId: string) => {
        const data = formData[slotId];
        if (!data) return;

        setSaving(slotId);
        const result = await updateAd(slotId, data.image_url, data.link_url, data.is_active);

        if (result.success) {
            toast.success('Ad updated successfully');
            // Update local "source of truth"
            setAds(prev => ({
                ...prev,
                [slotId]: { ...prev[slotId], ...data, location: slotId, id: prev[slotId]?.id || 'temp' }
            }));
        } else {
            toast.error(result.error || 'Failed to update ad');
        }
        setSaving(null);
    };

    const handleChange = (slotId: string, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [slotId]: {
                ...prev[slotId],
                [field]: value
            }
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Globe className="w-8 h-8 text-blue-400" />
                    Ads Manager
                </h2>
                <p className="text-slate-400">Control advertisements and banners displayed across the application.</p>
            </div>

            <div className="grid gap-6">
                {AD_SLOTS.map((slot) => {
                    const form = formData[slot.id];
                    const isSaving = saving === slot.id;

                    return (
                        <div key={slot.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                            <div className="p-6 border-b border-slate-700 flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        {slot.name}
                                        {form.is_active ? (
                                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
                                        ) : (
                                            <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full border border-slate-600">Inactive</span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-1">{slot.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="flex items-center cursor-pointer relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={form.is_active}
                                            onChange={(e) => handleChange(slot.id, 'is_active', e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Inputs */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-purple-400" />
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            value={form.image_url}
                                            onChange={(e) => handleChange(slot.id, 'image_url', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-500 transition-colors text-sm"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">Direct link to the image file.</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2">
                                            <LinkIcon className="w-4 h-4 text-blue-400" />
                                            Destination Link
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            value={form.link_url}
                                            onChange={(e) => handleChange(slot.id, 'link_url', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-500 transition-colors text-sm"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">Where the user resolves when clicking.</p>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={() => handleSave(slot.id)}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            Save Changes
                                        </button>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="bg-black/20 rounded-xl p-4 border border-slate-700/50 flex flex-col items-center justify-center min-h-[200px]">
                                    <p className="text-xs text-slate-500 mb-3 font-mono uppercase tracking-widest">Preview</p>

                                    {form.image_url ? (
                                        <div className="relative group max-w-full">
                                            <img
                                                src={form.image_url}
                                                alt="Preview"
                                                className={`max-h-[160px] rounded-lg shadow-2xl border border-white/10 object-contain ${!form.is_active ? 'opacity-50 grayscale' : ''}`}
                                            />
                                            {!form.is_active && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="bg-black/80 text-white text-xs px-2 py-1 rounded">Inactive</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-slate-600">
                                            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                            <span className="text-sm">No image set</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
