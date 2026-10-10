"use client";

import Image from "next/image";
import { useRef } from "react";
import { BillerTile } from "@/components/BillerTile";
import { Coin } from "@/components/Coin";
import { GiftCard } from "@/components/GiftCard";
import { GiftCardDemo } from "@/components/GiftCardDemo";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import { BILLERS } from "@/lib/billers";
import { GIFT_BRANDS } from "@/lib/giftcards";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";
import street from "@/public/images/pay-street.jpg";

const GIFT_POINTS = [
  "Pay with USDT, BTC, dollars or Naira",
  "Trade in unused cards for Naira or USDT",
  "Codes land in the app the second you pay",
];

// Preview of the upcoming recurring-bills feature.
const RECURRING = [
  { id: "mtn", title: "MTN · 10GB data", when: "Every 1st of the month" },
  { id: "dstv", title: "DStv Compact", when: "Monthly, before it lapses" },
  { id: "gotv", title: "GOtv Max", when: "Monthly" },
  { id: "phed", title: "PHED prepaid", when: "Auto top-up when units run low" },
];

function GiftMarquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useVelocityMarquee(root, track, { duration: 46, reverse: true });

  return (
    <div ref={root} className="overflow-hidden">
      <div ref={track} className="flex w-max">
        {[0, 1].map((half) => (
          <div key={half} aria-hidden={half === 1} className="flex shrink-0 gap-4 pr-4">
            {GIFT_BRANDS.map((b) => (
              <GiftCard key={b.id} id={b.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BillsAndGiftCards() {
  return (
    <section id="pay" className="bg-paper pt-24 md:pt-32">
      {/* Lead-in */}
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Headline className="text-[clamp(3rem,8vw,7.5rem)] text-purple-900" lines={["Pay for life", "with whatever", "you hold."]} />
          <p data-reveal className="max-w-sm text-[17px] leading-relaxed text-ink-500 md:justify-self-end">
            Gift cards, light, data, airtime and TV — pay with USDT, BTC, dollars or Naira. We handle the conversion so you don&apos;t have to swap first.
          </p>
        </div>

        <div className="relative mt-12 h-[64vh] min-h-[440px] overflow-hidden rounded-[32px] md:mt-16 md:rounded-[44px]">
          <div data-parallax="0.08" className="absolute inset-x-0 -inset-y-[10%]">
            <Image src={street} alt="Young woman at her market stall, phone in hand" fill placeholder="blur" sizes="(min-width: 1320px) 1240px, 100vw" className="object-cover" />
          </div>
          <div data-reveal className="absolute bottom-5 left-5 right-5 max-w-[340px] rounded-[24px] bg-white p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,.5)] md:bottom-10 md:left-10">
            <div className="flex items-center gap-3">
              <BillerTile id="phed" size={44} />
              <div className="flex-1 leading-tight">
                <p className="text-[15px] font-semibold">PHED · Prepaid</p>
                <p className="text-[12px] text-ink-300">Meter 4502 •••• 19</p>
              </div>
              <p className="font-display text-xl font-extrabold">₦15,000</p>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-success-50 px-3 py-2 text-[12px]">
              <span className="flex items-center gap-1.5 font-medium text-success-700">
                <Icon name="check" className="size-4" /> Paid · token saved
              </span>
              <span className="flex items-center gap-1.5 text-ink-500">
                9.74 USDT <Coin code="USDT" size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gift cards */}
      <div id="giftcards" className="pt-24 md:pt-32">
        <p className="container-x mb-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-400">Cards we buy &amp; sell</p>
        <GiftMarquee />

        <div className="container-x mt-16 grid grid-cols-1 items-center gap-14 lg:mt-24 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-20">
          <div>
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-purple-500">Gift cards</p>
            <Headline className="text-[clamp(3rem,7vw,6.5rem)] text-ink-900" lines={["Rates that", "don't insult", <span key="3" className="text-orange-500">you.</span>]} />
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-ink-500">
              Buy a card for yourself or a gift for someone abroad, or turn the one sitting in your email into real money. Same app, fair rates, both ways.
            </p>
            <ul data-reveal="children" className="mt-8 space-y-3">
              {GIFT_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[16px] font-medium text-ink-700">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-purple-500 text-white">
                    <Icon name="check" className="size-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="flex justify-center lg:justify-end">
            <GiftCardDemo />
          </div>
        </div>
      </div>

      {/* Utilities */}
      <div id="bills" className="container-x py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 rounded-[40px] bg-white p-6 ring-1 ring-ink-900/5 md:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:p-16">
          <div>
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-orange-600">Bills &amp; utilities</p>
            <Headline className="text-[clamp(2.8rem,6vw,5.5rem)] text-purple-900" lines={["Light, data,", "airtime, TV.", <span key="3" className="text-orange-500">Sorted.</span>]} />
            <p data-reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-500">
              Recharge any network, renew your decoder and buy light in seconds — from your Naira, dollar or crypto balance.
            </p>

            <ul data-reveal="children" className="mt-10 grid grid-cols-4 gap-x-3 gap-y-6 sm:grid-cols-7 lg:grid-cols-4 xl:grid-cols-7">
              {BILLERS.map((b) => (
                <li key={b.id} className="flex flex-col items-center gap-2 text-center">
                  <BillerTile id={b.id} size={56} />
                  <span className="text-[12px] font-semibold text-ink-700">{b.name}</span>
                </li>
              ))}
            </ul>

            <a href="#vault" className="group mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-purple-600">
              Every electricity token you buy lands in your Token Vault
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div data-reveal className="self-center rounded-[32px] bg-purple-50 p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-2xl font-extrabold text-purple-900">Recurring bills</p>
              <span className="rounded-full bg-warning-200 px-3 py-1 text-[12px] font-semibold text-warning-700">Coming soon</span>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              We&apos;re adding recurring utilities, so your data, TV and light renew themselves and you stay connected — no more &ldquo;your subscription has expired&rdquo; in the middle of the match.
            </p>
            <ul className="mt-6 space-y-2.5">
              {RECURRING.map((r) => (
                <li key={r.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 pr-4">
                  <BillerTile id={r.id} size={40} />
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-[14px] font-semibold">{r.title}</p>
                    <p className="truncate text-[12px] text-ink-400">{r.when}</p>
                  </div>
                  <span aria-hidden className="relative h-6 w-10 shrink-0 rounded-full bg-success-500/70">
                    <span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
