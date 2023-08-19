import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/*
    middleware.ts will help us to protect a path.
    ex:
    -   if we don't have a token in browser, will direct the user to
        the login form.
    -   if the user login and created a token, that means the user is
        can access the profile page (path we desire to protect if not
        not authenticated).
*/

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // if the current path is on /login or /signup, then make the
  // isPublicPath true.

  const isPublicPath = pathname === "/login" || pathname === "/register";

  // get the tokens in browser, if none, return nothing.
  const token = request.cookies.get("token")?.value || "";

  // check if the users in public path and has token.
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // check if the users is not in public path and has no token.
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/register", "/"],
};
