import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Poppins } from "next/font/google";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  // wdth gives the condensed display caps; opsz was unused weight in the font file
  axes: ["wdth"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
  // margin notes only, all below the fold
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tribe — Mobile wallet simplified",
  description:
    "Hold crypto and global currencies, swap anything for anything, pay bills and gift cards, fund virtual cards and share Cashpoint codes with anyone.",
  openGraph: {
    title: "Tribe — Money that moves like you",
    description: "Crypto, global fiat, swaps, bills, virtual cards and Cashpoints in one app.",
    images: ["/brand/tribe-icon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2c0548",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // the preloader script toggles classes on <html> before hydration
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${poppins.variable} ${caveat.variable} antialiased`}>
      <body className="min-h-dvh">
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
