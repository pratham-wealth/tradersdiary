import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a number as points with +/- sign
 */
export function formatPoints(points: number): string {
    const sign = points >= 0 ? '+' : '';
    return `${sign}${points.toFixed(2)}`;
}

/**
 * Format a price to 2 decimal places
 */
export function formatPrice(price: number): string {
    return price.toFixed(2);
}

/**
 * Get color class based on trade outcome
 */
export function getOutcomeColor(outcome: string): string {
    switch (outcome) {
        case 'WIN':
            return 'text-win border-win bg-win/10';
        case 'LOSS':
            return 'text-loss border-loss bg-loss/10';
        case 'BREAKEVEN':
            return 'text-breakeven border-breakeven bg-breakeven/10';
        case 'OPEN':
            return 'text-blue-600 border-blue-600 bg-blue-50';
        default:
            return 'text-gray-600 border-gray-600 bg-gray-50';
    }
}

/**
 * Get color class based on direction
 */
export function getDirectionColor(direction: string): string {
    return direction === 'LONG'
        ? 'text-long border-long bg-long/10'
        : 'text-short border-short bg-short/10';
}

/**
 * Calculate win rate percentage
 */
export function calculateWinRate(wins: number, total: number): number {
    if (total === 0) return 0;
    return (wins / total) * 100;
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(d);
}

/**
 * Format datetime to readable string with time
 */
export function formatDateTime(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(d);
}

/**
 * Get start and end of current week
 */
export function getWeekRange(date: Date = new Date()): { start: Date; end: Date } {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Sunday
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Saturday
    end.setHours(23, 59, 59, 999);

    return { start, end };
}
