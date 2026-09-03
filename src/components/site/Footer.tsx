import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { practices } from "@/content/practices";
import { Logo } from "./Logo";
import { Copy } from "@/components/ui/Copy";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="container-x pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">B2B go-to-market, engineered. Strategy, demand generation, intelligence, enablement and custom AI agents, from Bengaluru to wherever you sell.</p>
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-full border border-ion/40 px-4 py-2 text-sm text-ion transition-all hover:bg-ion/10">
              The agents live at leadstrategus.ai <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Practices</div>
            <ul className="space-y-2.5 text-sm">
              {practices.map((p) => <li key={p.slug}><Link href={`/practices/${p.slug}`} className="text-muted transition-colors hover:text-fg">{p.name}</Link></li>)}
              <li><Link href="/gtm-ai-twin" className="text-ion transition-colors hover:text-ion-2">GTM AI Twin</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Company</div>
            <ul className="space-y-2.5 text-sm">
              {[["/about", "About"], ["/work", "Work"], ["/insights", "Insights"], ["/careers", "Careers"], ["/contact", "Contact"], ["/book", "Book a call"]].map(([h, l]) => (
                <li key={h}><Link href={h} className="text-muted transition-colors hover:text-fg">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a className="transition-colors hover:text-fg" href={`mailto:${site.contact.email.replace(/\[\[|\]\]/g, "")}`}><Copy text={site.contact.email} /></a></li>
              <li><a className="transition-colors hover:text-fg" href={`tel:${site.contact.phone.replace(/\[\[|\]\]|\s/g, "")}`}><Copy text={site.contact.phone} /></a></li>
              <li className="pt-2"><Copy text={site.contact.hq} /></li>
              <li><Copy text={site.contact.office2} /></li>
              <li className="pt-2"><a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">LinkedIn</a> · <a href={site.social.clutch} target="_blank" rel="noopener noreferrer" className="link-u">Clutch</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-dim md:flex-row md:items-center md:justify-between">
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
