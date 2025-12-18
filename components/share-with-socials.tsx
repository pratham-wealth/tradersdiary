'use client';

import { useState } from 'react';
import { Share2, X, Link as LinkIcon, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareProps {
    title: string;
    text: string;
    url?: string;
    hashTags?: string[];
}

export function ShareWithSocials({ title, text, url = 'https://tradediary.equitymarvels.com', hashTags = ['trading', 'tradersdiary'] }: ShareProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    const encodedTags = hashTags.join(',');

    const shareLinks = [
        {
            name: 'Twitter / X',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedTags}`,
            color: 'bg-black text-white hover:bg-gray-800',
        },
        {
            name: 'Facebook',
            icon: (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 4.16v1.912h4.141l-.542 3.667h-3.599v7.98c0 .106.01.21.01.316a12.001 12.001 0 0 0 8.877-11.854C21.996 7.373 17.513 0 11.996 0S1.996 7.373 1.996 14.11a11.998 11.998 0 0 0 8.878 11.854c0-.106.011-.211.011-.316V23.691Z" /></svg>,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'bg-blue-600 text-white hover:bg-blue-700',
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle, // Using MessageCircle as generic chat icon
            href: `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`,
            color: 'bg-green-500 text-white hover:bg-green-600',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'bg-blue-600 text-white hover:bg-blue-700',
        },
        {
            name: 'Telegram',
            icon: MessageCircle,
            href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            color: 'bg-blue-500 text-white hover:bg-blue-600',
        },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-500 hover:text-long transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Share"
                aria-label="Share"
            >
                <Share2 className="w-4 h-4" />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 italic mb-4">
                        &quot;{text}&quot;
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {shareLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-colors ${link.color}`}
                                >
                                    <Icon className="w-4 h-4" />
                                    Share on {link.name}
                                </a>
                            );
                        })}

                        <button
                            onClick={handleCopy}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <LinkIcon className="w-4 h-4" />
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
