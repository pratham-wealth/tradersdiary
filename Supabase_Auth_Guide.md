# Supabase Auth Implementation Guide (Next.js App Router)

This document records the complete authentication flow used in **Traders Diary**. It uses **Next.js 14 Server Actions**, **Supabase SSR**, and **Middleware** for a secure, modern auth system.

## 1. Environment Variables
Ensure these are set in your `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # Only if admin actions needed
NEXT_PUBLIC_APP_URL=http://localhost:3000 # or your production domain
```

## 2. Supabase Server Client
**Path**: `lib/supabase/server.ts`
This utility creates a Supabase client capable of handling cookies in Server Components and Actions.

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch {
                        // Handle server action cookie setting
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch {
                        // Handle server action cookie deletion
                    }
                },
            },
        }
    );
}
```

## 3. Middleware (Route Protection)
**Path**: `middleware.ts`
Intercepst requests to refresh sessions and protect private routes using `updateSession` (logic typically in `lib/supabase/middleware.ts` which calls `createServerClient` with response manipulation).

```typescript
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
    // 1. Refresh Session (Critical for Supabase Auth)
    const response = await updateSession(request);

    // 2. Check User Status
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

    // 3. Redirect Logic
    if (isAuthPage && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isDashboard && !user) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
```

## 4. Server Actions (Backend Logic)
**Path**: `app/auth/actions.ts`
Handles Form submissions and Google OAuth initiation.

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { error: error.message };

    redirect('/welcome');
}

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
    });

    if (error) return { error: error.message };
    if (data.url) redirect(data.url);
}
```

## 5. Auth Callback (OAuth Handling)
**Path**: `app/auth/callback/route.ts`
Exchanges the OAuth code for a session and creates user database records if needed.

```typescript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);

        // Optional: Create User Settings logic here if needed
        const { data: { user } } = await supabase.auth.getUser();
        // ... DB insert logic
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
}
```

## 6. Login Page (Client Component)
**Path**: `app/auth/login/page.tsx`
Client-side form invoking the Server Actions.

```typescript
'use client';
import { signIn, signInWithGoogle } from '../actions';
import { toast } from 'sonner';

export default function LoginPage() {
    async function handleManualSubmit(formData: FormData) {
        const result = await signIn(formData);
        if (result?.error) toast.error(result.error);
    }

    return (
        <form action={handleManualSubmit}>
            <input name="email" type="email" required />
            <input name="password" type="password" required />
            <button type="submit">Sign In</button>
            <button type="button" onClick={() => signInWithGoogle()}>
                Google Sign In
            </button>
        </form>
    );
}
```

## Notes
- **User Settings**: If your app requires a specific user profile table (like `user_settings`), ensure you create these records either during `signUp` (in actions.ts) or in the `callback/route.ts` for OAuth users.
- **RLS Policies**: Don't forget to enable Row Level Security on your Supabase tables to ensure users can only access their own data.
