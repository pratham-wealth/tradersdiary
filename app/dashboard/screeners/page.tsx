import { ExternalLink, TrendingUp, BarChart2, Globe, Newspaper, Activity, LucideIcon } from 'lucide-react';

interface Resource {
    name: string;
    description: string;
    url: string;
    icon: LucideIcon;
    category: 'Technical' | 'Fundamental' | 'News' | 'Data';
    color: string;
}

const resources: Resource[] = [
    // Technical
    {
        name: 'TradingView',
        description: 'Advanced charting platform with global market data.',
        url: 'https://in.tradingview.com/',
        icon: TrendingUp,
        category: 'Technical',
        color: 'bg-blue-500',
    },
    {
        name: 'Chartink',
        description: 'Indian stock screener with custom scans.',
        url: 'https://chartink.com/',
        icon: BarChart2,
        category: 'Technical',
        color: 'bg-indigo-500',
    },
    {
        name: 'StockEdge',
        description: 'Analytics and visualization for Indian markets.',
        url: 'https://stockedge.com/',
        icon: Activity,
        category: 'Technical',
        color: 'bg-orange-500',
    },

    // Fundamental
    {
        name: 'Screener.in',
        description: 'Fundamental analysis tool for Indian stocks.',
        url: 'https://www.screener.in/',
        icon: BarChart2,
        category: 'Fundamental',
        color: 'bg-green-500',
    },
    {
        name: 'Trendlyne',
        description: 'Stock scores, SWAT analysis, and reports.',
        url: 'https://trendlyne.com/',
        icon: TrendingUp,
        category: 'Fundamental',
        color: 'bg-yellow-500',
    },

    // News & Data
    {
        name: 'MoneyControl',
        description: 'Latest financial news and market data.',
        url: 'https://www.moneycontrol.com/',
        icon: Newspaper,
        category: 'News',
        color: 'bg-red-500',
    },
    {
        name: 'NSE India',
        description: 'Updates from the National Stock Exchange.',
        url: 'https://www.nseindia.com/',
        icon: Globe,
        category: 'Data',
        color: 'bg-purple-500',
    },
];

export default function ScreenersPage() {
    const categories = ['Technical', 'Fundamental', 'News', 'Data'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Market Screeners
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Essential tools and resources for your daily research.
                </p>
            </div>

            <div className="space-y-12">
                {categories.map((category) => {
                    const categoryResources = resources.filter((r) => r.category === category);
                    if (categoryResources.length === 0) return null;

                    return (
                        <div key={category} className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <span className="w-2 h-6 bg-long rounded-full"></span>
                                {category} Tools
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryResources.map((resource) => (
                                    <a
                                        key={resource.name}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        <div className="space-y-4">
                                            <div className={`w-12 h-12 ${resource.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                                                <resource.icon className={`w-6 h-6 ${resource.color.replace('bg-', 'text-')}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-long transition-colors">
                                                    {resource.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {resource.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center text-sm font-medium text-long opacity-0 group-hover:opacity-100 transition-opacity">
                                            Open Tool <ExternalLink className="w-4 h-4 ml-1" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
