"use client";

import { useState } from "react";
import { BillerTile } from "@/components/BillerTile";
import { Icon } from "@/components/Icon";

type Token = {
  id: string;
  provider: string;
  meter: string;
  amount: string;
  kwh: number;
  token: string;
  bought: string;
  loadedOn: string | null;
};

const INITIAL: Token[] = [
  { id: "a", provider: "PHED Prepaid", meter: "4502 •••• 19", amount: "₦15,000", kwh: 34.2, token: "4821 0937 5512 8846 3307", bought: "Tue 7 Oct", loadedOn: null },
  { id: "b", provider: "PHED Prepaid", meter: "4502 •••• 19", amount: "₦10,000", kwh: 22.8, token: "1176 4420 9083 5531 0648", bought: "Sat 4 Oct", loadedOn: null },
  { id: "c", provider: "PHED · Mum's house", meter: "0137 •••• 82", amount: "₦20,000", kwh: 45.6, token: "6630 2814 7759 0412 9925", bought: "Sun 28 Sep", loadedOn: "29 Sep" },
  { id: "d", provider: "PHED Prepaid", meter: "4502 •••• 19", amount: "₦5,000", kwh: 11.4, token: "3398 1027 6645 2210 7781", bought: "Sun 21 Sep", loadedOn: "21 Sep" },
];

const ROUTINE = ["Copy", "Type it in", "Tick it off"];

/**
 * The Token Vault, as the app does it: a purple summary (kWh waiting, Copy → Type it in →
 * Tick it off), tokens to load (4-digit blocks, tap to copy, "I've loaded it") and a
 * Loaded list with Undo. Deliberately static — no motion, so it reads like a tool, not a show.
 */
export function TokenVault() {
  const [tokens, setTokens] = useState(INITIAL);
  const [copied, setCopied] = useState<string | null>(null);

  const waiting = tokens.filter((t) => !t.loadedOn);
  const loaded = tokens.filter((t) => t.loadedOn);
  const kwh = waiting.reduce((s, t) => s + t.kwh, 0);
  const loadedKwh = loaded.reduce((s, t) => s + t.kwh, 0);

  const toggle = (id: string) => setTokens((ts) => ts.map((t) => (t.id === id ? { ...t, loadedOn: t.loadedOn ? null : "today" } : t)));

  const copy = async (t: Token) => {
    try {
      await navigator.clipboard.writeText(t.token.replace(/\s/g, ""));
    } catch {
      /* clipboard can be blocked; the label change still confirms the tap */
    }
    setCopied(t.id);
    setTimeout(() => setCopied((c) => (c === t.id ? null : c)), 1600);
  };

  return (
    <div className="relative w-full max-w-[520px] rounded-panel bg-white p-4 shadow-float md:p-6">
      <div className="flex items-center justify-between gap-3 px-1">
        <p className="font-display text-2xl font-extrabold">Token Vault</p>
        <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-medium text-ink-500">Live demo: tap around</span>
      </div>

      {/* The app's summary: what's waiting, in kWh, and the three-step routine. */}
      <div className="relative mt-4 overflow-hidden rounded-card bg-purple-900 p-5" role="status">
        <div className="stripes pointer-events-none absolute inset-y-0 right-0 w-[38%] opacity-85 [--stripe-w:12px]" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300">
            {waiting.length ? `${waiting.length} token${waiting.length > 1 ? "s" : ""} to load` : "All caught up"}
          </p>
          <p className="mt-1 font-display text-5xl font-extrabold tracking-tight text-white">
            {(waiting.length ? kwh : loadedKwh).toFixed(1)} <span className="text-xl text-purple-100">kWh</span>
          </p>
          <p className="mt-1 max-w-[62%] text-[12px] leading-snug text-purple-100">
            {waiting.length ? "waiting for your meter" : "loaded so far. New PHED tokens land here the moment you pay."}
          </p>
        </div>
        {waiting.length > 0 && (
          <ol className="relative mt-4 flex flex-wrap gap-1.5">
            {ROUTINE.map((label, i) => (
              <li key={label} className="flex items-center gap-1.5 rounded-full bg-purple-800 py-1.5 pl-1.5 pr-3">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white text-[11px] font-semibold text-purple-900">{i + 1}</span>
                <span className="whitespace-nowrap text-[12px] font-semibold text-white">{label}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {waiting.length > 0 && (
        <>
          <p className="mt-5 px-1 text-[13px] font-semibold text-ink-900">To load</p>
          <ul className="mt-2 grid grid-cols-1 gap-2.5">
            {waiting.map((t) => (
              <li key={t.id} className="rounded-card border border-ink-50 bg-paper p-4">
                <div className="flex items-center gap-2.5">
                  <BillerTile id="phed" size={36} />
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-[14px] font-semibold">{t.provider}</p>
                    <p className="text-[11px] text-ink-300">
                      Meter {t.meter} · bought {t.bought}
                    </p>
                  </div>
                  <div className="text-right leading-tight">
                    <p className="text-[14px] font-semibold">{t.kwh} kWh</p>
                    <p className="text-[11px] text-ink-300">{t.amount}</p>
                  </div>
                </div>

                {/* As in the app: the token in 4-digit blocks, and the whole number is the copy button. */}
                <button onClick={() => copy(t)} className="press mt-3 block w-full" aria-label={`Copy token ${t.token}`}>
                  <span className="grid grid-cols-5 gap-1.5">
                    {t.token.split(" ").map((chunk, i) => (
                      <span key={i} className="rounded-chip bg-ink-50 py-2 text-center font-mono text-[14px] font-semibold tabular-nums text-ink-900 sm:text-[16px]">
                        {chunk}
                      </span>
                    ))}
                  </span>
                  <span className={`mt-2 flex items-center justify-center gap-1 text-[12px] font-medium ${copied === t.id ? "text-success-600" : "text-ink-400"}`}>
                    <Icon name={copied === t.id ? "check" : "copy"} className="size-3.5" />
                    {copied === t.id ? "Copied" : "Tap to copy"}
                  </span>
                </button>

                <button onClick={() => toggle(t.id)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 py-2.5 text-[13px] font-semibold text-white hover:bg-purple-700">
                  <Icon name="check" className="size-4" />
                  I&apos;ve loaded it
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {loaded.length > 0 && (
        <>
          <p className="mt-5 px-1 text-[13px] font-semibold text-ink-900">Loaded</p>
          <ul className="mt-2 divide-y divide-ink-50 rounded-card border border-ink-50">
            {loaded.map((t) => (
              <li key={t.id} className="flex items-center gap-2.5 px-4 py-3">
                <BillerTile id="phed" size={32} />
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-[13px] font-semibold">{t.provider}</p>
                  <p className="text-[11px] text-ink-300">
                    {t.kwh} kWh · loaded {t.loadedOn}
                  </p>
                </div>
                <button onClick={() => toggle(t.id)} className="shrink-0 rounded-full px-2 py-1 text-[12px] font-semibold text-purple-600 hover:bg-purple-50" aria-label={`Undo: mark ${t.kwh} kWh token as not loaded`}>
                  Undo
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
