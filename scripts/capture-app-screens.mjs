#!/usr/bin/env node
// Capture the real Tribe app (tribe-mobile's web build) at iPhone size for the landing page's
// phone frames. Safe areas are emulated (59pt top, 34pt bottom) so the app lays out exactly as on
// an iPhone, then a status bar and home indicator are drawn on top. Output: public/app/*.webp.
//
//   (cd tribe-mobile && npx expo start --web --port 8084 --clear) &
//   npm run capture:app                          # APP_URL, CHROME_PATH are optional
//
// Uses the app's seeded demo data, signed in through its dev route and marked verified, in light mode.
// Also cuts the default card face out of the Cards tab → public/app/card.webp (transparent corners).
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const APP = process.env.APP_URL ?? "http://localhost:8084";
const OUT = join(process.cwd(), "public/app");

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = join(homedir(), ".cache/puppeteer");
  // full Chrome for Testing if it's installed, else the headless shell puppeteer also ships
  if (existsSync(join(cache, "chrome"))) {
    const root = join(cache, "chrome");
    const version = readdirSync(root).sort().pop();
    return join(root, version, "chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
  }
  const root = join(cache, "chrome-headless-shell");
  const version = readdirSync(root).sort().pop();
  return join(root, version, "chrome-headless-shell-mac-x64/chrome-headless-shell");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 393 × 876 matches PhoneFrame's screen aspect, so nothing is cropped inside the frame.
const VIEWPORT = { width: 393, height: 876, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

/**
 * name → route, plus taps to put the screen in a telling state. A tap is an exact label, or
 * `{ fill: [placeholder, text] }` to type into a field, `{ scroll: px }` to scroll the screen, or `{ wait: ms }` (e.g. for a toast to leave).
 */
const SCREENS = [
  { name: "home", path: "/" },
  { name: "crypto", path: "/wallet", taps: ["Crypto"] },
  // without the half-visible "in three taps" guide, the account's activity (Upwork +$450) shows
  { name: "usd", path: "/asset/USD", taps: ["Dismiss guide", { wait: 4500 }] },
  { name: "swap", path: "/swap?from=USDT", taps: ["2", "5", "0"] },
  // the dev route pre-fills a GBP send to a saved UK beneficiary (Faster Payments)
  { name: "send", path: "/dev?action=showcase&demo=send&to=/send/amount", taps: ["2", "0", "0"] },
  { name: "cashpoint", path: "/cashpoint", taps: ["₦5k"] },
  { name: "vault", path: "/pay/vault" },
  // selling pays out in any currency: switch the payout from Naira to US dollars
  {
    name: "gift",
    path: "/gift/apple?mode=sell",
    taps: [{ fill: ["XXXX-XXXX-XXXX-XXXX", "X7KQ9M2PL4RT8WVZ"] }, "Get paid in: Naira", "Pick USD", { scroll: 360 }],
  },
];

const INK = "#000000";
const STATUS_BAR = `<span>9:41</span><svg width="77" height="14" viewBox="0 0 77 14" fill="${INK}">
  <rect x="0" y="8" width="3.2" height="4" rx="1"/><rect x="4.8" y="5.8" width="3.2" height="6.2" rx="1"/><rect x="9.6" y="3.4" width="3.2" height="8.6" rx="1"/><rect x="14.4" y="1" width="3.2" height="11" rx="1"/>
  <g fill="none" stroke="${INK}" stroke-width="2.1" stroke-linecap="round"><path d="M27.6 5.6 A9 9 0 0 1 40.4 5.6"/><path d="M30.1 8.1 A5.4 5.4 0 0 1 37.9 8.1"/></g><circle cx="34" cy="11" r="1.6"/>
  <rect x="49" y="1.5" width="24" height="11" rx="3.5" fill="none" stroke="${INK}" stroke-opacity=".4"/><rect x="51" y="3.5" width="20" height="7" rx="2"/><rect x="74.2" y="5" width="1.6" height="4" rx=".8" fill-opacity=".4"/></svg>`;

async function tap(page, label) {
  for (let i = 0; i < 25; i++) {
    const ok = await page.evaluate((label) => {
      const els = [...document.querySelectorAll('[role="button"],[role="tab"],button,a')].filter(
        (el) => el.getBoundingClientRect().width && ((el.getAttribute("aria-label") || "").trim() === label || (el.innerText || "").trim() === label),
      );
      els.at(-1)?.click();
      return els.length > 0;
    }, label);
    if (ok) return sleep(180);
    await sleep(200);
  }
  throw new Error(`nothing to tap for "${label}"`);
}

async function step(page, s) {
  if (typeof s === "string") return tap(page, s);
  if (s.fill) {
    const [placeholder, text] = s.fill;
    await page.waitForSelector(`[placeholder="${placeholder}"]`, { visible: true });
    await page.type(`[placeholder="${placeholder}"]`, text);
    await page.evaluate(() => document.activeElement?.blur());
    return sleep(300);
  }
  if (s.scroll) {
    // RN web screens scroll inside their own ScrollView, not the window: wheel over its middle
    await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2);
    await page.mouse.wheel({ deltaY: s.scroll });
    await sleep(600);
    // iOS fades scrolled content out under the nav bar (the scroll-edge effect); RN web cuts it
    // hard, leaving slivers (the tilted gift card's corner) under the header
    return page.evaluate(() => {
      const view = [...document.querySelectorAll("div")].find((el) => el.scrollTop > 0 && el.getBoundingClientRect().height);
      if (!view) return;
      let paint = view;
      while (paint && getComputedStyle(paint).backgroundColor === "rgba(0, 0, 0, 0)") paint = paint.parentElement;
      const bg = paint ? getComputedStyle(paint).backgroundColor : "#fff";
      const fade = document.createElement("div");
      // starts at the header's foot (the scroll view itself runs up under the header)
      let head = document.elementFromPoint(innerWidth / 2, 90);
      while (head && head.getBoundingClientRect().width < innerWidth) head = head.parentElement;
      const top = Math.max(view.getBoundingClientRect().top, head ? head.getBoundingClientRect().bottom : 0);
      fade.style.cssText = `position:fixed;left:0;right:0;top:${top}px;height:26px;pointer-events:none;z-index:2147483646;background:linear-gradient(${bg}, ${bg} 45%, transparent)`;
      document.body.append(fade);
    });
  }
  if (s.wait) return sleep(s.wait);
  throw new Error(`unknown step ${JSON.stringify(s)}`);
}

async function drawChrome(page) {
  await page.evaluate(
    (html, ink) => {
      // On iOS the floating tab bar is blurred glass over a scroll-edge fade; RN web draws it as a
      // flat translucent pill with the list showing through and poking out below it. Recreate both.
      // the visible Home tab (stack screens behind stay mounted, and segmented controls are tabs too)
      const tab = [...document.querySelectorAll('[role="tab"]')].find((el) => el.getBoundingClientRect().width && el.innerText.trim() === "Home");
      let tabs = tab?.parentElement;
      while (tabs && getComputedStyle(tabs).position !== "absolute") tabs = tabs.parentElement;
      if (tabs?.parentElement) {
        tabs.style.backdropFilter = "blur(18px) saturate(180%)";
        let paint = tabs.parentElement;
        while (paint && getComputedStyle(paint).backgroundColor === "rgba(0, 0, 0, 0)") paint = paint.parentElement;
        const bg = paint ? getComputedStyle(paint).backgroundColor : "#fff";
        const fade = document.createElement("div");
        const top = tabs.getBoundingClientRect().top - 36;
        fade.style.cssText = `position:absolute;left:0;right:0;bottom:0;top:${top}px;pointer-events:none;background:linear-gradient(to bottom, transparent, ${bg} 40px)`;
        tabs.before(fade);
      }
      const bar = document.createElement("div");
      bar.style.cssText = `position:fixed;inset:0 0 auto;height:59px;z-index:2147483647;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0 30px 0 52px;font:600 17px -apple-system,'SF Pro Text','Helvetica Neue',sans-serif;letter-spacing:-.2px;color:${ink}`;
      bar.innerHTML = html;
      const home = document.createElement("div");
      home.style.cssText = `position:fixed;left:50%;bottom:8px;width:134px;height:5px;margin-left:-67px;border-radius:3px;background:${ink};z-index:2147483647;pointer-events:none`;
      document.body.append(bar, home);
    },
    STATUS_BAR,
    INK,
  );
}

mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
const page = await browser.newPage();
page.setDefaultNavigationTimeout(180_000);
await page.setViewport(VIEWPORT);
await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
const cdp = await page.createCDPSession();
await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { top: 59, bottom: 34, left: 0, right: 0 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

// fresh seed data, signed in to the demo account, set up and verified (`showcase`: Home shows
// no "Finish setup" card)
await page.goto(`${APP}/intro`, { waitUntil: "networkidle0" });
await page.evaluate(() => localStorage.clear());
await page.goto(`${APP}/dev?action=showcase`, { waitUntil: "networkidle0" });
await sleep(1800);

for (const s of SCREENS) {
  await page.goto(`${APP}${s.path}`, { waitUntil: "networkidle0" });
  await sleep(1600);
  for (const t of s.taps ?? []) await step(page, t);
  await sleep(700);
  await drawChrome(page);
  const png = await page.screenshot();
  // 2× the largest frame (300px) is plenty; WebP keeps the repo light, next/image does the rest
  await sharp(png).resize({ width: 786 }).webp({ quality: 86 }).toFile(join(OUT, `${s.name}.webp`));
  console.log(`✓ ${s.name}`);
}

// The default card on its own (Midnight, Mastercard, Ada Okafor, the Apple Pay pill), cut out of
// the Cards tab with its rounded corners as alpha: the Virtual cards section shows this face.
// Reduced motion keeps the pill's light sweep out of the shot.
await page.emulateMediaFeatures([
  { name: "prefers-color-scheme", value: "light" },
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 4 });
await page.goto(`${APP}/cards`, { waitUntil: "networkidle0" });
await sleep(2000);
const face = await page.evaluate(() => {
  const hit = [...document.querySelectorAll("[aria-label]")].find((el) => / card ending \d{4}\. Card details$/.test(el.getAttribute("aria-label")));
  const art = hit?.previousElementSibling;
  if (!art) return null;
  const r = art.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height, radius: parseFloat(getComputedStyle(art).borderTopLeftRadius) };
});
if (!face) throw new Error("no card face on /cards");
// sharp composites after resizing, so scale first and cut the corners at the final size
const CARD_W = 1200;
const shot = await page.screenshot({ clip: { x: face.x, y: face.y, width: face.width, height: face.height } });
const card = await sharp(shot).resize({ width: CARD_W }).ensureAlpha().png().toBuffer();
const { height: ch } = await sharp(card).metadata();
const rx = (face.radius * CARD_W) / face.width;
const corners = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${ch}"><rect width="${CARD_W}" height="${ch}" rx="${rx}"/></svg>`);
await sharp(card)
  .composite([{ input: corners, blend: "dest-in" }])
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(join(OUT, "card.webp"));
console.log("✓ card");
await browser.close();

if (errors.length) {
  console.error(`App errors while capturing:\n${[...new Set(errors)].join("\n")}`);
  process.exit(1);
}
