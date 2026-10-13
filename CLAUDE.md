@AGENTS.md

# Tribe — customer landing page

Single-page marketing site for **Tribe**, a Gen-Z African mobile wallet. Next 16 (App Router) · React 19 · Tailwind v4 · GSAP + Lenis. Every CTA pushes the visitor to download the app.

## Product truths (don't get these wrong in copy)
- **Crypto wallet** (BTC, ETH, USDT, USDC, SOL…) + **global fiat accounts** (USD, GBP, EUR…) + **swap anything ↔ anything**.
- **Gift cards: Tribe both buys AND sells them.** Pay with crypto/fiat, or trade unused cards for NGN/USDT.
- **Bills & utilities:** airtime, data, TV, electricity. **Recurring bills are live** (weekly, every 2 weeks or monthly, paid from any balance) — the mobile app offers it right after a bill is paid.
- **Token Vault:** every electricity token is saved; users mark tokens loaded/used so they never lose one.
- **Virtual cards** funded from any balance.
- **Cashpoints = a 12-digit code generated with NGN.** Anyone can redeem it: existing users instantly, new users at sign-up. **Never** describe Cashpoints as an @tag / username transfer.
- Electricity copy uses **PHED** only. It's the only DisCo logo we have, and copy must match the logos shown.

## Run
Homebrew Node on this machine is broken (missing ICU dylib). Prefix every command:
```sh
export PATH=~/.nvm/versions/node/v24.21.0/bin:$PATH
npm run dev            # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build
```
`tribe-mobile/` is a **separate Expo project** (gitignored, excluded in `tsconfig.json` and `eslint.config.mjs`). Don't touch it from here.

