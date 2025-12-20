'use client';

import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingFooter } from '@/components/landing/landing-footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success('Message sent! We\'ll get back to you soon.');
            setLoading(false);
            (e.target as HTMLFormElement).reset();
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-midnight-950 text-white">
            <LandingNavbar />
            <div className="pt-24 pb-20">
                {/* Header */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Get in Touch</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                                <p className="text-slate-400 mb-8">
                                    Reach out to us through any of these channels.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-gold-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Email</h3>
                                        <a href="mailto:wealthacademy@equitymarvels.com" className="text-slate-400 hover:text-gold-400 transition-colors">
                                            wealthacademy@equitymarvels.com
                                        </a>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-gold-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Phone</h3>
                                        <a href="tel:+918275298208" className="text-slate-400 hover:text-gold-400 transition-colors">
                                            (+91) 8275298208
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-gold-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Office</h3>
                                        <p className="text-slate-400">
                                            Mumbai, Maharashtra, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-midnight-900/50 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-white font-bold mb-3">Business Hours</h3>
                                <div className="space-y-2 text-sm text-slate-400">
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                                    <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-midnight-900/50 border border-white/10 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full px-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full px-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 bg-midnight-900 border border-midnight-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-xl font-bold text-lg shadow-lg shadow-gold-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LandingFooter />
        </main>
    );
}
