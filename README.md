# AeroCardia — Site v2

Static, no-build-step marketing site (single `index.html`, Tailwind via CDN). Separate design direction from `aerocardia-site/` (POD Mk-IV clip-on framing, telemetry-HUD hero, championship colourway toggle).

## Run locally

Open `index.html` directly in a browser, or serve it:

```bash
npx serve .
```

## Deploy (Vercel)

```bash
npx vercel        # first run: link/create the project
npx vercel --prod # promote to production
```

`vercel.json` is already set up for a zero-config static deploy (no framework, no build command needed).

## Open items

- **Backed By logos**: currently placeholder monogram badges (`data-logo-slot` attributes on each tile in the "Backed By" section) for McGill Dobson Centre, Garage&Co Incubator, Vitruvius Venture Studio, and CLIP — swap in real `<img>` logos once received.
- **CLIP**: replaced "Marika Zelenka Roy Prize" per request — confirm what CLIP is (program/partner/award) so the tile can get a proper mark instead of the placeholder paperclip icon.
- **Device renders / championship editions**: still using the original Google-hosted image URLs from the design mockup — swap for owned/hosted assets before shipping publicly.
- **Stock photography**: no real photos have been sourced (copyright reasons) — the idle marquee strip uses icon+label tiles as a placeholder for real athlete photography, Squarespace-style.
