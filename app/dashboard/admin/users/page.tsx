import { getAdminUsers } from '@/app/dashboard/admin/actions';
import { UsersTable } from '@/components/admin/users-table';
import { AlertCircle } from 'lucide-react';

export default async function AdminUsersPage() {
    const { users, error } = await getAdminUsers();

    if (error) {
        return (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>Error fetching users: {error}</span>
            </div>
        );
    }

    // Calculate Stats
    const totalMembers = users.length;
    const proMembers = users.filter(u => u.plan_type === 'pro').length;
    const premiumMembers = users.filter(u => u.plan_type === 'premium').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        User Management
                    </h2>
                    <p className="text-slate-400 mt-1">Manage permissions, plans, and access controls for all members.</p>
                </div>

                <div className="flex items-stretch gap-4">
                    {/* Total */}
                    <div className="bg-slate-900/50 backdrop-blur-xl px-4 py-3 rounded-xl border border-slate-700/50 flex flex-col items-center min-w-[100px] shadow-xl">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Total</span>
                        <span className="text-2xl font-bold text-white tabular-nums tracking-tight">{totalMembers}</span>
                    </div>
                    {/* Pro */}
                    <div className="bg-slate-900/50 backdrop-blur-xl px-4 py-3 rounded-xl border border-slate-700/50 flex flex-col items-center min-w-[100px] shadow-xl">
                        <span className="text-amber-500/80 text-[10px] font-bold uppercase tracking-wider">Pro</span>
                        <span className="text-2xl font-bold text-amber-400 tabular-nums tracking-tight">{proMembers}</span>
                    </div>
                    {/* Premium */}
                    <div className="bg-slate-900/50 backdrop-blur-xl px-4 py-3 rounded-xl border border-slate-700/50 flex flex-col items-center min-w-[100px] shadow-xl">
                        <span className="text-purple-500/80 text-[10px] font-bold uppercase tracking-wider">Premium</span>
                        <span className="text-2xl font-bold text-purple-400 tabular-nums tracking-tight">{premiumMembers}</span>
                    </div>
                </div>
            </div>

            <UsersTable initialUsers={users} />
        </div>
    );
}
