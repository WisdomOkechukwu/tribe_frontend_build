"use client";

import { useState } from "react";
import { Coin } from "@/components/Coin";
import { BrandMark, GiftCard } from "@/components/GiftCard";
import { Icon } from "@/components/Icon";
import { giftBrand } from "@/lib/giftcards";
import { assetByCode, formatAmount, GIFT_CARD_BUY_MARKUP } from "@/lib/rates";
import { DOWNLOAD_PATH } from "@/lib/site";

const PICK = ["steam", "apple", "playstation", "amazon", "spotify", "netflix"];
const AMOUNTS = [25, 50, 100];
const PAY_WITH = ["USDT", "BTC", "NGN", "USD"];

type Mode = "buy" | "sell";

export function GiftCardDemo() {
  const [mode, setMode] = useState<Mode>("buy");
  const [brand, setBrand] = useState("steam");
  const [amount, setAmount] = useState(100);
  const [payWith, setPayWith] = useState("USDT");

  const b = giftBrand(brand);
  const pay = assetByCode(payWith);
  const costUsd = amount * (1 + GIFT_CARD_BUY_MARKUP);
  const sellNgn = amount * b.sellRate;
  const sellUsdt = sellNgn * assetByCode("NGN").usd;

  return (
    <div className="w-full max-w-[520px] rounded-[32px] bg-white p-3 shadow-[0_40px_80px_-50px_rgba(44,5,72,.5)] ring-1 ring-ink-900/5">
      <div className="grid grid-cols-2 gap-1 rounded-[22px] bg-ink-50 p-1 text-[14px] font-semibold" role="tablist" aria-label="Buy or sell">
        {(["buy", "sell"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-[18px] py-2.5 transition-colors ${mode === m ? "bg-white text-ink-900 shadow-sm" : "text-ink-400 hover:text-ink-700"}`}
          >
            {m === "buy" ? "Buy a card" : "Sell a card"}
          </button>
        ))}
      </div>

      <div className="p-3 pt-5">
        <GiftCard id={brand} amount={`$${amount}`} size="lg" />

        <div className="mt-5 flex flex-wrap gap-2">
          {PICK.map((id) => (
            <button
              key={id}
              onClick={() => setBrand(id)}
              aria-pressed={brand === id}
              aria-label={giftBrand(id).name}
              className={`grid size-11 place-items-center rounded-2xl text-[13px] transition-all ${
                brand === id ? "scale-105 ring-2 ring-orange-500 ring-offset-2" : "opacity-80 hover:opacity-100"
              }`}
              style={{ background: giftBrand(id).bg, color: giftBrand(id).fg }}
            >
              <BrandMark id={id} className="size-5" />
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              aria-pressed={amount === a}
              className={`flex-1 rounded-2xl py-2.5 text-[15px] font-semibold transition-colors ${
                amount === a ? "bg-ink-900 text-white" : "bg-paper text-ink-700 ring-1 ring-ink-900/5 hover:bg-ink-50"
              }`}
            >
              ${a}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-[22px] bg-paper p-4" aria-live="polite">
          {mode === "buy" ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-400">Pay with</span>
                <div className="flex gap-1.5">
                  {PAY_WITH.map((c) => (
                    <button
                      key={c}
                      onClick={() => setPayWith(c)}
                      aria-pressed={payWith === c}
                      aria-label={`Pay with ${c}`}
                      className={`rounded-full transition-all ${payWith === c ? "ring-2 ring-orange-500 ring-offset-2" : "opacity-60 hover:opacity-100"}`}
                    >
                      <Coin code={c} size={28} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-[13px] text-ink-400">You pay</span>
                <span className="font-display text-3xl font-extrabold tracking-tight">
                  {formatAmount(costUsd / pay.usd, pay.decimals)} <span className="text-lg text-ink-400">{pay.code}</span>
                </span>
              </div>
              <p className="mt-1 text-right text-[12px] text-ink-300">Code delivered in-app, instantly</p>
            </>
          ) : (
            <>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-400">You get</span>
                <span className="font-display text-3xl font-extrabold tracking-tight text-purple-700">₦{formatAmount(sellNgn, 0)}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-[13px]">
                <span className="text-ink-300">or in USDT</span>
                <span className="font-semibold text-ink-600">{formatAmount(sellUsdt, 2)} USDT</span>
              </div>
              <p className="mt-2 text-right text-[12px] text-ink-300">
                ₦{b.sellRate.toLocaleString()}/$ · paid out in minutes
              </p>
            </>
          )}
        </div>

        <a
          href={DOWNLOAD_PATH}
          data-store-cta
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-ink-900 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-orange-500"
        >
          {mode === "buy" ? `Buy ${b.name} card` : `Sell ${b.name} card`} <Icon name="arrow" className="size-4" />
        </a>
        <p className="pt-3 text-center text-[11px] text-ink-300">Illustrative rates. Live rates shown in-app before you confirm.</p>
      </div>
    </div>
  );
}
