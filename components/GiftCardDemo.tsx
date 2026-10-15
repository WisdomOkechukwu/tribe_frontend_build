"use client";

import { useState } from "react";
import { AssetPicker } from "@/components/AssetPicker";
import { BrandMark, GiftCard } from "@/components/GiftCard";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { giftBrand } from "@/lib/giftcards";
import { assetByCode, formatAmount, GIFT_CARD_BUY_MARKUP } from "@/lib/rates";
import { DOWNLOAD_PATH } from "@/lib/site";

const PICK = ["steam", "apple", "playstation", "amazon", "spotify", "netflix"];
const AMOUNTS = [25, 50, 100];

type Mode = "buy" | "sell";

export function GiftCardDemo() {
  const [mode, setMode] = useState<Mode>("buy");
  const [brand, setBrand] = useState("steam");
  const [amount, setAmount] = useState(100);
  const [payWith, setPayWith] = useState("USDT");
  // Selling pays out in any currency, crypto too: the ₦/$ rate sets the value, then it converts.
  const [payout, setPayout] = useState("NGN");

  const b = giftBrand(brand);
  const pay = assetByCode(payWith);
  const out = assetByCode(payout);
  const costUsd = amount * (1 + GIFT_CARD_BUY_MARKUP);
  const sellNgn = amount * b.sellRate;
  const sellOut = (sellNgn * assetByCode("NGN").usd) / out.usd;

  return (
    <div className="w-full max-w-[520px] rounded-panel bg-white p-3 text-ink-900 shadow-float">
      <Segmented
        label="Buy or sell"
        value={mode}
        onChange={setMode}
        options={[
          { value: "buy", label: "Buy a card" },
          { value: "sell", label: "Sell a card" },
        ]}
      />

      <div className="p-3 pt-5">
        <GiftCard id={brand} amount={`$${amount}`} size="lg" />

        <div className="mt-5 flex flex-wrap gap-2">
          {PICK.map((id) => (
            <button
              key={id}
              onClick={() => setBrand(id)}
              aria-pressed={brand === id}
              aria-label={giftBrand(id).name}
              className={`press grid size-11 place-items-center rounded-chip text-[13px] ${
                brand === id ? "scale-105 ring-2 ring-orange-500 ring-offset-2" : "opacity-80 hover:opacity-100"
              }`}
              style={{ background: giftBrand(id).bg, color: giftBrand(id).fg }}
            >
              <BrandMark id={id} className="size-5" />
            </button>
          ))}
        </div>

        <Segmented
          className="mt-4"
          label="Card value"
          value={String(amount)}
          onChange={(v) => setAmount(Number(v))}
          options={AMOUNTS.map((a) => ({ value: String(a), label: `$${a}` }))}
        />

        <div className="mt-4 rounded-card bg-paper p-4" aria-live="polite">
          {mode === "buy" ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] text-ink-400">Pay with any balance</span>
                <AssetPicker label="Pay with" value={payWith} onChange={setPayWith} />
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
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] text-ink-400">Get paid in any currency</span>
                <AssetPicker label="Get paid in" value={payout} onChange={setPayout} />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-[13px] text-ink-400">You get</span>
                <span className="font-display text-3xl font-extrabold tracking-tight text-purple-700">
                  {formatAmount(sellOut, payout === "NGN" ? 0 : out.decimals)} <span className="text-lg text-ink-400">{out.code}</span>
                </span>
              </div>
              <p className="mt-1 text-right text-[12px] text-ink-300">
                ${amount} × ₦{b.sellRate.toLocaleString()}/$ = ₦{formatAmount(sellNgn, 0)}
                {payout !== "NGN" && ` → ${out.code} at today's rate`}
                <br />
                Paid out in minutes
              </p>
            </>
          )}
        </div>

        <Button href={DOWNLOAD_PATH} data-store-cta shape="block" className="mt-4">
          {mode === "buy" ? `Buy ${b.name} card` : `Sell ${b.name} card`}
        </Button>
        <p className="pt-3 text-center text-[11px] text-ink-300">Illustrative rates. Live rates shown in-app before you confirm.</p>
      </div>
    </div>
  );
}
