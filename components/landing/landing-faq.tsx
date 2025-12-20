'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "What is The Traders Diary?",
        answer: "The Traders Diary is a digital trading journal and tracking platform designed to help traders record market analysis, document strategies, log trades, and review performance in a structured way.\n\nIt is built for traders across stocks, forex, crypto, commodities, and other markets."
    },
    {
        question: "Is The Traders Diary a trading advisory or signal service?",
        answer: "No.\n\nThe Traders Diary does not provide trading tips, buy/sell recommendations, signals, or investment advice.\n\nIt is purely a self-managed documentation and learning tool where users record and track their own trading-related information."
    },
    {
        question: "Who can use The Traders Diary?",
        answer: "The Traders Diary is suitable for:\n\n• Beginner traders\n• Part-time traders\n• Active traders\n• Experienced traders\n• Traders across any market or instrument\n\nYou do not need to be an analyst or professional trader to use the app."
    },
    {
        question: "Can beginners use this app effectively?",
        answer: "Yes.\n\nEven beginners can:\n\n• Record analysis shared by others\n• Save trade ideas and important levels\n• Track outcomes and learn over time\n• Build discipline from the very beginning\n\nThe app is designed to support learning traders, not just experts."
    },
    {
        question: "Do I need to trade daily to use The Traders Diary?",
        answer: "No.\n\nYou can use The Traders Diary:\n\n• Daily\n• Weekly\n• Occasionally\n\nIt works for traders with any trading frequency."
    },
    {
        question: "Which markets does The Traders Diary support?",
        answer: "The Traders Diary can be used for:\n\n• Stock markets\n• Forex\n• Crypto\n• Commodities\n• Indices\n• Any tradable instrument\n\nThe platform is market-agnostic."
    },
    {
        question: "Is my trading data safe and private?",
        answer: "Yes.\n\n• Your data is stored securely\n• Your trading entries are private\n• Your data is not shared or sold\n• No one else can view your analysis or trades\n\nYour journal belongs only to you."
    },
    {
        question: "Does The Traders Diary guarantee profits or success?",
        answer: "No.\n\nTrading involves risk, and outcomes depend entirely on the user's decisions.\n\nThe Traders Diary helps improve process, discipline, and learning, but it does not guarantee profits or success."
    },
    {
        question: "Can I track multiple strategies at the same time?",
        answer: "Yes.\n\nYou can:\n\n• Document multiple strategies\n• Tag each trade and analysis with a strategy\n• Review performance strategy-wise\n\nThis helps identify which strategies work best for you."
    },
    {
        question: "Can I upload my own trading books or PDFs?",
        answer: "Yes.\n\nThe Traders Diary allows you to:\n\n• Upload trading-related books or documents\n• Organize them neatly\n• Read them directly inside the app\n\nThis helps keep learning resources accessible and organized."
    },
    {
        question: "Is this a mobile app or a web app?",
        answer: "The Traders Diary is a web-based application and can be accessed through modern browsers on desktops, laptops, tablets, and mobile devices."
    },
    {
        question: "Is there any free trial or refund?",
        answer: "Access to The Traders Diary is provided through a digital subscription.\n\nDue to the nature of digital access:\n\n• No refunds are offered once access is granted\n• Users are encouraged to review platform details carefully before subscribing."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Subscription terms depend on the selected plan and platform policies.\nOnce access is granted, no refunds are applicable."
    },
    {
        question: "Will my data be lost if I stop using the app?",
        answer: "If you choose to discontinue usage, your data remains stored securely for a limited period, subject to platform policies.\nYou may request account deletion if required."
    },
    {
        question: "Do I need any special software or tools to use this app?",
        answer: "No.\n\nYou only need:\n\n• An internet connection\n• A modern web browser\n\nNo additional software is required."
    },
    {
        question: "Does The Traders Diary work globally?",
        answer: "Yes.\n\nThe platform is accessible globally and can be used by traders from any country."
    },
    {
        question: "How does this app help improve trading performance?",
        answer: "The Traders Diary helps by:\n\n• Encouraging structured thinking\n• Reducing emotional decision-making\n• Making mistakes visible\n• Turning experience into data\n\nImprovement comes from review and reflection, not shortcuts."
    },
    {
        question: "How do I get started?",
        answer: "Simply:\n\n• Create an account\n• Start recording analysis or trades\n• Review your entries over time\n\nDiscipline begins with the first entry."
    }
];

export function LandingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-midnight-900/50 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <HelpCircle className="w-4 h-4" />
                        FAQ
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Frequently Asked <span className="text-blue-400">Questions</span>
                    </h2>
                    <p className="text-xl text-slate-400">
                        Everything you need to know about The Traders Diary
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-midnight-950/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/30 transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left group"
                            >
                                <span className="text-lg font-bold text-white pr-8 group-hover:text-blue-400 transition-colors">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-400' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-8 pb-6 text-slate-300 leading-relaxed whitespace-pre-line">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
