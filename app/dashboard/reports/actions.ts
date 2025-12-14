'use server';

import { createClient } from '@/lib/supabase/server';

export interface TradeStats {
    totalTrades: number;
    openTrades: number;
    closedTrades: number;
    wins: number;
    losses: number;
    breakeven: number;
    winRate: number;
    totalPnL: number;
    avgWin: number;
    avgLoss: number;
    bestTrade: number;
    worstTrade: number;
    longTrades: number;
    shortTrades: number;
}

export interface StrategyStats {
    strategyName: string;
    trades: number;
    wins: number;
    losses: number;
    winRate: number;
    totalPnL: number;
}

export async function calculateStats(
    startDate: Date,
    endDate: Date
): Promise<TradeStats | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: trades } = await supabase
        .from('trades')
        .select('*')
        .eq('user_id', user.id)
        .gte('entry_date', startDate.toISOString())
        .lte('entry_date', endDate.toISOString());

    if (!trades || trades.length === 0) {
        return {
            totalTrades: 0,
            openTrades: 0,
            closedTrades: 0,
            wins: 0,
            losses: 0,
            breakeven: 0,
            winRate: 0,
            totalPnL: 0,
            avgWin: 0,
            avgLoss: 0,
            bestTrade: 0,
            worstTrade: 0,
            longTrades: 0,
            shortTrades: 0,
        };
    }

    const closedTrades = trades.filter((t) => t.outcome !== 'OPEN');
    const wins = closedTrades.filter((t) => t.outcome === 'WIN' || (t.outcome === 'MANUAL_EXIT' && (t.pnl_points || 0) > 0));
    const losses = closedTrades.filter((t) => t.outcome === 'LOSS' || (t.outcome === 'MANUAL_EXIT' && (t.pnl_points || 0) < 0));
    const breakeven = closedTrades.filter((t) => t.outcome === 'BREAKEVEN' || (t.outcome === 'MANUAL_EXIT' && (t.pnl_points || 0) === 0));

    const totalPnL = closedTrades.reduce((sum, t) => sum + (t.pnl_points || 0), 0);
    const winPnL = wins.reduce((sum, t) => sum + (t.pnl_points || 0), 0);
    const lossPnL = losses.reduce((sum, t) => sum + (t.pnl_points || 0), 0);

    const pnlValues = closedTrades
        .map((t) => t.pnl_points || 0)
        .filter((p) => p !== 0);

    return {
        totalTrades: trades.length,
        openTrades: trades.filter((t) => t.outcome === 'OPEN').length,
        closedTrades: closedTrades.length,
        wins: wins.length,
        losses: losses.length,
        breakeven: breakeven.length,
        winRate: closedTrades.length > 0 ? (wins.length / closedTrades.length) * 100 : 0,
        totalPnL,
        avgWin: wins.length > 0 ? winPnL / wins.length : 0,
        avgLoss: losses.length > 0 ? lossPnL / losses.length : 0,
        bestTrade: pnlValues.length > 0 ? Math.max(...pnlValues) : 0,
        worstTrade: pnlValues.length > 0 ? Math.min(...pnlValues) : 0,
        longTrades: trades.filter((t) => t.direction === 'LONG').length,
        shortTrades: trades.filter((t) => t.direction === 'SHORT').length,
    };
}

export async function getStrategyStats(
    startDate: Date,
    endDate: Date
): Promise<StrategyStats[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data: trades } = await supabase
        .from('trades')
        .select('*, strategy:strategies(*)')
        .eq('user_id', user.id)
        .gte('entry_date', startDate.toISOString())
        .lte('entry_date', endDate.toISOString())
        .neq('outcome', 'OPEN');

    if (!trades || trades.length === 0) return [];

    // Group by strategy
    const strategyMap = new Map<string, any[]>();

    trades.forEach((trade) => {
        const strategyName = trade.strategy?.name || 'No Strategy';
        if (!strategyMap.has(strategyName)) {
            strategyMap.set(strategyName, []);
        }
        strategyMap.get(strategyName)!.push(trade);
    });

    // Calculate stats for each strategy
    const strategyStats: StrategyStats[] = [];

    strategyMap.forEach((strategyTrades, strategyName) => {
        const wins = strategyTrades.filter((t) => t.outcome === 'WIN' || (t.outcome === 'MANUAL_EXIT' && (t.pnl_points || 0) > 0)).length;
        const losses = strategyTrades.filter((t) => t.outcome === 'LOSS' || (t.outcome === 'MANUAL_EXIT' && (t.pnl_points || 0) < 0)).length;
        const totalPnL = strategyTrades.reduce((sum, t) => sum + (t.pnl_points || 0), 0);
        const totalClosed = wins + losses;

        strategyStats.push({
            strategyName,
            trades: strategyTrades.length,
            wins,
            losses,
            winRate: totalClosed > 0 ? (wins / totalClosed) * 100 : 0,
            totalPnL,
        });
    });

    return strategyStats.sort((a, b) => b.totalPnL - a.totalPnL);
}

export async function getTradesForPeriod(
    startDate: Date,
    endDate: Date
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data: trades } = await supabase
        .from('trades')
        .select('*, strategy:strategies(name), study:studies(title, content)')
        .eq('user_id', user.id)
        .gte('entry_date', startDate.toISOString())
        .lte('entry_date', endDate.toISOString())
        .order('entry_date', { ascending: false });

    return trades || [];
}
