// import { NextResponse } from "next/server";

// export function middleware(req) {
//   // 1️⃣ Try to read cookie normally
//   let token = req.cookies.get("accessToken")?.value;

//   // 2️⃣ Backup method: read raw cookie header
//   if (!token) {
//     const cookieHeader = req.headers.get("cookie");
//     if (cookieHeader) {
//       const match = cookieHeader.match(/accessToken=([^;]+)/);
//       if (match) token = match[1];
//     }
//   }

//   const protectedPaths = [
//     "/",
//     "/orders",
//     "/tables",
//     "/menu",
//     "/dashboard",
//   ];

//   const pathname = req.nextUrl.pathname;
//   const isProtected = protectedPaths.some(
//     (path) => pathname === path || pathname.startsWith(path + "/")
//   );

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/signup", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/orders/:path*",
//     "/tables/:path*",
//     "/menu/:path*",
//     "/dashboard/:path*",
//   ],
// };
