import { Copy } from "@/components/ui/Copy";

/** Minimal renderer: "## " → h2, "- " → list, otherwise paragraph. */
export function InsightBody({ body }: { body: string[] }) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: string) => { if (list.length) { out.push(<ul key={k}>{list.map((l, i) => <li key={i}><Copy text={l} /></li>)}</ul>); list = []; } };
  body.forEach((line, i) => {
    if (line.startsWith("- ")) { list.push(line.slice(2)); return; }
    flush(`l${i}`);
    if (line.startsWith("## ")) out.push(<h2 key={i}>{line.slice(3)}</h2>);
    else out.push(<p key={i}><Copy text={line} /></p>);
  });
  flush("end");
  return <div className="prose-ls">{out}</div>;
}
