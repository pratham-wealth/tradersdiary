'use client';

import { useState } from 'react';
import { AdminUser, updateUserBanStatus, updateUserPlan } from '@/app/dashboard/admin/actions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Shieldalert, ShieldCheck, Ban, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import { AdminUpgradeModal } from './admin-upgrade-modal';

export function UsersTable({ initialUsers }: { initialUsers: AdminUser[] }) {
    const [users] = useState<AdminUser[]>(initialUsers);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [upgradeUser, setUpgradeUser] = useState<AdminUser | null>(null);

    const handleBanToggle = async (userId: string, currentStatus: string) => {
        setIsLoading(userId);
        const shouldBan = true;

        const result = await updateUserBanStatus(userId, shouldBan);

        if (result.success) {
            toast.success('User status updated');
            router.refresh();
        } else {
            toast.error(result.error || 'Failed to update status');
        }
        setIsLoading(null);
    };

    const handlePlanChange = async (userId: string, newPlan: 'free') => {
        setIsLoading(userId);
        const result = await updateUserPlan(userId, newPlan);

        if (result.success) {
            toast.success(`Plan updated to ${newPlan}`);
            router.refresh();
        } else {
            toast.error(result.error || 'Failed to update plan');
        }
        setIsLoading(null);
    };

    return (
        <div className="rounded-md border border-slate-700 bg-slate-900/50">
            {upgradeUser && (
                <AdminUpgradeModal
                    user={upgradeUser}
                    onClose={() => setUpgradeUser(null)}
                />
            )}

            <Table>
                <TableHeader className="bg-slate-900/50">
                    <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-400 font-medium w-[250px]">User Details</TableHead>
                        <TableHead className="text-slate-400 font-medium">Contact</TableHead>
                        <TableHead className="text-slate-400 font-medium">Plan</TableHead>
                        <TableHead className="text-slate-400 font-medium">Status</TableHead>
                        <TableHead className="text-slate-400 font-medium">Joined</TableHead>
                        <TableHead className="text-slate-400 font-medium">Payment</TableHead>
                        <TableHead className="text-right text-slate-400 font-medium">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-slate-200 font-medium">{user.fullName}</span>
                                    <span className="text-slate-500 text-xs">{user.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-slate-400 text-sm font-mono">{user.phone}</span>
                            </TableCell>
                            <TableCell>
                                <span className={cn(
                                    "capitalize px-2 py-0.5 rounded text-xs font-medium border",
                                    user.plan_type === 'premium' ? "bg-purple-900/20 text-purple-300 border-purple-500/30" :
                                        user.plan_type === 'pro' ? "bg-amber-900/20 text-amber-300 border-amber-500/30" :
                                            "bg-slate-800 text-slate-400 border-slate-700"
                                )}>
                                    {user.plan_type}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className={cn(
                                    "capitalize flex items-center gap-1.5 text-xs font-medium",
                                    user.subscription_status === 'active' ? "text-emerald-400" : "text-slate-500"
                                )}>
                                    <div className={cn("w-1.5 h-1.5 rounded-full", user.subscription_status === 'active' ? "bg-emerald-500" : "bg-slate-500")} />
                                    {user.subscription_status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="text-slate-400 text-sm">
                                    {new Date(user.joined_at).toLocaleDateString()}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="text-slate-400 text-xs uppercase tracking-wide font-medium bg-slate-900 px-2 py-1 rounded">
                                    {user.payment_gateway}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-800">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                                        <DropdownMenuLabel className="text-slate-400">Actions</DropdownMenuLabel>
                                        <DropdownMenuItem
                                            onClick={() => navigator.clipboard.writeText(user.id)}
                                            className="text-slate-200 hover:bg-slate-800 focus:bg-slate-800"
                                        >
                                            Copy User ID
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-slate-700" />
                                        <DropdownMenuLabel className="text-slate-400">Change Plan</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handlePlanChange(user.id, 'free')} className="text-slate-200">
                                            Set to Free/Starter
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setUpgradeUser(user)} className="text-amber-400">
                                            Upgrade User...
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-slate-700" />
                                        <DropdownMenuItem
                                            onClick={() => handleBanToggle(user.id, 'active')}
                                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                        >
                                            <Ban className="mr-2 h-4 w-4" />
                                            <span>Ban User (100 Years)</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
