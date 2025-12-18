import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface PDFReaderProps {
    url: string;
    title: string;
    userEmail: string;
    onClose: () => void;
}

export function PDFReader({ url, title, userEmail, onClose }: PDFReaderProps) {
    const [zoom, setZoom] = useState(100);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
    const handleReset = () => setZoom(100);

    // Generate Stamp Text
    const stampText = `Licensed to ${userEmail} • TradeNote Library`;

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 shrink-0">
                <h2 className="text-white font-bold text-sm md:text-lg truncate mr-4 flex-1">{title}</h2>

                {/* Checkers / Controls */}
                <div className="flex items-center gap-2 mr-4 bg-slate-800 rounded-lg p-1">
                    <button onClick={handleZoomOut} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Zoom Out">
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-slate-300 min-w-[3ch] text-center">{zoom}%</span>
                    <button onClick={handleZoomIn} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Zoom In">
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button onClick={handleReset} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Reset Zoom">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Viewer Container - Horizontal Scroll Only on Parent */}
            <div className={`flex-1 relative bg-slate-800 overflow-x-auto overflow-y-hidden flex flex-col ${zoom > 100 ? 'items-start' : 'items-center'}`}>

                {/* Wrapper - Full Height, Dynamic Width */}
                <div
                    className="relative transition-all duration-200 ease-out origin-top shadow-2xl bg-white shrink-0"
                    style={{
                        width: `${zoom}%`,
                        height: '100%',        // Fill the viewport height
                        minWidth: 'auto',
                    }}
                >
                    <div className="w-full h-full relative">
                        <object
                            key={zoom}
                            data={`${url}#toolbar=0&navpanes=0&zoom=${zoom}`}
                            type="application/pdf"
                            className="w-full h-full block"
                        >
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-slate-100">
                                <div className="max-w-xs bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                                    <p className="font-bold text-slate-800 mb-2">PDF Preview Not Supported</p>
                                    <p className="text-xs text-slate-500 mb-6">Mobile browsers often block embedded PDFs. You can view it using Google's engine or download it.</p>

                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold text-sm"
                                        >
                                            View with Google Engine
                                        </a>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-3 bg-slate-100 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors font-bold text-sm"
                                        >
                                            Download / Open Externally
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </object>

                        {/* Secure Stamp Overlay */}
                        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end items-center pb-4 z-10 overflow-hidden mix-blend-multiply">
                            <div className="w-full bg-white/90 border-t border-slate-200 py-1 px-4 text-center">
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold opacity-50 select-none">
                                    {stampText}
                                </p>
                            </div>

                            {/* Watermark - Extra Small and Subtle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 opacity-[0.05] text-lg font-black text-black whitespace-nowrap select-none">
                                {userEmail}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
