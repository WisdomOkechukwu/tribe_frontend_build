"use client";

import { SafeImage } from "@/components/SafeImage";
import { useRef } from "react";
import { Coin } from "@/components/Coin";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { DOWNLOAD_PATH } from "@/lib/site";
import cardFace from "@/public/app/card.webp";
import cardOnline from "@/public/images/card-online.jpg";

/**
 * The app's default card (Midnight, Mastercard, Apple Pay pill), cut from the Cards tab by
 * `npm run capture:app`: never redraw it in HTML. The radius is the app's (22pt on the Cards tab's 361pt card)
 * in percentages, so the shadow hugs the image's own corners at any width.
 */
function TribeCard() {
  // Physical-card depth is a deliberate one-off, deeper than --shadow-float.
  return (
    <div
      style={{ borderRadius: "6.1% / 9.6%" }}
      className="relative aspect-[1.586] w-[min(88vw,420px)] overflow-hidden bg-purple-900 shadow-[0_60px_80px_-40px_rgba(44,5,72,.8)]"
    >
      <SafeImage
        src={cardFace}
        alt="A Tribe virtual card in the default Midnight finish: the Tribe logo, Apple Pay, Ada Okafor and Mastercard"
        fill
        sizes="(min-width: 640px) 420px, 88vw"
        className="object-cover"
        fallbackLabel="Tribe"
      />
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
