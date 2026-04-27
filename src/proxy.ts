import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isTrackerPath = pathname.startsWith("/tracker");
  const isMarketplacePath = pathname.startsWith("/marketplace");

  const isTrackerLogin = pathname === "/tracker/login";
  const isMarketplaceLogin = pathname === "/marketplace/login";

  if (isTrackerPath) {
    const trackerToken = request.cookies.get("tracker_token")?.value;
    if (!trackerToken && !isTrackerLogin) {
      return NextResponse.redirect(new URL("/tracker/login", request.url));
    }
    if (trackerToken && isTrackerLogin) {
      return NextResponse.redirect(new URL("/tracker", request.url));
    }
  }

  if (isMarketplacePath) {
    const marketplaceToken = request.cookies.get("marketplace_token")?.value;
    if (!marketplaceToken && !isMarketplaceLogin) {
      return NextResponse.redirect(new URL("/marketplace/login", request.url));
    }
    if (marketplaceToken && isMarketplaceLogin) {
      return NextResponse.redirect(new URL("/marketplace/employers", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
