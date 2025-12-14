'use client';

import { updateSettings } from '../app/dashboard/settings/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { Bell, Monitor, Shield, Download, Trash2 } from 'lucide-react';

interface Settings {
    morning_notification_time?: string;
    theme?: string;
    default_view?: string;
}

export function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await updateSettings(formData);
        setLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Settings saved successfully');
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">

            {/* Notifications */}
            <div className="bg-midnight-900 rounded-xl border border-midnight-800 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gold-400" />
                    Notifications
                </h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="morningNotificationTime" className="block text-sm font-medium text-slate-300 mb-1">
                                Morning Reminder Time
                            </label>
                            <input
                                id="morningNotificationTime"
                                name="morningNotificationTime"
                                type="time"
                                defaultValue={initialSettings?.morning_notification_time || '08:00'}
                                className="w-full p-3 border border-midnight-700 rounded-lg bg-midnight-950 text-white focus:ring-2 focus:ring-gold-400/20 outline-none"
                                aria-label="Morning Reminder Time"
                            />
                            <p className="text-xs text-slate-500 mt-1">When should we remind you to plan your day?</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display */}
            <div className="bg-midnight-900 rounded-xl border border-midnight-800 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-blue-400" />
                    Display
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="theme" className="block text-sm font-medium text-slate-300 mb-1">
                            Theme
                        </label>
                        <select
                            id="theme"
                            name="theme"
                            defaultValue={initialSettings?.theme || 'light'}
                            className="w-full p-3 border border-midnight-700 rounded-lg bg-midnight-950 text-white focus:ring-2 focus:ring-gold-400/20 outline-none"
                            aria-label="Theme"
                        >
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                            <option value="auto">System Default</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="defaultView" className="block text-sm font-medium text-slate-300 mb-1">
                            Default Landing Page
                        </label>
                        <select
                            id="defaultView"
                            name="defaultView"
                            defaultValue={initialSettings?.default_view || 'dashboard'}
                            className="w-full p-3 border border-midnight-700 rounded-lg bg-midnight-950 text-white focus:ring-2 focus:ring-gold-400/20 outline-none"
                            aria-label="Default Landing Page"
                        >
                            <option value="dashboard">Dashboard</option>
                            <option value="journal">Journal</option>
                            <option value="watch">Watch List</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data & Privacy (No Actions yet) */}
            <div className="bg-midnight-900 rounded-xl border border-midnight-800 p-6 shadow-sm opacity-80">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Data & Privacy
                </h3>
                <div className="space-y-3">
                    <button type="button" className="w-full p-3 border border-midnight-700 rounded-lg text-slate-300 hover:bg-midnight-800 transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Export All Data (Coming Soon)
                    </button>
                    <button type="button" className="w-full p-3 border border-red-900/30 rounded-lg text-red-400 hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" /> Delete Account (Contact Support)
                    </button>
                </div>
            </div>

            <div className="sticky bottom-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto ml-auto px-6 py-3 bg-gold-400 text-midnight-950 rounded-lg font-bold shadow-lg shadow-gold-400/20 hover:bg-gold-500 transition-all transform hover:translate-y-[-1px] flex items-center justify-center gap-2"
                >
                    {loading ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </form>
    );
}
