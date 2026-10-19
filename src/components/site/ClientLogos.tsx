import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { clients } from "@/content/clients";

/**
 * "Trusted by": past clients' logos in full colour, moving in a slow loop
 * (paused on hover). The list is repeated so the strip is always wider than
 * the screen, whatever the number of logos.
 */
export function ClientLogos() {
  const row = [...clients, ...clients];
  return (
    <section aria-label="Clients" className="border-y border-rule bg-paper py-8 md:py-10">
      <p className="kicker text-center text-muted">Trusted by B2B teams at</p>
      <Marquee
        className="mt-6"
        speed="38s"
        itemClassName="flex h-14 items-center px-6 md:px-8"
        items={row.map((c, i) => (
          <Image key={i} src={c.src} alt={c.name} width={c.w} height={c.h} className="h-auto max-h-12 w-auto max-w-[170px] object-contain" />
        ))}
      />
    </section>
  );
}
