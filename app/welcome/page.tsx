'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const quotes = [
    "Hope you will Rock Today!!",
    "Plan your trade, trade your plan.",
    "The trend is your friend.",
    "Patience is a trader's greatest virtue.",
    "Risk comes from not knowing what you're doing.",
    "Focus on the process, not the profit.",
    "Cut your losses short and let your winners run."
];

export default function WelcomePage() {
    const [name, setName] = useState<string>('Trader');
    const [quote, setQuote] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Pick random quote
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

        async function getUser() {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.full_name) {
                setName(user.user_metadata.full_name.split(' ')[0]); // First name
            } else if (user?.email) {
                setName(user.email.split('@')[0]);
            }
            setLoading(false);
        }
        getUser();
    }, []);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-2xl w-full text-center relative z-10"
            >
                <motion.div variants={item} className="mb-8 flex justify-center">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20 transform -rotate-3">
                        <TrendingUp className="w-12 h-12 text-white" />
                    </div>
                </motion.div>

                <motion.h1
                    variants={item}
                    className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
                >
                    Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{loading ? '...' : name}</span>
                </motion.h1>

                <motion.div variants={item} className="mb-12">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-sm">
                        <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <span className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 italic">
                            &quot;{quote}&quot;
                        </span>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all transform hover:-translate-y-1 active:translate-y-0"
                    >
                        <span>Go to Dashboard</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}
