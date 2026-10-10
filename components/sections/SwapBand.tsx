import { Headline } from "@/components/Headline";
import { SwapWidget } from "@/components/SwapWidget";

const FACTS = [
  ["40+", "tokens"],
  ["12", "fiat currencies"],
  ["0.5%", "flat swap fee"],
];

export function SwapBand() {
  return (
    <section id="swap" className="relative z-10 bg-purple-500 text-white">
      {/* decoration is clipped on its own so the currency picker can spill past the band */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="stripes absolute -right-40 -top-40 h-[420px] w-[620px] rotate-6 opacity-[0.14] [--stripe-a:white] [--stripe-b:white] [--stripe-w:30px]" />
      </div>
      <div className="container-x relative grid grid-cols-1 items-center gap-14 py-24 md:py-32 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-orange-200">Swap</p>
          <Headline className="text-[clamp(3rem,8vw,7rem)]" lines={["Swap anything", "for anything."]} />
          <p data-reveal className="mt-7 max-w-md text-lg leading-relaxed text-purple-50">
            BTC to Naira. Naira to dollars. USDT to pounds. Token to token, token to fiat, fiat to fiat — one tap, and the rate you see is the rate you get.
          </p>
          <dl data-reveal="children" className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {FACTS.map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-5xl font-extrabold [font-stretch:75%]">{n}</dd>
                <dd className="mt-1 text-sm text-purple-100">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-reveal className="flex justify-center lg:justify-end">
          <SwapWidget />
        </div>
      </div>
    </section>
  );
}
