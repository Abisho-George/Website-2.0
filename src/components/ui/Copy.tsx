import { Fragment } from "react";

/**
 * Renders a string, wrapping any [[placeholder]] segments in a flagged span.
 * Placeholders are invented facts that must be verified before launch.
 */
export function Copy({ text, as: Tag = Fragment }: { text: string; as?: React.ElementType }) {
  const parts = text.split(/(\[\[.*?\]\])/g).filter(Boolean);
  const children = parts.map((p, i) =>
    p.startsWith("[[") ? (
      <span key={i} data-placeholder title="Placeholder — verify before launch">
        {p.slice(2, -2)}
      </span>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
  return Tag === Fragment ? <>{children}</> : <Tag>{children}</Tag>;
}

export function strip(text: string) {
  return text.replace(/\[\[|\]\]/g, "");
}
