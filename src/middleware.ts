import { NextResponse, type NextRequest } from "next/server";

/**
 * Canonical lowercase URLs: /seeds/G20 → 308 → /seeds/g20.
 *
 * Besides tidier URLs, this prevents a real failure on case-insensitive filesystems
 * (macOS, Windows): Next.js caches the "not found" result for an unknown
 * /seeds/[slug] on disk, and a cache file named "G20.html" is the same file as the
 * real page's "g20.html", so one uppercase request would break the real page.
 * Redirecting before rendering means an uppercase path is never rendered or cached.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname === lower) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Page routes only: skip Next.js internals and any path with a file extension.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
