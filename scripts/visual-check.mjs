#!/usr/bin/env node
// Scroll-screenshot the landing page at desktop + phone widths, report console errors and
// horizontal overflow, and write contact sheets to .visual/ for a quick eyeball pass.
//
//   npm run build && npx next start -p 3123 &
//   npm run check:visual                         # BASE_URL, CHROME_PATH, REDUCE=1 are optional
//
// Exits non-zero on console errors or horizontal overflow.
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3123/";
const OUT = join(process.cwd(), ".visual");
const REDUCE = process.env.REDUCE === "1";

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const root = join(homedir(), ".cache/puppeteer/chrome");
  const version = readdirSync(root).sort().pop();
  return join(root, version, "chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
}

const VIEWPORTS = [
  { tag: "desktop", width: 1440, height: 900, cols: 2, thumb: 800 },
  { tag: "mobile", width: 390, height: 844, cols: 4, thumb: 390 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(browser, vp) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  const mobile = vp.width < 600;
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: mobile, hasTouch: mobile });
  if (REDUCE) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(BASE_URL, { waitUntil: "networkidle0" });
  await sleep(2500);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const shots = [];
  // Scroll in small steps so once-only scroll triggers fire, capturing one frame per viewport height.
  for (let y = 0, next = 0; y < total; y += 150) {
    if (y >= next) {
      await sleep(1200);
      shots.push(await page.screenshot({ type: "jpeg", quality: 60 }));
      next += vp.height;
    }
    await page.evaluate((v) => window.scrollTo(0, v), y + 150);
    await sleep(50);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const broken = await page.$$eval("img", (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
  await page.close();
  return { shots, errors, overflow, broken };
}

async function contactSheets(tag, shots, cols, thumb) {
  const per = cols * 2;
  for (let s = 0; s * per < shots.length; s++) {
    const imgs = await Promise.all(shots.slice(s * per, s * per + per).map((b) => sharp(b).resize({ width: thumb }).toBuffer({ resolveWithObject: true })));
    const h = imgs[0].info.height;
    await sharp({ create: { width: cols * (thumb + 10), height: 2 * (h + 10), channels: 3, background: "#888" } })
      .composite(imgs.map((im, i) => ({ input: im.data, left: (i % cols) * (thumb + 10), top: Math.floor(i / cols) * (h + 10) })))
      .jpeg({ quality: 70 })
      .toFile(join(OUT, `${tag}-${s}.jpg`));
  }
}

// Collects Core Web Vitals-ish numbers from a cold load: LCP, CLS, long-task blocking time
// (TBT proxy) and bytes per resource type. Mobile runs with 4× CPU throttling.
async function perf(browser, vp) {
  const page = await browser.newPage();
  const cdp = await page.createCDPSession();
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  const mobile = vp.width < 600;
  if (mobile) await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: mobile, hasTouch: mobile });
  await page.evaluateOnNewDocument(() => {
    window.__perf = { lcp: 0, cls: 0, tbt: 0 };
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__perf.lcp = e.startTime))).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => !e.hadRecentInput && (window.__perf.cls += e.value))).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__perf.tbt += Math.max(0, e.duration - 50)))).observe({ type: "longtask", buffered: true });
  });
  await page.goto(BASE_URL, { waitUntil: "load" });
  await sleep(4000);
  const r = await page.evaluate(() => {
    const kb = (t) => Math.round(performance.getEntriesByType("resource").filter((e) => e.initiatorType === t || (t === "script" && e.name.endsWith(".js"))).reduce((s, e) => s + (e.transferSize || e.encodedBodySize || 0), 0) / 1024);
    const nav = performance.getEntriesByType("navigation")[0];
    return { ...window.__perf, dcl: nav.domContentLoadedEventEnd, js: kb("script"), img: kb("img"), css: kb("link"), font: kb("css") };
  });
  await page.close();
  console.log(
    `  ${vp.tag.padEnd(7)} LCP ${Math.round(r.lcp)}ms · CLS ${r.cls.toFixed(3)} · TBT~ ${Math.round(r.tbt)}ms · DCL ${Math.round(r.dcl)}ms · JS ${r.js}KB · img ${r.img}KB`,
  );
}

if (process.env.PERF === "1") {
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
  console.log(`Perf (cold cache${process.env.PERF_RUNS ? `, ${process.env.PERF_RUNS} runs` : ""}) — ${BASE_URL}`);
  for (let i = 0; i < Number(process.env.PERF_RUNS ?? 1); i++) for (const vp of VIEWPORTS) await perf(browser, vp);
  await browser.close();
  process.exit(0);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ["--hide-scrollbars"] });
let failed = false;
for (const vp of VIEWPORTS) {
  const r = await shoot(browser, vp);
  await contactSheets(vp.tag, r.shots, vp.cols, vp.thumb);
  const ok = !r.errors.length && r.overflow <= 0 && !r.broken.length;
  failed ||= !ok;
  console.log(`${ok ? "✓" : "✗"} ${vp.tag} ${vp.width}px — ${r.shots.length} frames, overflow ${r.overflow}px, ${r.errors.length} console errors, ${r.broken.length} broken images`);
  for (const e of [...r.errors, ...r.broken.map((b) => `broken image: ${b}`)]) console.log(`    ${e}`);
}
await browser.close();
console.log(`Contact sheets → ${OUT}`);
process.exit(failed ? 1 : 0);
