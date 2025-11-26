import { NextResponse } from "next/server";

export async function middleware(req) {
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

  if (!isProtected) return NextResponse.next();

  try {
    // Call backend /verify endpoint to check token
    const response = await fetch(
      "https://billmate-pos-backend.onrender.com/api/user/verify",
      {
        headers: {
          cookie: req.headers.get("cookie") || "", // forward cookies to backend
        },
        credentials: "include",
      }
    );

    if (response.status !== 200) {
      // Token invalid or missing → redirect to signup
      return NextResponse.redirect(new URL("/signup", req.url));
    }

    // Token valid → allow access
    return NextResponse.next();
  } catch (err) {
    // Backend unreachable or error → redirect to signup
    return NextResponse.redirect(new URL("/signup", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/orders/:path*",
    "/tables/:path*",
    "/menu/:path*",
    "/dashboard/:path*",
  ],
};
