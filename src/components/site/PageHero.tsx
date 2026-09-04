import { Reveal } from "@/components/ui/Reveal";
import { HeroArt } from "@/components/visual/HeroArt";
import { cn } from "@/lib/utils";

type Art = React.ComponentProps<typeof HeroArt>["variant"];

/** Every page opens the same way: the title, the claim, and a diagram of the page's subject. */
export function PageHero({ title, lede, art, children, className }: {
  title: React.ReactNode; lede?: React.ReactNode; art: Art;
  children?: React.ReactNode; className?: string;
}) {
  return (
    <section className={cn("band relative overflow-hidden pt-[var(--nav-h)]", className)}>
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="container-x relative grid items-center gap-8 pb-10 pt-12 md:pb-14 md:pt-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal><h1 className="display text-[2.7rem] sm:text-[3.6rem] md:text-[4.6rem]">{title}</h1></Reveal>
          {lede && <Reveal delay={90}><p className="lede mt-6 max-w-2xl">{lede}</p></Reveal>}
          {children && <Reveal delay={160}>{children}</Reveal>}
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <HeroArt variant={art} className="ml-auto h-auto w-full max-w-[380px]" />
        </div>
      </div>
    </section>
  );
}
