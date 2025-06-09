import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth/sign-in", "/auth/sign-up"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Always allow static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // If user is not logged in
  if (!token) {
    if (!PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  } else {
    // If user is logged in, block access to public auth pages
    if (PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url)); // or "/dashboard"
    }
  }

  return NextResponse.next();
}
