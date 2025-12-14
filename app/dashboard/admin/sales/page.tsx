import { getSalesData } from '@/app/dashboard/admin/actions';
import { CreditCard, IndianRupee, Activity, ShieldCheck, ArrowUpRight, Wallet, Calendar, AlertCircle, Clock } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { DownloadReports } from '@/components/admin/download-reports';

export default async function AdminSalesPage() {
    const { data: sales, error } = await getSalesData();

    if (error || !sales) {
        return (
            <div className="p-4 bg-red-900/20 text-red-200 rounded-lg border border-red-500/50 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-500" />
                <span>Error loading sales data: {error || 'No data returned'}</span>
            </div>
        );
    }

    // Helper to format currency
    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Sales & Renewals
                    </h2>
                    <p className="text-slate-400 mt-1">Comprehensive financial tracking and subscription monitoring.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <DownloadReports allTransactions={sales.allTransactions} />
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800 h-9">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE DATA
                    </div>
                </div>
            </div>

            {/* Sales Metrics Board */}
            <div>
                <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-500" />
                    Sales Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Today */}
                    <div className="bg-slate-900/50 backdrop-blur-xl p-5 rounded-xl border border-slate-700/50 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sales Today</p>
                                <h4 className="text-2xl font-bold text-white mt-1">{formatCurrency(sales.salesToday.revenue)}</h4>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2 py-1 rounded">
                                {sales.salesToday.count} txns
                            </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {/* This Week */}
                    <div className="bg-slate-900/50 backdrop-blur-xl p-5 rounded-xl border border-slate-700/50 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sales This Week</p>
                                <h4 className="text-2xl font-bold text-white mt-1">{formatCurrency(sales.salesWeek.revenue)}</h4>
                            </div>
                            <span className="bg-blue-500/10 text-blue-400 text-xs font-medium px-2 py-1 rounded">
                                {sales.salesWeek.count} txns
                            </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {/* This Month */}
                    <div className="bg-slate-900/50 backdrop-blur-xl p-5 rounded-xl border border-slate-700/50 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sales This Month</p>
                                <h4 className="text-2xl font-bold text-white mt-1">{formatCurrency(sales.salesMonth.revenue)}</h4>
                            </div>
                            <span className="bg-purple-500/10 text-purple-400 text-xs font-medium px-2 py-1 rounded">
                                {sales.salesMonth.count} txns
                            </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="bg-purple-500 h-full rounded-full" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Gateways & Renewals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gateways */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-blue-500" />
                        Payment Gateways (All Time)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-blue-900/30 rounded text-blue-400">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-300">PayPal</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{formatCurrency(sales.gatewayStats.paypal.revenue)}</div>
                            <div className="text-sm text-slate-500">{sales.gatewayStats.paypal.count} transactions</div>
                        </div>
                        <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-indigo-900/30 rounded text-indigo-400">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-300">Razorpay</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{formatCurrency(sales.gatewayStats.razorpay.revenue)}</div>
                            <div className="text-sm text-slate-500">{sales.gatewayStats.razorpay.count} transactions</div>
                        </div>
                    </div>
                </div>

                {/* Renewals */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        Renewal Alerts
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-amber-900/10 p-4 rounded-lg border border-amber-500/20 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-amber-500 mb-1">{sales.renewals.dueToday}</span>
                            <span className="text-xs text-amber-200/70 font-medium uppercase break-words w-full">Due Today</span>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-white mb-1">{sales.renewals.dueThisWeek}</span>
                            <span className="text-xs text-slate-400 font-medium uppercase break-words w-full">Due Week</span>
                        </div>
                        <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/20 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-red-500 mb-1">{sales.renewals.missed}</span>
                            <span className="text-xs text-red-200/70 font-medium uppercase break-words w-full">Missed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg">Recent Transactions</h3>
                    <div className="text-sm text-slate-500">Showing last 50</div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-950/50">
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-400 font-medium whitespace-nowrap">Date</TableHead>
                                <TableHead className="text-slate-400 font-medium">User Details</TableHead>
                                <TableHead className="text-slate-400 font-medium">Plan</TableHead>
                                <TableHead className="text-slate-400 font-medium">Gateway</TableHead>
                                <TableHead className="text-slate-400 font-medium text-right">Amount</TableHead>
                                <TableHead className="text-slate-400 font-medium text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales.recentTransactions.map((tx: any) => (
                                <TableRow key={tx.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="text-slate-400 text-sm font-mono whitespace-nowrap">
                                        {new Date(tx.date).toLocaleDateString()}
                                        <span className="block text-xs text-slate-600">
                                            {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col max-w-[200px]">
                                            <span className="text-slate-200 font-medium text-sm truncate" title={tx.user_name}>
                                                {tx.user_name}
                                            </span>
                                            <span className="text-slate-500 text-xs truncate" title={tx.user_email}>
                                                {tx.user_email}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize border",
                                            tx.plan === 'premium' ? "bg-purple-900/20 text-purple-300 border-purple-500/30" :
                                                tx.plan === 'pro' ? "bg-amber-900/20 text-amber-300 border-amber-500/30" :
                                                    "bg-slate-800 text-slate-300 border-slate-700"
                                        )}>
                                            {tx.plan}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                                            {tx.gateway}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="text-emerald-400 font-bold font-mono">
                                            {tx.currency} {parseFloat(tx.amount).toLocaleString()}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-950/30 px-2 py-1 rounded-full border border-emerald-500/20">
                                                <ShieldCheck className="w-3 h-3" />
                                                PAID
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {sales.recentTransactions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                                        No transactions recorded yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
