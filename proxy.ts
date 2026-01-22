import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import {
  DEFAULT_AUTH_PATH,
  DEFAULT_UNAUTH_PATH,
  RESET_PASSWORD_PATH,
} from "./lib/constant/constant";

/**
 * Route groups
 */
const AUTH_ROUTES = [
  DEFAULT_UNAUTH_PATH,
  "/register",
  RESET_PASSWORD_PATH,
  "/forget-password",
];
const PROTECTED_ROUTES = [DEFAULT_AUTH_PATH];

export function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // Not logged in → protected route
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(DEFAULT_UNAUTH_PATH, request.url));
  }

  // Logged in → auth route
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_AUTH_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
