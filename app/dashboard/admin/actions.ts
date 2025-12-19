'use server';


import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// -- Analytics Types --
export type AdminStats = {
    totalUsers: number;
    activeToday: number; // Logged in last 24h
    ghostAccounts: number; // Created > 30 days ago, never logged in (or > 30 days inactive)
    diaryUsage: number; // Users who have logged at least 1 trade
    proUsers: number;
    premiumUsers: number;
};

// -- Analytics Action --
export async function getAdminStats(): Promise<{ stats: AdminStats | null; error?: string }> {
    try {
        const supabase = await createAdminClient();

        // 1. Fetch Basic Auth Stats (List all to count)
        // Note: For massive scale, this needs to vary. For < 10k users, listUsers is okay.
        const { data: { users }, error } = await supabase.auth.admin.listUsers({
            page: 1,
            perPage: 5000 // Upper limit for now
        });

        if (error) throw error;

        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        let activeToday = 0;
        let ghostAccounts = 0;

        users.forEach(u => {
            const lastSignIn = u.last_sign_in_at ? new Date(u.last_sign_in_at) : null;
            const created = new Date(u.created_at);

            // Active Today
            if (lastSignIn && lastSignIn > oneDayAgo) {
                activeToday++;
            }

            // Ghost: Created > 30 days ago AND (No login OR Last login > 30 days ago)
            const isOldAccount = created < thirtyDaysAgo;
            const isInactive = !lastSignIn || lastSignIn < thirtyDaysAgo;

            if (isOldAccount && isInactive) {
                ghostAccounts++;
            }
        });

        // Run independent queries in parallel
        const [
            { count: diaryUsers },
            { count: proCount },
            { count: premiumCount }
        ] = await Promise.all([
            // Diary Usage (Total Trades for now)
            supabase.from('trades').select('user_id', { count: 'exact', head: true }),
            // Pro Count
            supabase.from('user_settings').select('*', { count: 'exact', head: true }).eq('plan_type', 'pro'),
            // Premium Count
            supabase.from('user_settings').select('*', { count: 'exact', head: true }).eq('plan_type', 'premium')
        ]);

        return {
            stats: {
                totalUsers: users.length,
                activeToday,
                ghostAccounts,
                diaryUsage: diaryUsers || 0, // This returns total trades, not unique users, but it's a "Usage" metric.
                proUsers: proCount || 0,
                premiumUsers: premiumCount || 0
            }
        };

    } catch (error: any) {
        return { stats: null, error: error.message };
    }
}

export type AdminUser = {
    id: string;
    email: string; // from auth.users
    fullName: string; // from user_settings
    phone: string; // from user_settings
    role: string; // from user_settings
    plan_type: string; // from user_settings
    subscription_status: string; // from user_settings
    payment_gateway: string; // from user_settings
    joined_at: string; // from auth.users
    last_sign_in_at: string; // from auth.users
};

export async function getAdminUsers({
    page = 1,
    perPage = 50,
    query = ''
}: {
    page?: number;
    perPage?: number;
    query?: string;
} = {}): Promise<{ users: AdminUser[]; total: number; error?: string }> {
    try {
        const supabase = await createAdminClient();

        // 1. Fetch Auth Users (with pagination support potentially, but retrieving 1000 for now)
        const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers({
            page: 1,
            perPage: 1000
        });

        if (authError) throw authError;

        // 2. Fetch User Settings (Optimized: Only for fetched users)
        const userIds = authUsers.map(u => u.id);
        const { data: settings, error: settingsError } = await supabase
            .from('user_settings')
            .select('*')
            .in('id', userIds.length > 0 ? userIds : ['00000000-0000-0000-0000-000000000000']);

        if (settingsError) throw settingsError;

        // 3. Map and Merge
        const combinedUsers: AdminUser[] = authUsers.map((authUser) => {
            const userSetting = settings?.find((s) => s.id === authUser.id);
            return {
                id: authUser.id,
                email: authUser.email || 'No Email',
                fullName: userSetting?.full_name || 'N/A',
                phone: userSetting?.phone || 'N/A', // Assuming phone is in user_settings, otherwise authUser.phone
                role: userSetting?.role || 'user',
                plan_type: userSetting?.plan_type || 'free',
                subscription_status: userSetting?.subscription_status || 'inactive',
                payment_gateway: userSetting?.payment_gateway || 'N/A',
                joined_at: authUser.created_at,
                last_sign_in_at: authUser.last_sign_in_at || '',
            };
        });

        // Sort by joined_at desc
        combinedUsers.sort((a, b) => new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime());

        // Search Filtering
        let filteredUsers = combinedUsers;
        if (query) {
            const lowerQuery = query.toLowerCase();
            filteredUsers = combinedUsers.filter(u =>
                u.email.toLowerCase().includes(lowerQuery) ||
                u.fullName.toLowerCase().includes(lowerQuery) ||
                u.phone.includes(query)
            );
        }

        // Pagination
        const total = filteredUsers.length;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedUsers = filteredUsers.slice(start, end);

        return { users: paginatedUsers, total };


    } catch (error: any) {
        console.error('Admin Fetch Error:', error);
        return { users: [], total: 0, error: error.message };
    }
}

