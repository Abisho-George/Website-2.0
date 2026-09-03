import { NextResponse, type NextRequest } from "next/server";

/** 301 map from the legacy WordPress site. Extend from the URL inventory before cutover. */
const redirects: Record<string, string> = {
  "/services": "/practices",
  "/comprehensive-marketing-services": "/practices/demand-generation",
  "/social-selling": "/practices/demand-generation",
  "/lead-generation-in-a-box": "/practices/demand-generation",
  "/webinar-as-a-service": "/practices/demand-generation",
  "/quiz-as-a-service": "/practices/demand-generation",
  "/open-source-intelligence-in-sales-and-marketing": "/practices/revenue-intelligence",
  "/resources": "/insights",
  "/leadstrategus-blog": "/insights",
  "/blog": "/insights",
  "/future-ready-demand-generation-2025": "/insights/demand-generation-2026-what-changed",
  "/demand-generation-2025-what-changes-how-to-succeed": "/insights/demand-generation-2026-what-changed",
  "/webinar-summary-future-ready-demand-generation-2025-an-action-plan": "/insights/demand-generation-2026-what-changed",
  "/tag/saas": "/insights",
};

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const target = redirects[path];
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }
  if (path.startsWith("/tag/") || path.startsWith("/category/") || path.startsWith("/author/")) {
    const url = req.nextUrl.clone(); url.pathname = "/insights"; return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
