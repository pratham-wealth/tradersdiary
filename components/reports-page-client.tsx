'use client';

import { useState, useEffect } from 'react';
import { StatsCard, ReportSelector, StrategyTable } from './analytics-components';
import { calculateStats, getStrategyStats, getTradesForPeriod, type TradeStats, type StrategyStats } from '@/app/dashboard/reports/actions';
import { getDateRange } from '@/lib/analytics';
import { ShareWithSocials } from './share-with-socials';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TradeReportPDF } from './trade-report-pdf';
import { Download } from 'lucide-react';

export function ReportsPageClient() {
    const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
    const [stats, setStats] = useState<TradeStats | null>(null);
    const [strategyStats, setStrategyStats] = useState<StrategyStats[]>([]);
    const [trades, setTrades] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            setLoading(true);
            const { start, end } = getDateRange(period);

            const [tradeStats, strategies, periodTrades] = await Promise.all([
                calculateStats(start, end),
                getStrategyStats(start, end),
                getTradesForPeriod(start, end),
            ]);

            setStats(tradeStats);
            setStrategyStats(strategies);
            setTrades(periodTrades);
            setLoading(false);
        }

        loadStats();
    }, [period]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-long mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading report...</p>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="card p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">Unable to load statistics</p>
            </div>
        );
    }

    const periodLabels = {
        today: 'Today',
        week: 'This Week',
        month: 'This Month',
    };

    const shareText = stats
        ? `My Trading Performance (${periodLabels[period]}):
Trades: ${stats.totalTrades}
Win Rate: ${stats.winRate.toFixed(1)}% 🎯
P&L: ${stats.totalPnL > 0 ? '+' : ''}${stats.totalPnL.toFixed(2)} pts 📈

Tracked with @TradeNoteApp`
        : '';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Performance Report
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Analyze your trading performance
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* PDF Download Moved to Bottom */}
                    <ShareWithSocials
                        title="Share Report"
                        text={shareText}
                        hashTags={['trading', 'stocks', 'performance']}
                    />
                </div>
            </div>

            {/* Period Selector */}
            <ReportSelector period={period} onChange={setPeriod} />

            {/* Overview Stats */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {periodLabels[period]} Summary
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatsCard
                        label="Total Trades"
                        value={stats.totalTrades}
                        subtitle={`${stats.openTrades} open`}
                        color="blue"
                    />
                    <StatsCard
                        label="Win Rate"
                        value={`${stats.winRate.toFixed(1)}%`}
                        subtitle={`${stats.wins}W / ${stats.losses}L`}
                        color={stats.winRate >= 50 ? 'green' : 'red'}
                    />
                    <StatsCard
                        label="Total P&L"
                        value={`${stats.totalPnL > 0 ? '+' : ''}${stats.totalPnL.toFixed(2)}`}
                        subtitle="Points"
                        color={stats.totalPnL > 0 ? 'green' : stats.totalPnL < 0 ? 'red' : 'gray'}
                    />
                    <StatsCard
                        label="Best Trade"
                        value={`+${stats.bestTrade.toFixed(2)}`}
                        subtitle={`Worst: ${stats.worstTrade.toFixed(2)}`}
                        color="green"
                    />
                </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="card p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Performance Metrics
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Closed Trades</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {stats.closedTrades}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Wins</span>
                            <span className="font-semibold text-long">{stats.wins}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Losses</span>
                            <span className="font-semibold text-short">{stats.losses}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Breakeven</span>
                            <span className="font-semibold text-gray-600 dark:text-gray-400">
                                {stats.breakeven}
                            </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                            <span className="text-gray-600 dark:text-gray-400">Avg Win</span>
                            <span className="font-semibold text-long">
                                +{stats.avgWin.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Avg Loss</span>
                            <span className="font-semibold text-short">
                                {stats.avgLoss.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Trade Distribution
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">LONG Trades</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {stats.longTrades}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">SHORT Trades</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {stats.shortTrades}
                            </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block text-long">
                                            Win Rate Progress
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-long">
                                            {stats.winRate.toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                                    <div
                                        style={{ width: `${Math.min(stats.winRate, 100)}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-long"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategy Breakdown */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Strategy Performance
                </h3>
                <StrategyTable strategies={strategyStats} />
            </div>

            {/* Export Button (Pro only) */}
            <div className="card p-6 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            Export Report
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Download PDF report (Pro feature)
                        </p>
                    </div>
                    {stats ? (
                        <PDFDownloadLink
                            document={
                                <TradeReportPDF
                                    title={`Trade Report - ${period.toUpperCase()}`}
                                    dateRange={new Date().toLocaleDateString()}
                                    trades={trades}
                                    summary={{
                                        total: stats.totalTrades,
                                        wins: stats.wins,
                                        losses: stats.losses,
                                        winRate: stats.winRate.toFixed(1),
                                    }}
                                />
                            }
                            fileName={`Report_${period}_${new Date().toISOString().split('T')[0]}.pdf`}
                            className="px-4 py-2 bg-long text-white rounded-lg font-medium hover:bg-long-dark transition-colors flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </PDFDownloadLink>
                    ) : (
                        <button disabled className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium">
                            Loading...
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
