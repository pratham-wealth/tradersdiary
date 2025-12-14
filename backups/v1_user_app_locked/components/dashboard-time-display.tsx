'use client';

import { useEffect, useState } from 'react';

export function DashboardTimeDisplay() {
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setMounted(true);
        setTime(new Date());

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted || !time) {
        // Return a placeholder or nothing to prevent hydration mismatch
        return <p className="text-sm text-gray-400 mt-1 h-5 animate-pulse rounded w-64 bg-slate-800/50"></p>;
    }

    // Format: "Today is .. Sunday 14th Dec, 2025 and It's 10:24pm Now"

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[time.getDay()];
    const dateNum = time.getDate();
    const monthName = months[time.getMonth()];
    const year = time.getFullYear();

    // Add suffix to date (st, nd, rd, th)
    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    const dateFormatted = getOrdinal(dateNum);

    // Format time 10:24pm
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const timeFormatted = `${hours}:${minutesStr}${ampm}`;

    return (
        <p className="text-sm text-gray-400 mt-1 font-medium">
            Today is .. <span className="text-gold-400/80">{dayName} {dateFormatted} {monthName}, {year}</span> and It&apos;s <span className="text-gold-400/80">{timeFormatted}</span> Now
        </p>
    );
}
