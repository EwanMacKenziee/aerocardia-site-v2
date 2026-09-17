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

- **Championship editions**: 12 of 17 country colourways now have real renders — Netherlands/copper, Belgium/white-yellow, GB/cobalt (subtle accent-bezel style, in `assets/img/renders/`), plus Italy, France, Germany, Spain, Colombia, Ecuador, Eritrea, Ethiopia, Canada (full color-block shell style, in `assets/img/editions/`, sourced from "Flags other views.zip"). Note the two styles look different side by side — that's a known tradeoff, not a bug. Still missing: Norway, Australia, United States, Mexico, UAE — these point to `assets/img/editions/<country>.png`, which don't exist yet, so the viewer falls back to "Render coming soon" for them.
- **Stock photography**: no real photos have been sourced (copyright reasons) — the idle marquee strip uses icon+label tiles as a placeholder for real athlete photography, Squarespace-style.
