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
    // We isolate the content rendering so we can use it in both visible and hidden views
    const renderContent = (isForCapture = false) => {
        if (variant === 'watchlist' && data) {
            return (
                <div className={`flex flex-col gap-4 ${isForCapture ? 'p-10' : ''}`}>
                    {/* Increased padding for capture */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xs text-indigo-400 font-bold tracking-widest uppercase mb-1 block">Trade Idea</span>
                            <h3 className={`${isForCapture ? 'text-4xl' : 'text-3xl'} font-black text-white tracking-tight`}>
                                {data.instrument}
                            </h3>
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${data.direction === 'LONG' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            <span className="text-sm font-bold uppercase">{data.direction}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-2">
                        {/* Levels - Styled same as before but maybe larger font for capture */}
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Entry</span>
                            <span className="text-lg font-bold text-white">{data.entry_level ? data.entry_level : 'Market'}</span>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Stop</span>
                            <span className="text-lg font-bold text-red-400">{data.stop_loss || '-'}</span>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Target</span>
                            <span className="text-lg font-bold text-green-400">{data.target_price || '-'}</span>
                        </div>
                    </div>

                    {data.notes && (
                        <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5 relative">
                            <span className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] text-slate-400 uppercase tracking-widest">Logic</span>
                            <p className="text-sm text-slate-300 italic leading-relaxed">"{data.notes}"</p>
                        </div>
                    )}

                    {/* Footer for Capture Only */}
                    {isForCapture && (
                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">TD</div>
                                <div>
                                    <div className="font-bold text-white text-sm">Traders Diary</div>
                                    <div className="text-xs text-slate-400">tradediary.equitymarvels.com</div>
                                </div>
                            </div>
                            <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
                        </div>
                    )}
                </div>
            );
        }

        if (variant === 'study' && data) {
            return (
                <div className={`flex flex-col h-full ${isForCapture ? 'p-10 gap-8' : 'gap-6'}`}>
                    {/* Header Section */}
                    <div className="flex items-center justify-between shrink-0">
                        <div>
                            <span className="text-xs text-indigo-400 font-bold tracking-widest uppercase mb-1 block">Market Analysis</span>
                            <h3 className={`${isForCapture ? 'text-4xl' : 'text-2xl'} font-black text-white tracking-tight leading-tight`}>
                                {data.title}
                            </h3>
                        </div>
                        {/* Header Badge */}
                        <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${data.direction === 'LONG' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : data.direction === 'SHORT' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-700/50 text-slate-400 border border-white/5'}`}>
                            <span className={`${isForCapture ? 'text-2xl' : 'text-sm'} font-bold uppercase`}>{data.direction || 'NEUTRAL'}</span>
                        </div>
                    </div>

                    {/* Vertical Layout: Image First, then Data/Content */}

                    {/* Image Section (Main Focus) */}
                    {data.images && data.images.length > 0 && (
                        <div className={`w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 flex items-center justify-center ${isForCapture ? 'min-h-[400px] max-h-[600px] flex-1' : 'aspect-video'}`}>
                            <img
                                src={data.images[0]}
                                alt="Chart"
                                className="w-full h-full object-contain"
                                crossOrigin="anonymous"
                            />
                        </div>
                    )}

                    {/* Data Bar (Under Image) */}
                    <div className="flex flex-wrap gap-4 shrink-0">
                        {data.price && (
                            <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/5 flex items-center gap-3">
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">CMP</span>
                                <span className={`${isForCapture ? 'text-2xl' : 'text-lg'} font-bold text-white tabular-nums`}>₹{data.price.toFixed(2)}</span>
                            </div>
                        )}
                        {data.probability && (
                            <div className={`px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3 ${data.probability === 'HIGH' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/50 text-slate-400'}`}>
                                <span className="text-xs opacity-70 uppercase font-bold tracking-wider">Prob</span>
                                <span className={`${isForCapture ? 'text-2xl' : 'text-lg'} font-bold uppercase`}>{data.probability.replace('_', ' ')}</span>
                            </div>
                        )}
                    </div>

                    {/* Content Text (Footer of the logic) */}
                    <div className="bg-slate-800/30 p-6 rounded-xl border border-white/5 relative shrink-0">
                        <span className="absolute -top-3 left-6 px-2 bg-slate-900 text-[10px] text-slate-400 uppercase tracking-widest border border-white/5 rounded">Logic</span>
                        <p className={`text-slate-300 font-medium whitespace-pre-wrap ${isForCapture
                            ? 'text-lg leading-relaxed'
                            : 'text-sm leading-relaxed max-h-[150px] overflow-y-auto'
                            }`}>
                            {data.content}
                        </p>
                    </div>

                    {/* Footer specific for Capture */}
                    {isForCapture && (
                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">TD</div>
                                <div>
                                    <div className="text-lg font-bold text-white">Traders Diary</div>
                                    <div className="text-sm text-slate-400">tradediary.equitymarvels.com</div>
                                </div>
                            </div>
                            <div className="text-sm text-slate-500 opacity-75 font-mono">
                                {new Date(data.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return children;
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`bg-slate-900 border border-white/10 rounded-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh] ${variant === 'study' ? 'max-w-5xl' : 'max-w-md'}`}>

                {/* Modal Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-bold text-white">Share Preview</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* VISIBLE SCROLLABLE CONTENT */}
                <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center bg-slate-950/50">
                    <div
                        className="w-full bg-slate-900 rounded-xl overflow-hidden border border-white/5 relative shadow-xl"
                        style={{ background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' }}
                    >
                        <div className="p-6">
                            {renderContent(false)}
                        </div>
                        {/* Visible Footer (only for screen) */}
                        <div className="bg-slate-950/80 p-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/20">TD</div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-sm font-bold text-white tracking-wide leading-tight">Traders Diary</span>
                                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">https://tradediary.equitymarvels.com</span>
                                </div>
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">{new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-4">This is how your share will look.</p>
                </div>

                {/* HIDDEN CAPTURE CONTAINER (Dynamic Height, Fixed Width for consistency) */}
                <div style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}>
                    <div
                        ref={hiddenCardRef} // Target for html2canvas
                        style={{
                            width: '800px', // Standard width for mobile/vertical sharing
                            // height: 'auto', // Let height be natural
                            minHeight: '600px',
                            background: '#020617', // Slate-950
                            padding: '40px',
                            display: 'flex',
                            flexDirection: 'column',
                            fontFamily: 'sans-serif'
                        }}
                    >

                        {/* We use the shared visual component for identity between download and link preview */}
                        {variant === 'watchlist' && data ? (
                            <WatchCardView item={{
                                ...data,
                                direction: data.direction as 'LONG' | 'SHORT'
                            }} />
                        ) : variant === 'study' && data ? (
                            <StudyCardView data={data} />
                        ) : (
                            renderContent(true)
                        )}
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
