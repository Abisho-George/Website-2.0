/**
 * Receives errors reported by visitors' browsers (src/lib/report-error.ts) and
 * writes them to the server log. Nothing is stored; the log is the record.
 */
const MAX_BYTES = 16_000;
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : undefined);

export async function POST(req: Request) {
  const text = await req.text().catch(() => "");
  if (!text || text.length > MAX_BYTES) return new Response(null, { status: 413 });
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }
  console.error(
    "[client-error]",
    JSON.stringify({
      kind: clip(data.kind, 40),
      message: clip(data.message, 1000),
      digest: clip(data.digest, 100),
      url: clip(data.url, 500),
      userAgent: clip(data.userAgent, 300),
      stack: clip(data.stack, 4000),
    }),
  );
  return new Response(null, { status: 204 });
}
