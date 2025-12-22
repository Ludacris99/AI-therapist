import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Session from "@/models/Session";

export async function proxy(req) {
    const sessionId = req.cookies.get("session-cookie")?.value;

    //   Dashboard and its subsequent pages are protected
    const protectedRoutes = ["/dashboard"];
    const isProtected = protectedRoutes.some((path) =>
        req.nextUrl.pathname.startsWith(path)
    );

    //   Home page doesn't need protection
    if (!isProtected) {
        return NextResponse.next();
    }

    if (!sessionId) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    //   Check whether the session actually exists server-side and not fake sessions/ deleted cookies
    await connectDB();
    const session = await Session.findById(sessionId);

    if (!session || session.expiresAt < new Date()) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}


// Run this middleware only for these routes
export const config = {
    matcher: ["/dashboard/:path*"],
};
