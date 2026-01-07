import { NextResponse } from "next/server";

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
