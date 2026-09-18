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

- **Championship editions**: all 17 country colourways now use the full color-block shell style (`assets/img/editions/`) — Netherlands and Belgium were the last two on the older subtle accent-bezel renders (`assets/img/renders/`) and have since been swapped over, so the grid is now visually consistent end to end.
- **Quebec**: not one of the 17 championship countries, but a fleur-de-lis colourway render (`assets/img/quebec-device-hero.png`) is the main image in the About section (replacing a stock "two runners" photo), captioned "Proudly built in Montréal, Québec" — not in the championship grid.
- **Stock photography**: 5 marquee slots use real photos (Unsplash, free license, no attribution required) in `assets/img/marquee/`, with a teal-duotone treatment (`.is-photo` in the CSS) so they read as one system with the rest of the site. VO2 Max Testing and Race-Day Ready were removed from the marquee entirely by request (not just left as placeholders).
- **Product accuracy corrections**: the device has no PPG/heart-rate sensor and there's no companion watch — the app connects to the ARO2 pod over Bluetooth. Removed the "Heart rate tells you..." hero copy and the "watch or head unit" phrasing on the homepage; blog posts still discuss heart rate in general VO2-max-science context (e.g. the Uth formula), which is unrelated to device claims and was left alone. Also removed the WEIGHT/SAMPLING/SEAL spec tiles and the "Sweat & Weatherproof" / IP67 callout in the Setup section — unverified hardware specs.
- **Pre-order page** (`pre-order.html`, linked from nav/footer as "Pre-order"): fully wired to the real AeroCardia Shopify store (`06iutf-gg`, password protection now removed — publicly live). Both "Reserve with $60 CAD" buttons (hero + bottom section) link directly to `https://06iutf-gg.myshopify.com/cart/52402757206312:1` — a Shopify cart permalink that adds **ARO2 Deposit** ($60 CAD) and drops the visitor straight into checkout. Verified end-to-end (reached a real Shop Pay checkout screen without submitting). No deposit/pre-order app is installed, so there's **no auto-charge** for the $600 remainder — completing that balance is still a manual step (emailed checkout link), not automatic; the page's copy already reflects this honestly. The old JotForm placeholder is gone entirely. Two things still open in Shopify: (1) there's a confirmed, deliberately configured automatic "Pre-order discount" (10% off, scoped to the ARO2 Deposit product) taking $60 → $54 at checkout — decision pending on whether to keep it (and disclose it in the pre-order copy) or remove it so price matches what's advertised; (2) **ARO2 System** ($600 × colourways) is also now publicly purchasable standalone since it's the same store — consider drafting it if customers shouldn't buy it before completing a deposit.
