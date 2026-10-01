// Cuts the shield out of its white backdrop and writes the brand mark files.
// The background is removed by flood fill from the image edges, so the white
// and silver inside the shield are kept. Edge pixels get partial alpha so the
// outline stays smooth on any ground.
// Usage: node scripts/brand/make-mark.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = new URL("./mark-source.jpg", import.meta.url).pathname;
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = (i) => [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
// "background-ish": bright and nearly neutral
const bgLike = (i, t) => { const [r, g, b] = px(i); return Math.min(r, g, b) >= t && Math.max(r, g, b) - Math.min(r, g, b) < 18; };

const bg = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) { stack.push(x, (H - 1) * W + x); }
for (let y = 0; y < H; y++) { stack.push(y * W, y * W + W - 1); }
while (stack.length) {
  const i = stack.pop();
  if (bg[i] || !bgLike(i, 236)) continue;
  bg[i] = 1;
  const x = i % W, y = (i / W) | 0;
  if (x > 0) stack.push(i - 1); if (x < W - 1) stack.push(i + 1);
  if (y > 0) stack.push(i - W); if (y < H - 1) stack.push(i + W);
}

const out = Buffer.alloc(W * H * 4);
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let i = 0; i < W * H; i++) {
  const [r, g, b] = px(i);
  let a = 255;
  if (bg[i]) a = 0;
  else {
    // a pixel touching the background fades by how close to white it is
    const x = i % W, y = (i / W) | 0;
    const edge = (x > 0 && bg[i - 1]) || (x < W - 1 && bg[i + 1]) || (y > 0 && bg[i - W]) || (y < H - 1 && bg[i + W]);
    if (edge) a = Math.max(0, Math.min(255, Math.round(((255 - Math.min(r, g, b)) / 60) * 255)));
  }
  out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b; out[i * 4 + 3] = a;
  if (a > 0) { if (x0(i) < minX) minX = x0(i); if (x0(i) > maxX) maxX = x0(i); if (y0(i) < minY) minY = y0(i); if (y0(i) > maxY) maxY = y0(i); }
}
function x0(i) { return i % W; } function y0(i) { return (i / W) | 0; }

const cut = sharp(out, { raw: { width: W, height: H, channels: 4 } }).extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 });
const trimmed = await cut.png().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log(`shield ${meta.width}x${meta.height}`);

mkdirSync("public/brand", { recursive: true });
// palette PNGs keep the gradients and the soft edge at a fraction of the weight
const png = { compressionLevel: 9, palette: true, quality: 92, effort: 10 };
// the mark at its natural aspect: a large master for share images, and a
// small one for the logo on the page (56px tall at most, so 3x is 168px)
await sharp(trimmed).resize({ height: 512 }).png(png).toFile("public/brand/mark.png");
await sharp(trimmed).resize({ height: 168 }).png(png).toFile("public/brand/mark-sm.png");
// square, padded versions for icons
const square = async (size, pad, bgColor) => {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(trimmed).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bgColor } }).composite([{ input: m, gravity: "center" }]).png(png);
};
const clear = { r: 0, g: 0, b: 0, alpha: 0 }, white = { r: 255, g: 255, b: 255, alpha: 1 };
await (await square(512, 0.02, clear)).toFile("public/brand/mark-512.png");
await (await square(96, 0.02, clear)).toFile("src/app/icon.png");
await (await square(180, 0.1, white)).toFile("src/app/apple-icon.png");
await (await square(192, 0.06, white)).toFile("public/brand/icon-192.png");
await (await square(512, 0.06, white)).toFile("public/brand/icon-512.png");
console.log("wrote public/brand/mark.png, mark-sm.png, mark-512.png, icon-192.png, icon-512.png, src/app/icon.png, src/app/apple-icon.png");
