import type { StaticImageData } from "next/image";
import { SafeImage } from "@/components/SafeImage";
import cashpoint from "@/public/app/cashpoint.webp";
import cryptoShot from "@/public/app/crypto.webp";
import home from "@/public/app/home.webp";
import send from "@/public/app/send.webp";
import swap from "@/public/app/swap.webp";
import usd from "@/public/app/usd.webp";
import vault from "@/public/app/vault.webp";

/**
 * Real screenshots of the Tribe app, captured from its build at iPhone size by
 * `npm run capture:app` (status bar included). Re-run that script when the app changes.
 */
export const APP_SCREENS = {
  home: "Tribe home screen: a ₦8.3m total balance, Add, Send, Swap and More, and the assets list",
  crypto: "Tribe wallet, Crypto tab: Bitcoin, Tether, Ethereum and more with their Naira value",
  usd: "A US dollar account in Tribe: $1,240 balance with account and routing numbers",
  swap: "Swapping 250 USDT to Naira in Tribe, with the live rate, its 30-second countdown and the swap fee",
  send: "Sending £200 to Amara Obi's UK bank account by Faster Payments, paid from a pound balance",
  cashpoint: "Generating a ₦5,000 Cashpoint: a 12-digit code anyone can redeem",
  vault: "Token Vault: 57 kWh waiting across two PHED electricity tokens, each shown in big digits with Copy and I've loaded it",
} as const;

export type AppScreenName = keyof typeof APP_SCREENS;

/**
 * Static imports, not "/app/x.webp" strings: the build puts a content hash in each URL, so a
 * re-capture can never be served from a stale browser/CDN/optimizer cache (desktop kept showing
 * the old shots at its image width while mobile fetched fresh ones).
 */
const SRC: Record<AppScreenName, StaticImageData> = { home, crypto: cryptoShot, usd, swap, send, cashpoint, vault };

/** Fills a PhoneFrame with one of the screenshots. `priority` for the hero phone only. */
export function AppScreen({ name, priority = false }: { name: AppScreenName; priority?: boolean }) {
  return (
    <SafeImage
      src={SRC[name]}
      alt={APP_SCREENS[name]}
      fill
      priority={priority}
      sizes="(min-width: 768px) 282px, 232px"
      className="object-cover object-top"
      fallbackLabel="Tribe"
    />
  );
}
