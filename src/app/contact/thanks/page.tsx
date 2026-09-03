import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { enquiryLabel } from "@/lib/enquiry";
import { buildMetadata } from "@/lib/seo";
import { insightsByDate } from "@/content/insights";

export const metadata = buildMetadata({ title: "Thanks", path: "/contact/thanks", noIndex: true });

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const isTwin = type === "gtm-ai-twin";
  return (
    <section className="relative flex min-h-[85vh] items-center pt-[var(--nav-h)]">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="container-x relative py-20">
        <p className={`eyebrow mb-6 ${isTwin ? "text-ion" : "text-ember"}`}>Received · {enquiryLabel(type ?? "")}</p>
        <h1 className="display max-w-4xl text-[3rem] md:text-[5rem]">Got it. A founder will reply <em className={isTwin ? "text-ion" : "text-ember"}>within a working day.</em></h1>
        <p className="lede mt-6 max-w-xl">Meanwhile, two things that will make the first call more useful.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="card p-6"><div className="eyebrow mb-3">Bring</div><p className="text-muted">Your last two quarters of pipeline by source, and the three accounts you most wish you had won.</p></div>
          <div className="card p-6"><div className="eyebrow mb-3">Read</div><ul className="space-y-2 text-sm">{insightsByDate.slice(0, 2).map((i) => <li key={i.slug}><Link href={`/insights/${i.slug}`} className="link-u">{i.title}</Link></li>)}</ul></div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3"><Button href="/book" variant={isTwin ? "ion" : "primary"}>Book the call now</Button><Button href="/" variant="outline">Back to the start</Button></div>
      </div>
    </section>
  );
}
