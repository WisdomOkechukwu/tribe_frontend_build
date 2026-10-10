export type GiftBrand = {
  id: string;
  name: string;
  /** Card face colour */
  bg: string;
  /** Text + mark colour on the face */
  fg: string;
  /** Key into BRAND_PATHS; brands without one render a wordmark instead */
  mark?: string;
  wordmark?: string;
  /** Illustrative ₦ paid out per $1 of card value when selling */
  sellRate: number;
};

export const GIFT_BRANDS: GiftBrand[] = [
  { id: "steam", name: "Steam", bg: "#0b0b0d", fg: "#ffffff", mark: "steam", sellRate: 1_210 },
  { id: "playstation", name: "PlayStation", bg: "#0a5fc2", fg: "#ffffff", mark: "playstation", sellRate: 1_160 },
  { id: "spotify", name: "Spotify", bg: "#1ed760", fg: "#0b0b0d", mark: "spotify", sellRate: 1_020 },
  { id: "apple", name: "Apple", bg: "#1d1d1f", fg: "#ffffff", mark: "apple", sellRate: 1_240 },
  { id: "ebay", name: "eBay", bg: "#e0433a", fg: "#ffffff", mark: "ebay", sellRate: 1_090 },
  { id: "netflix", name: "Netflix", bg: "#141414", fg: "#e50914", mark: "netflix", sellRate: 1_050 },
  { id: "nike", name: "Nike", bg: "#111111", fg: "#ffffff", mark: "nike", sellRate: 1_070 },
  { id: "amazon", name: "Amazon", bg: "#232f3e", fg: "#ff9900", wordmark: "amazon", sellRate: 1_180 },
  { id: "roblox", name: "Roblox", bg: "#000000", fg: "#ffffff", mark: "roblox", sellRate: 1_100 },
  { id: "target", name: "Target", bg: "#cc0000", fg: "#ffffff", mark: "target", sellRate: 1_040 },
  { id: "xbox", name: "Xbox", bg: "#107c10", fg: "#ffffff", wordmark: "XBOX", sellRate: 1_130 },
  { id: "googleplay", name: "Google Play", bg: "#f4f4f4", fg: "#1f1f1f", mark: "googleplay", sellRate: 1_000 },
];

export const giftBrand = (id: string) => GIFT_BRANDS.find((b) => b.id === id) ?? GIFT_BRANDS[0];
