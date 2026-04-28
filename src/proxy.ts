import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isTrackerPath = pathname.startsWith("/tracker");
  const isMarketplacePath = pathname.startsWith("/marketplace");

  const isTrackerLogin = pathname === "/tracker/login";
  const isMarketplaceLogin = pathname === "/marketplace/login";

  if (isTrackerPath) {
    // tracker token
    const trackerToken = request.cookies.get("token")?.value;
    if (!trackerToken && !isTrackerLogin) {
      return NextResponse.redirect(new URL("/tracker/login", request.url));
    }
    if (trackerToken && isTrackerLogin) {
      return NextResponse.redirect(new URL("/tracker", request.url));
    }
  }

  if (isMarketplacePath) {
    // marketplace token
    const marketplaceToken = request.cookies.get("access_token")?.value;
    if (!marketplaceToken && !isMarketplaceLogin) {
      return NextResponse.redirect(new URL("/marketplace/login", request.url));
    }
    // if (marketplaceToken && isMarketplaceLogin) {
    //   return NextResponse.redirect(new URL("/marketplace", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
