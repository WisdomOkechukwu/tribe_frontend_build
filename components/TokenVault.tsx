"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { BillerTile } from "@/components/BillerTile";
import { Icon } from "@/components/Icon";
import { Flip, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
  { id: "a", provider: "PHED Prepaid", meter: "4502 •••• 19", amount: "₦15,000", kwh: 34.2, token: "4821 0937 5512 8846 3307", bought: "Tue 7 Oct, 8:14pm", loadedOn: null },
  { id: "b", provider: "PHED Prepaid", meter: "4502 •••• 19", amount: "₦10,000", kwh: 22.8, token: "1176 4420 9083 5531 0648", bought: "Sat 4 Oct, 11:02am", loadedOn: null },
  { id: "c", provider: "PHED · Mum's house", meter: "0137 •••• 82", amount: "₦20,000", kwh: 45.6, token: "6630 2814 7759 0412 9925", bought: "Sun 28 Sep", loadedOn: "29 Sep" },
  { id: "d", provider: "PHED Prepaid", meter: "4502 •••• 19", amount: "₦5,000", kwh: 11.4, token: "3398 1027 6645 2210 7781", bought: "Sun 21 Sep", loadedOn: "21 Sep" },
];

type Filter = "all" | "unused" | "used";

export function TokenVault() {
  const root = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [tokens, setTokens] = useState(INITIAL);
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState<string | null>(null);
  const [justLoaded, setJustLoaded] = useState<string | null>(null);

  const unused = tokens.filter((t) => !t.loadedOn);
  const used = tokens.filter((t) => t.loadedOn);
  const visible = [...unused, ...used].filter((t) => (filter === "all" ? true : filter === "unused" ? !t.loadedOn : !!t.loadedOn));
  const unusedKwh = unused.reduce((s, t) => s + t.kwh, 0);

  const captureFlip = () => {
    if (root.current) flipState.current = Flip.getState(root.current.querySelectorAll("[data-flip-id]"));
  };

  const toggle = (id: string) => {
    captureFlip();
    setTokens((ts) => ts.map((t) => (t.id === id ? { ...t, loadedOn: t.loadedOn ? null : "Today" } : t)));
    setJustLoaded(id);
  };

  const pickFilter = (f: Filter) => {
    captureFlip();
    setFilter(f);
  };

  const copy = async (t: Token) => {
    try {
      await navigator.clipboard.writeText(t.token.replace(/\s/g, ""));
    } catch {
      /* clipboard can be blocked; the visual confirmation still teaches the feature */
    }
    setCopied(t.id);
    setTimeout(() => setCopied((c) => (c === t.id ? null : c)), 1600);
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    Flip.from(flipState.current, {
      duration: reduce ? 0 : 0.6,
      ease: "power3.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.4 }),
    });
    flipState.current = null;
  }, [tokens, filter]);

  // First time the vault scrolls into view, load one token to show what "mark as loaded" does.
  useGSAP(
    () => {
      let timer: ReturnType<typeof setTimeout>;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 60%",
        once: true,
        onEnter: () => {
          timer = setTimeout(() => {
            if (root.current?.querySelector('[data-flip-id="b"][data-used="false"]')) toggle("b");
          }, 1400);
        },
      });
      return () => {
        clearTimeout(timer);
        st.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="w-full max-w-[520px] rounded-[32px] bg-white p-4 shadow-[0_50px_100px_-50px_rgba(107,41,13,.55)] md:p-6">
      <div className="flex items-center justify-between px-1">
        <p className="font-display text-2xl font-extrabold">Token Vault</p>
        <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-medium text-ink-500">Live demo — tap around</span>
      </div>

      <div
        className={`mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-[13px] font-medium transition-colors duration-500 ${
          unused.length ? "bg-orange-500 text-white" : "bg-success-500 text-white"
        }`}
        role="status"
      >
        <Icon name={unused.length ? "bolt" : "check"} className="size-5 shrink-0" />
        {unused.length ? (
          <span>
            You still have <b>{unused.length}</b> unused token{unused.length > 1 ? "s" : ""} · {unusedKwh.toFixed(1)} kWh waiting
          </span>
        ) : (
          <span>Every token is loaded. You&apos;re sorted.</span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-ink-50 p-1 text-[13px] font-semibold" role="tablist" aria-label="Filter tokens">
        {(
          [
            ["all", "All", tokens.length],
            ["unused", "Not loaded", unused.length],
            ["used", "Loaded", used.length],
          ] as const
        ).map(([key, label, count]) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            onClick={() => pickFilter(key)}
            className={`rounded-xl py-2 transition-colors ${filter === key ? "bg-white text-ink-900 shadow-sm" : "text-ink-400 hover:text-ink-700"}`}
          >
            {label} <span className="text-ink-300">{count}</span>
          </button>
        ))}
      </div>

      <ul className="relative mt-3 min-h-[300px] space-y-2.5">
        {visible.map((t) => {
          const isUsed = !!t.loadedOn;
          return (
            <li
              key={t.id}
              data-flip-id={t.id}
              data-used={isUsed}
              className={`rounded-[20px] border p-4 transition-colors duration-500 ${
                isUsed ? "border-ink-50 bg-paper" : "border-orange-100 bg-orange-50/60"
              } ${justLoaded === t.id && isUsed ? "ring-2 ring-success-300" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <BillerTile id="phed" size={32} className={isUsed ? "opacity-60 grayscale" : ""} />
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-[14px] font-semibold">{t.provider}</p>
                    <p className="text-[11px] text-ink-300">Meter {t.meter}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    isUsed ? "bg-ink-50 text-ink-400" : "bg-orange-500 text-white"
                  }`}
                >
                  {isUsed ? `Loaded · ${t.loadedOn}` : "Not loaded yet"}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <p className={`font-mono text-[13.5px] tracking-wide sm:text-[16px] sm:tracking-wider ${isUsed ? "text-ink-300 line-through" : "text-ink-900"}`}>{t.token}</p>
                <button
                  onClick={() => copy(t)}
                  className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-medium text-purple-600 hover:bg-purple-50"
                  aria-label={`Copy token ${t.token}`}
                >
                  <Icon name={copied === t.id ? "check" : "copy"} className="size-4" />
                  {copied === t.id ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-[12px] text-ink-400">
                  <b className="font-semibold text-ink-700">{t.kwh} kWh</b> · {t.amount} · {t.bought}
                </p>
                <button
                  onClick={() => toggle(t.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                    isUsed ? "text-ink-400 hover:text-ink-900" : "bg-ink-900 text-white hover:bg-success-600"
                  }`}
                >
                  {isUsed ? "Undo" : "Mark as loaded"}
                </button>
              </div>
            </li>
          );
        })}
        {visible.length === 0 && (
          <li className="grid h-[200px] place-items-center rounded-[20px] border border-dashed border-ink-100 text-[13px] text-ink-300">Nothing here.</li>
        )}
      </ul>
    </div>
  );
}
