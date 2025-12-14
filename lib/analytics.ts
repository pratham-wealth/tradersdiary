// Utility function for Date Ranges

export function getDateRange(period: 'today' | 'week' | 'month'): { start: Date; end: Date } {
    const end = new Date();
    const start = new Date();

    if (period === 'today') {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
    } else if (period === 'week') {
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday
        start.setDate(diff);
        start.setHours(0, 0, 0, 0);
    } else if (period === 'month') {
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
    }

    return { start, end };
}


