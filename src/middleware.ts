import { NextResponse, type NextRequest } from "next/server";

/** 301 map from the legacy WordPress site. Extend from the URL inventory before cutover. */
const redirects: Record<string, string> = {
  "/comprehensive-marketing-services": "/practices/demand-generation",
  "/social-selling": "/services/social-selling",
  "/lead-generation-in-a-box": "/services/lead-generation-in-a-box",
  "/webinar-as-a-service": "/services/webinar-as-a-service",
  "/quiz-as-a-service": "/services/quiz-as-a-service",
  "/account-based-marketing": "/services/account-based-marketing",
  "/open-source-intelligence-in-sales-and-marketing": "/services/osint-for-sales",
  "/blog": "/insights",
  "/faqs": "/faq",
  "/leadstrategus-blog": "/insights",
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
