'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Check, Zap, Crown, Shield, Loader2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type BillingCycle = 'monthly' | 'annual';
type Currency = 'INR' | 'USD';

const PRICING_TIERS = {
    FREE: {
        id: 'free',
        name: 'Starter Pass',
        description: 'Experience the platform',
        features: ['Valid for 3 Days', 'Create 1 Strategy', '10 Studies & Trades', '10 Watchlist Items', 'Reports & Analysis Locked 🔒'],
        price: {
            INR: { monthly: 0, annual: 0 },
            USD: { monthly: 0, annual: 0 }
        },
        highlight: false,
        icon: User
    },
    TRIAL: {
        id: 'trial',
        name: '7-Day Pass',
        description: 'Full access to test drive',
        features: ['Access All Sections', 'Valid for 7 Days', 'Create & Test Strategies', 'No Auto-Renewal'],
        price: {
            INR: { monthly: 49, annual: 49 },
            USD: { monthly: 2, annual: 2 }
        },
        highlight: false,
        icon: Shield
    },
    PRO: {
        id: 'pro',
        name: 'Pro Trader',
        description: 'For consistent execution',
        features: ['Create 10 Strategies & Screeners', 'Track Success Ratio & Analytics', 'Download Reports of Your Analysis', 'Build Your Personal Library (100MB)', 'Patterns Section Locked 🔒'],
        price: {
            INR: { monthly: 299, annual: 3299 },
            USD: { monthly: 9, annual: 99 }
        },
        highlight: true,
        icon: Zap
    },
    PREMIUM: {
        id: 'premium',
        name: 'Premium Elite',
        description: 'No limits. Full Power.',
        features: ['Everything in Pro', 'Create Unlimited Strategies & Screeners', 'Patterns Library Unlocked 🔓', 'Build Your Personal Library (1GB)', 'Priority Support'],
        price: {
            INR: { monthly: 499, annual: 5499 },
            USD: { monthly: 19, annual: 199 }
        },
        highlight: false,
        icon: Crown
    }
};

