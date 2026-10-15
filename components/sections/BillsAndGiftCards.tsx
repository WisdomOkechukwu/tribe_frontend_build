"use client";

import { SafeImage } from "@/components/SafeImage";
import { useRef } from "react";
import { BillerTile } from "@/components/BillerTile";
import { Coin } from "@/components/Coin";
import { GiftCard } from "@/components/GiftCard";
import { GiftCardDemo } from "@/components/GiftCardDemo";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import { HandNote, Scribble } from "@/components/Scribble";
import { Sticker } from "@/components/Sticker";
import { Toggle } from "@/components/ui/Toggle";
import { BILLERS } from "@/lib/billers";
import { GIFT_BRANDS } from "@/lib/giftcards";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";
import street from "@/public/images/pay-street.jpg";

const GIFT_POINTS = [
  "Pay from any balance: crypto, dollars or Naira",
  "Trade in unused cards for any currency, crypto too",
  "Codes land in the app the second you pay",
];

// Recurring bills (live in the app): weekly, every 2 weeks or monthly, paid from any balance.
const RECURRING = [
  { id: "mtn", title: "MTN · 10GB data", when: "Monthly · paid with Naira" },
  { id: "dstv", title: "DStv Compact", when: "Monthly, before it lapses" },
  { id: "gotv", title: "GOtv Max", when: "Monthly · paid with USDT" },
  { id: "phed", title: "PHED prepaid", when: "Every 2 weeks · token to your Vault" },
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

        <div className="relative mt-12 h-[64vh] min-h-[440px] overflow-hidden rounded-panel md:mt-16">
          <div data-parallax="0.08" className="absolute inset-x-0 -inset-y-[10%]">
            <SafeImage fallbackLabel="Pay anything" src={street} alt="Young woman at her market stall, phone in hand" fill placeholder="blur" sizes="(min-width: 1320px) 1240px, 100vw" className="object-cover" />
          </div>
          <div data-reveal className="absolute bottom-5 left-5 right-5 max-w-[340px] rounded-card bg-white p-4 shadow-pop md:bottom-10 md:left-10">
            <div className="flex items-center gap-3">
              <BillerTile id="phed" size={44} />
              <div className="flex-1 leading-tight">
                <p className="text-[15px] font-semibold">PHED · Prepaid</p>
                <p className="text-[12px] text-ink-300">Meter 4502 •••• 19</p>
              </div>
              <p className="font-display text-xl font-extrabold">₦15,000</p>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-chip bg-success-50 px-3 py-2 text-[12px]">
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

      {/* Gift cards — dark band: glossy cards read premium on black and it breaks the light run */}
      <div id="giftcards" data-theme="dark" className="mt-24 bg-ink-900 py-24 text-white md:mt-32 md:py-32">
        <p className="container-x mb-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-300">Cards we buy &amp; sell</p>
        <GiftMarquee />

        <div className="container-x mt-16 grid grid-cols-1 items-center gap-14 lg:mt-24 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-20">
          <div className="relative">
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-purple-200">Gift cards · omo, finally</p>
            <Headline
              className="text-[clamp(3rem,7vw,6.5rem)]"
              lines={[
                "Rates that",
                <span key="2" className="block pb-[0.12em]">
                  don&apos;t <Scribble kind="circle">insult</Scribble>
                </span>,
                <span key="3" className="text-orange-500">
                  you.
                </span>,
              ]}
            />
            <span className="absolute right-0 top-10 hidden sm:block lg:right-8">
              <Sticker tone="yellow" rotate={-8}>
                fair rates fr
              </Sticker>
            </span>
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-ink-100">
              Buy a card for yourself or a gift for someone abroad, or turn the one sitting in your email into real money. Same app, fair rates, both ways.
            </p>
            <ul data-reveal="children" className="mt-8 space-y-3">
              {GIFT_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[16px] font-medium text-white">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-orange-500 text-white">
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
        <div className="grid grid-cols-1 gap-12 rounded-panel bg-white p-6 shadow-lift md:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:p-16">
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
            <HandNote arrow="up-right" className="ml-auto mr-1 mt-1 hidden text-orange-600 xl:flex">
              light, sorted
            </HandNote>

            <a href="#vault" className="group mt-10 inline-flex xl:mt-4 items-center gap-2 text-[15px] font-semibold text-purple-600">
              Every electricity token you buy lands in your Token Vault
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div data-reveal className="self-center rounded-panel bg-purple-50 p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-2xl font-extrabold text-purple-900">Recurring bills</p>
              <span className="rounded-full bg-success-50 px-3 py-1 text-[12px] font-semibold text-success-600">Live</span>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              Set your data, TV and light to renew themselves — weekly, every two weeks or monthly, from any balance — and stay connected. No more &ldquo;your subscription has expired&rdquo; in the middle of the match.
            </p>
            <ul className="mt-6 space-y-2.5">
              {RECURRING.map((r) => (
                <li key={r.id} className="flex items-center gap-3 rounded-card bg-white p-3 pr-4">
                  <BillerTile id={r.id} size={40} />
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-[14px] font-semibold">{r.title}</p>
                    <p className="truncate text-[12px] text-ink-400">{r.when}</p>
                  </div>
                  <Toggle label={`Auto-renew ${r.title}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
