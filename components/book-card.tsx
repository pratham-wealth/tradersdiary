'use client';

import { UserBook, deleteBook, getBookDownloadUrl } from '@/app/dashboard/library/actions';
import { Book, Trash2, BookOpen, ShoppingCart, Lock, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { PDFReader } from './pdf-reader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PayPalButtons } from "@paypal/react-paypal-js";

interface BookCardProps {
    book: UserBook;
    userEmail: string;
    currency?: 'INR' | 'USD';
}

export function BookCard({ book, userEmail, currency = 'INR' }: BookCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [readUrl, setReadUrl] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this book?')) return;

        setIsDeleting(true);
        const result = await deleteBook(book.id, book.pdf_url, book.cover_url);

        if (result.success) {
            toast.success('Book deleted');
        } else {
            toast.error(result.error || 'Failed to delete');
        }
        setIsDeleting(false);
    };

    const handleRead = async () => {
        if (!book.has_access) return;

        // Fetch signed URL
        const url = await getBookDownloadUrl(book.pdf_url);
        if (url) {
            setReadUrl(url);
            setIsReading(true);
        } else {
            toast.error('Could not load book. Access denied.');
        }
    };

    const handleRazorpayBuy = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const loadRazorpay = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        const res = await loadRazorpay();
        if (!res) {
            toast.error('Razorpay SDK failed to load');
            return;
        }

        if (!confirm(`Confirm purchase of "${book.title}" for ₹${book.price}?`)) return;

        setIsBuying(true);

        try {
            const orderRes = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: book.price,
                    currency: 'INR',
                    purchaseType: 'book',
                    itemId: book.id
                })
            });

            const order = await orderRes.json();
            if (order.error) throw new Error(order.error);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Traders Journal",
                description: `Purchase: ${book.title}`,
                order_id: order.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch('/api/payments/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            orderCreationId: order.id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            amount: book.price,
                            currency: 'INR',
                            purchaseType: 'book',
                            itemId: book.id
                        })
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        toast.success("Book Unlocked Successfully!");
                        router.refresh();
                    } else {
                        toast.error("Verification failed: " + verifyData.error);
                    }
                    setIsBuying(false);
                },
                prefill: { email: userEmail },
                theme: { color: "#fbbf24" }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Payment failed');
            setIsBuying(false);
        }
    };

    // Determine State
    const isLocked = !book.has_access;
    const isPremium = book.access_level === 'premium';
    const isPaid = book.access_level === 'paid';

    // Pricing Display
    const finalPrice = currency === 'INR' ? (book.price || 0) : (book.price_usd || 0);

    return (
        <>
            <div
                onClick={isLocked ? undefined : handleRead}
                className={`group relative flex flex-col bg-slate-800 border border-white/5 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gold-400/5 transition-all h-full ${isLocked ? 'cursor-default' : 'cursor-pointer'
                    }`}
            >
                {/* Cover Image */}
                <div className="aspect-[3/4] bg-slate-900 relative overflow-hidden">
                    {book.cover_url ? (
                        <img
                            src={book.cover_url}
                            alt={book.title}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLocked ? 'opacity-80' : ''
                                }`}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-800 to-slate-900">
                            <Book className="w-12 h-12 text-slate-600 mb-2" />
                            <span className="text-slate-500 text-xs text-center px-2 line-clamp-2">{book.title}</span>
                        </div>
                    )}

                    {/* OVERLAY: Lock Icon Only (Top Right) */}
                    {isLocked && (
                        <div className="absolute top-2 right-2 z-20">
                            <div className="bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border border-white/10 shadow-lg">
                                <Lock className="w-4 h-4 text-white/80" />
                            </div>
                        </div>
                    )}

                    {/* Badges */}
                    {isPremium && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-300 to-gold-500 text-black text-[10px] font-black tracking-wider px-2 py-1 rounded shadow-lg border-b-2 border-amber-600 z-10">
                            PREMIUM
                        </div>
                    )}
                    {(book.is_global && !isPremium && !isPaid) && (
                        <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg backdrop-blur-sm border border-emerald-400/30 z-10">
                            FREE
                        </div>
                    )}

                    {/* Unlocked Actions Overlay (Only when unlocked) */}
                    {!isLocked && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[1px]">
                            <button
                                className="p-3 bg-gold-400 text-black rounded-full hover:bg-gold-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                title="Read Book"
                            >
                                <BookOpen className="w-5 h-5" />
                            </button>
                            {!book.is_global && (
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="p-3 bg-red-500/80 text-white rounded-full hover:bg-red-500 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                                    title="Delete"
                                >
                                    {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="p-3 bg-slate-800 border-t border-white/5 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-200 text-sm line-clamp-1 mb-0.5" title={book.title}>{book.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-1">{book.author || 'Unknown Author'}</p>

                    {/* Buy Section */}
                    {isLocked && isPaid ? (
                        <div className="mt-auto pt-3">
                            {currency === 'INR' ? (
                                <button
                                    onClick={handleRazorpayBuy}
                                    disabled={isBuying}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold rounded-lg transition-colors shadow-lg shadow-gold-500/10 active:scale-95"
                                >
                                    {isBuying ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShoppingCart className="w-3 h-3" />}
                                    Buy for ₹{book.price}
                                </button>
                            ) : (
                                <div className="relative z-10 w-full min-h-[35px]">
                                    <PayPalButtons
                                        style={{ layout: "horizontal", height: 35, tagline: false, shape: 'rect' }}
                                        forceReRender={[finalPrice, currency]}
                                        createOrder={async (data, actions) => {
                                            const res = await fetch('/api/payments/paypal/create-order', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    amount: finalPrice,
                                                    currency: 'USD',
                                                    purchaseType: 'book',
                                                    itemId: book.id
                                                })
                                            });
                                            const order = await res.json();
                                            if (order.error) {
                                                toast.error(order.error);
                                                throw new Error(order.error);
                                            }
                                            return order.id;
                                        }}
                                        onApprove={async (data, actions) => {
                                            const res = await fetch('/api/payments/paypal/capture-order', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    orderID: data.orderID,
                                                    purchaseType: 'book',
                                                    itemId: book.id,
                                                    amount: finalPrice,
                                                    currency: 'USD'
                                                })
                                            });
                                            const json = await res.json();
                                            if (json.success) {
                                                toast.success(`Book Purchased!`);
                                                router.refresh();
                                            } else {
                                                toast.error("PayPal Failed");
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ) : isLocked && isPremium ? (
                        <div className="mt-auto pt-3">
                            <Link
                                href="/dashboard/profile"
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-purple-500/20"
                            >
                                <Sparkles className="w-3 h-3" />
                                Upgrade Plan
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-auto pt-2 flex items-center justify-between text-[10px] text-slate-600 border-t border-white/5 mt-2">
                            <span>PDF Book</span>
                            <span>{new Date(book.created_at).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
