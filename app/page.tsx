import QRCode from "qrcode";
import { Suspense, type ReactNode } from "react";
import { KineticBand } from "@/components/KineticBand";
import { ScrollMotion } from "@/components/ScrollMotion";
import { StickyCta } from "@/components/StickyCta";
import { BillsAndGiftCards } from "@/components/sections/BillsAndGiftCards";
import { Cashpoints } from "@/components/sections/Cashpoints";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { PhoneStory } from "@/components/sections/PhoneStory";
import { Security } from "@/components/sections/Security";
import { SwapBand } from "@/components/sections/SwapBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { TokenTicker } from "@/components/sections/TokenTicker";
import { Vault } from "@/components/sections/Vault";
import { VirtualCard } from "@/components/sections/VirtualCard";
import { DOWNLOAD_PATH, SITE_URL } from "@/lib/site";

// Each section is its own Suspense boundary so React hydrates them one at a time and yields to
// the browser in between — one giant hydration task was holding back first paint on phones.
const Island = ({ children }: { children: ReactNode }) => <Suspense>{children}</Suspense>;

export default async function Home() {
  // Generated from our own URL at build time — safe to inline.
  const qrSvg = await QRCode.toString(new URL(DOWNLOAD_PATH, SITE_URL).toString(), {
    type: "svg",
    margin: 0,
    color: { dark: "#2c0548", light: "#ffffff" },
  });

  return (
    <>
      <Island>
          <Nav />
        </Island>
      <main>
        <Island>
          <Hero />
        </Island>
        <Island>
          <SwapBand />
        </Island>
        <Island>
          <PhoneStory />
        </Island>
        <Island>
          <KineticBand />
        </Island>
        <Island>
          <BillsAndGiftCards />
        </Island>
        <Island>
          <Vault />
        </Island>
        <Island>
          <TokenTicker />
        </Island>
        <Island>
          <VirtualCard />
        </Island>
        <Island>
          <Cashpoints />
        </Island>
        <Island>
          <Security />
        </Island>
        <Island>
          <Testimonials />
        </Island>
        <Island>
          <FinalCta qrSvg={qrSvg} />
        </Island>
      </main>
      <Island>
          <Footer />
        </Island>
      <Island>
          <StickyCta />
        </Island>
      <Island>
          <ScrollMotion />
        </Island>
    </>
  );
}
