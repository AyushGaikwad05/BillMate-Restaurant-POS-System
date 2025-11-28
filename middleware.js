import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/login"];

  // If trying to access protected route without token
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in → prevent going back to login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/menu/:path*",
    "/tables/:path*",
    "/",
    "/login"
  ],
};
