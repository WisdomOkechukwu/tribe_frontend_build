"use client";

import { useRef, useState } from "react";
import { Headline } from "@/components/Headline";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { AppScreen, type AppScreenName } from "@/components/phone/AppScreen";
import { StoreBadges } from "@/components/StoreButton";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const STEPS: { kicker: string; title: string; body: string; screen: AppScreenName; bg: string }[] = [
  {
    kicker: "Crypto wallet",
    title: "Your bag, all in one place.",
    body: "BTC, ETH, USDT, USDC, SOL and more — hold them, watch them, move them. Real balances in Naira so you always know what you're actually holding.",
    screen: "crypto",
    bg: "#fbf8f5",
  },
  {
    kicker: "Global accounts",
    title: "Get paid like you live abroad.",
    body: "USD, GBP and EUR account details in your name. Freelance clients, family overseas, payouts from anywhere — it all lands here.",
    screen: "usd",
    bg: "#e6f4ff",
  },
  {
    kicker: "Send abroad",
    title: "Pay anyone, anywhere.",
    body: "Pick a country and send by Faster Payments, ACH, SEPA, mobile money and more, or to any Tribe @username for free. Pay from any balance and we convert on the way.",
    screen: "send",
    bg: "#eaf6ee",
  },
  {
    kicker: "Swap",
    title: "Change it up whenever.",
    body: "Token to token, token to fiat, fiat to fiat. Lock your rate, tap once, done. No P2P back-and-forth, no waiting on a stranger.",
    screen: "swap",
    bg: "#f0e7f7",
  },
  {
    kicker: "Gift cards",
    title: "Old gift card? Cash it out.",
    body: "Trade unused Apple, Steam, Amazon cards and more, and get paid in any currency you like: Naira, dollars, pounds, USDT, even BTC. Fair rates, paid out in minutes.",
    screen: "gift",
    bg: "#ffe8e8",
  },
  {
    kicker: "Cashpoints",
    title: "Cash, packed into 12 digits.",
    body: "Turn Naira into a Cashpoint code and hand it to anyone. Tribe users redeem it instantly; new users redeem it the moment they sign up.",
    screen: "cashpoint",
    bg: "#ffefe9",
  },
  {
    kicker: "Token Vault",
    title: "Never lose a light token again.",
    body: "Every electricity token you buy is saved automatically. Mark it as loaded when you punch it in, so you always know what's used and what isn't.",
    screen: "vault",
    bg: "#fffbeb",
  },
];

export function PhoneStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="how" ref={root} className="relative transition-colors duration-700" style={{ backgroundColor: STEPS[active].bg }}>
      <div className="container-x pt-24 md:pt-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Headline className="text-[clamp(3rem,8vw,7.5rem)] text-purple-900" lines={["One app.", "Every kind of money."]} />
          <div data-reveal className="max-w-sm">
            <p className="mb-5 text-[17px] leading-relaxed text-ink-500">
              Spend, save and move money in whatever currency the moment calls for. Built for people whose lives don&apos;t fit in one country.
            </p>
            <StoreBadges />
          </div>
        </div>
      </div>

      <div className="container-x lg:grid lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16">
        <ol className="pb-16 pt-12 lg:pb-[20vh] lg:pt-[8vh]">
          {STEPS.map(({ kicker, title, body, screen }, i) => (
            <li key={kicker} data-step className="flex flex-col gap-10 py-12 lg:min-h-[78vh] lg:justify-center lg:py-0">
              <div data-reveal>
              <div className={`max-w-lg transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-30"}`}>
                <span className="font-display text-[15px] font-bold text-orange-500">
                  {String(i + 1).padStart(2, "0")} — {kicker}
                </span>
                <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[0.95] tracking-tight text-ink-900 [font-stretch:85%]">
                  {title}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed text-ink-500">{body}</p>
              </div>
              </div>
              <div className="flex justify-center lg:hidden">
                <PhoneFrame className="w-[250px]">
                  <AppScreen name={screen} />
                </PhoneFrame>
              </div>
            </li>
          ))}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-dvh items-center justify-center">
            <div className="relative">
              <PhoneFrame className="w-[300px]">
                {STEPS.map(({ kicker, screen }, i) => (
                  <div
                    key={kicker}
                    aria-hidden={i !== active}
                    className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: `translateY(${i === active ? 0 : i < active ? -24 : 24}px) scale(${i === active ? 1 : 0.97})`,
                    }}
                  >
                    <AppScreen name={screen} />
                  </div>
                ))}
              </PhoneFrame>
              <div className="absolute -right-12 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                {STEPS.map((s, i) => (
                  <span
                    key={s.kicker}
                    className={`w-1.5 rounded-full transition-all duration-500 ${i === active ? "h-8 bg-orange-500" : "h-1.5 bg-ink-900/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
