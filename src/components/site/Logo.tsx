import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "@/content/brand";

/**
 * The shield mark. Uses /public/brand/mark.svg when supplied, otherwise the
 * built-in vector below — a guard's visor inside a shield, in the brand red and blue.
 */
export function Mark({ className }: { className?: string }) {
  if (brand.assets.mark) {
    return <Image src={brand.assets.mark} alt="" width={32} height={32} className={cn("size-8", className)} priority />;
  }
  return (
    <svg viewBox="0 0 100 100" className={cn("size-8", className)} aria-hidden>
      <defs>
        <linearGradient id="ls-shield-g" x1="0" y1="0.1" x2="1" y2="0.9">
          <stop offset="0%" stopColor="#3A2FB0" />
          <stop offset="45%" stopColor="#2438C8" />
          <stop offset="100%" stopColor="#1667F0" />
        </linearGradient>
      </defs>
      <path d="M50 7 L88 23 C 90 52 80 75 50 93 C 20 75 10 52 12 23 Z" fill="url(#ls-shield-g)" stroke="#141C7A" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M48.6 14 L22.5 26.5 L46 41.5 L48.6 41.5 Z" fill="#E4121F" />
      <path d="M51.4 14 L77.5 26.5 L54 41.5 L51.4 41.5 Z" fill="#E4121F" />
      <path d="M19.5 28 L45 43.5 L45 51.5 L28.5 43 L28.5 57.5 L45 67 L45 79 L24.5 63.5 C 19.5 52 18.5 39 19.5 28 Z" fill="#fff" stroke="#141C7A" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M80.5 28 L55 43.5 L55 51.5 L71.5 43 L71.5 57.5 L55 67 L55 79 L75.5 63.5 C 80.5 52 81.5 39 80.5 28 Z" fill="#fff" stroke="#141C7A" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M30.5 45.5 L45 54 L45 58.5 L30.5 50.5 Z" fill="#E4121F" />
      <path d="M69.5 45.5 L55 54 L55 58.5 L69.5 50.5 Z" fill="#E4121F" />
      <path d="M50 15 L52.6 23 L52.6 68 L50 93 L47.4 68 L47.4 23 Z" fill="#fff" />
    </svg>
  );
}

/** The wordmark: "Lead" in brand red, "Strategus" in brand blue — or white on the dark nav. */
export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const src = tone === "light" ? brand.assets.wordmarkLight ?? brand.assets.wordmark : brand.assets.wordmark;
  if (src) {
    return <Image src={src} alt="LeadStrategus" width={168} height={26} className={cn("h-[22px] w-auto", className)} priority />;
  }
  return (
    <span className={cn("brand-wordmark text-[1.18rem] leading-none", className)}>
      <span style={{ color: tone === "light" ? brand.colors.redLight : brand.colors.red }}>Lead</span>
      <span style={{ color: tone === "light" ? "#f6f2ec" : brand.colors.blue }}>Strategus</span>
    </span>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex shrink-0 items-center gap-2.5", className)} aria-label="LeadStrategus home">
      <Mark className="transition-transform duration-300 group-hover:scale-105" />
      <Wordmark tone={tone} />
    </Link>
  );
}
