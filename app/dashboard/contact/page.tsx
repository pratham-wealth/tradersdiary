"use client";

import { useState } from "react";
import { MessageSquare, Mail, Send, User, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        toast.success("Message sent! We'll get back to you shortly.");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
            <div className="text-center space-y-1 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Contact Support
                </h1>
                <p className="text-sm text-slate-400">Have any questions? We&apos;re here to help.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Contact Methods (Compact) */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href="https://wa.me/918275298208"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-green-500/50 hover:bg-slate-900 transition-all group text-center"
                        >
                            <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-200 text-base">WhatsApp</h3>
                                <p className="text-sm text-green-400 font-semibold mt-0.5">+91 8275298208</p>
                            </div>
                        </a>

                        <a
                            href="mailto:paidsignals@gmail.com"
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all group text-center"
                        >
                            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-200 text-base">Email</h3>
                                <p className="text-sm text-indigo-400 font-semibold mt-0.5 break-all">paidsignals@gmail.com</p>
                            </div>
                        </a>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
                        <h3 className="font-bold text-slate-200 text-sm mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" /> Operating Hours
                        </h3>
                        <div className="space-y-3 text-xs text-slate-400">
                            <div className="flex justify-between items-center bg-slate-950/50 p-2.5 rounded border border-slate-800/50">
                                <span className="font-medium">Mon - Fri</span>
                                <span className="font-bold text-slate-300">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-950/50 p-2.5 rounded border border-slate-800/50">
                                <span className="font-medium">Saturday</span>
                                <span className="font-bold text-slate-300">10:00 AM - 2:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:col-span-8">
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                        <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                            <Send className="w-4 h-4 text-indigo-400" />
                            Send a message
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-400 ml-1">Your Name</label>
                                <div className="relative group">
                                    <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Name"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-400 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Email"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-medium text-slate-400 ml-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="your message..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Message <Send className="w-3 h-3" /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
