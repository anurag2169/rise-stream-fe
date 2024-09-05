import { NextRequest, NextResponse } from "next/server";
export const config = {
  matcher: ["/admin", "/sign-in", "/sign-up", "/", "/home"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    !token &&
    (url.pathname.startsWith("/home") || url.pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
