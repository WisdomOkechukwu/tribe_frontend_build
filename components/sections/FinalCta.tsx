"use client";

import Image from "next/image";
import { useRef } from "react";
import { StoreButton } from "@/components/StoreButton";
import { DESKTOP_MOTION, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import lagos from "@/public/images/lagos.jpg";

// Purple-led so the orange "Tribe." never disappears into a band as they sweep past.
const BANDS = ["h-16 bg-purple-500", "h-6 bg-orange-500", "h-16 bg-purple-700", "h-6 bg-orange-500"];

export function FinalCta({ qrSvg }: { qrSvg: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, pin: true, start: "top top", end: "+=120%", scrub: 0.8 },
          })
          .fromTo("[data-band]", { xPercent: -130 }, { xPercent: 130, stagger: 0.06, duration: 1 }, 0)
          .from("[data-final-word]", { scale: 0.6, autoAlpha: 0, yPercent: 30, stagger: 0.1, duration: 0.45, ease: "power2.out" }, 0)
          .from("[data-final-cta]", { y: 60, autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 0.4)
          .to("[data-final-bg]", { scale: 1.12, duration: 1 }, 0);
      });

      mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
        gsap.from("[data-final-word], [data-final-cta]", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-dvh items-center overflow-hidden bg-purple-900 py-24 text-white">
      <div data-final-bg className="absolute inset-0 opacity-25 mix-blend-luminosity">
        <Image src={lagos} alt="" fill placeholder="blur" sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-purple-900/60 via-purple-900/20 to-purple-900" />

      <div className="pointer-events-none absolute inset-0 hidden -rotate-[28deg] scale-150 flex-col justify-center gap-6 lg:flex" aria-hidden>
        {BANDS.map((c, i) => (
          <div key={i} data-band className={`w-full ${c}`} style={{ transform: "translateX(-130%)" }} />
        ))}
      </div>

      <div className="container-x relative z-10 text-center">
        <p data-final-word className="mb-6 text-[13px] font-semibold uppercase tracking-[0.3em] text-orange-300">
          Ready when you are
        </p>
        <h2 className="display text-[clamp(4.2rem,17vw,15rem)] leading-[0.8]">
          <span data-final-word className="block">
            Join the
          </span>
          <span data-final-word className="block text-orange-500">
            Tribe.
          </span>
        </h2>

        <div data-final-cta className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
          <StoreButton tone="orange" className="scale-110" />
          <div className="hidden items-center gap-4 rounded-3xl bg-white p-3 pr-6 text-left text-ink-900 md:flex">
            <div className="size-[104px] [&_svg]:h-full [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <p className="max-w-[170px] text-[14px] leading-snug">
              <b className="font-semibold">Scan with your phone.</b> We&apos;ll open the right store for you.
            </p>
          </div>
        </div>
        <p data-final-cta className="mt-8 text-[14px] text-purple-100">Free to download. Sign up in minutes.</p>
      </div>
    </section>
  );
}
