import { cn } from "@/lib/utils";

/**
 * One animated diagram per page, drawn from that page's subject.
 * Everything is stroke-drawn SVG so it stays crisp, weighs nothing,
 * and stops entirely under prefers-reduced-motion.
 */
type Variant = "practices" | "work" | "insights" | "about" | "contact" | "twin"
  | "gtm-strategy" | "demand-generation" | "revenue-intelligence" | "enablement";

const RULE = "var(--color-rule-strong)";
const EMBER = "var(--color-ember)";
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function HeroArt({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <svg className={cn("ha", className)} viewBox="0 0 320 240" fill="none" aria-hidden>
      {render(variant)}
    </svg>
  );
}

function render(v: Variant) {
  switch (v) {
    /* Four practices sharing one universe: a spine with four branches drawing outward. */
    case "practices":
      return (
        <g strokeLinecap="round">
          <line x1="30" y1="120" x2="290" y2="120" stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0)} />
          {[0, 1, 2, 3].map((i) => {
            const x = 66 + i * 63;
            const up = i % 2 === 0;
            const y = up ? 62 : 178;
            return (
              <g key={i}>
                <path d={`M${x} 120 L${x} ${y}`} stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0.5 + i * 0.14)} />
                <rect x={x - 26} y={up ? y - 34 : y} width="52" height="34" rx="7" stroke={i === 1 ? EMBER : RULE} strokeWidth={i === 1 ? 2 : 1.5} pathLength={1} data-draw style={d(0.75 + i * 0.14)} />
                <circle cx={x} cy="120" r="4" fill={i === 1 ? EMBER : RULE} data-pop style={d(0.9 + i * 0.14)} />
                {[0, 1].map((k) => (
                  <line key={k} x1={x - 16} y1={(up ? y - 24 : y + 12) + k * 9} x2={x + (k ? 4 : 16)} y2={(up ? y - 24 : y + 12) + k * 9}
                    stroke={i === 1 ? EMBER : RULE} strokeWidth="1.5" opacity={i === 1 ? 0.9 : 0.5} pathLength={1} data-draw style={d(1.05 + i * 0.14 + k * 0.06)} />
                ))}
              </g>
            );
          })}
        </g>
      );

    /* Results: programmes measured, one outcome carried above the rest. */
    case "work":
      return (
        <g strokeLinecap="round">
          <line x1="26" y1="196" x2="294" y2="196" stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0)} />
          {[42, 74, 110, 61, 148, 96, 172].map((h, i) => {
            const hot = i === 4;
            return (
              <g key={i}>
                <rect x={40 + i * 36} y={196 - h} width="16" height={h} rx="5"
                  fill={hot ? EMBER : "var(--color-kraft)"} stroke={hot ? "none" : RULE} strokeWidth="1"
                  data-rise style={d(0.35 + i * 0.09)} />
                {hot && <circle cx={48 + i * 36} cy={196 - h - 14} r="4" fill={EMBER} data-breathe style={d(1.3)} />}
              </g>
            );
          })}
          <path d="M48 154 C 96 138, 150 108, 192 48" stroke={EMBER} strokeWidth="1.5" strokeDasharray="3 5" opacity=".45" pathLength={1} data-draw style={d(1.1)} />
        </g>
      );

    /* Insights: threads of argument, one carried through to a conclusion. */
    case "insights":
      return (
        <g strokeLinecap="round" fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i}
              d={`M20 ${52 + i * 34} C 110 ${52 + i * 34}, 130 ${120}, 300 ${120}`}
              stroke={i === 2 ? EMBER : RULE} strokeWidth={i === 2 ? 2 : 1.2}
              opacity={i === 2 ? 1 : 0.55} pathLength={1} data-draw style={d(i * 0.16)} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx="20" cy={52 + i * 34} r="3.5" fill={i === 2 ? EMBER : RULE} data-pop style={d(0.1 + i * 0.16)} />
          ))}
          <circle cx="300" cy="120" r="6" fill={EMBER} data-pop style={d(1.15)} />
          <circle cx="300" cy="120" r="13" stroke={EMBER} strokeWidth="1.2" opacity=".4" data-breathe style={d(1.3)} />
        </g>
      );

    /* Eight years: a line that climbs, with the milestones that moved it. */
    case "about":
      return (
        <g strokeLinecap="round" fill="none">
          <line x1="26" y1="200" x2="294" y2="200" stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0)} />
          <path d="M34 186 C 96 178, 128 150, 166 122 S 232 74, 288 44" stroke={EMBER} strokeWidth="2.5" pathLength={1} data-draw style={d(0.35)} />
          {[[34, 186], [110, 166], [166, 122], [226, 82], [288, 44]].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={y} x2={x} y2="200" stroke={RULE} strokeWidth="1" strokeDasharray="2 4" opacity=".7" pathLength={1} data-draw style={d(0.9 + i * 0.13)} />
              <circle cx={x} cy={y} r={i === 4 ? 6 : 4} fill={i === 4 ? EMBER : "var(--color-paper)"} stroke={EMBER} strokeWidth="2" data-pop style={d(1 + i * 0.13)} />
            </g>
          ))}
        </g>
      );

    /* A conversation that starts: one message out, one reply back, a meeting. */
    case "contact":
      return (
        <g strokeLinecap="round" fill="none">
          <rect x="34" y="70" width="120" height="46" rx="10" stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0)} />
          {[0, 1].map((k) => <line key={k} x1="50" y1={86 + k * 14} x2={k ? 110 : 132} y2={86 + k * 14} stroke={RULE} strokeWidth="1.5" opacity=".6" pathLength={1} data-draw style={d(0.4 + k * 0.1)} />)}
          <path d="M154 93 C 190 93, 190 150, 220 150" stroke={EMBER} strokeWidth="1.8" strokeDasharray="4 5" pathLength={1} data-draw style={d(0.7)} />
          <rect x="166" y="128" width="120" height="46" rx="10" stroke={EMBER} strokeWidth="2" pathLength={1} data-draw style={d(1)} />
          {[0, 1].map((k) => <line key={k} x1="182" y1={144 + k * 14} x2={k ? 232 : 264} y2={144 + k * 14} stroke={EMBER} strokeWidth="1.5" opacity=".55" pathLength={1} data-draw style={d(1.35 + k * 0.1)} />)}
          <circle cx="286" cy="70" r="5" fill={EMBER} data-breathe style={d(1.7)} />
        </g>
      );

    /* Six agents, a pulse handed down the chain. */
    case "twin":
      return (
        <g strokeLinecap="round" fill="none">
          <line x1="24" y1="120" x2="296" y2="120" stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0)} />
          <line x1="24" y1="120" x2="296" y2="120" stroke={EMBER} strokeWidth="2" pathLength={1} data-flow opacity=".9" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 40 + i * 44;
            return (
              <g key={i}>
                <circle cx={x} cy="120" r="13" fill="var(--color-paper)" stroke={i === 5 ? EMBER : RULE} strokeWidth={i === 5 ? 2.4 : 1.6} data-pop style={d(0.3 + i * 0.12)} />
                <circle cx={x} cy="120" r="4" fill={i === 5 ? EMBER : RULE} data-pop style={d(0.42 + i * 0.12)} />
                <line x1={x} y1="99" x2={x} y2="86" stroke={RULE} strokeWidth="1" opacity=".55" pathLength={1} data-draw style={d(0.55 + i * 0.12)} />
              </g>
            );
          })}
          <circle cx="304" cy="120" r="7" fill={EMBER} data-breathe style={d(1.2)} />
        </g>
      );

    /* Practice-specific: the mechanism of that practice, drawn large. */
    case "gtm-strategy":
      return (
        <g strokeLinecap="round" fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M160 208 L${44 + i * 58} 44`} stroke={i === 2 ? EMBER : RULE} strokeWidth={i === 2 ? 2.4 : 1.3} opacity={i === 2 ? 1 : 0.55} pathLength={1} data-draw style={d(i * 0.13)} />
          ))}
          <path d="M160 208 L102 44 L218 44 Z" fill={EMBER} fillOpacity=".08" data-pop style={d(0.85)} />
          <circle cx="160" cy="208" r="6" fill={EMBER} data-pop style={d(0.7)} />
          <circle cx="160" cy="44" r="5" fill={EMBER} data-breathe style={d(1.1)} />
        </g>
      );

    case "demand-generation":
      return (
        <g strokeLinecap="round" fill="none">
          {[52, 92, 148, 188].map((y, i) => (
            <g key={y}>
              <path d={`M24 ${y} C 130 ${y}, 150 120, 250 120`} stroke={i === 1 ? EMBER : RULE} strokeWidth={i === 1 ? 2.2 : 1.3} opacity={i === 1 ? 1 : 0.5} pathLength={1} data-draw style={d(i * 0.15)} />
              <circle cx="24" cy={y} r="4" fill={i === 1 ? EMBER : RULE} data-pop style={d(0.1 + i * 0.15)} />
            </g>
          ))}
          <circle cx="250" cy="120" r="22" fill={EMBER} fillOpacity=".1" data-pop style={d(0.95)} />
          <circle cx="250" cy="120" r="8" fill={EMBER} data-pop style={d(1.05)} />
          <circle cx="250" cy="120" r="34" stroke={EMBER} strokeWidth="1.2" opacity=".35" data-breathe style={d(1.2)} />
        </g>
      );

    case "revenue-intelligence":
      return (
        <g strokeLinecap="round">
          <line x1="24" y1="200" x2="296" y2="200" stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0)} />
          {[14, 26, 10, 38, 20, 62, 18, 12, 34, 16, 126, 22, 30, 14, 44, 18].map((h, i) => {
            const hot = i === 10;
            return <rect key={i} x={30 + i * 17} y={200 - h} width="7" height={h} rx="3.5" fill={hot ? EMBER : "var(--color-kraft)"} stroke={hot ? "none" : RULE} strokeWidth=".8" data-rise style={d(0.25 + i * 0.045)} />;
          })}
          <circle cx="203.5" cy="60" r="6" fill={EMBER} data-breathe style={d(1.1)} />
          <line x1="24" y1="152" x2="296" y2="152" stroke={EMBER} strokeWidth="1" strokeDasharray="3 5" opacity=".5" pathLength={1} data-draw style={d(1)} />
        </g>
      );

    default: // enablement
      return (
        <g strokeLinecap="round" fill="none">
          <line x1="24" y1="200" x2="296" y2="200" stroke={RULE} strokeWidth="1.5" pathLength={1} data-draw style={d(0)} />
          <path d="M34 176 C 74 172, 100 164, 132 156" stroke={RULE} strokeWidth="2" pathLength={1} data-draw style={d(0.3)} />
          <path d="M132 156 C 186 140, 228 92, 288 40" stroke={EMBER} strokeWidth="2.8" pathLength={1} data-draw style={d(0.8)} />
          <line x1="132" y1="30" x2="132" y2="200" stroke={RULE} strokeWidth="1" strokeDasharray="3 5" opacity=".8" pathLength={1} data-draw style={d(0.6)} />
          <circle cx="132" cy="156" r="5.5" fill="var(--color-paper)" stroke={EMBER} strokeWidth="2.4" data-pop style={d(1)} />
          <circle cx="288" cy="40" r="7" fill={EMBER} data-breathe style={d(1.5)} />
        </g>
      );
  }
}
