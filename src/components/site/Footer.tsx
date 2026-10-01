import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { families, platforms } from "@/content/practices";
import { Logo } from "./Logo";
import { Copy } from "@/components/ui/Copy";

export function Footer() {
  return (
    <footer className="band band--sand relative border-t border-rule">
      <div className="container-x pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">B2B go-to-market, engineered. Strategy, demand generation, intelligence, enablement and custom AI agents, from Bengaluru to wherever you sell.</p>
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember-wash px-4 py-2 text-sm font-medium text-ember-ink transition-all hover:bg-ember hover:text-white">
              The agents live at leadstrategus.ai <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Services</div>
            <ul className="space-y-2.5 text-sm">
              {families.map((g) => <li key={g.slug}><Link href={`/practices/${g.slug}`} className="text-muted transition-colors hover:text-fg">{g.short}</Link></li>)}
              {platforms.map((g) => <li key={g.slug}><a href={g.url} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">{g.short} ↗</a></li>)}
              <li><Link href="/services" className="text-muted transition-colors hover:text-fg">All services</Link></li>
              <li><Link href="/pricing" className="text-muted transition-colors hover:text-fg">Pricing</Link></li>
              <li><Link href="/gtm-ai-twin" className="font-medium text-ember-ink">GTM AI Twin</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Company</div>
            <ul className="space-y-2.5 text-sm">
              {[["/about", "About"], ["/work", "Case studies"], ["/insights", "Blog"], ["/resources", "Resources"], ["/faq", "FAQ"], ["/careers", "Careers"], ["/contact", "Contact"], ["/book", "Book a call"]].map(([h, l]) => (
                <li key={h}><Link href={h} className="text-muted transition-colors hover:text-fg">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a className="link-u transition-colors hover:text-fg" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
              <li className="pt-2 max-w-xs leading-relaxed">{site.contact.hq}</li>
              <li className="pt-2"><a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">LinkedIn</a> · <a href={site.social.clutch} target="_blank" rel="noopener noreferrer" className="link-u">Clutch</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-6 text-xs text-dim md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {site.legalName}. Bengaluru, India.</div>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-muted">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-muted">Terms</Link>
            <span className="font-mono">v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
