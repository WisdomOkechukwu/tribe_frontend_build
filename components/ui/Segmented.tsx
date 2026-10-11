"use client";

import type { ReactNode } from "react";

type Option<T extends string> = { value: T; label: ReactNode; count?: number };

/** Pill tab switcher used by every "pick one view" control on the page. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = "md",
  className = "",
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`grid gap-1 rounded-card bg-ink-50/70 p-1 font-semibold ${size === "sm" ? "text-[12px]" : "text-[14px]"} ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className={`press rounded-chip ${size === "sm" ? "py-1.5" : "py-2.5"} ${on ? "bg-white text-ink-900 shadow-lift" : "text-ink-400 hover:text-ink-700"}`}
          >
            {o.label}
            {o.count !== undefined && <span className="ml-1 text-ink-300">{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
