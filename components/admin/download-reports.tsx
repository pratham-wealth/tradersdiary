'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { SalesPDF } from './sales-report-document';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

type DownloadReportsProps = {
    allTransactions: any[];
};

export function DownloadReports({ allTransactions }: DownloadReportsProps) {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Reset now usage

    const todayTransactions = allTransactions.filter(tx => new Date(tx.date) >= startOfDay);
    const weekTransactions = allTransactions.filter(tx => new Date(tx.date) >= startOfWeek);
    const monthTransactions = allTransactions.filter(tx => new Date(tx.date) >= startOfMonth);

    return (
        <div className="flex flex-wrap gap-3">
            <PDFDownloadLink
                document={<SalesPDF period="Today" data={{}} transactions={todayTransactions} />}
                fileName={`sales_report_today_${new Date().toISOString().split('T')[0]}.pdf`}
            >
                {({ loading }) => (
                    <Button variant="outline" size="sm" disabled={loading} className="gap-2 bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300">
                        <FileDown className="w-4 h-4" />
                        {loading ? 'Generating...' : 'Report: Today'}
                    </Button>
                )}
            </PDFDownloadLink>

            <PDFDownloadLink
                document={<SalesPDF period="This Week" data={{}} transactions={weekTransactions} />}
                fileName={`sales_report_week_${new Date().toISOString().split('T')[0]}.pdf`}
            >
                {({ loading }) => (
                    <Button variant="outline" size="sm" disabled={loading} className="gap-2 bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300">
                        <FileDown className="w-4 h-4" />
                        {loading ? 'Generating...' : 'Report: This Week'}
                    </Button>
                )}
            </PDFDownloadLink>

            <PDFDownloadLink
                document={<SalesPDF period="This Month" data={{}} transactions={monthTransactions} />}
                fileName={`sales_report_month_${new Date().toISOString().split('T')[0]}.pdf`}
            >
                {({ loading }) => (
                    <Button variant="outline" size="sm" disabled={loading} className="gap-2 bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300">
                        <FileDown className="w-4 h-4" />
                        {loading ? 'Generating...' : 'Report: This Month'}
                    </Button>
                )}
            </PDFDownloadLink>
        </div>
    );
}
