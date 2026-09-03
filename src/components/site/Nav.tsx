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
    <header data-nav className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", open ? "bg-paper" : scrolled ? "bg-paper/85 backdrop-blur-xl" : "bg-transparent")}>
      <div className={cn("hairline absolute inset-x-0 bottom-0 transition-opacity duration-300", scrolled || open ? "opacity-100" : "opacity-0")} />
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setMega(false)}>
          {nav.primary.map((item) =>
            item.highlight ? (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative mx-2 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[0.9rem] font-medium transition-all duration-300",
                  active(item.href)
                    ? "bg-ember text-white"
                    : "bg-ember-wash text-ember-ink hover:bg-ember hover:text-white hover:shadow-[0_10px_24px_-12px_rgba(255,90,31,.9)]",
                )}
              >
                <Sparkles className="size-3.5" />
                {item.label}
              </Link>
            ) : (
              <div key={item.href} className="relative" data-mega-trigger={item.mega ? "" : undefined} onMouseEnter={() => item.mega && setMega(true)}>
                <Link href={item.href} className={cn("inline-flex h-9 items-center rounded-full px-3.5 text-[0.9rem] transition-colors", active(item.href) ? "text-fg" : "text-muted hover:text-fg")}>
                  {item.label}
                </Link>
                {item.mega && (
                  <div data-mega-panel className={cn("absolute left-1/2 top-full w-[700px] -translate-x-1/2 pt-3 transition-all duration-250", mega ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0")}>
                    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-paper p-2 shadow-[0_30px_70px_-30px_rgba(23,18,13,.35)]">
                      <div className="grid grid-cols-2 gap-1">
                        {practices.map((p) => (
                          <Link key={p.slug} href={`/practices/${p.slug}`} className="group rounded-xl p-4 transition-colors hover:bg-sand">
                            <div className="flex items-baseline gap-3">
                              <span className="font-mono text-[0.68rem] text-ember-ink">{p.index}</span>
                              <span className="font-display font-semibold tracking-tight">{p.name}</span>
                            </div>
                            <p className="mt-1.5 pl-8 text-[0.82rem] leading-snug text-muted">{p.tagline}</p>
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

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-muted transition-colors hover:text-ember-ink">.ai ↗</a>
          <Button href={nav.cta.href} size="sm">{nav.cta.label}</Button>
        </div>

        <button data-menu-toggle className="inline-flex size-10 items-center justify-center rounded-full border border-rule lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div data-drawer className={cn("fixed inset-0 top-[var(--nav-h)] z-40 bg-paper transition-all duration-300 lg:hidden", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
        <div className="container-x flex h-full flex-col overflow-y-auto pb-12 pt-6">
          <Link href="/gtm-ai-twin" className="mb-7 flex items-center justify-between rounded-2xl bg-ember p-5 text-white">
            <div>
              <div className="flex items-center gap-2"><Sparkles className="size-4" /><span className="font-mono text-[0.66rem] uppercase tracking-[0.15em]">Special service</span></div>
              <div className="mt-1 font-display text-xl font-semibold tracking-tight">GTM AI Twin</div>
            </div>
            <ArrowRight className="size-5" />
          </Link>
          <div className="eyebrow mb-3">Practices</div>
          {practices.map((p) => (
            <Link key={p.slug} href={`/practices/${p.slug}`} className="flex items-baseline gap-3 border-b border-rule py-4 font-display text-lg font-medium">
              <span className="font-mono text-[0.68rem] text-ember-ink">{p.index}</span>{p.name}
            </Link>
          ))}
          <div className="mt-7 grid grid-cols-2 gap-x-6">
            {nav.primary.filter((i) => !i.mega && !i.highlight).map((i) => (
              <Link key={i.href} href={i.href} className="border-b border-rule py-4 font-display text-lg font-medium">{i.label}</Link>
            ))}
            <Link href="/contact" className="border-b border-rule py-4 font-display text-lg font-medium">Contact</Link>
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="border-b border-rule py-4 font-display text-lg font-medium text-ember-ink">leadstrategus.ai ↗</a>
          </div>
          <Button href={nav.cta.href} size="lg" className="mt-8 w-full">{nav.cta.label}</Button>
        </div>
      </div>
    </header>
  );
}
