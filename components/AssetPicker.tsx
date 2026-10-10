"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Coin } from "@/components/Coin";
import { Icon } from "@/components/Icon";
import { ASSETS, type Asset } from "@/lib/rates";

type Tab = "all" | "crypto" | "fiat";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "crypto", label: "Crypto" },
  { key: "fiat", label: "Fiat" },
];

function usdHint(a: Asset) {
  if (a.code === "USD" || a.code === "USDT" || a.code === "USDC") return "$1.00";
  if (a.usd >= 1) return `$${a.usd.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `$1 = ${(1 / a.usd).toLocaleString("en-US", { maximumFractionDigits: 1 })} ${a.code}`;
}

/**
 * Searchable token / currency picker. Combobox pattern: focus stays in the search
 * field and arrow keys move the highlighted option.
 */
export function AssetPicker({
  value,
  other,
  onChange,
  label,
}: {
  value: string;
  /** The asset on the other side of the swap — picking it flips the pair. */
  other: string;
  onChange: (code: string) => void;
  label: string;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const inTab = ASSETS.filter((a) => tab === "all" || a.kind === tab);
    if (!q) return inTab;
    // Prefix match on the ticker or any word of the name ("eth" → ETH, not T-eth-er);
    // ticker hits rank first so Enter picks what you typed.
    const codeHit = (a: Asset) => a.code.toLowerCase().startsWith(q);
    const nameHit = (a: Asset) => a.name.toLowerCase().split(/\s+/).some((w) => w.startsWith(q));
    return [...inTab.filter(codeHit), ...inTab.filter((a) => !codeHit(a) && nameHit(a))];
  }, [query, tab]);

  const groups = useMemo(
    () =>
      (["crypto", "fiat"] as const)
        .map((kind) => ({ kind, items: results.filter((a) => a.kind === kind) }))
        .filter((g) => g.items.length),
    [results],
  );
  // Visual order (grouped) — keyboard navigation follows this, not the raw match order.
  const ordered = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const show = () => {
    // Open upwards when there isn't room for the panel below the trigger.
    const r = trigger.current?.getBoundingClientRect();
    setUp(!!r && window.innerHeight - r.bottom < 420 && r.top > window.innerHeight - r.bottom);
    setQuery("");
    setTab("all");
    setActive(Math.max(0, ASSETS.findIndex((a) => a.code === value)));
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };

  const pick = (code: string) => {
    onChange(code);
    close();
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted row in view while arrowing through the list.
  // Scrolls only the list itself — scrollIntoView would also nudge the page.
  useEffect(() => {
    const ul = list.current;
    const row = ul?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!ul || !row) return;
    if (row.offsetTop < ul.scrollTop) ul.scrollTop = row.offsetTop - 8;
    else if (row.offsetTop + row.offsetHeight > ul.scrollTop + ul.clientHeight) ul.scrollTop = row.offsetTop + row.offsetHeight - ul.clientHeight + 8;
  }, [active, open]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(ordered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && ordered[active]) {
      e.preventDefault();
      pick(ordered[active].code);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  // Flat index across groups so keyboard order matches visual order.
  let flat = -1;

  return (
    <div ref={root} className="relative shrink-0">
      <button
        ref={trigger}
        type="button"
        aria-label={`${label}: ${value}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => (open ? close() : show())}
        onKeyDown={(e) => {
          if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
            e.preventDefault();
            show();
          }
        }}
        className={`group flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_20px_-8px_rgba(44,5,72,.35)] ${
          open ? "shadow-[0_0_0_3px_#d1b4e5]" : "shadow-[0_1px_0_rgba(0,0,0,.05),0_4px_14px_-6px_rgba(44,5,72,.25)]"
        }`}
      >
        <Coin code={value} size={30} />
        <span className="text-[15px] font-semibold">{value}</span>
        <span className={`grid size-5 place-items-center rounded-full bg-ink-50 text-ink-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <Icon name="chevron" className="size-3 rotate-90" strokeWidth={2.6} />
        </span>
      </button>

      {open && (
        <div
          className={`absolute right-0 z-40 w-[min(320px,calc(100vw-56px))] rounded-[26px] bg-white p-2 text-ink-900 shadow-[0_30px_70px_-20px_rgba(44,5,72,.5),0_0_0_1px_rgba(32,31,31,.06)] animate-pop ${
            up ? "bottom-full mb-2.5 origin-bottom-right" : "top-full mt-2.5 origin-top-right"
          }`}
        >
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-300" />
            <input
              autoFocus
              role="combobox"
              aria-expanded
              aria-controls={`${id}-list`}
              aria-activedescendant={ordered[active] ? `${id}-${ordered[active].code}` : undefined}
              aria-label={`Search ${label.toLowerCase()}`}
              placeholder={`Search ${ASSETS.length} assets`}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKey}
              className="w-full rounded-[18px] bg-paper py-3 pl-10 pr-3 text-[14px] font-medium outline-none ring-purple-200 transition-shadow placeholder:text-ink-300 focus:ring-2"
            />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1 rounded-[16px] bg-paper p-1 text-[12px] font-semibold">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => {
                  setTab(t.key);
                  setActive(0);
                }}
                className={`rounded-[12px] py-1.5 transition-colors ${tab === t.key ? "bg-white text-ink-900 shadow-sm" : "text-ink-400 hover:text-ink-700"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <ul ref={list} id={`${id}-list`} role="listbox" style={{ position: "relative" }} aria-label={label} data-lenis-prevent className="mt-1 max-h-[264px] overflow-y-auto overscroll-contain py-1 [scrollbar-width:thin]">
            {groups.map((g) => (
              <li key={g.kind} role="presentation">
                {tab === "all" && (
                  <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-300">{g.kind === "crypto" ? "Crypto" : "Fiat currencies"}</p>
                )}
                <ul role="group">
                  {g.items.map((a) => {
                    flat += 1;
                    const index = flat;
                    const selected = a.code === value;
                    const isOther = a.code === other;
                    return (
                      <li
                        key={a.code}
                        id={`${id}-${a.code}`}
                        role="option"
                        aria-selected={selected}
                        data-index={index}
                        onPointerEnter={() => setActive(index)}
                        onClick={() => pick(a.code)}
                        className={`flex cursor-pointer items-center gap-3 rounded-[16px] px-2.5 py-2 transition-colors ${
                          index === active ? "bg-purple-50" : ""
                        }`}
                      >
                        <Coin code={a.code} size={34} />
                        <div className="min-w-0 flex-1 leading-tight">
                          <p className="flex items-center gap-1.5 text-[14px] font-semibold">
                            {a.code}
                            {isOther && <span className="rounded-full bg-orange-50 px-1.5 py-px text-[10px] font-semibold text-orange-700">Flips pair</span>}
                          </p>
                          <p className="truncate text-[12px] text-ink-400">{a.name}</p>
                        </div>
                        {selected ? (
                          <span className="grid size-6 place-items-center rounded-full bg-purple-500 text-white">
                            <Icon name="check" className="size-3.5" strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="text-[12px] font-medium tabular-nums text-ink-300">{usdHint(a)}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
            {ordered.length === 0 && (
              <li className="px-3 py-8 text-center text-[13px] text-ink-400">
                Nothing matches &ldquo;{query}&rdquo;.
                <br />
                <span className="text-ink-300">40+ more assets live in the app.</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
