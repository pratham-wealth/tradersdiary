import { FileText } from 'lucide-react';

export default function ExportPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="w-20 h-20 bg-midnight-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-midnight-700">
                <FileText className="w-10 h-10 text-gold-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Export Data</h1>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
                The ability to export your trading journal and performance data to CSV/PDF is coming soon.
            </p>
            <div className="inline-block px-4 py-2 bg-midnight-900 border border-midnight-800 rounded-lg text-slate-500 text-sm">
                In Development
            </div>
        </div>
    );
}
