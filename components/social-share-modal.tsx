import { useState, useRef } from 'react';
import { X, Share2, Download, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { WatchCardView } from './share/watch-card-view';
import { StudyCardView } from './share/study-card-view';

interface SocialShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
    shareText?: string;
    instrument?: string;
    variant?: 'trade' | 'watchlist' | 'study';
    data?: any; // Flexible data prop for specific cards
    shareUrl?: string;
}

export function SocialShareModal({ isOpen, onClose, children, title = "Trade Setup", shareText, instrument, variant = 'trade', data, shareUrl }: SocialShareModalProps) {
    const [capturing, setCapturing] = useState(false);
    const hiddenCardRef = useRef<HTMLDivElement>(null); // Ref for the hidden capture element
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleShare = async () => {
        if (!hiddenCardRef.current) return; // Capture the HIDDEN one, not the visible one
        setCapturing(true);

        try {
            // Wait a moment for any images to load in the hidden DOM if needed
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(hiddenCardRef.current, {
                backgroundColor: '#020617', // Enforce dark background
                scale: 3, // High quality for download
                useCORS: true,
                logging: false,
                // Remove fixed width/height to allow natural card size capture
            });

            canvas.toBlob(async (blob) => {
                if (!blob) throw new Error("Blob generation failed");

                const file = new File([blob], `trade-note-${instrument || 'share'}.png`, { type: 'image/png' });
                const finalShareText = shareText || `Check out my trade analysis on Traders Diary! 🚀\n\nhttps://tradediary.equitymarvels.com`;

                const shareData = {
                    title: title,
                    text: finalShareText,
                    files: [file]
                };

                if (navigator.canShare && navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                } else {
                    // Fallback: Download
                    const link = document.createElement('a');
                    link.download = `trade-note-${instrument || 'share'}.png`;
                    link.href = canvas.toDataURL();
                    link.click();
                    // alert("Image downloaded!"); 
                }
                setCapturing(false);
            }, 'image/png');

        } catch (error) {
            console.error("Share failed", error);
            alert("Failed to generate image. Please try again.");
            setCapturing(false);
        }
    };

    const copyLink = async () => {
        const urlToCopy = shareUrl || "https://tradediary.equitymarvels.com";
        try {
            await navigator.clipboard.writeText(urlToCopy);
            console.log("Copied to clipboard:", urlToCopy); // Debug
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Clipboard write failed", e);
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement("textarea");
            textArea.value = urlToCopy;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        }
    };

    // --- RENDER CONTENT HELPERS ---
    const renderCard = () => {
        if (variant === 'watchlist' && data) {
            return (
                <WatchCardView item={{
                    ...data,
                    direction: data.direction as 'LONG' | 'SHORT'
                }} />
            );
        }

        if (variant === 'study' && data) {
            return (
                <StudyCardView data={data} />
            );
        }

        return children;
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            {/* Modal Container - Responsive width */}
            <div className={`bg-slate-900 border border-white/10 rounded-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh] ${variant === 'study' ? 'max-w-4xl' : 'max-w-lg'}`}>

                {/* Modal Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900 z-10">
                    <h2 className="text-xl font-bold text-white">
                        {title}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* VISIBLE PREVIEW AREA */}
                <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center bg-slate-950/80">
                    <div
                        className="relative shadow-2xl rounded-2xl overflow-hidden shrink-0"
                        style={{
                            width: '100%',
                            aspectRatio: '800/1000',
                            maxWidth: variant === 'study' ? '450px' : '380px', // Scaling down for preview
                        }}
                    >
                        {/* We use a container that matches the aspect ratio but scales content to fit */}
                        <div style={{
                            width: '800px',
                            height: '1000px',
                            transform: `scale(${variant === 'study' ? 450 / 800 : 380 / 800})`,
                            transformOrigin: 'top left',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}>
                            {renderCard()}
                        </div>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-6 font-medium">This is exactly how your shared image will look.</p>
                </div>

                {/* HIDDEN CAPTURE CONTAINER (800x1000 Locked) */}
                <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0 }}>
                    <div
                        ref={hiddenCardRef}
                        style={{
                            width: '800px',
                            height: '1000px',
                            overflow: 'hidden'
                        }}
                    >
                        {renderCard()}
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 border-t border-white/5 bg-slate-900 shrink-0 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={copyLink}
                            className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copied" : "Copy Link"}
                        </button>
                        <button
                            onClick={handleShare}
                            disabled={capturing}
                            className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                        >
                            {capturing ? "Generating..." : <><Download className="w-4 h-4" /> Download / Share Image</>}
                        </button>
                    </div>

                    {shareUrl && (
                        <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/5">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText || '')}&url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText || '')} ${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-400/10 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>
                            </a>
                            <a
                                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText || '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 3.816 1.177l.176.056c.497.156.756.152 1.29-.621.965-1.404 3.202-4.058 4.756-6.041.243-.31.577-.391.826-.1.217.253.167.554-.027.828-1.587 2.233-4.128 5.724-5.592 7.745-.40.554-.84 1.169-.127 1.914.613.639 2.369 2.133 3.396 3.064.711.643 1.558 1.409 2.653 1.164 1.054-.236 1.815-1.288 2.306-3.801.071-.365.237-1.358.586-3.856.551-3.928 1.488-10.612 1.551-11.085.033-.243.023-.559-.19-.79a1.516 1.516 0 0 0-.797-.366z" /></svg>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
