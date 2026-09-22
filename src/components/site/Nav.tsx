"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { practices } from "@/content/practices";
import { servicesFor } from "@/content/services";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { RailIndicator } from "@/components/motion/RailIndicator";

const resourceLinks = [
  { href: "/insights", label: "Blog & Insights", note: "Writing from the pipeline" },
  { href: "/resources", label: "Guides & Templates", note: "The worksheets we use" },
  { href: "/work", label: "Case Studies", note: "Programmes and their numbers" },
  { href: "/faq", label: "FAQ", note: "Everything people ask first" },
  { href: "/pricing", label: "Pricing", note: "What engagements cost" },
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
  // deliberately not on the rail — it carries its own filled state.
  const railKey =
    active("/") ? "home"
    : active("/services") || active("/practices") ? "services"
    : active("/insights") || active("/resources") || active("/work") || active("/faq") || active("/pricing") ? "resources"
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
        isActive || open === id ? "text-white" : "text-[#ddd6cc] hover:text-white",
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
      className={cn("fixed inset-x-0 top-0 z-50 bg-ink text-white transition-shadow duration-300", scrolled && "shadow-e2")}
    >
      <div className="brand-rule absolute inset-x-0 bottom-0" aria-hidden />
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Logo tone="light" />

        <nav className="rail-track hidden items-center lg:flex">
          <Link data-rail-item="home" href="/" className={cn("inline-flex h-[var(--nav-h)] items-center px-3.5 text-[0.9rem] transition-colors duration-[var(--dur-1)]", active("/") ? "text-white" : "text-[#ddd6cc] hover:text-white")}>
            Home
          </Link>

          <div className="relative">{trigger("services", "Services", active("/services") || active("/practices"))}</div>

          <Link href="/gtm-ai-twin" className={cn("relative mx-2.5 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[0.9rem] font-medium transition-all duration-300", active("/gtm-ai-twin") ? "bg-ember text-white" : "bg-white/12 text-ember-2 hover:bg-ember hover:text-white")}>
            <Sparkles className="size-3.5" /> GTM AI Twin
          </Link>

          <div className="relative">{trigger("resources", "Resources", active("/insights") || active("/resources") || active("/work") || active("/faq") || active("/pricing"))}</div>

          <Link data-rail-item="about" href="/about" className={cn("inline-flex h-[var(--nav-h)] items-center px-3.5 text-[0.9rem] transition-colors duration-[var(--dur-1)]", active("/about") ? "text-white" : "text-[#ddd6cc] hover:text-white")}>
            About
          </Link>

          {/* One accent that travels between sections, rather than one bar
              fading out while another fades in three links away. */}
          <RailIndicator active={railKey} />
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-[#ddd6cc] transition-colors hover:text-ember-2">.ai ↗</a>
          <Button href="/book" size="sm">Book a strategy call</Button>
        </div>

        <button data-menu-toggle className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-[#f6f2ec] lg:hidden" onClick={() => setDrawer(!drawer)} aria-label="Toggle menu" aria-expanded={drawer}>
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
        <div className="container-x grid gap-8 py-9 xl:grid-cols-12">
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:col-span-9 xl:grid-cols-4">
            {practices.map((p) => (
              <div key={p.slug}>
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-rule pb-3">
                  <Link href={`/practices/${p.slug}`} className="font-display text-[0.98rem] font-semibold tracking-tight transition-colors hover:text-ember-ink">
                    {p.short}
                  </Link>
                  <PracticeGlyph slug={p.slug} className="h-6 w-9 shrink-0 opacity-70" />
                </div>
                <ul className="space-y-1">
                  {servicesFor(p.slug).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex items-start gap-2 rounded-lg px-2 py-1.5 -mx-2 text-[0.86rem] leading-snug text-muted transition-colors hover:bg-sand hover:text-ink">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-rule-strong transition-colors group-hover:bg-ember" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="xl:col-span-3">
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] bg-ink p-6 text-[#f6f2ec]">
              <div>
                <div className="flex items-center gap-2 text-ember-2">
                  <Sparkles className="size-4" />
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.15em]">Special service</span>
                </div>
                <div className="mt-2 font-display text-[1.5rem] font-semibold tracking-tight">GTM AI Twin</div>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-[#c3b9ac]">
                  Custom agents that take over the whole motion — identify, research, engage, qualify, book.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/gtm-ai-twin" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ember px-4 text-[0.86rem] font-medium text-white transition-colors hover:bg-ember-2">
                  Explore the Twin <ArrowRight className="size-4" />
                </Link>
                <Link href="/services" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-[0.86rem] transition-colors hover:bg-white/5">
                  All services <ArrowRight className="size-4" />
                </Link>
              </div>
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
      <div data-drawer className={cn("fixed inset-0 top-[var(--nav-h)] z-40 bg-ink text-[#f6f2ec] transition-all duration-300 lg:hidden", drawer ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
        <div className="container-x flex h-full flex-col overflow-y-auto pb-12 pt-6">
          <Link href="/gtm-ai-twin" className="mb-6 flex items-center justify-between rounded-2xl bg-ember p-5 text-white">
            <div>
              <div className="flex items-center gap-2"><Sparkles className="size-4" /><span className="font-mono text-[0.66rem] uppercase tracking-[0.15em]">Special service</span></div>
              <div className="mt-1 font-display text-xl font-semibold tracking-tight">GTM AI Twin</div>
            </div>
            <ArrowRight className="size-5" />
          </Link>

          <Link href="/" className="border-b border-white/10 py-3.5 font-display text-lg font-medium">Home</Link>
          {practices.map((p) => (
            <details key={p.slug} className="border-b border-white/10">
              <summary className="cursor-pointer list-none py-3.5 font-display text-lg font-medium marker:hidden">{p.short}</summary>
              <ul className="pb-3">
                {servicesFor(p.slug).map((s) => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`} className="block py-2 pl-4 text-[0.92rem] text-[#c3b9ac]">{s.name}</Link></li>
                ))}
                <li><Link href={`/practices/${p.slug}`} className="block py-2 pl-4 text-[0.92rem] text-ember-2">About {p.short} →</Link></li>
              </ul>
            </details>
          ))}

          <div className="mt-6 grid grid-cols-2 gap-x-6">
            {[["/services", "All Services"], ["/work", "Work"], ["/insights", "Blog"], ["/resources", "Resources"], ["/faq", "FAQ"], ["/pricing", "Pricing"], ["/about", "About"], ["/contact", "Contact"]].map(([h, l]) => (
              <Link key={h} href={h} className="border-b border-white/10 py-3.5 font-display text-[1.05rem] font-medium">{l}</Link>
            ))}
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="border-b border-white/10 py-3.5 font-display text-[1.05rem] font-medium text-ember-2">leadstrategus.ai ↗</a>
          </div>
          <Button href="/book" size="lg" className="mt-8 w-full">Book a strategy call</Button>
        </div>
      </div>
    </header>
  );
}
