# Initial Phase Report — Madhuvarshika Cab Website

Generated: 25 October 2026
Project path: `E:\madhuvarshika-cab-website`
Git repository: No (not initialized)

---

## 1. Project Overview

A single-page, static marketing website for **Madhuvarshika Cab Service**, a 24/7 taxi operator based in Samalapuram, Tiruppur, Tamil Nadu. Built with plain HTML, inline CSS and inline JavaScript — no framework, no build step, no package manager. Intended for deployment on Vercel as-is.

| Attribute | Value |
|---|---|
| Project type | Static website (single page) |
| Stack | HTML5 + CSS3 (inline `<style>`) + Vanilla JS (inline `<script>`) |
| Build step | None |
| Dependencies | Google Fonts + Unsplash images (CDN, runtime) |
| Deployment target | Vercel (`vercel.json`, framework preset "Other") |
| Total files | 3 |

---

## 2. Folder Contents

```
E:\madhuvarshika-cab-website\
├── index.html     30,666 bytes   196 lines   Entire website (markup, styles, scripts)
├── README.md       1,632 bytes    30 lines   Setup, deployment and pre-launch checklist
└── vercel.json        50 bytes     4 lines   Vercel routing config
```

No `assets/`, `images/`, `css/`, `js/`, `robots.txt`, `sitemap.xml`, `.gitignore`, logo file, or favicon present.

---

## 3. File-by-File Summary

### `index.html`
The complete site in one file.

- **Head / SEO**
  - Title, meta description, keywords, theme colour, Open Graph tags.
  - JSON-LD structured data (`@type: TaxiService`) with name, phone, area served, 24/7 hours.
  - Preconnects + Google Fonts (DM Sans, Manrope).
  - No favicon link, no canonical URL, no `og:image`, no Twitter card tags.
- **Styles**
  - ~4,000-character single-line CSS rules (minified style) in one `<style>` block.
  - CSS custom properties for the palette (navy `#071b43`, yellow `#ffd329`, etc.).
  - Responsive breakpoints at 900px and 600px.
  - `prefers-reduced-motion` support.
- **Sections** (top to bottom)
  1. Top bar — 24/7 badge + location
  2. Sticky header/nav — brand mark "MV", links, mobile hamburger menu
  3. Hero — headline, CTAs (WhatsApp / call), trust row, stock car image, ₹15/km badge, 4.9 rating card
  4. Services — 6 cards (local, outstation, round trip, one-way, airport, family/group)
  5. Tariff — 3 price cards (one-way ₹15/km, round trip ₹14/km featured, one-day ₹1,800 + ₹12/km) + disclaimer
  6. Why Us — navy panel + 4 feature blocks
  7. Vehicles — 3-image gallery (all Unsplash stock)
  8. Reviews — 4.9 / 17 Google reviews summary + 3 review cards + disclaimer
  9. Contact — 2 phone numbers, address, hours, Google Maps link, booking form
  10. Footer — copyright, dynamic year, back-to-top
  11. Floating call/WhatsApp buttons + mobile bottom action bar
- **JavaScript behaviour**
  - `WHATSAPP_NUMBER = "919159154525"` constant (flagged for client confirmation).
  - Builds `wa.me` deep links for floating and mobile WhatsApp buttons.
  - Mobile menu toggle with `aria-expanded` handling.
  - Tariff buttons pre-select the trip type in the booking form.
  - Date input minimum set to today.
  - Booking form `submit` → composes a formatted WhatsApp message → opens `wa.me` in a new tab. No backend, no storage, no fare calculation.

### `README.md`
Documents the project purpose, local preview (open `index.html`), Vercel deployment steps, and a **pre-launch checklist** covering unverified data: WhatsApp number, second phone number, conflicting tariff prices and ₹300 driver allowance, stock photos, Google Maps link, review rating/count, and review authenticity.

### `vercel.json`
```json
{ "cleanUrls": true, "trailingSlash": false }
```
Routing only — no redirects, headers, caching or security configuration.

---

## 4. Business Data Present on the Site

| Item | Value shown |
|---|---|
| Business name | Madhuvarshika Cab Service |
| Primary phone | +91 91591 54525 (assumed WhatsApp) |
| Secondary phone | +91 63792 11249 |
| Location | Samalapuram, Tiruppur, Tamil Nadu, India |
| Hours | Open 24 hours / Mo–Su 00:00–23:59 |
| Rating | 4.9 / 5 from 17 Google reviews (per screenshot) |
| One-way fare | ₹15 / km |
| Round-trip fare | ₹14 / km |
| One-day package | ₹1,800 + ₹12 / km |
| Extra noted | ₹300 driver allowance (mentioned in disclaimer only) |

---

## 5. External Dependencies

| Dependency | Usage | Risk |
|---|---|---|
| Google Fonts (DM Sans, Manrope) | Typography | Requires internet; third-party request |
| Unsplash images (4 photos) | Hero + vehicle gallery | Stock images, not client's own; requires internet |
| `wa.me` | Booking handoff | Depends on correct number having WhatsApp |
| Google Maps search URL | Location link | Generic search, not a verified listing link |
| schema.org JSON-LD | SEO structured data | Details unverified |

No broken internal links detected; all nav anchors (`#home`, `#services`, `#tariff`, `#vehicles`, `#reviews`, `#contact`) map to existing section IDs.

---

## 6. Observations & Gaps (from code and README)

**Content / accuracy**
- Fare data is explicitly marked unverified; sources conflict (local rate, ₹300 allowance).
- Only one review quote is real; two review cards are generic filler text.
- Rating (4.9 / 17) is from a screenshot and may be stale.
- Stock Unsplash photos used instead of the client's own vehicle/business photos.
- Map link opens a generic Google Maps search, not the exact business listing.

**Technical**
- No favicon, `og:image`, canonical tag, `robots.txt`, or `sitemap.xml`.
- No image optimisation — hero/gallery images load directly from Unsplash at fixed widths.
- CSS and JS are inline and largely single-line minified, which hinders maintainability.
- Booking form relies entirely on WhatsApp; no validation beyond HTML `required`, no spam protection, no success/error feedback.
- No analytics, cookie notice, privacy policy, or terms page.
- JSON-LD lacks `address`, `geo`, `url`, `priceRange` and `sameAs` fields.
- `vercel.json` has no security headers (CSP, HSTS, X-Frame-Options) or cache rules.
- Accessibility is mostly good (aria labels, `aria-expanded`, reduced motion), but icon-only buttons rely on emoji glyphs.

---

## 7. Current Status

- **Structure:** Complete single-page site, ready to preview locally.
- **Deployment:** Configured for Vercel with no build step.
- **Content:** Draft/placeholder in several areas — prices, reviews, photos, contact verification.
- **Production readiness:** Not yet. The README's pre-launch checklist (client verification of numbers, fares, photos, reviews, map link) should be completed first.

---

## 8. Suggested Next Steps

1. Verify all business details with the client (phones, WhatsApp, fares, ₹300 allowance).
2. Replace stock photos with real vehicle/business images and add a favicon/logo.
3. Replace generic review cards with real, attributed testimonials (with permission).
4. Split CSS/JS into separate cached files for maintainability.
5. Add `robots.txt`, `sitemap.xml`, canonical URL, `og:image`, and richer JSON-LD.
6. Add security headers and caching in `vercel.json`.
7. Optionally add analytics and a privacy note for the booking form.
8. Initialize Git and commit before deploying.
