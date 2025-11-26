import { NextResponse } from "next/server";

export function middleware(req) {
  const protectedPaths = ["/", "/orders", "/tables", "/menu", "/dashboard"];
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // Just allow the request, token validation happens client-side
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/orders/:path*", "/tables/:path*", "/menu/:path*", "/dashboard/:path*"],
};