## Where things live
- `app/page.tsx` composes the sections in order; `app/download/route.ts` handles store redirects; `app/not-found.tsx` is the custom 404.
- `components/sections/*`: one file per page section.
- `components/ui/*`: **shared primitives**: `Button` (all CTAs), `Segmented` (all tab/pill switchers), `Toggle` (switches).
- Personality kit: `Sticker`, `Scribble` + `HandNote`, `KineticBand`.
- Interactive demos: `SwapWidget` + `AssetPicker`, `GiftCardDemo`, `TokenVault` (static on purpose, mirroring the app's vault: no Flip, no auto-play).
- `components/phone/*`: `PhoneFrame` (hardware shell) + `AppScreen`, which shows **real app screenshots** from `public/app/*.webp`. Never hand-build app UI in HTML again; re-capture instead.
- `lib/`:
  - `rates.ts`, `giftcards.ts`, `billers.ts`: demo data, **all rates illustrative**
  - `site.ts`: store URLs, `SITE_URL`, nav/footer links
  - `platform.ts`: UA → store
  - `gsap.ts`, `useVelocityMarquee.ts`
- `public/`:
  - `brand/tribe-icon.png`: the logo, sourced from `icon.png`
  - `app/`: screenshots of the real app, made by `npm run capture:app` (see below)
  - `billers/`
  - `logos/crypto` (CC0) and `logos/flags` (MIT)
  - `images/` (Unsplash, credits in `images/CREDITS.md`)

## Design system: everything custom, one language
- **Colours:** only the tokens in `app/globals.css` (`purple-*`, `orange-*`, `ink-*`, `success/error/warning/blue-*`, `paper`), taken from `Colors.png`. No ad-hoc hex values in components.
- **Shape and depth:** use `rounded-chip | rounded-card | rounded-panel` and `shadow-lift | shadow-pop | shadow-float`. Don't add `rounded-[NNpx]` or `shadow-[…]`. The only exceptions are commented one-offs: the sticker die-cut and the physical virtual card.
- **Type:**
  - `display` utility: Bricolage Grotesque, condensed caps; for headlines, via `<Headline lines={[…]}>`
  - Poppins: body text
  - `font-hand` (Caveat): **only** inside `HandNote` margin notes
- **Signature motifs:**
  - The `stripes` utility (diagonal bands from the logo)
  - `Sticker`: max **one per section**; wrap it in a span for position and visibility
  - `Scribble` underline or circle
  - One `KineticBand`
- **Imagery and loading:**
  - Every photo goes through `SafeImage`, which gives a shimmer while loading, a fade-in, and a branded fallback tile on error.
  - `Coin` and `BillerTile` paint their branded face *under* an `alt=""` image, so slow or failed logos degrade without client JS. Keep them server components.
  - `Preloader` is a **non-blocking** stripes progress bar plus pill (never a full-screen cover, because SSR content is already readable). It appears only if the page hasn't loaded within 400ms, and is capped at 4s.
- **Switches** (`ui/Toggle`) are brand purple when on, never system green.
- **No native chrome:** no `<select>` (use `AssetPicker`), no default scrollbars, focus rings, carets or 404. Buttons get the `press` utility.
- **Section rhythm:** alternate light and dark/colour bands. Dark bands set `data-theme="dark"`, which switches focus rings to white.
- **Avoid the AI look:** no gradient blobs, glassmorphism or identical 3-icon card grids. Keep slang light (one line per section) and never use it in legal or security copy. No invented social proof (no like or follower counts).

## Motion rules (each one is a bug we already hit)
- Use `lib/gsap.ts`, plus `useGSAP(..., { scope })`. Gate all motion in `gsap.matchMedia()` with `MOTION_OK` / `DESKTOP_MOTION`; reduced motion must be **static and fully visible**.
- **Never** put Tailwind `rotate-*` / `translate-*` / `scale-*` on an element GSAP animates. Tailwind v4 uses separate CSS properties that fight GSAP's `transform`, so put the starting transform inline instead.
- **Never** put `data-reveal` on an element that also has opacity classes; GSAP leaves inline opacity behind. Use a wrapper.
- `data-reveal="children"` hides children and exposes the parent's background until reveal, so don't use it on gap-separated grids with a coloured background.
- Single-column grids need **`grid-cols-1`**, or long content blows past the viewport on mobile.
- Marquees use `useVelocityMarquee` (two identical halves inside the track). Nested scroll areas need `data-lenis-prevent`.
- Don't call `scrollIntoView` inside widgets, because it scrolls the page too. Scroll the container itself.
- **Rotating text:** keep exactly one phrase in the DOM (`RotatingPhrase`: exit → swap → enter). Stacked phrases in one grid cell with overlapping tweens is how the hero line "layered on itself".
- **Never fade in the LCP element** (the hero paragraph, or the hero phone's screenshot, which is the largest image above the fold). A `from({ autoAlpha: 0 })` holds back LCP until the tween ends. Use a transform-only rise (`data-hero-rise`, and the phone's rise has no `autoAlpha`).
- **Infinite tweens must pause off-screen:** `useVelocityMarquee` and the hero coin bobs pause through ScrollTrigger `onToggle`.
- `ScrollMotion` handles the `data-headline`, `data-reveal`, `data-parallax`, `data-scribble` and `data-sticker` attributes globally.

## Store routing
Every download CTA links to `/download`. `app/download/route.ts` sends Apple devices (iPhone, iPad, Mac, Watch, Vision, TV) to the App Store and everything else to Play. `StoreButton` relabels itself on the client and detects iPadOS through `maxTouchPoints`. `StoreBadges` link straight to each store. The QR code in `FinalCta` encodes `SITE_URL + /download`.

## Assets and legal
- **Biller tiles:** the owner confirmed Tribe may use these marks. Render the image **as** the tile; never lay it over a colour.
- `lib/brandMarks.ts` is **generated** from `simple-icons` (CC0); regenerate it, don't hand-edit. Xbox and Amazon aren't in simple-icons and render as wordmarks; never invent logos. Gift card marks are third-party trademarks used nominatively.
- Photos: blur any personal data (card numbers, phone numbers) before use, as was already done for `card-hand.jpg` and `pay-street.jpg`.

## App screenshots
The phones on the page show the real mobile app. To refresh them after the app's UI changes:
```sh
(cd tribe-mobile && npx expo start --web --port 8084 --clear) &   # wait for "Waiting on http://localhost:8084"
npm run capture:app                                               # → public/app/{home,crypto,usd,swap,send,cashpoint,vault}.webp
```
`scripts/capture-app-screens.mjs` clears the app's storage (fresh seed data), signs in through `/dev?action=showcase` (demo account, verified, fresh `lastActiveAt` so the app lock never shows), emulates iPhone safe areas (59/34pt) at 393×876 (PhoneFrame's screen aspect), draws a 9:41 status bar and home indicator, and writes WebP at 786px wide. Add or change a shot in its `SCREENS` list and the alt text in `components/phone/AppScreen.tsx`. `AppScreen` imports the shots statically, so each re-capture gets a new content-hashed URL and no browser, CDN or optimiser cache can serve a stale one. Add a new shot there as an import, not a `/app/…` string.

## Before launch
`grep -rn "TODO(content)\|TODO(compliance)" app components lib` lists every placeholder: testimonials, compliance and legal lines, and store URLs (`lib/site.ts`). Also set `NEXT_PUBLIC_SITE_URL`. Stats like "40+ tokens" are unconfirmed.

## Verify a change
```sh
npm run build && (npx next start -p 3123 &) && npm run check:visual   # REDUCE=1 for reduced motion
```
`PERF=1 PERF_RUNS=3 npm run check:visual` reports LCP, CLS, long-task time and JS/image KB from a cold load (mobile at 4× CPU throttling). Numbers are noisy if the machine is busy, so compare A/B on an idle machine.

`scripts/visual-check.mjs` scroll-screenshots the page at 1440px and 390px, **fails on console errors, horizontal overflow or broken images**, and writes contact sheets to `.visual/` (gitignored). Look at the sheets; don't just trust the exit code. For the store routing, curl `/download` with iPhone, Android and Windows user agents and check the `Location` header.
