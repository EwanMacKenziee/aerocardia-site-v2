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

- **Championship editions**: all 17 country colourways now have real renders. Netherlands and Belgium use the original subtle accent-bezel style (`assets/img/renders/`); every other country uses the full color-block shell style (`assets/img/editions/`). GB was switched over from the old cobalt accent render to a literal Union Jack full-shell render by request. Note the two styles look different side by side — that's a known tradeoff, not a bug.
- **Quebec**: not one of the 17 championship countries, but a fleur-de-lis colourway render exists at `assets/img/quebec-device.png` and is shown as a small "Proudly built in Montréal, Québec" callout in the About section (next to the founder story), not in the championship grid.
- **Stock photography**: 5 of 7 marquee slots now use real photos (Unsplash, free license, no attribution required) in `assets/img/marquee/`, with a teal-duotone treatment (`.is-photo` in the CSS) so they read as one system with the rest of the site. VO2 Max Testing uses a device render (`assets/img/renders/device-cobalt.png`) instead of a stock photo — generic gas-mask lab shots didn't match the "no lab needed" pitch. Race-Day Ready is still the icon+label placeholder — no photo picked yet.
- **Pre-order page** (`pre-order.html`, linked from nav/footer as "Pre-order"): built from the internal pre-order strategy doc — $70 CAD deposit / $699 CAD system, deposit-application choice (Option A: 10% hardware discount vs Option B: subscription credit), refund policy, and a simplified public timeline. Internal-only planning content (refund-risk cancellation modeling, marketing targets, manufacturing schedule, launch checklist) was deliberately left off since it's not meant to be public. The reserve form currently reuses the general waitlist JotForm — its internal copy still says "Waitlist," not "Reserve" — so either edit that form's copy in the JotForm dashboard or swap in a dedicated one. Real checkout (deposit now / $600 auto-charged before shipping) isn't wired up yet: next step is Shopify + Shopify Payments (a deposit/partial-payment app for the split charge, Shopify Subscriptions for the $9.99/$19.99 tiers), then swap the JotForm for a Shopify Buy Button once that's live.
