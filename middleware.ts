import { NextRequest, NextResponse } from "next/server";
import Cookies from 'js-cookie';
export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/"],
};

export async function middleware(request: NextRequest) {
  console.log("Middleware is running!");
  // const token = request.cookies.get("accessToken");
  const token = Cookies.get("accessToken");
  console.log(token)

  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
