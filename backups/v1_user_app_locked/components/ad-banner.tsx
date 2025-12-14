'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ExternalLink } from 'lucide-react';

interface Ad {
    id: string;
    image_url: string;
    target_url: string;
    title: string;
    description: string;
}

interface AdBannerProps {
    location: string; // e.g., 'sidebar_bottom'
    className?: string;
}

export function AdBanner({ location, className = '' }: AdBannerProps) {
    const [ad, setAd] = useState<Ad | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAd = async () => {
            const supabase = createClient();

            // Fetch active ads for this location
            const { data, error } = await supabase
                .from('ads')
                .select('*')
                .eq('location', location)
                .eq('is_active', true);

            if (!error && data && data.length > 0) {
                // Pick a random one if multiple exist
                const randomAd = data[Math.floor(Math.random() * data.length)];
                setAd(randomAd);
            } else {
                // Fallback / Default Ad (Visible when no ads are in DB)
                setAd({
                    id: 'default',
                    image_url: '',
                    target_url: '/dashboard/subscription',
                    title: 'Unlock Premium Features',
                    description: 'Get exclusive access to global strategies and reports.'
                });
            }
        };

        fetchAd();
    }, [location]);

    if (!ad || !isVisible) return null;

    return (
        <div className={`relative group overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg ${className}`}>
            {/* Close Button (Optional, user might want to dismiss) */}
            {/* <button 
                onClick={(e) => { e.preventDefault(); setIsVisible(false); }}
                className="absolute top-1 right-1 p-1 text-white/50 hover:text-white z-20"
            >
                <X className="w-3 h-3" />
            </button> */}

            <a
                href={ad.target_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 relative"
            >
                {/* Background Pattern or Image */}
                {ad.image_url ? (
                    <img
                        src={ad.image_url}
                        alt={ad.title || 'Ad'}
                        className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                )}

                <div className="relative z-10">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold tracking-wider text-white/70 uppercase">Sponsored</span>
                    </div>

                    <h3 className="text-white font-bold text-sm leading-tight mb-1">
                        {ad.title || 'Upgrade to Pro'}
                    </h3>

                    {ad.description && (
                        <p className="text-[10px] text-white/80 line-clamp-2 mb-3 leading-relaxed">
                            {ad.description}
                        </p>
                    )}

                    <div className="inline-flex items-center justify-center w-full px-3 py-1.5 bg-white text-indigo-700 text-xs font-bold rounded shadow-sm group-hover:scale-[1.02] transition-transform">
                        Learn More <ExternalLink className="w-3 h-3 ml-1" />
                    </div>
                </div>
            </a>
        </div>
    );
}
