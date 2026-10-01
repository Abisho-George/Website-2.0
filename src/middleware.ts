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

  // services and families restructured to the 2026 master portfolio
  "/services/ai-in-gtm-training": "/services/coaching-and-training",
  "/services/change-management": "/services/sales-marketing-consulting",
  "/services/competitive-intelligence": "/services/market-intelligence",
  "/services/database-as-a-service": "/services/account-prospect-intelligence",
  "/services/icp-definition": "/services/gtm-setup",
  "/services/india-entry": "/services/gtm-setup",
  "/services/market-research": "/services/research-and-forecasting",
  "/services/marketing-training": "/services/coaching-and-training",
  "/services/outbound-sequencing": "/services/lead-generation-in-a-box",
  "/services/pricing-and-packaging": "/services/repositioning",
  "/services/sales-coaching": "/services/coaching-and-training",
  "/services/gtm-ai-twin": "/gtm-ai-twin",
  "/practices/revenue-intelligence": "/practices/account-intelligence",
  "/practices/revenue-operations": "/services/revenue-operations",
};

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const target = redirects[path];
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }
  // founders no longer have profile pages: land on their card, which opens itself
  const author = path.match(/^\/authors?\/([a-z0-9-]+)$/);
  if (author && ["kingshuk-hazra", "anindita-hazra"].includes(author[1])) {
    const url = req.nextUrl.clone(); url.pathname = "/about"; url.hash = author[1];
    return NextResponse.redirect(url, 301);
  }
  if (path.startsWith("/tag/") || path.startsWith("/category/") || path.startsWith("/author/") || path.startsWith("/authors/")) {
    const url = req.nextUrl.clone(); url.pathname = "/insights"; return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
