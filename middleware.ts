import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    // Update Supabase session and get user
    const { response, user } = await updateSession(request);

    const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
    const isWelcome = request.nextUrl.pathname.startsWith('/welcome');

    // Redirect logged-in users away from auth pages
    if (isAuthPage && user) {
        // If user is already logged in and visits auth, we can just let them go to dashboard or welcome.
        // Let's send them to dashboard by default to avoid showing welcome screen on every visit to /auth
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect non-authenticated users to login
    if ((isDashboard || isWelcome) && !user) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, manifest, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
