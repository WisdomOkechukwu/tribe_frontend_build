"use client";

import { useId, useState } from "react";
import { AssetPicker } from "@/components/AssetPicker";
import { Icon } from "@/components/Icon";
import { assetByCode, formatAmount, quote, SWAP_FEE } from "@/lib/rates";
import { DOWNLOAD_PATH } from "@/lib/site";

export function SwapWidget() {
  const id = useId();
  const [amount, setAmount] = useState("250");
  const [from, setFrom] = useState("USDT");
  const [to, setTo] = useState("NGN");
  const [spin, setSpin] = useState(0);

  const value = Number(amount.replace(/,/g, "")) || 0;
  const q = quote(value, from, to);
  const fromA = assetByCode(from);
  const toA = assetByCode(to);

  const flip = () => {
    setFrom(to);
    setTo(from);
    setSpin((s) => s + 180);
  };

  return (
    <div className="w-full max-w-[460px] rounded-[32px] bg-paper p-3 text-ink-900 shadow-[0_50px_100px_-40px_rgba(20,0,40,.7)]">
      <div className="relative rounded-[24px] has-[[aria-expanded=true]]:z-30 bg-white p-5">
        <label htmlFor={`${id}-amt`} className="text-[13px] font-medium text-ink-400">
          You send
        </label>
        <div className="mt-2 flex items-center justify-between gap-3">
          <input
            id={`${id}-amt`}
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
            className="w-full min-w-0 bg-transparent font-display text-[40px] font-extrabold leading-none tracking-tight outline-none"
          />
          <AssetPicker value={from} other={to} onChange={(v) => (v === to ? flip() : setFrom(v))} label="Send currency" />
        </div>
      </div>

      <div className="relative z-10 -my-3 flex justify-center">
        <button
          type="button"
          onClick={flip}
          aria-label="Flip currencies"
          className="grid size-12 place-items-center rounded-full border-[5px] border-paper bg-orange-500 text-white transition-transform duration-500 hover:bg-purple-500"
          style={{ transform: `rotate(${spin}deg)` }}
        >
          <Icon name="swap" className="size-5 rotate-90" />
        </button>
      </div>

      <div className="relative rounded-[24px] has-[[aria-expanded=true]]:z-30 bg-purple-50 p-5">
        <p className="text-[13px] font-medium text-ink-400">They get</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <output className="min-w-0 truncate font-display text-[40px] font-extrabold leading-none tracking-tight text-purple-700" aria-live="polite">
            {formatAmount(q.receive, toA.decimals)}
          </output>
          <AssetPicker value={to} other={from} onChange={(v) => (v === from ? flip() : setTo(v))} label="Receive currency" />
        </div>
      </div>

      <dl className="space-y-2.5 px-4 pt-5 text-[14px]">
        <div className="flex justify-between">
          <dt className="text-ink-400">Rate</dt>
          <dd className="font-semibold">
            1 {from} = {formatAmount(q.rate, toA.decimals)} {to}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-400">Fee ({SWAP_FEE * 100}%)</dt>
          <dd className="font-semibold">
            {formatAmount(q.fee, fromA.decimals)} {from}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-400">Lands</dt>
          <dd className="font-semibold text-success-600">Instantly</dd>
        </div>
      </dl>

      <a
        href={DOWNLOAD_PATH}
        data-store-cta
        className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-ink-900 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-orange-500"
      >
        Swap it in the app <Icon name="arrow" className="size-4" />
      </a>
      <p className="px-4 pb-2 pt-3 text-center text-[11px] text-ink-300">Illustrative rates. Live quotes are locked in-app for 30 seconds.</p>
    </div>
  );
}
