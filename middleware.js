import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;

  const protectedPaths = ["/", "/orders", "/tables", "/menu", "/dashboard"];
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return NextResponse.next();
}
