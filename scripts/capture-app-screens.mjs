#!/usr/bin/env node
// Capture the real Tribe app (tribe-mobile's web build) at iPhone size for the landing page's
// phone frames. Safe areas are emulated (59pt top, 34pt bottom) so the app lays out exactly as on
// an iPhone, then a status bar and home indicator are drawn on top. Output: public/app/*.webp.
//
//   (cd tribe-mobile && npx expo start --web --port 8084 --clear) &
//   npm run capture:app                          # APP_URL, CHROME_PATH are optional
//
// Uses the app's seeded demo data, signed in through its dev route and marked verified, in light mode.
import { mkdirSync, readdirSync } from "node:fs";
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
  const root = join(homedir(), ".cache/puppeteer/chrome");
  const version = readdirSync(root).sort().pop();
  return join(root, version, "chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 393 × 876 matches PhoneFrame's screen aspect, so nothing is cropped inside the frame.
const VIEWPORT = { width: 393, height: 876, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

/** name → route, plus taps to put the screen in a telling state */
const SCREENS = [
  { name: "home", path: "/" },
  { name: "crypto", path: "/wallet", taps: ["Crypto"] },
  { name: "usd", path: "/asset/USD" },
  { name: "swap", path: "/swap?from=USDT", taps: ["2", "5", "0"] },
  // the dev route pre-fills a GBP send to a saved UK beneficiary (Faster Payments)
  { name: "send", path: "/dev?action=showcase&demo=send&to=/send/amount", taps: ["2", "0", "0"] },
  { name: "cashpoint", path: "/cashpoint", taps: ["₦5k"] },
  { name: "vault", path: "/pay/vault" },
  // re-skins the seeded card in the lime finish first
  { name: "card", path: "/dev?action=showcase&theme=lime&to=/cards" },
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

async function drawChrome(page) {
  await page.evaluate(
    (html, ink) => {
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
// no "verify" to-do), with a fresh lastActiveAt so the 10-minute app lock never shows
await page.goto(`${APP}/intro`, { waitUntil: "networkidle0" });
await page.evaluate(() => localStorage.clear());
await page.goto(`${APP}/dev?action=showcase`, { waitUntil: "networkidle0" });
await sleep(1800);

for (const s of SCREENS) {
  await page.goto(`${APP}${s.path}`, { waitUntil: "networkidle0" });
  await sleep(1600);
  for (const label of s.taps ?? []) await tap(page, label);
  await sleep(700);
  await drawChrome(page);
  const png = await page.screenshot();
  // 2× the largest frame (300px) is plenty; WebP keeps the repo light, next/image does the rest
  await sharp(png).resize({ width: 786 }).webp({ quality: 86 }).toFile(join(OUT, `${s.name}.webp`));
  console.log(`✓ ${s.name}`);
}
await browser.close();

if (errors.length) {
  console.error(`App errors while capturing:\n${[...new Set(errors)].join("\n")}`);
  process.exit(1);
}
