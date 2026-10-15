"use client";

import { SafeImage } from "@/components/SafeImage";
import { useRef } from "react";
import { Coin } from "@/components/Coin";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { DOWNLOAD_PATH } from "@/lib/site";
import cardOnline from "@/public/images/card-online.jpg";

function TribeCard() {
  // Physical-card depth is a deliberate one-off, deeper than --shadow-float.
  return (
    <div className="relative aspect-[1.586] w-[min(88vw,420px)] overflow-hidden rounded-card bg-purple-900 p-6 text-white shadow-[0_60px_80px_-40px_rgba(44,5,72,.8),inset_0_1px_0_rgba(255,255,255,.15)]">
      <div className="stripes absolute -right-16 -top-20 h-[140%] w-[80%] [--stripe-w:30px]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(44,5,72,.95)_30%,transparent_70%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[17px] font-semibold tracking-[0.3em] text-orange-400">TRIBE</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">Virtual · USD</span>
        </div>
        <div className="h-9 w-12 rounded-md bg-[linear-gradient(135deg,#ffe678,#b59b26)] opacity-90" />
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[15px] tracking-[0.18em]">•••• •••• •••• 4821</p>
            <p className="mt-1 text-[11px] text-purple-100">ADA OKAFOR · 09/29</p>
          </div>
          <div className="flex -space-x-3">
            <span className="size-8 rounded-full bg-orange-500/90" />
            <span className="size-8 rounded-full bg-purple-300/90" />
          </div>
        </div>
      </div>
    </div>
  );
}

const POINTS = [
  "Fund it with USDT, BTC, dollars or Naira",
  "Seven finishes, or design your own. Mastercard or Visa",
  "Add it to Apple Pay or Google Pay",
  "Pay Netflix, Spotify, ChatGPT, AliExpress and more",
  "Freeze, unfreeze or bin it in one tap",
];

export function VirtualCard() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-card]",
          { rotateY: -28, rotateX: 18, rotateZ: -8, y: 60 },
          {
            rotateY: 14,
            rotateX: -6,
            rotateZ: 4,
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
        gsap.from("[data-card-coin]", {
          scale: 0,
          stagger: 0.12,
          ease: "back.out(2)",
          duration: 0.8,
          scrollTrigger: { trigger: "[data-card]", start: "top 75%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="cards" ref={root} data-theme="dark" className="relative overflow-hidden bg-orange-500 py-24 text-white md:py-32">
      <div className="stripes pointer-events-none absolute -bottom-24 -left-24 h-[320px] w-[560px] opacity-25 [--stripe-a:#ffffff] [--stripe-b:#2c0548] [--stripe-w:26px]" />
      <div className="container-x relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-panel lg:order-1">
          <div data-parallax="0.08" className="absolute inset-x-0 -inset-y-[10%]">
            <SafeImage fallbackLabel="Tribe" src={cardOnline} alt="Smiling young Black woman with short red curly hair holding up her Tribe virtual card" fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-ink-900 shadow-pop">
            <span className="grid size-7 place-items-center rounded-full bg-success-500 text-white">
              <Icon name="check" className="size-4" />
            </span>
            Netflix · $15.49 approved
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-orange-100">Virtual cards · no more &ldquo;card declined&rdquo;</p>
          <Headline className="text-[clamp(3rem,7.5vw,7rem)]" lines={["One card.", <span key="2" className="text-purple-900">Every currency.</span>]} />
          <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-orange-50">
            A dollar card that actually works online. Create it in seconds, top it up from any balance, and stop getting declined at checkout.
          </p>

          <div className="relative my-14 flex justify-center [perspective:1200px] lg:justify-start">
            <div data-card className="[transform-style:preserve-3d]">
              <TribeCard />
            </div>
            <div className="pointer-events-none absolute -top-6 right-2 flex gap-2 lg:right-10">
              {["USDT", "BTC", "NGN"].map((c) => (
                <span key={c} data-card-coin>
                  <Coin code={c} size={44} />
                </span>
              ))}
            </div>
          </div>

          <ul data-reveal="children" className="space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[16px] font-medium text-white">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-purple-900 text-white">
                  <Icon name="check" className="size-4" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Button href={DOWNLOAD_PATH} data-store-cta variant="deep" className="mt-9">
            Create your card
          </Button>
        </div>
      </div>
    </section>
  );
}
