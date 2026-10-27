# Madhuvarshika Cab Service website

A static, single-page website for Madhuvarshika Cab Service, Samalapuram, Tiruppur. Built with semantic HTML5, external CSS and vanilla JavaScript. It has no framework, build step or backend and is ready for Vercel static hosting.

The visual direction was informed by a reference taxi website, but the layout, styling, copy and illustrations here are original. No template files or reference assets were copied.

## Structure

```
.
├── index.html                  Main landing page and booking form
├── privacy.html                Privacy notice for the booking form
├── css/
│   └── styles.css              All site styles and responsive rules
├── js/
│   └── main.js                 Navigation, scroll state and booking flow
├── assets/
│   ├── favicon.svg             Primary favicon
│   ├── favicon-32.png          PNG favicon fallback
│   ├── apple-touch-icon.png    Apple touch icon
│   ├── hero-cab.svg            Original hero illustration (not a client photo)
│   ├── Maruti Suzuki Swift.jpg White Maruti Suzuki Swift hatchback photo
│   ├── Maruti Suzuki Dzire.jpg White Maruti Suzuki Dzire sedan photo
│   ├── Toyota Innova.webp      White Toyota Innova Crysta photo
│   └── Traveller.png           White Force Tempo Traveller minibus photo
├── robots.txt                  Allows crawlers; sitemap pending a confirmed domain
├── vercel.json                 Clean URLs, security headers and asset caching
├── .vercelignore               Keeps the README and Phase 1 audit out of deployments
├── README.md
└── initialphase-report.md      Phase 1 audit, kept for reference only
```

## Local preview

Open `index.html` directly in a browser for a quick look. For behaviour closest to production, serve the folder over HTTP:

```powershell
py -m http.server 8000
```

Then visit `http://localhost:8000/`. Google Fonts require an internet connection.

## Booking flow

The form collects name, phone, pickup, destination, travel date, return date (round trips only), pickup time, trip type, preferred vehicle (optional), passengers and optional notes.

- Required fields, Indian mobile number format and past travel dates are validated in the browser.
- Return dates are required for round trips and cannot be earlier than the travel date.
- Vehicle cards pre-select `Maruti Suzuki Swift`, `Maruti Suzuki Dzire`, `Toyota Innova Crysta` or `Force Tempo Traveller`.
- No fixed package or tariff tables are published on the website; all fare details and availability are communicated directly in WhatsApp chat.
- A readable WhatsApp message is built from the entered details, URL-encoded and opened in WhatsApp chat.
- Submitting again is blocked for 2.5 seconds, and the page shows a fallback link if the popup does not open.
- The page states clearly that a booking is confirmed only after the business replies.
- The submit button stays disabled if JavaScript is unavailable, and a call fallback is shown.
- No booking data is stored on the website and there is no payment or server-side booking system.
- The WhatsApp number is the `WHATSAPP_NUMBER` constant near the top of `js/main.js`. Phone links are in `index.html`.

## Deploy to Vercel

1. Upload the project to a Git repository.
2. Import the repository in Vercel.
3. Framework preset: **Other**.
4. Build command: leave empty.
5. Output directory: `.` (project root).
6. Deploy.

`vercel.json` enables clean URLs, disables trailing slashes, adds security headers and sets one-day caching for `assets/`, `css/` and `js/`. `.vercelignore` prevents the README and Phase 1 audit from being published.

## Verification performed (25 October 2026)

| Check | Result |
|---|---|
| `node --check js/main.js` | Pass |
| `vercel.json` and JSON-LD JSON parsing | Pass |
| Duplicate IDs, internal anchors, local asset references | Pass |
| Inline styles, inline event handlers and inline scripts (excluding JSON-LD) | None found |
| Headless Chrome interaction tests at 320, 390, 768, 1024, 1081, 1440 and 1920 px | 34–35 checks per width, all passed |
| Final post-change smoke test at 320, 390 and 1440 px | 17 checks per width, all passed |
| Horizontal overflow at each width | None detected |
| Mobile menu open/close and Escape handling | Pass |
| Tariff-to-trip selection and conditional return date | Pass |
| Missing fields, invalid phone, past date and return-before-travel validation | Pass |
| WhatsApp message contents, newline handling and URL encoding | Pass |
| Duplicate submission lock and fallback link | Pass |
| CSP and security headers served over local HTTP | Pass, no CSP violations |
| Visual review of desktop, mobile, form, footer and privacy screenshots | Performed |

These were automated headless-browser and static checks, not manual testing on physical phones. No Vercel deployment was performed. The actual WhatsApp handoff to a phone was not exercised; the generated URL and click handling were tested with the navigation intercepted.

## Client verification required before launch

The following are draft values from the supplied material. They have not been independently verified. Confirm each item with the business before publishing.

- [ ] `+91 91591 54525` is the correct number and has WhatsApp enabled.
- [ ] `+91 63792 11249` is still active and should be published.
- [ ] Address and the claimed 24/7 opening hours.
- [ ] One-way ₹15/km, round-trip ₹14/km, one-day ₹1,800 + ₹12/km, the different local-trip rate and the ₹300 driver allowance.
- [ ] Minimum kilometres, waiting charges, tolls/parking, night charges and other inclusions/exclusions.
- [ ] The 4.9/5 rating and 17-review count shown from the supplied screenshot.
- [ ] Permission to publish specific customer reviews. No individual reviews are currently reproduced.
- [ ] Real vehicle/business photos and confirmed vehicle type, seating and luggage capacity. The site currently uses a labelled illustration.
- [ ] The exact Google Maps listing URL. The site currently opens a Google Maps search.
- [ ] Final WhatsApp message wording and business name.
- [ ] Privacy notice wording, and whether to keep the draft-details note in the footer after verification.

## SEO status

Added: descriptive title and meta description, Open Graph/Twitter title and description, favicon set, robots allow rule, and `TaxiService` JSON-LD (name, phone, area, opening hours, description).

Pending confirmation of the production domain:

- Canonical URL, `og:url` and `og:image` (social image not added because absolute URLs are required).
- `sitemap.xml` and a `Sitemap:` entry in `robots.txt`.
- Re-check JSON-LD telephone and opening hours, which are currently draft values.

JSON-LD intentionally omits prices, address, geo coordinates, ratings and review markup to avoid publishing unverified claims as structured data.

## Security and caching notes

- `vercel.json` sets CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`.
- The CSP allows scripts from the site itself plus a SHA-256 hash for the inline JSON-LD block. If the JSON-LD changes, recompute the hash and update the header.
- CSP allows Google Fonts styles and font files, and local images only. Adding analytics, embeds or new third-party resources requires a CSP update.
- Asset, CSS and JS responses are cached for one day with stale-while-revalidate. HTML is left at Vercel's default cache behaviour.
- HSTS was not added because the production domain is not confirmed; review it after connecting a custom domain.

Recompute the JSON-LD hash after editing it:

```powershell
node -e "const fs=require('fs'),c=require('crypto');const h=fs.readFileSync('index.html','utf8');const m=h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);console.log('sha256-'+c.createHash('sha256').update(m[1]).digest('base64'))"
```

## Notes

- No Git repository was initialised and no deployment was performed.
- The site has no analytics, cookies or advertising trackers of its own.
- The hero and fleet visuals are original illustrations, clearly labelled as illustrative, so stock photos are not presented as the client's vehicles.
- Design and content can be adjusted without changing the booking logic; keep the form field IDs and validation expectations in sync with `js/main.js`.