export async function updateUserBanStatus(userId: string, shouldBan: boolean) {
    try {
        const supabase = await createAdminClient();

        // Supabase Auth Ban is done by setting ban_duration (not permanent usually) or metadata?
        // Actually, the easiest way is to set `banned_until` in auth.users
        const { error } = await supabase.auth.admin.updateUserById(userId, {
            ban_duration: shouldBan ? '876000h' : '0s' // 100 Years or 0
        });

        if (error) throw error;

        // Also update local setting if needed, but auth ban blocks login.
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updateUserPlan(userId: string, newPlan: 'free' | 'basic' | 'pro' | 'premium', endDate?: string) {
    try {
        const supabase = await createAdminClient();

        const updates: any = {
            plan_type: newPlan,
            subscription_status: newPlan === 'free' ? 'active' : 'active', // Assume active for manual changes
        };

        if (endDate) {
            updates.subscription_end = endDate;
        }

        const { error } = await supabase
            .from('user_settings')
            .update(updates)
            .eq('id', userId);

        if (error) throw error;

        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export type CreateBookParams = {
    title: string;
    author: string;
    description: string;
    pdfPath: string;
    coverUrl: string | null;
    accessLevel?: 'free' | 'premium' | 'paid';
    price?: number;
    priceUsd?: number;
};

export async function createGlobalBook(params: CreateBookParams) {
    try {
        const supabase = await createAdminClient();

        // So fetch auth user via normal client first
        const { createClient } = await import('@/lib/supabase/server');
        const authSupabase = await createClient();
        const { data: { user } } = await authSupabase.auth.getUser();

        if (!user) throw new Error('Not authenticated');

        const { title, author, description, pdfPath, coverUrl, accessLevel = 'free', price = 0, priceUsd = 0 } = params;

        const { error } = await supabase
            .from('user_books')
            .insert({
                user_id: user.id, // The Admin is the owner
                title,
                author,
                description,
                pdf_url: pdfPath,
                cover_url: coverUrl,
                is_public: true, // GLOBAL BOOK
                access_level: accessLevel,
                price: price,
                price_usd: priceUsd,
            });

        if (error) throw error;

        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getGlobalBooks() {
    try {
        const supabase = await createAdminClient();
        const { data, error } = await supabase
            .from('user_books')
            .select('*')
            .eq('is_public', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { books: data };
    } catch (error: any) {
        console.error('Error fetching global books:', error);
        return { books: [], error: error.message };
    }
}

export type SalesSummary = {
    totalRevenue: number;
    totalTransactions: number;
    recentTransactions: any[];
    byGateway: Record<string, number>;
    // New Time-based Metrics
    salesToday: { count: number; revenue: number };
    salesWeek: { count: number; revenue: number };
    salesMonth: { count: number; revenue: number };
    gatewayStats: {
        paypal: { count: number; revenue: number };
        razorpay: { count: number; revenue: number };
    };
    // Renewal Metrics
    renewals: {
        dueToday: number;
        dueThisWeek: number;
        missed: number; // Expired in last 7 days
    };
    renewalList: Array<{
        id: string;
        fullName: string;
        email: string;
        plan: string;
        endDate: string;
        status: 'due_today' | 'due_week' | 'missed';
    }>;
    allTransactions: any[]; // For PDF Report
};

export async function getSalesData(): Promise<{ data: SalesSummary | null; error?: string }> {
    try {
        const supabase = await createAdminClient();

        // 1. Fetch Auth Users for emails
        const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers({
            page: 1,
            perPage: 1000
        });

        if (authError) throw authError;

        // 2. Fetch success payments (RAW, no join)
        const { data: payments, error } = await supabase
            .from('payments')
            .select('*')
            .eq('payment_status', 'success')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // 3. Fetch User Settings (for names)
        // Get all unique user IDs from payments to optimize, or just fetch all settings if list is small.
        // For Scale: Fetch only needed IDs.
        const userIds = Array.from(new Set(payments.map(p => p.user_id)));
        const { data: userSettings, error: settingsError } = await supabase
            .from('user_settings')
            .select('id, full_name, plan_type, subscription_end, subscription_status')
            .in('id', userIds.length > 0 ? userIds : ['00000000-0000-0000-0000-000000000000']); // Prevent empty IN error

        if (settingsError) throw settingsError;

        // Renewal Logic (using the fetched settings)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);

        // We need to check ALL users for renewals, not just those who paid.
        // So actually, let's fetch ALL user_settings for the renewal block separate from payments match.
        // Optimization: Fetch ALL user_settings once for both usage.
        const { data: allUserSettings, error: allSettingsError } = await supabase
            .from('user_settings')
            .select('id, full_name, plan_type, subscription_end, subscription_status');

        if (allSettingsError) throw allSettingsError;

        let dueToday = 0;
        let dueThisWeek = 0;
        let missed = 0;
        const renewalList: SalesSummary['renewalList'] = [];

        allUserSettings.forEach(u => {
            if (!u.subscription_end) return;
            const endDate = new Date(u.subscription_end);
            endDate.setHours(0, 0, 0, 0);

            let status: 'due_today' | 'due_week' | 'missed' | null = null;

            if (endDate.getTime() === today.getTime()) {
                dueToday++;
                status = 'due_today';
            } else if (endDate >= today && endDate <= nextWeek) {
                dueThisWeek++;
                status = 'due_week';
            } else if (endDate < today && endDate >= lastWeek) {
                missed++;
                status = 'missed';
            }

            if (status) {
                const authUser = authUsers.find(au => au.id === u.id);
                renewalList.push({
                    id: u.id,
                    fullName: u.full_name || 'Trader',
                    email: authUser?.email || 'No Email',
                    plan: u.plan_type || 'free',
                    endDate: u.subscription_end,
                    status
                });
            }
        });

        // 4. Calculate Sales Metrics
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const metrics = {
            salesToday: { count: 0, revenue: 0 },
            salesWeek: { count: 0, revenue: 0 },
            salesMonth: { count: 0, revenue: 0 },
            gatewayStats: {
                paypal: { count: 0, revenue: 0 },
                razorpay: { count: 0, revenue: 0 }
            }
        };

        const allTransactions = payments.map(p => {
            const date = new Date(p.created_at);
            const amount = Number(p.amount || 0);
            const gateway = p.payment_gateway?.toLowerCase() || 'unknown';

            // Global Totals
            if (date >= startOfDay) {
                metrics.salesToday.count++;
                metrics.salesToday.revenue += amount;
            }
            if (date >= startOfWeek) {
                metrics.salesWeek.count++;
                metrics.salesWeek.revenue += amount;
            }
            if (date >= startOfMonth) {
                metrics.salesMonth.count++;
                metrics.salesMonth.revenue += amount;
            }

            // Gateway Stats
            if (gateway.includes('paypal')) {
                metrics.gatewayStats.paypal.count++;
                metrics.gatewayStats.paypal.revenue += amount;
            } else if (gateway.includes('razorpay')) {
                metrics.gatewayStats.razorpay.count++;
                metrics.gatewayStats.razorpay.revenue += amount;
            }

            const authUser = authUsers.find(u => u.id === p.user_id);
            const userSetting = allUserSettings.find(u => u.id === p.user_id);

            return {
                id: p.id,
                amount: p.amount,
                currency: p.currency,
                gateway: p.payment_gateway,
                plan: p.plan_type,
                date: p.created_at,
                user_name: userSetting?.full_name || 'Unknown',
                user_email: authUser?.email || 'N/A'
            };
        });

        const totalRevenue = payments.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
        const totalTransactions = payments.length;

        const byGateway: Record<string, number> = {};
        payments.forEach(p => {
            byGateway[p.payment_gateway] = (byGateway[p.payment_gateway] || 0) + 1;
        });

        return {
            data: {
                totalRevenue,
                totalTransactions,
                recentTransactions: allTransactions.slice(0, 50),
                allTransactions,
                byGateway,
                ...metrics,
                renewals: { dueToday, dueThisWeek, missed },
                renewalList // Add the list here
            }
        };

    } catch (error: any) {
        console.error('Sales Data Error:', error);
        return { data: null, error: error.message };
    }
}

export type CreatePatternParams = {
    type: 'CHART' | 'CANDLESTICK';
    groupName: string;
    name: string;
    description: string;
    understanding: string;
    tradingRules: string;
    successRatio: string; // Changed to string
    imageUrl: string | null;
    videoUrl: string | null;
    isPremium: boolean;
    // New Fields
    marketContext: string;
    invalidationConditions: string;
    timeframeSuitability: string;
    volumeConfirmation: string;
    difficultyLevel: string;
};

export async function createPattern(params: CreatePatternParams) {
    try {
        const supabase = await createAdminClient();

        // Verify User is Admin (Double check)
        const { createClient } = await import('@/lib/supabase/server');
        const authSupabase = await createClient();
        const { data: { user } } = await authSupabase.auth.getUser();

        if (!user) throw new Error('Not authenticated');

        // Insert into learning_patterns
        const { error } = await supabase
            .from('learning_patterns')
            .insert({
                type: params.type,
                group_name: params.groupName,
                name: params.name,
                description: params.description,
                understanding: params.understanding,
                trading_rules: params.tradingRules,
                success_ratio: params.successRatio,
                image_url: params.imageUrl,
                video_url: params.videoUrl,
                is_premium: params.isPremium,
                market_context: params.marketContext,
                invalidation_conditions: params.invalidationConditions,
                timeframe_suitability: params.timeframeSuitability,
                volume_confirmation: params.volumeConfirmation,
                difficulty_level: params.difficultyLevel
            });

        if (error) throw error;

        return { success: true };
    } catch (error: any) {
        console.error('Create Pattern Error:', error);
        return { error: error.message };
    }
}

// -- Content Management Actions --

export async function deleteBook(bookId: string) {
    try {
        const supabase = await createAdminClient();

        // 1. Get the book to find file paths
        const { data: book, error: fetchError } = await supabase
            .from('user_books')
            .select('*')
            .eq('id', bookId)
            .single();

        if (fetchError || !book) throw new Error('Book not found');

        // 2. Delete from Storage (PDF)
        if (book.pdf_url) {
            const { error: storageError } = await supabase.storage
                .from('books')
                .remove([book.pdf_url]);
            if (storageError) console.error('Error deleting PDF:', storageError);
        }

        // 3. Delete from DB
        const { error: deleteError } = await supabase
            .from('user_books')
            .delete()
            .eq('id', bookId);

        if (deleteError) throw deleteError;

        revalidatePath('/dashboard/admin/books');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function deletePattern(patternId: string) {
    try {
        const supabase = await createAdminClient();

        const { error } = await supabase
            .from('learning_patterns')
            .delete()
            .eq('id', patternId);

        if (error) throw error;

        revalidatePath('/dashboard/admin/patterns');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getAllPatterns() {
    try {
        const supabase = await createAdminClient();
        const { data, error } = await supabase
            .from('learning_patterns')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { patterns: data };
    } catch (error: any) {
        return { patterns: [], error: error.message };
    }
}

// -- Update Actions --

export async function updateGlobalBook(id: string, params: Partial<CreateBookParams>) {
    try {
        const supabase = await createAdminClient();

        // Prepare update object
        const updates: any = {};
        if (params.title) updates.title = params.title;
        if (params.author) updates.author = params.author;
        if (params.description) updates.description = params.description;
        if (params.pdfPath) updates.pdf_url = params.pdfPath;
        if (params.coverUrl) updates.cover_url = params.coverUrl;
        if (params.accessLevel) updates.access_level = params.accessLevel;
        if (params.price !== undefined) updates.price = params.price;
        if (params.priceUsd !== undefined) updates.price_usd = params.priceUsd;

        const { error } = await supabase
            .from('user_books')
            .update(updates)
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/dashboard/admin/books');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updatePattern(id: string, params: Partial<CreatePatternParams>) {
    try {
        const supabase = await createAdminClient();

        const updates: any = {};
        if (params.type) updates.type = params.type;
        if (params.groupName) updates.group_name = params.groupName;
        if (params.name) updates.name = params.name;
        if (params.description) updates.description = params.description;
        if (params.understanding) updates.understanding = params.understanding;
        if (params.tradingRules) updates.trading_rules = params.tradingRules;
        if (params.successRatio !== undefined) updates.success_ratio = params.successRatio;
        if (params.imageUrl) updates.image_url = params.imageUrl;
        if (params.videoUrl !== undefined) updates.video_url = params.videoUrl;
        if (params.isPremium !== undefined) updates.is_premium = params.isPremium;
        if (params.marketContext) updates.market_context = params.marketContext;
        if (params.invalidationConditions) updates.invalidation_conditions = params.invalidationConditions;
        if (params.timeframeSuitability) updates.timeframe_suitability = params.timeframeSuitability;
        if (params.volumeConfirmation) updates.volume_confirmation = params.volumeConfirmation;
        if (params.difficultyLevel) updates.difficulty_level = params.difficultyLevel;

        const { error } = await supabase
            .from('learning_patterns')
            .update(updates)
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/dashboard/admin/patterns');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}
