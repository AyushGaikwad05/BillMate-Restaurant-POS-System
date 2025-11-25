import { NextResponse } from "next/server";
import {  NextRequest } from "next/server";

export function middleware(req) {
  // Log all cookies for debugging
 
 const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const protectedPaths = [
    "/",
    "/orders",
    "/tables",
    "/menu",
    "/dashboard"
  ];

  
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some(path => {
    // Use startsWith for subpaths
    return pathname === path || pathname.startsWith(path + "/");
  });

  if (isProtected && !token) {
    const res = NextResponse.redirect(new URL("/signup", req.url));
    // Prevent caching of this redirect
    res.headers.set("x-middleware-cache", "no-cache");
    return res;
  }

  return NextResponse.next();
} 