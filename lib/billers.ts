// Square tiles with the background baked in (no alpha) — render the image AS the tile.
// Copied from /billers; the repository owner confirmed Tribe may use these marks.
// bg/fg are the brand colours used for the loading / fallback tile.
export type Biller = { id: string; name: string; category: "Airtime & data" | "TV" | "Electricity"; src: string; bg: string; fg: string };

export const BILLERS: Biller[] = [
  { id: "mtn", name: "MTN", category: "Airtime & data", src: "/billers/mtn.png", bg: "#ffcb05", fg: "#1a1a1a" },
  { id: "airtel", name: "Airtel", category: "Airtime & data", src: "/billers/airtel.png", bg: "#e40000", fg: "#ffffff" },
  { id: "glo", name: "Glo", category: "Airtime & data", src: "/billers/glo.png", bg: "#50b748", fg: "#ffffff" },
  { id: "9mobile", name: "9mobile", category: "Airtime & data", src: "/billers/9mobile.png", bg: "#006b3f", fg: "#ffffff" },
  { id: "dstv", name: "DStv", category: "TV", src: "/billers/dstv.jpg", bg: "#00a2e5", fg: "#ffffff" },
  { id: "gotv", name: "GOtv", category: "TV", src: "/billers/gotv.jpg", bg: "#f2f2f2", fg: "#d6001c" },
  { id: "phed", name: "PHED", category: "Electricity", src: "/billers/phed.png", bg: "#1f4fa3", fg: "#ffffff" },
];

export const biller = (id: string) => BILLERS.find((b) => b.id === id)!;
