"use client";

import { useSyncExternalStore } from "react";
import { storeForUserAgent, type Store } from "@/lib/platform";
import { APP_STORE_URL, DOWNLOAD_PATH, PLAY_STORE_URL } from "@/lib/site";

const noopSubscribe = () => () => {};

function detectStore(): Store {
  const ua = navigator.userAgent;
  // iPadOS 13+ masquerades as desktop Safari; touch support gives it away.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return storeForUserAgent(ua);
}

/** null on the server and during hydration, then the visitor's store. */
export function useStore(): Store | null {
  return useSyncExternalStore(noopSubscribe, detectStore, () => null);
}

export function AppleGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66ZM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28Z" />
    </svg>
  );
}

export function PlayGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M3.6 2.3 13.9 12 3.6 21.7a1.6 1.6 0 0 1-.6-1.3V3.6c0-.5.2-1 .6-1.3Z" fill="#00d3ff" />
      <path d="m17.3 8.6-3.4 3.4-10.3-9.7c.4-.3 1-.3 1.5-.1l12.2 6.4Z" fill="#00f076" />
      <path d="m17.3 15.4-12.2 6.4c-.5.2-1.1.2-1.5-.1l10.3-9.7 3.4 3.4Z" fill="#ff3a44" />
      <path d="m21 12c0 .6-.3 1.1-.8 1.4l-2.9 2-3.4-3.4 3.4-3.4 2.9 2c.5.3.8.8.8 1.4Z" fill="#ffd400" />
    </svg>
  );
}

const COPY: Record<Store | "any", { kicker: string; label: string }> = {
  ios: { kicker: "Download on the", label: "App Store" },
  android: { kicker: "Get it on", label: "Google Play" },
  any: { kicker: "Free on iOS & Android", label: "Get the app" },
};

type Tone = "dark" | "light" | "orange";
const TONES: Record<Tone, string> = {
  dark: "bg-ink-900 text-white hover:bg-purple-800",
  light: "bg-white text-ink-900 hover:bg-purple-50",
  orange: "bg-orange-500 text-white hover:bg-orange-600",
};

/** One button that labels itself for the visitor's platform; the href routes server-side too. */
export function StoreButton({ tone = "dark", className = "" }: { tone?: Tone; className?: string }) {
  const store = useStore();
  const copy = COPY[store ?? "any"];

  return (
    <a
      href={DOWNLOAD_PATH}
      data-store-cta
      className={`press group inline-flex items-center gap-3 rounded-card py-3 pl-4 pr-6 ${TONES[tone]} ${className}`}
    >
      <span className="grid size-9 place-items-center rounded-chip bg-white/10 group-hover:bg-white/15">
        {store === "android" ? (
          <PlayGlyph className="size-5" />
        ) : store === "ios" ? (
          <AppleGlyph className="size-6" />
        ) : (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-wider opacity-70">{copy.kicker}</span>
        <span className="text-lg font-semibold">{copy.label}</span>
      </span>
    </a>
  );
}

/** Both official stores side by side, each linking straight to its listing. */
export function StoreBadges({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const base =
    tone === "dark"
      ? "bg-ink-900 text-white hover:bg-purple-800"
      : "bg-white text-ink-900 ring-1 ring-ink-900/10 hover:bg-purple-50";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={APP_STORE_URL} data-store-cta className={`press inline-flex items-center gap-2.5 rounded-chip px-4 py-2.5 ${base}`}>
        <AppleGlyph className="size-6" />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] opacity-70">Download on the</span>
          <span className="text-[15px] font-semibold">App Store</span>
        </span>
      </a>
      <a href={PLAY_STORE_URL} data-store-cta className={`press inline-flex items-center gap-2.5 rounded-chip px-4 py-2.5 ${base}`}>
        <PlayGlyph className="size-5" />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase opacity-70">Get it on</span>
          <span className="text-[15px] font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
