/**
 * A distinct diagram per practice, drawn from what the practice actually does.
 * Not decoration: each glyph encodes the practice's mechanism.
 */
export function PracticeGlyph({ slug, className }: { slug: string; className?: string }) {
  const common = { className, viewBox: "0 0 120 80", fill: "none", "aria-hidden": true as const };
  const line = "var(--color-rule-strong)";
  const acc = "var(--color-ember)";

  if (slug === "gtm-strategy")
    // A market narrowed to one wedge: many segments, one chosen.
    return (
      <svg {...common}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M60 72 L${18 + i * 21} 12`} stroke={i === 2 ? acc : line} strokeWidth={i === 2 ? 2 : 1} />
        ))}
        <path d="M60 72 L39 12 L81 12 Z" fill={acc} fillOpacity=".1" />
        <circle cx="60" cy="72" r="3.5" fill={acc} />
      </svg>
    );

  if (slug === "demand-generation")
    // Multi-channel touches converging into one booked meeting.
    return (
      <svg {...common}>
        {[14, 30, 46, 62].map((y, i) => (
          <path key={y} d={`M10 ${y} C 45 ${y}, 55 40, 92 40`} stroke={i === 1 ? acc : line} strokeWidth={i === 1 ? 2 : 1} />
        ))}
        <circle cx="92" cy="40" r="9" fill={acc} fillOpacity=".12" />
        <circle cx="92" cy="40" r="4" fill={acc} />
      </svg>
    );

  if (slug === "revenue-intelligence")
    // Signal rising out of noise: a scatter with one column spiking.
    return (
      <svg {...common}>
        {Array.from({ length: 16 }).map((_, i) => {
          const h = [8, 14, 6, 20, 10, 34, 12, 7, 18, 9, 52, 11, 16, 8, 22, 10][i];
          const hot = i === 10;
          return <rect key={i} x={8 + i * 7} y={68 - h} width="3.4" height={h} rx="1.7" fill={hot ? acc : line} />;
        })}
        <circle cx="45.4" cy="12" r="3.4" fill={acc} />
      </svg>
    );

  // enablement — a skill curve lifting after coaching starts
  return (
    <svg {...common}>
      <path d="M10 60 C 30 58, 40 54, 52 50" stroke={line} strokeWidth="1.5" />
      <path d="M52 50 C 70 44, 82 26, 108 14" stroke={acc} strokeWidth="2" />
      <line x1="52" y1="8" x2="52" y2="70" stroke={line} strokeWidth="1" strokeDasharray="2 5" />
      <circle cx="52" cy="50" r="3.2" fill={acc} />
      <circle cx="108" cy="14" r="3.2" fill={acc} />
    </svg>
  );
}
