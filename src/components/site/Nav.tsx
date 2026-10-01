"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { families, platforms, getGroup } from "@/content/practices";
import { servicesFor, serviceHref, getService } from "@/content/services";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { RailIndicator } from "@/components/motion/RailIndicator";

const resourceLinks = [
  { href: "/insights", label: "Blog & Insights", note: "Writing from the pipeline" },
  { href: "/resources", label: "Guides & Templates", note: "The worksheets we use" },
  { href: "/work", label: "Case Studies", note: "Programmes and what changed" },
  { href: "/faq", label: "FAQ", note: "Everything people ask first" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState<"services" | "resources" | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setDrawer(false); setOpen(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  // click-to-open menus close on Escape and on a click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  // Which nav section the current route belongs to. The GTM AI Twin pill is
  // deliberately not on the rail, it carries its own filled state.
  const railKey =
    active("/") ? "home"
    : active("/services") || active("/practices") ? "services"
    : active("/insights") || active("/resources") || active("/work") || active("/faq") ? "resources"
    : active("/about") ? "about"
    : null;

  const trigger = (id: "services" | "resources", label: string, isActive: boolean) => (
    <button
      data-rail-item={id}
      onClick={() => setOpen(open === id ? null : id)}
      aria-expanded={open === id}
      aria-haspopup="true"
      className={cn(
        "inline-flex h-[var(--nav-h)] items-center gap-1.5 px-3.5 text-[0.9rem] transition-colors duration-[var(--dur-1)]",
        isActive || open === id ? "text-fg" : "text-muted hover:text-fg",
      )}
    >
      {label}
      <ChevronDown className={cn("size-3.5 transition-transform duration-[var(--dur-1)] ease-overshoot", open === id && "rotate-180")} />
    </button>
  );

  return (
    <header
      ref={navRef}
      data-nav
      className={cn("fixed inset-x-0 top-0 z-50 border-b border-rule bg-white/95 text-fg backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/85", scrolled && "shadow-e2")}
    >
      <div className="brand-rule absolute inset-x-0 top-0" aria-hidden />
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Logo />

        <nav className="rail-track hidden items-center lg:flex">
          <Link data-rail-item="home" href="/" className={cn("inline-flex h-[var(--nav-h)] items-center px-3.5 text-[0.9rem] transition-colors duration-[var(--dur-1)]", active("/") ? "text-fg" : "text-muted hover:text-fg")}>
            Home
          </Link>

          <div className="relative">{trigger("services", "Services", active("/services") || active("/practices"))}</div>

          <Link href="/gtm-ai-twin" className={cn("relative mx-2.5 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[0.9rem] font-medium transition-all duration-300", active("/gtm-ai-twin") ? "bg-ember text-white" : "bg-ember-wash text-ember-ink ring-1 ring-ember/25 hover:bg-ember hover:text-white")}>
            <Sparkles className="size-3.5" /> GTM AI Twin
          </Link>

          <div className="relative">{trigger("resources", "Resources", active("/insights") || active("/resources") || active("/work") || active("/faq"))}</div>

          <Link data-rail-item="about" href="/about" className={cn("inline-flex h-[var(--nav-h)] items-center px-3.5 text-[0.9rem] transition-colors duration-[var(--dur-1)]", active("/about") ? "text-fg" : "text-muted hover:text-fg")}>
            About
          </Link>

          {/* One accent that travels between sections, rather than one bar
              fading out while another fades in three links away. */}
          <RailIndicator active={railKey} />
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-muted transition-colors hover:text-ember-ink">.ai ↗</a>
          <Button href="/book" size="sm">Book a strategy call</Button>
        </div>

        <button data-menu-toggle className="inline-flex size-10 items-center justify-center rounded-full border border-rule-strong text-fg lg:hidden" onClick={() => setDrawer(!drawer)} aria-label="Toggle menu" aria-expanded={drawer}>
          {drawer ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ---------- services mega panel ---------- */}
      <div
        data-mega-panel="services"
        className={cn(
          "absolute inset-x-0 top-full hidden origin-top border-b border-rule bg-paper text-ink shadow-e4 transition-all duration-[var(--dur-1)] ease-standard lg:block",
          open === "services" ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="container-x grid max-h-[calc(100vh-var(--nav-h)-24px)] gap-8 overflow-y-auto py-9 xl:grid-cols-12">
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:col-span-9 xl:grid-cols-3">
            {families.map((g) => (
              <div key={g.slug}>
                <div className="mb-3 flex items-center justify-between gap-2 border-b border-rule pb-3">
                  <Link href={`/practices/${g.slug}`} className="font-display text-[0.98rem] font-semibold tracking-tight transition-colors hover:text-ember-ink">
                    {g.short}
                  </Link>
                  <PracticeGlyph slug={g.slug} className="h-6 w-9 shrink-0 opacity-70" />
                </div>
                <ul className="space-y-0.5">
                  {servicesFor(g.slug).map((s) => (
                    <li key={s.slug}>
                      <Link href={serviceHref(s)} className="group -mx-2 flex items-start gap-2 rounded-lg px-2 py-1.5 text-[0.86rem] leading-snug text-muted transition-colors hover:bg-sand hover:text-fg">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-rule-strong transition-colors group-hover:bg-ember" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 xl:col-span-3">
            <div className="rounded-[var(--radius-lg)] border border-ember/25 bg-ember-wash p-6">
              <div className="flex items-center gap-2 text-ember-ink">
                <Sparkles className="size-4" />
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.15em]">Special service</span>
              </div>
              <div className="mt-2 font-display text-[1.5rem] font-semibold tracking-tight">GTM AI Twin</div>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-fg-soft">{getService("gtm-ai-twin")?.tagline}</p>
              <Link href="/gtm-ai-twin" className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-ember px-4 text-[0.86rem] font-medium text-white transition-colors hover:bg-ember-ink">
                Explore the Twin <ArrowRight className="size-4" />
              </Link>
            </div>
            {platforms.map((g) => (
              <a key={g.slug} href={g.url} target="_blank" rel="noopener noreferrer" className="group rounded-[var(--radius-lg)] border border-rule p-4 transition-colors hover:border-rule-strong hover:bg-sand">
                <div className="flex items-center justify-between gap-2 font-display text-[0.98rem] font-semibold tracking-tight group-hover:text-ember-ink">{g.short}<ArrowUpRight className="size-4 text-muted group-hover:text-ember-ink" aria-hidden /></div>
                <p className="mt-1 text-[0.8rem] leading-snug text-muted">{g.tagline}</p>
              </a>
            ))}
            <div className="flex flex-col gap-1 text-[0.86rem]">
              <Link href={serviceHref(getService("revenue-operations")!)} className="text-muted transition-colors hover:text-fg">{getGroup("revenue-operations")?.short}</Link>
              <Link href="/services" className="inline-flex items-center gap-1.5 font-medium text-ember-ink">All services <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- resources panel ---------- */}
      <div
        data-mega-panel="resources"
        className={cn(
          "absolute left-1/2 top-full hidden w-[560px] -translate-x-1/2 pt-2 transition-all duration-[var(--dur-1)] ease-standard lg:block",
          open === "resources" ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-paper p-2 text-ink shadow-e4">
          <div className="grid grid-cols-2 gap-1">
            {resourceLinks.map((r) => (
              <Link key={r.href} href={r.href} className="rounded-xl p-3.5 transition-colors hover:bg-sand">
                <div className="font-display text-[0.95rem] font-semibold tracking-tight">{r.label}</div>
                <p className="mt-0.5 text-[0.8rem] leading-snug text-muted">{r.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- mobile drawer ---------- */}
      <div data-drawer className={cn("fixed inset-0 top-[var(--nav-h)] z-40 bg-white text-fg transition-all duration-300 lg:hidden", drawer ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
        <div className="container-x flex h-full flex-col overflow-y-auto pb-12 pt-6">
          <Link href="/gtm-ai-twin" className="mb-6 flex items-center justify-between rounded-2xl border border-ember/25 bg-ember-wash p-5 text-ember-ink">
            <div>
              <div className="flex items-center gap-2"><Sparkles className="size-4" /><span className="font-mono text-[0.66rem] uppercase tracking-[0.15em]">Special service</span></div>
              <div className="mt-1 font-display text-xl font-semibold tracking-tight text-fg">GTM AI Twin</div>
            </div>
            <ArrowRight className="size-5" />
          </Link>

          <Link href="/" className="border-b border-rule py-3.5 font-display text-lg font-medium">Home</Link>
          {[...families, ...platforms].map((g) => (
            <details key={g.slug} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 font-display text-lg font-medium [&::-webkit-details-marker]:hidden">
                {g.short}
                <ChevronDown className="size-4 text-muted transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ul className="pb-3">
                {servicesFor(g.slug).map((s) => (
                  <li key={s.slug}><Link href={serviceHref(s)} className="block py-2 pl-4 text-[0.92rem] text-muted">{s.name}</Link></li>
                ))}
                <li>
                  {g.url ? (
                    <a href={g.url} target="_blank" rel="noopener noreferrer" className="block py-2 pl-4 text-[0.92rem] font-medium text-ember-ink">Visit {g.short} ↗</a>
                  ) : (
                    <Link href={`/practices/${g.slug}`} className="block py-2 pl-4 text-[0.92rem] font-medium text-ember-ink">About {g.short} →</Link>
                  )}
                </li>
              </ul>
            </details>
          ))}

          <div className="mt-6 grid grid-cols-2 gap-x-6">
            {[["/services", "All Services"], ["/work", "Case Studies"], ["/insights", "Blog"], ["/resources", "Resources"], ["/faq", "FAQ"], ["/about", "About"], ["/contact", "Contact"]].map(([h, l]) => (
              <Link key={h} href={h} className="border-b border-rule py-3.5 font-display text-[1.05rem] font-medium">{l}</Link>
            ))}
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="border-b border-rule py-3.5 font-display text-[1.05rem] font-medium text-ember-ink">leadstrategus.ai ↗</a>
          </div>
          <Button href="/book" size="lg" className="mt-8 w-full">Book a strategy call</Button>
        </div>
      </div>
    </header>
  );
}
