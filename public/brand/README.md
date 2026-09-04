# Brand assets

Drop the real artwork here, then fill in the paths in `src/content/brand.ts`.
Nothing else in the codebase needs to change.

| File | Used for | Notes |
|---|---|---|
| `mark.svg` | The shield, everywhere | Square viewBox, transparent background |
| `wordmark.svg` | "LeadStrategus" on light grounds | Full colour, transparent background |
| `wordmark-light.svg` | "LeadStrategus" on the dark nav | Knockout / white version |

```ts
// src/content/brand.ts
assets: {
  mark: "/brand/mark.svg",
  wordmark: "/brand/wordmark.svg",
  wordmarkLight: "/brand/wordmark-light.svg",
}
```

SVG is strongly preferred — the mark is rendered from 28px in the nav up to
512px in the app icon, and a raster will soften at the large end. If you only
have PNG, supply the mark at 512×512 and the wordmark at roughly 1000×160,
and change the file extensions above to match.

Until these are supplied, `src/components/site/Logo.tsx` renders a built-in
vector version in the brand colours (`src/content/brand.ts`).
