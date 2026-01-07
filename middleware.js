import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Read token from cookies
  const token = req.cookies.get("accessToken")?.value;

  // If user opens "/" and has no token --> redirect to login
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export function middleware(req) {
  console.log("MIDDLEWARE COOKIES 👉", req.cookies.getAll());
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/",  
    "/orders/:path*", 
    "/tables/:path*", 
    "/menu/:path*", 
    "/dashboard/:path*"
  ],
};
