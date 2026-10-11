"use client";

import { useState } from "react";

/** Brand switch — purple when on, never the system green. Uncontrolled by default — the page only uses it in previews. */
export function Toggle({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((v) => !v)}
      className={`press relative h-7 w-12 shrink-0 rounded-full focus-visible:outline-orange-500 ${on ? "bg-purple-500" : "bg-ink-100"}`}
    >
      <span
        className="absolute top-1 size-5 rounded-full bg-white shadow-lift transition-[left] duration-300 ease-[cubic-bezier(.3,1.4,.5,1)]"
        style={{ left: on ? 24 : 4 }}
      />
    </button>
  );
}
