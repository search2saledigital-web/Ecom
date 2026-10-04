import { NextResponse } from "next/server";

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // Replace with your actual admin auth cookie
    const token = request.cookies.get("admin_token")?.value;

    const isAdminLogin = pathname === "/admin/login";
    const isAdminRoute =
        pathname.startsWith("/admin") && !isAdminLogin;

    // Not logged in → Login
    if (isAdminRoute && !token) {
        return NextResponse.redirect(
            new URL("/admin/login", request.url)
        );
    }

    // Already logged in → Admin dashboard
    if (isAdminLogin && token) {
        return NextResponse.redirect(
            new URL("/admin", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};