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

  if (slug === "account-intelligence" || slug === "revenue-intelligence")
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

  if (slug === "positioning-content")
    // Scattered claims resolved into one line a buyer can follow.
    return (
      <svg {...common}>
        {[[14, 18], [26, 58], [38, 30], [22, 44], [34, 66], [18, 30]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" fill={line} />
        ))}
        <path d="M46 40 H108" stroke={acc} strokeWidth="2" />
        <path d="M40 22 L46 40 L40 58" stroke={line} strokeWidth="1" />
        <circle cx="108" cy="40" r="3.4" fill={acc} />
      </svg>
    );

  if (slug === "events")
    // A calendar of moments, one of them chosen and booked.
    return (
      <svg {...common}>
        {Array.from({ length: 15 }).map((_, i) => {
          const x = 14 + (i % 5) * 20, y = 14 + Math.floor(i / 5) * 20, hot = i === 8;
          return <rect key={i} x={x} y={y} width="12" height="12" rx="2.5" fill={hot ? acc : "none"} fillOpacity={hot ? 0.9 : 0} stroke={hot ? acc : line} strokeWidth="1" />;
        })}
      </svg>
    );

  if (slug === "leadstrategus-ai")
    // Connected agents, one of them carrying the work.
    return (
      <svg {...common}>
        {[[20, 20], [20, 60], [60, 40], [100, 20], [100, 60]].map(([x, y], i, a) =>
          a.slice(i + 1).map(([x2, y2], j) => <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke={line} strokeWidth="1" />),
        )}
        {[[20, 20], [20, 60], [100, 20], [100, 60]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" fill={line} />)}
        <circle cx="60" cy="40" r="5" fill={acc} />
      </svg>
    );

  if (slug === "expotofunnel")
    // A crowded show floor narrowing to one booked conversation.
    return (
      <svg {...common}>
        <path d="M12 12 H108 L70 44 V68 H50 V44 Z" stroke={line} strokeWidth="1.2" />
        {[[30, 22], [52, 20], [74, 24], [92, 18], [60, 32]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" fill={line} />)}
        <circle cx="60" cy="60" r="4" fill={acc} />
      </svg>
    );

  if (slug !== "enablement")
    // the capability layer, or anything not yet given its own drawing: a dial
    return (
      <svg {...common}>
        <path d="M24 60 A 36 36 0 0 1 96 60" stroke={line} strokeWidth="1.5" />
        <line x1="60" y1="60" x2="84" y2="34" stroke={acc} strokeWidth="2" />
        <circle cx="60" cy="60" r="3.4" fill={acc} />
      </svg>
    );

  // enablement, a skill curve lifting after coaching starts
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
