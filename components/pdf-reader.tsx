'use client';

import { X, Download } from 'lucide-react';

interface PDFReaderProps {
    url: string;
    title: string;
    userEmail: string;
    onClose: () => void;
}

export function PDFReader({ url, title, userEmail, onClose }: PDFReaderProps) {
    const stampText = `Licensed to ${userEmail} • TradeNote Library`;

    // Mozilla PDF.js viewer - works on desktop & mobile without forced downloads
    const pdfViewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}#pagemode=none`;

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 shrink-0">
                <div className="flex-1 min-w-0 mr-4">
                    <h2 className="text-white font-bold text-sm md:text-lg truncate">{title}</h2>
                    <p className="text-slate-400 text-xs">{stampText}</p>
                </div>

                <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden bg-slate-800">
                <iframe
                    src={pdfViewerUrl}
                    title={title}
                    className="w-full h-full border-none"
                />
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-900 border-t border-white/10 shrink-0">
                <p className="text-slate-500 text-xs text-center">
                    📱 Full in-app PDF viewing on all devices • Zoom, navigate, and read without downloads
                </p>
            </div>
        </div>
    );
}
