import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Check for super_admin role
    const { data: settings } = await supabase
        .from('user_settings')
        .select('role')
        .eq('id', user.id)
        .single();

    if (settings?.role !== 'super_admin') {
        // Redirect unauthorized users back to normal dashboard
        redirect('/dashboard');
    }

    return (
        <div className="space-y-6">
            {/* Top Bar Status Indicator - Integrated Design */}
            <div className="bg-gradient-to-r from-red-950/40 to-slate-950/40 border-b border-red-500/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between backdrop-blur-sm sticky top-[56px] z-30">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulseshadow-lg shadow-red-500/50" />
                    <span className="text-xs font-bold tracking-widest text-red-400 uppercase">Super Admin Mode</span>
                </div>
                <div className="hidden sm:flex text-[10px] text-red-500/60 font-mono items-center gap-2">
                    <span>ACCESS_LEVEL: FULL_CONTROL</span>
                    <span>•</span>
                    <span>SYS_TIME: {new Date().toISOString().split('T')[0]}</span>
                </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
            </div>
        </div>
    );
}
