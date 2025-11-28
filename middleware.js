import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // Public routes
  const publicPaths = ["/login"];

  // If user is on a protected page and not logged in
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is logged in and tries to open login page -> go to dashboard
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/orders/:path*",
    "/tables/:path*",
    "/menu/:path*",
    "/login"
  ],
};