export default function SubscriptionPage() {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [currency, setCurrency] = useState<Currency>('INR');
    const [loading, setLoading] = useState(false);

    // Professional Segmented Control
    const Toggle = ({ active, onChange, leftLabel, rightLabel }: any) => (
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            <button
                onClick={() => onChange(leftLabel.value)}
                className={cn(
                    "px-6 py-1.5 rounded-md text-sm font-semibold transition-all duration-200",
                    active === leftLabel.value
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
            >
                {leftLabel.label}
            </button>
            <button
                onClick={() => onChange(rightLabel.value)}
                className={cn(
                    "px-6 py-1.5 rounded-md text-sm font-semibold transition-all duration-200",
                    active === rightLabel.value
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
            >
                {rightLabel.label}
            </button>
        </div>
    );

    const handleFreeActivation = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/subscription/activate-free', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                toast.success("Welcome to the Starter Plan! 🚀");
                router.refresh();
            } else {
                toast.error(data.error || "Failed to activate");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleRazorpayPayment = async (plan: any) => {
        if (plan.id === 'free') {
            await handleFreeActivation();
            return;
        }

        if (plan.price[currency][billingCycle] === 0) {
            toast.info("This is a free plan.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: plan.price.INR[billingCycle],
                    currency: 'INR',
                    planId: plan.id
                })
            });

            const order = await res.json();

            if (order.error) {
                console.error("Order Creation Error:", order);
                toast.error("Failed to create order: " + order.error);
                setLoading(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Traders Journal",
                description: `${plan.name} Subscription`,
                order_id: order.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch('/api/payments/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            orderCreationId: order.id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            planId: plan.id,
                            amount: plan.price.INR[billingCycle],
                            currency: 'INR',
                            billingCycle: billingCycle // Pass billing cycle
                        })
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        toast.success("Welcome to " + plan.name + "!");
                        router.refresh();
                    } else {
                        toast.error("Payment verification failed");
                    }
                    setLoading(false);
                },
                prefill: {
                    name: "Trader",
                    email: "",
                    contact: ""
                },
                theme: { color: "#6366f1" }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Something went wrong");
            setLoading(false);
        }
    };

    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
            currency: "USD"
        }}>
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
                <Script src="https://checkout.razorpay.com/v1/checkout.js" />

                {/* Header & Controls - Premium Design */}
                <div className="relative mb-12 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl blur-3xl"></div>

                    <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 pt-8 px-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/25 animate-pulse">
                                <Crown className="w-4 h-4" /> Choose Your Plan
                            </div>
                            <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
                                Start your trading journey.
                            </h2>
                            <p className="text-lg font-medium text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                                From free starter access to unlimited premium features – find the perfect fit for your trading goals.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 items-end shrink-0">
                            <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Currency</span>
                                <Toggle
                                    active={currency}
                                    onChange={setCurrency}
                                    leftLabel={{ label: 'INR (₹)', value: 'INR' }}
                                    rightLabel={{ label: 'USD ($)', value: 'USD' }}
                                />
                            </div>

                            <div className="relative flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Billing</span>
                                <Toggle
                                    active={billingCycle}
                                    onChange={setBillingCycle}
                                    leftLabel={{ label: 'Monthly', value: 'monthly' }}
                                    rightLabel={{ label: 'Annually', value: 'annual' }}
                                />
                                {billingCycle === 'annual' && (
                                    <div className="absolute -top-2 -right-2">
                                        <span className="flex h-4 w-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {Object.values(PRICING_TIERS).map((plan) => {
                        const price = plan.price[currency][billingCycle];
                        const isFree = plan.id === 'free';
                        const Icon = plan.icon;
                        const isPro = plan.id === 'pro';
                        const isTrial = plan.id === 'trial';
                        const isPremium = plan.id === 'premium';

                        return (
                            <div
                                key={plan.id}
                                className={cn(
                                    "group flex flex-col relative rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] backdrop-blur-xl",
                                    "border shadow-2xl hover:shadow-3xl",
                                    isPro
                                        ? "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white border-indigo-400/50 ring-2 ring-indigo-400/20 shadow-indigo-900/50 z-10"
                                        : isPremium
                                            ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-orange-950/20 border-amber-300/50 dark:border-amber-700/50 hover:border-amber-400/70 dark:hover:border-amber-600/70 shadow-amber-900/20"
                                            : isFree
                                                ? "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-slate-900/50 border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-800"
                                                : "bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                )}
                            >
                                {isPro && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="relative flex items-center justify-center px-5 py-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl shadow-purple-500/50 animate-pulse">
                                            ⭐ Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-8 flex items-start justify-between">
                                    <div>
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                                            isPro ? "bg-white/20 text-white shadow-lg shadow-white/20" : isPremium ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30" : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 text-slate-600 dark:text-slate-300 shadow-md"
                                        )}>
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h3 className={cn("text-2xl font-black tracking-tight", isPro ? "text-white" : "bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent")}>{plan.name}</h3>
                                        <p className={cn("text-[11px] font-bold mt-2 uppercase tracking-widest", isPro ? "text-indigo-200" : "text-slate-500 dark:text-slate-400")}>{plan.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-baseline justify-end gap-1">
                                            <span className={cn("text-4xl font-black tracking-tighter", isPro ? "text-white" : isPremium ? "bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent" : "text-slate-900 dark:text-white")}>
                                                {currency === 'INR' ? '₹' : '$'}{price}
                                            </span>
                                            {!isTrial && !isFree && (
                                                <span className={cn("text-sm font-semibold", isPro ? "text-white/70" : "text-slate-500 dark:text-slate-400")}>
                                                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                                </span>
                                            )}
                                        </div>
                                        {billingCycle === 'annual' && !isTrial && !isFree && (
                                            <p className={cn("text-[10px] font-black mt-2 px-2 py-0.5 rounded-full inline-block", isPro ? "bg-emerald-400/20 text-emerald-300" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400")}>
                                                💰 SAVE 20%
                                            </p>
                                        )}
                                        {isTrial && (
                                            <p className="text-[10px] font-black bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mt-2 px-2 py-0.5 rounded-full inline-block">
                                                ⚡ ONE-TIME
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className={cn("h-px w-full my-8 bg-gradient-to-r", isPro ? "from-transparent via-white/20 to-transparent" : isPremium ? "from-transparent via-amber-300/30 to-transparent" : "from-transparent via-slate-200 dark:via-slate-700 to-transparent")} />

                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3.5 text-sm group/item">
                                            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all group-hover/item:scale-110", isPro ? "bg-white/20 text-white" : isPremium ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400")}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className={cn("font-medium leading-relaxed", isPro ? "text-white/90" : "text-slate-700 dark:text-slate-300")}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-6">
                                    {isFree ? (
                                        <button
                                            onClick={() => handleRazorpayPayment(plan)}
                                            disabled={loading}
                                            className="w-full py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition-all"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Claim 3-Day Pass"}
                                        </button>
                                    ) : (
                                        currency === 'INR' ? (
                                            <button
                                                onClick={() => handleRazorpayPayment(plan)}
                                                disabled={loading}
                                                className={cn(
                                                    "w-full py-2.5 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95",
                                                    isPro
                                                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25"
                                                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                                                )}
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Pay with Razorpay"}
                                            </button>
                                        ) : (
                                            <div className="relative z-0">
                                                <PayPalButtons
                                                    style={{ layout: "horizontal", height: 40, tagline: false, shape: 'rect', color: isPro ? 'gold' : 'blue' }}
                                                    createOrder={async (data, actions) => {
                                                        const res = await fetch('/api/payments/paypal/create-order', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({
                                                                amount: price,
                                                                currency: 'USD',
                                                                planId: plan.id
                                                            })
                                                        });
                                                        const order = await res.json();
                                                        if (order.error) throw new Error(order.error);
                                                        return order.id;
                                                    }}
                                                    onApprove={async (data, actions) => {
                                                        const res = await fetch('/api/payments/paypal/capture-order', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({
                                                                orderID: data.orderID,
                                                                planId: plan.id,
                                                                amount: price,
                                                                currency: 'USD',
                                                                billingCycle: billingCycle
                                                            })
                                                        });
                                                        const json = await res.json();
                                                        if (json.success) {
                                                            toast.success(`Welcome to ${plan.name}!`);
                                                            router.refresh();
                                                        } else {
                                                            toast.error("PayPal Failed");
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Storage Add-on */}
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Need more space?</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Get 5GB extra Cloud Storage for your books and data.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">{currency === 'INR' ? '₹50' : '$1'}<span className="text-sm font-normal text-slate-500">/mo</span></span>
                        <button
                            onClick={() => toast.info("Storage plans coming soon!")}
                            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            Add Storage
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure Payment</span>
                    <span className="flex items-center gap-1"><Crown className="w-3 h-3" /> Data Privacy</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant Activation</span>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}
