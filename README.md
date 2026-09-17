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
- **Quebec**: not one of the 17 championship countries, but a fleur-de-lis colourway render (`assets/img/quebec-device-hero.png`) is the main image in the About section (replacing a stock "two runners" photo), captioned "Proudly built in Montréal, Québec" — not in the championship grid.
- **Stock photography**: 5 marquee slots use real photos (Unsplash, free license, no attribution required) in `assets/img/marquee/`, with a teal-duotone treatment (`.is-photo` in the CSS) so they read as one system with the rest of the site. VO2 Max Testing and Race-Day Ready were removed from the marquee entirely by request (not just left as placeholders).
- **Product accuracy corrections**: the device has no PPG/heart-rate sensor and there's no companion watch — the app connects to the ARO2 pod over Bluetooth. Removed the "Heart rate tells you..." hero copy and the "watch or head unit" phrasing on the homepage; blog posts still discuss heart rate in general VO2-max-science context (e.g. the Uth formula), which is unrelated to device claims and was left alone. Also removed the WEIGHT/SAMPLING/SEAL spec tiles and the "Sweat & Weatherproof" / IP67 callout in the Setup section — unverified hardware specs.
- **Pre-order page** (`pre-order.html`, linked from nav/footer as "Pre-order"): the AeroCardia Shopify store (`06iutf-gg`) already has real products — **ARO2 Deposit** ($60 CAD, tracked inventory) and **ARO2 System** ($600 CAD × 3 colourways × variants). No deposit/pre-order app is installed (checked Apps: only Messaging + Translate & Adapt), so there's **no auto-charge** — completing the $600 balance is a manual step via an emailed checkout link, not an automatic card charge. The page's copy was rewritten to match these real numbers ($60 + $600 = $660 total) and be honest about the manual-completion flow; the earlier "Option A (hardware discount) vs Option B (subscription credit)" choice was removed because that mechanic isn't actually implemented in Shopify. The reserve form still reuses the general waitlist JotForm as a placeholder (its copy says "Waitlist," not "Reserve"). Real checkout details are ready to wire in (product handle `aro2-deposit`, variant ID `52402757206312`, store `06iutf-gg.myshopify.com`), but **the Shopify store is still password-protected ("Opening soon")** — pointing the Reserve button at it now would just hit the password page. Blocked on the store owner's call: remove password protection, or hold off until launch.
