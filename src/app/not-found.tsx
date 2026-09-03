import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="container-x relative py-32">
        <p className="eyebrow mb-6">404 · not in the universe</p>
        <h1 className="display text-[3rem] md:text-[5.5rem]">This page didn&apos;t <em>qualify.</em></h1>
        <p className="lede mt-6 max-w-xl">The URL you followed may belong to the old site. Everything from it lives here now under a new address.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to the start</Button>
          <Button href="/practices" variant="outline">See the practices</Button>
        </div>
      </div>
    </section>
  );
}
