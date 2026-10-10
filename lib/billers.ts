// Square tiles with the background baked in (no alpha) — render the image AS the tile.
// Copied from /billers; the repository owner confirmed Tribe may use these marks.
export type Biller = { id: string; name: string; category: "Airtime & data" | "TV" | "Electricity"; src: string };

export const BILLERS: Biller[] = [
  { id: "mtn", name: "MTN", category: "Airtime & data", src: "/billers/mtn.png" },
  { id: "airtel", name: "Airtel", category: "Airtime & data", src: "/billers/airtel.png" },
  { id: "glo", name: "Glo", category: "Airtime & data", src: "/billers/glo.png" },
  { id: "9mobile", name: "9mobile", category: "Airtime & data", src: "/billers/9mobile.png" },
  { id: "dstv", name: "DStv", category: "TV", src: "/billers/dstv.jpg" },
  { id: "gotv", name: "GOtv", category: "TV", src: "/billers/gotv.jpg" },
  { id: "phed", name: "PHED", category: "Electricity", src: "/billers/phed.png" },
];

export const biller = (id: string) => BILLERS.find((b) => b.id === id)!;
