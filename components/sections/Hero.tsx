"use client";

import { useRef } from "react";
import { BillerTile } from "@/components/BillerTile";
import { Coin } from "@/components/Coin";
import { Headline } from "@/components/Headline";
import { RotatingPhrase } from "@/components/RotatingPhrase";
import { Sticker } from "@/components/Sticker";
import { Icon } from "@/components/Icon";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { AppScreen } from "@/components/phone/AppScreen";
import { StoreButton } from "@/components/StoreButton";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

// x/y are % of the stage; dx/dy is where each coin flies as you scroll away.
const PHRASES = ["like you.", "at 2am.", "across borders.", "with no wahala."];

const COINS = [
  { code: "BTC", x: 13, y: 10, size: 104, dx: -260, dy: -140, mobile: true },
  { code: "USDT", x: 79, y: 4, size: 88, dx: 240, dy: -180, mobile: true },
  { code: "ETH", x: 3, y: 48, size: 76, dx: -320, dy: 40, mobile: false },
  { code: "NGN", x: 86, y: 40, size: 108, dx: 300, dy: 20, mobile: true },
  { code: "USD", x: 20, y: 72, size: 70, dx: -200, dy: 160, mobile: true },
  { code: "GBP", x: 72, y: 70, size: 74, dx: 220, dy: 180, mobile: false },
  { code: "SOL", x: 31, y: 28, size: 54, dx: -140, dy: -60, mobile: false },
  { code: "EUR", x: 64, y: 24, size: 58, dx: 150, dy: -90, mobile: false },
  { code: "KES", x: 45, y: -4, size: 50, dx: 20, dy: -220, mobile: false },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.35)
          // the paragraph is the LCP element: rise only, never hidden, so it paints on first frame
          .from("[data-hero-rise]", { y: 24, duration: 1 }, 0.4)
          // the phone holds a real screenshot (an LCP candidate): rise only, never hidden
          .from("[data-hero-phone]", { yPercent: 40, rotate: -14, duration: 1.6 }, 0.2)
          .from("[data-hero-disc]", { scale: 0.6, autoAlpha: 0, duration: 1.8 }, 0)
          .from("[data-coin]", { scale: 0, rotate: -90, duration: 1.2, ease: "back.out(1.6)", stagger: 0.06 }, 0.5)
          .from("[data-hero-chip]", { x: (i) => (i ? 40 : -40), autoAlpha: 0, duration: 1, stagger: 0.15 }, 1.1);

        // idle bob so the coins never feel pasted on
        const bobs = gsap.utils.toArray<HTMLElement>("[data-coin-inner]").map((el, i) =>
          gsap.to(el, { y: i % 2 ? 10 : -12, rotate: i % 2 ? 6 : -6, duration: 2.4 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        );
        // no point animating coins nobody can see
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => bobs.forEach((t) => (self.isActive ? t.resume() : t.pause())),
        });

        const scroll = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        scroll
          .to("[data-hero-copy]", { yPercent: -35, autoAlpha: 0.15, scale: 0.94 }, 0)
          .to("[data-hero-phone]", { yPercent: -18, rotate: 0 }, 0)
          .to("[data-hero-disc]", { rotate: 35, scale: 1.2 }, 0)
          .to("[data-hero-chip]", { y: -120 }, 0);
        COINS.forEach((c, i) => {
          scroll.to(`[data-coin="${i}"]`, { x: c.dx, y: c.dy, rotate: c.dx > 0 ? 120 : -120 }, 0);
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-paper pt-28 md:pt-36">
      <div data-hero-copy className="container-x relative z-10 flex flex-col items-center text-center">
        <p data-hero-fade className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5 text-[13px] font-medium text-purple-700">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-orange-500" />
            <span className="relative size-2 rounded-full bg-orange-500" />
          </span>
          Crypto, dollars and Naira — one wallet
        </p>
        <Headline
          as="h1"
          className="text-[clamp(2.9rem,11.5vw,10.5rem)] text-purple-900"
          lines={[
            "Money that moves",
            <RotatingPhrase key="rot" phrases={PHRASES} className="text-orange-500" />,
          ]}
        />
        <span className="absolute right-[3%] top-[30%] hidden lg:block">
          <Sticker shape="burst" tone="yellow" rotate={12}>
            0 wahala
          </Sticker>
        </span>
        <p data-hero-rise className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500 md:text-lg">
          Hold crypto and dollars, swap anything for anything, pay bills with whatever you&apos;ve got, and pass cash to anyone with a 12-digit code. Sapa-proof, no cap.
        </p>
        <div data-hero-fade className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <StoreButton tone="dark" />
          <a href="#how" className="press group inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold text-purple-700 hover:bg-purple-50">
            See how it works
            <Icon name="arrow" className="size-4 rotate-90 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-14 h-[520px] max-w-[1100px] md:mt-16 md:h-[660px]">
        <div
          data-hero-disc
          className="stripes absolute left-1/2 top-[22%] aspect-square w-[min(130vw,860px)] -translate-x-1/2 rounded-full bg-purple-50 [--stripe-w:38px] md:[--stripe-w:56px]"
        />
        {COINS.map((c, i) => (
          <div
            key={c.code}
            data-coin={i}
            className={`absolute z-20 ${c.mobile ? "" : "hidden md:block"}`}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <div data-coin-inner className="origin-center scale-[0.62] md:scale-100">
              <Coin code={c.code} size={c.size} />
            </div>
          </div>
        ))}

        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          {/* tilt lives in the inline transform so GSAP can tween it */}
          <div data-hero-phone style={{ transform: "rotate(-6deg)" }}>
            <PhoneFrame className="w-[250px] md:w-[300px]">
              <AppScreen name="home" priority />
            </PhoneFrame>
          </div>
        </div>

        <div data-hero-chip className="absolute left-[4%] top-[30%] z-30 hidden items-center gap-3 rounded-card bg-white p-3 pr-5 shadow-pop lg:flex">
          <Coin code="USD" size={36} />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-success-600">+$450.00</p>
            <p className="text-[11px] text-ink-300">From Upwork · just now</p>
          </div>
        </div>
        <div data-hero-chip className="absolute right-[3%] top-[56%] z-30 hidden items-center gap-3 rounded-card bg-ink-900 p-3 pr-5 text-white shadow-pop lg:flex">
          <BillerTile id="phed" size={36} />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold">34.2 kWh token saved</p>
            <p className="text-[11px] text-ink-200">PHED · paid with USDT</p>
          </div>
        </div>
      </div>
    </section>
  );
}
