import QRCode from "qrcode";
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

export default async function Home() {
  // Generated from our own URL at build time — safe to inline.
  const qrSvg = await QRCode.toString(new URL(DOWNLOAD_PATH, SITE_URL).toString(), {
    type: "svg",
    margin: 0,
    color: { dark: "#2c0548", light: "#ffffff" },
  });

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SwapBand />
        <PhoneStory />
        <BillsAndGiftCards />
        <Vault />
        <TokenTicker />
        <VirtualCard />
        <Cashpoints />
        <Security />
        <Testimonials />
        <FinalCta qrSvg={qrSvg} />
      </main>
      <Footer />
      <StickyCta />
      <ScrollMotion />
    </>
  );
}
