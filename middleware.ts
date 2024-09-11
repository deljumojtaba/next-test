import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // Bypass authentication for static files, API routes, and Next.js internal paths
  if (
    request.nextUrl.pathname.startsWith("/favicon.ico") || // Favicon
    request.nextUrl.pathname.startsWith("/images") // Images
  ) {
    return NextResponse.next(); // Allow access without authentication
  }

  // Redirect authenticated users away from /login
  if (request.nextUrl.pathname.startsWith("/login") && token) {
    console.log("Redirecting from /login to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to /login
  if (request.nextUrl.pathname !== "/login" && !token) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};