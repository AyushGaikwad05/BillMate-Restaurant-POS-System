import { NextResponse } from "next/server";

export function middleware(req) {
  let token = req.cookies.get("accessToken")?.value;

  // Backup - raw header
  if (!token) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/accessToken=([^;]+)/);
      if (match) token = match[1];
    }
  }

  const protectedPaths = [
    "/",
    "/orders",
    "/tables",
    "/menu",
    "/dashboard",
  ];

  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return NextResponse.next();
}

// 🔥 THIS IS THE IMPORTANT PART
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
