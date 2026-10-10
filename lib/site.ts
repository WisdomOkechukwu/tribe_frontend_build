// TODO: replace with Tribe's live store listings before launch.
export const APP_STORE_URL = "https://apps.apple.com/";
export const PLAY_STORE_URL = "https://play.google.com/store/apps";

// Absolute URL of the deployed site — used for the QR code and OG tags.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Every CTA points here; app/download/route.ts sends the visitor to the right store.
export const DOWNLOAD_PATH = "/download";

export const NAV_LINKS = [
  { label: "Crypto", href: "#how" },
  { label: "Swap", href: "#swap" },
  { label: "Pay", href: "#pay" },
  { label: "Cards", href: "#cards" },
  { label: "Cashpoints", href: "#cashpoints" },
];

export const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Crypto wallet", href: "#how" },
      { label: "Swap", href: "#swap" },
      { label: "Gift cards", href: "#giftcards" },
      { label: "Bills & utilities", href: "#bills" },
      { label: "Token Vault", href: "#vault" },
      { label: "Virtual cards", href: "#cards" },
      { label: "Cashpoints", href: "#cashpoints" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Support", href: "#" },
      { label: "Fees", href: "#" },
      { label: "Security", href: "#security" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "AML policy", href: "#" },
    ],
  },
];

export const SOCIALS = [
  { label: "X", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "LinkedIn", href: "#" },
];
