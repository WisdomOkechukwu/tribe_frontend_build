export type Asset = {
  code: string;
  name: string;
  glyph: string;
  kind: "crypto" | "fiat";
  /** Illustrative USD value of one unit — marketing demo only, not a live quote. */
  usd: number;
  decimals: number;
  /** Coin face colours (fallback + accents) */
  bg: string;
  fg: string;
  /** Official token mark or country flag, served from /public/logos */
  logo: string;
};

export const ASSETS: Asset[] = [
  { code: "USDT", name: "Tether", glyph: "₮", kind: "crypto", usd: 1, decimals: 2, bg: "#279442", fg: "#ffffff", logo: "/logos/crypto/usdt.svg" },
  { code: "BTC", name: "Bitcoin", glyph: "₿", kind: "crypto", usd: 98_400, decimals: 6, bg: "#ff6220", fg: "#ffffff", logo: "/logos/crypto/btc.svg" },
  { code: "ETH", name: "Ethereum", glyph: "Ξ", kind: "crypto", usd: 3_620, decimals: 5, bg: "#4b097a", fg: "#f0e7f7", logo: "/logos/crypto/eth.svg" },
  { code: "USDC", name: "USD Coin", glyph: "◎", kind: "crypto", usd: 1, decimals: 2, bg: "#0088e8", fg: "#ffffff", logo: "/logos/crypto/usdc.svg" },
  { code: "SOL", name: "Solana", glyph: "S", kind: "crypto", usd: 182, decimals: 4, bg: "#201f1f", fg: "#ba90d9", logo: "/logos/crypto/sol.svg" },
  { code: "NGN", name: "Naira", glyph: "₦", kind: "fiat", usd: 1 / 1_540, decimals: 2, bg: "#1f7434", fg: "#ffffff", logo: "/logos/flags/ng.svg" },
  { code: "USD", name: "US Dollar", glyph: "$", kind: "fiat", usd: 1, decimals: 2, bg: "#0095ff", fg: "#ffffff", logo: "/logos/flags/us.svg" },
  { code: "GBP", name: "Pound", glyph: "£", kind: "fiat", usd: 1.31, decimals: 2, bg: "#9b5dc7", fg: "#ffffff", logo: "/logos/flags/gb.svg" },
  { code: "EUR", name: "Euro", glyph: "€", kind: "fiat", usd: 1.12, decimals: 2, bg: "#006ab5", fg: "#ffffff", logo: "/logos/flags/eu.svg" },
  { code: "KES", name: "Shilling", glyph: "KSh", kind: "fiat", usd: 1 / 129, decimals: 2, bg: "#ffda35", fg: "#201f1f", logo: "/logos/flags/ke.svg" },
  { code: "GHS", name: "Cedi", glyph: "₵", kind: "fiat", usd: 1 / 15.4, decimals: 2, bg: "#b54617", fg: "#ffffff", logo: "/logos/flags/gh.svg" },
  { code: "CAD", name: "Canadian Dollar", glyph: "C$", kind: "fiat", usd: 0.73, decimals: 2, bg: "#e81717", fg: "#ffffff", logo: "/logos/flags/ca.svg" },
];

export const assetByCode = (code: string) => ASSETS.find((a) => a.code === code) ?? ASSETS[0];

export const SWAP_FEE = 0.005;

export function quote(amount: number, from: string, to: string) {
  const a = assetByCode(from);
  const b = assetByCode(to);
  const fee = amount * SWAP_FEE;
  const rate = a.usd / b.usd;
  return { fee, rate, receive: (amount - fee) * rate };
}

export function formatAmount(value: number, decimals: number) {
  if (!Number.isFinite(value)) return "0";
  const d = value >= 1000 ? Math.min(decimals, 2) : decimals;
  return value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: d });
}

/** Buying a gift card costs face value plus this markup (illustrative). */
export const GIFT_CARD_BUY_MARKUP = 0.015;
