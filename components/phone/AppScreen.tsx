import { SafeImage } from "@/components/SafeImage";

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
  vault: "Token Vault: two PHED electricity tokens waiting to be loaded, each with Copy and I've loaded it",
  card: "The Cards tab in Tribe: a lime virtual Mastercard with Fund, Withdraw and Details, and recent card payments",
} as const;

export type AppScreenName = keyof typeof APP_SCREENS;

/** Fills a PhoneFrame with one of the screenshots. `priority` for the hero phone only. */
export function AppScreen({ name, priority = false }: { name: AppScreenName; priority?: boolean }) {
  return (
    <SafeImage
      src={`/app/${name}.webp`}
      alt={APP_SCREENS[name]}
      fill
      priority={priority}
      sizes="(min-width: 768px) 282px, 232px"
      className="object-cover object-top"
      fallbackLabel="Tribe"
    />
  );
}
