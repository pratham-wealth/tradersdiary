'use client';

import { useState } from 'react';

interface StatsCardProps {
    label: string;
    value: string | number;
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'green' | 'red' | 'blue' | 'gray';
}

export function StatsCard({ label, value, subtitle, trend, color = 'gray' }: StatsCardProps) {
    const colorClasses = {
        green: 'text-long',
        red: 'text-short',
        blue: 'text-blue-600 dark:text-blue-400',
        gray: 'text-gray-900 dark:text-gray-100',
    };

    return (
        <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
            {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            )}
        </div>
    );
}

interface ReportSelectorProps {
    period: 'today' | 'week' | 'month';
    onChange: (period: 'today' | 'week' | 'month') => void;
}

export function ReportSelector({ period, onChange }: ReportSelectorProps) {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => onChange('today')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${period === 'today'
                    ? 'bg-long text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
            >
                Today
            </button>
            <button
                onClick={() => onChange('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${period === 'week'
                    ? 'bg-long text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
            >
                This Week
            </button>
            <button
                onClick={() => onChange('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${period === 'month'
                    ? 'bg-long text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
            >
                This Month
            </button>
        </div>
    );
}

import { StrategyStats } from '@/app/dashboard/reports/actions';

interface StrategyTableProps {
    strategies: StrategyStats[];
}

export function StrategyTable({ strategies }: StrategyTableProps) {
    if (strategies.length === 0) {
        return (
            <div className="card p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No strategy data available</p>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Strategy
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Trades
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Win Rate
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                P&L
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {strategies.map((strategy) => (
                            <tr key={strategy.strategyName} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {strategy.strategyName}
                                </td>
                                <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                                    {strategy.trades}
                                </td>
                                <td className="px-4 py-3 text-sm text-right">
                                    <span
                                        className={`font-semibold ${strategy.winRate >= 50 ? 'text-long' : 'text-short'
                                            }`}
                                    >
                                        {strategy.winRate.toFixed(1)}%
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-right">
                                    <span
                                        className={`font-bold ${strategy.totalPnL > 0
                                            ? 'text-long'
                                            : strategy.totalPnL < 0
                                                ? 'text-short'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        {strategy.totalPnL > 0 ? '+' : ''}
                                        {strategy.totalPnL.toFixed(2)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
