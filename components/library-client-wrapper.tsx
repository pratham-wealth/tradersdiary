'use client';

import { useState } from 'react';
import { UserBook } from '@/app/dashboard/library/actions';
import { BookCard } from './book-card';
import { AddBookModal } from './add-book-modal';
import { Plus, BookX } from 'lucide-react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { cn } from '@/lib/utils';

interface LibraryClientWrapperProps {
    initialBooks: UserBook[];
    userEmail: string;
    isAdmin: boolean;
}

type Currency = 'INR' | 'USD';

export function LibraryClientWrapper({ initialBooks, userEmail, isAdmin }: LibraryClientWrapperProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currency, setCurrency] = useState<Currency>('INR');

    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
            currency: "USD",
            intent: "capture"
        }}>
            <div className="space-y-6">

                {/* Controls Bar */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">My Collection</h2>

                    {/* Currency Toggle */}
                    <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                        <button
                            onClick={() => setCurrency('INR')}
                            className={cn(
                                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                                currency === 'INR' ? "bg-gold-500 text-black shadow-lg" : "text-slate-400 hover:text-white"
                            )}
                        >
                            INR (₹)
                        </button>
                        <button
                            onClick={() => setCurrency('USD')}
                            className={cn(
                                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                                currency === 'USD' ? "bg-blue-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
                            )}
                        >
                            USD ($)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

                    {/* Add New Button Card */}
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-gold-400/50 hover:bg-gold-400/5 transition-all group cursor-pointer"
                    >
                        <div className="p-4 bg-slate-800 rounded-full group-hover:bg-gold-400 text-slate-400 group-hover:text-black transition-colors shadow-lg">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 group-hover:text-gold-400">Add New Book</span>
                    </button>

                    {/* Books */}
                    {initialBooks.map((book) => (
                        <div key={book.id} className="h-full">
                            <BookCard
                                book={book}
                                userEmail={userEmail}
                                currency={currency}
                            />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {initialBooks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <BookX className="w-16 h-16 text-slate-600 mb-4" />
                        <p className="text-slate-500">No books in your collection yet.</p>
                    </div>
                )}

                {/* Modal */}
                {isAddModalOpen && (
                    <AddBookModal
                        onClose={() => setIsAddModalOpen(false)}
                        isAdmin={isAdmin}
                    />
                )}
            </div>
        </PayPalScriptProvider>
    );
}
