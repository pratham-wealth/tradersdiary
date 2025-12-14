'use client';

import { updateProfile, updatePassword } from '../app/dashboard/profile/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { User, Mail, Phone, Shield, Lock, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileData {
    email: string | undefined;
    fullName: string;
    phoneNumber: string;
    subscriptionStatus: string;
    planType: string;
}

export function ProfileForm({ initialProfile }: { initialProfile: ProfileData | null }) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await updateProfile(formData);
        setLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Profile updated successfully');
            setIsEditing(false);
        }
    }

    async function handlePasswordSubmit(formData: FormData) {
        setPassLoading(true);
        const result = await updatePassword(formData);
        setPassLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Password updated successfully');
            (document.getElementById('password-form') as HTMLFormElement)?.reset();
        }
    }

    // Helper to request formatted plan status
    const getPlanDisplay = () => {
        if (!initialProfile) return 'Free Plan';
        const { subscriptionStatus, planType } = initialProfile;

        if (subscriptionStatus === 'trial') {
            return '7-Day Pass (Paid)';
        }

        if (subscriptionStatus === 'active') {
            if (planType === 'premium') return 'Premium Plan (Active)';
            if (planType === 'pro') return 'Professional Plan (Active)';
        }

        return 'Starter Pass (Active)'; // Default fallback
    };

    return (
        <div className="space-y-6">
            {/* Header / Hero Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 z-10">
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-0">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-xl">
                            <span className="text-4xl md:text-5xl font-bold text-white">
                                {initialProfile?.fullName?.charAt(0) || 'T'}
                            </span>
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full border border-gray-600 shadow-lg text-xs hover:bg-black transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Text Info */}
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                            {initialProfile?.fullName || 'Trader'}
                        </h1>
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                                <Mail className="w-3.5 h-3.5" />
                                {initialProfile?.email}
                            </span>
                            <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                                {getPlanDisplay()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Personal Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-500" />
                                Personal Information
                            </h3>
                            {isEditing && (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    Cancel Editing
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <form action={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="fullName"
                                            type="text"
                                            required
                                            defaultValue={initialProfile?.fullName}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="phoneNumber"
                                            type="tel"
                                            required
                                            defaultValue={initialProfile?.phoneNumber}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all disabled:opacity-70"
                                    >
                                        {loading ? 'Saving Changes...' : 'Save Updates'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{initialProfile?.fullName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-gray-900 dark:text-gray-100">{initialProfile?.email}</p>
                                        {initialProfile?.emailVerified ? (
                                            <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">Verified</span>
                                        ) : (
                                            <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">Unverified</span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-gray-900 dark:text-gray-100">{initialProfile?.phoneNumber || 'Not Added'}</p>
                                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">Unverified</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Plan Status</p>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{getPlanDisplay()}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Verification Options (As Requested) */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
                            <Shield className="w-5 h-5 text-indigo-500" />
                            Verification Methods
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Secure your account using the following verification methods.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <Mail className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Email Verification</h4>
                                        <p className="text-xs text-gray-500">Code sent to registered email.</p>
                                    </div>
                                </div>
                                <button disabled className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-md opacity-50 cursor-not-allowed">
                                    Enabled
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Phone className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">OTP Verification</h4>
                                        <p className="text-xs text-gray-500">SMS code to phone number.</p>
                                    </div>
                                </div>
                                <button className="text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors">
                                    Setup OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Security */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
                            <Lock className="w-5 h-5 text-indigo-500" />
                            Change Password
                        </h3>

                        <form id="password-form" action={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    New Password
                                </label>
                                <input
                                    name="newPassword"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={passLoading}
                                className="w-full px-4 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors disabled:opacity-70 text-sm"
                            >
                                {passLoading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-6 border border-indigo-100 dark:border-indigo-500/20">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <div>
                                <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">Protect your account</h4>
                                <p className="text-sm text-indigo-800 dark:text-indigo-400/80 leading-relaxed">
                                    Enable Two-Factor Authentication (OTP) to add an extra layer of security to your trading decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
