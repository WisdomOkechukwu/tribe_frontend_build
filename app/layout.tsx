import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${bricolage.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-dvh">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
