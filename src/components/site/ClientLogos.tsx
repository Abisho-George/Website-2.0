import Image from "next/image";
import { clients } from "@/content/clients";

/**
 * "Trusted by": past clients' logos in one quiet row, set in grey and brought
 * to full colour on hover, each scaled to the same optical width.
 */
export function ClientLogos() {
  return (
    <section aria-label="Clients" className="border-y border-rule bg-paper">
      <div className="container-x flex flex-col items-center gap-6 py-8 md:flex-row md:gap-10 md:py-9">
        <p className="kicker shrink-0 text-center text-muted md:w-40 md:text-left">Trusted by B2B teams at</p>
        <ul className="grid w-full grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-3 md:flex md:flex-1 md:flex-wrap md:justify-between md:gap-x-10">
          {clients.map((c) => (
            <li key={c.name} className="flex justify-center">
              <Image
                src={c.src}
                alt={c.name}
                width={c.w}
                height={c.h}
                className="h-auto max-h-11 w-auto max-w-[150px] object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 md:max-h-12"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
