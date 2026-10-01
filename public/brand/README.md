# Brand assets

The LeadStrategus logo, from the brand kit.

| File | Used for |
|---|---|
| `mark.png` | The shield alone, at its natural shape, transparent. Used in the logo lockups and share images |
| `mark-512.png` | The shield on a transparent 512×512 square |
| `icon-192.png`, `icon-512.png` | App icons (shield on white) for the web manifest and structured data |

`src/app/icon.png` (browser tab) and `src/app/apple-icon.png` (home-screen
icon) are written by the same script.

All of them are generated from `scripts/brand/mark-source.jpg` by:

```
node scripts/brand/make-mark.mjs
```

To update the logo, replace `mark-source.jpg` with new artwork on a white
background and run the script again.

The logotype "LEADSTRATEGUS" is set live in Cinzel Bold (standing in for
Trajan Pro), and the tagline "Superpower your sales!" in Montserrat Medium,
so both stay sharp at any size. See `src/components/site/Logo.tsx`:

- `<Mark />`: the shield only
- `<Logo />`: shield and LEADSTRATEGUS (navigation)
- `<Logo variant="full" />`: shield, LEADSTRATEGUS and the tagline (footer)
