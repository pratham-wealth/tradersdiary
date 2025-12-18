import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL || "https://traders-diary.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        default: "Traders Diary - Master Your Trading Journey",
        template: "%s | Traders Diary",
    },
    description: "Your personal professional trading journal for deliberate practice. Track trades, analyze patterns, and master your psychology with Traders Diary.",
    applicationName: "Traders Diary",
    authors: [{ name: "Pratham Wealth Academy", url: "https://prathamwealth.com" }, { name: "ARP Infotech" }],
    keywords: [
        // Core Identity
        "trading journal", "trading diary", "stock market journal", "forex diary", "crypto journal",
        "trading psychology", "deliberate practice", "performance analytics", "trade tracking",

        // Indian Market
        "NSE", "BSE", "Nifty 50", "Bank Nifty", "Sensex", "Indian Stock Market", "F&O Trading",
        "Futures and Options", "Intraday Trading", "Swing Trading India", "Share Market Diary",

        // Forex & International
        "Forex Trading", "Currency Trading", "EURUSD", "GBPUSD", "USDJPY", "XAUUSD", "Gold Trading",
        "US Stocks", "NASDAQ", "S&P 500", "Dow Jones", "Global Markets", "International Stocks",

        // Tools & Templates
        "Trading Tools", "Excel Trading Template", "Notion Trading Template", "Digital Trading Log",
        "Trading Excel Sheet", "Smart Trading Diary", "Automated Trading Journal", "New Year Diary 2025",

        // Analysis & Strategy
        "Technical Analysis", "Fundamental Analysis", "Price Action", "Market Structure",
        "Candlestick Patterns", "Chart Patterns", "Breakout Trading", "Reversal Trading",
        "Supply and Demand", "Support and Resistance", "Trading Strategies", "Scalping",

        // Features
        "Stock Screeners", "Forex Screeners", "Market Outlook", "Watchlist", "Trading Checklist",
        "Risk Management", "Position Sizing", "Portfolio Tracker", "Trading Goals", "Routine Checklist"
    ],
    creator: "ARP Infotech",
    publisher: "Pratham Wealth Academy",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: "/manifest.json",
    themeColor: "#10b981",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: defaultUrl,
        title: "Traders Diary - Professional Trading Journal",
        description: "Track, Analyze, and Improve your trading performance with advanced analytics and deliberate practice tools.",
        siteName: "Traders Diary",
        images: [
            {
                url: "/og-image.png", // We should ideally add an OG image later
                width: 1200,
                height: 630,
                alt: "Traders Diary Dashboard",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Traders Diary - Master the Markets",
        description: "The ultimate trading journal for serious traders. Built by Pratham Wealth Academy.",
        creator: "@PrathamWealth",
        images: ["/og-image.png"],
    },
};

import JsonLd from "@/components/json-ld";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
            >
                <JsonLd />
                <Providers>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
// Trigger Deployment: Final Fixes verified
