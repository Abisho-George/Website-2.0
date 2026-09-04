"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content/site";
import { practices } from "@/content/practices";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setMega(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      data-nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-ink text-[#f6f2ec] transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-18px_rgba(23,18,13,.65)]",
      )}
    >
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setMega(false)}>
          {nav.primary.map((item) =>
            item.highlight ? (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative mx-2.5 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[0.9rem] font-medium transition-all duration-300",
                  active(item.href)
                    ? "bg-ember text-white"
                    : "bg-white/10 text-ember-2 hover:bg-ember hover:text-white",
                )}
              >
                <Sparkles className="size-3.5" />
                {item.label}
              </Link>
            ) : (
              <div key={item.href} className="relative" data-mega-trigger={item.mega ? "" : undefined} onMouseEnter={() => item.mega && setMega(true)}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex h-[var(--nav-h)] items-center px-3.5 text-[0.9rem] transition-colors",
                    active(item.href) ? "text-white" : "text-[#b3a89a] hover:text-white",
                  )}
                >
                  {item.label}
                  <span className={cn("absolute inset-x-3 bottom-0 h-[2px] bg-ember transition-transform duration-300", active(item.href) ? "scale-x-100" : "scale-x-0")} />
                </Link>
                {item.mega && (
                  <div data-mega-panel className={cn("absolute left-1/2 top-full w-[700px] -translate-x-1/2 pt-2 transition-all duration-200", mega ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0")}>
                    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-paper p-2 text-ink shadow-[0_30px_70px_-28px_rgba(23,18,13,.5)]">
                      <div className="grid grid-cols-2 gap-1">
                        {practices.map((p) => (
                          <Link key={p.slug} href={`/practices/${p.slug}`} className="group rounded-xl p-4 transition-colors hover:bg-sand">
                            <span className="font-display font-semibold tracking-tight">{p.name}</span>
                            <p className="mt-1.5 text-[0.82rem] leading-snug text-muted">{p.tagline}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-1 flex items-center justify-between rounded-xl bg-sand px-4 py-3">
                        <span className="text-[0.82rem] text-muted">Four practices, one operating model.</span>
                        <Link href="/practices" className="inline-flex items-center gap-1 text-[0.82rem] font-medium">All practices <ArrowRight className="size-3.5" /></Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-[#b3a89a] transition-colors hover:text-ember-2">.ai ↗</a>
          <Button href={nav.cta.href} size="sm">{nav.cta.label}</Button>
        </div>

        <button data-menu-toggle className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-[#f6f2ec] lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div data-drawer className={cn("fixed inset-0 top-[var(--nav-h)] z-40 bg-ink text-[#f6f2ec] transition-all duration-300 lg:hidden", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
        <div className="container-x flex h-full flex-col overflow-y-auto pb-12 pt-6">
          <Link href="/gtm-ai-twin" className="mb-7 flex items-center justify-between rounded-2xl bg-ember p-5 text-white">
            <div>
              <div className="flex items-center gap-2"><Sparkles className="size-4" /><span className="font-mono text-[0.66rem] uppercase tracking-[0.15em]">Special service</span></div>
              <div className="mt-1 font-display text-xl font-semibold tracking-tight">GTM AI Twin</div>
            </div>
            <ArrowRight className="size-5" />
          </Link>
          {practices.map((p) => (
            <Link key={p.slug} href={`/practices/${p.slug}`} className="border-b border-white/10 py-4 font-display text-lg font-medium">{p.name}</Link>
          ))}
          <div className="mt-7 grid grid-cols-2 gap-x-6">
            {nav.primary.filter((i) => !i.mega && !i.highlight).map((i) => (
              <Link key={i.href} href={i.href} className="border-b border-white/10 py-4 font-display text-lg font-medium">{i.label}</Link>
            ))}
            <Link href="/contact" className="border-b border-white/10 py-4 font-display text-lg font-medium">Contact</Link>
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="border-b border-white/10 py-4 font-display text-lg font-medium text-ember-2">leadstrategus.ai ↗</a>
          </div>
          <Button href={nav.cta.href} size="lg" className="mt-8 w-full">{nav.cta.label}</Button>
        </div>
      </div>
    </header>
  );
}
