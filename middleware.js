// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const publicRoutes = ["/login", "/signup"];

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  // allow public pages
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // block private pages if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|api).*)",
  ],
};
