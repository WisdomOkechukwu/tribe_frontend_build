import Image from "next/image";
import { StoreBadges } from "@/components/StoreButton";
import { FOOTER_LINKS, SOCIALS } from "@/lib/site";
import tribeIcon from "@/public/brand/tribe-icon.png";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-paper pt-20">
      <div className="container-x">
        <div className="flex flex-col gap-8 border-b border-ink-900/10 pb-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image src={tribeIcon} alt="Tribe" className="h-[72px] w-auto" />
            <p className="max-w-[200px] text-[15px] font-medium leading-snug text-ink-500">Mobile wallet simplified. Built for the tribe.</p>
          </div>
          <StoreBadges />
        </div>

        <nav className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4" aria-label="Footer">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold uppercase tracking-wider text-ink-300">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[15px] text-ink-700 transition-colors hover:text-purple-500">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-6 border-t border-ink-900/10 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="press inline-block rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink-700 shadow-lift hover:bg-orange-500 hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-ink-300">© {new Date().getFullYear()} Tribe. All rights reserved.</p>
        </div>
        {/* TODO(compliance): replace with Tribe's registered entity and licensing statement. */}
        <p className="mt-6 max-w-4xl text-[12px] leading-relaxed text-ink-300">
          Tribe is a financial technology company, not a bank. Crypto assets are volatile and their value can go down as well as up. Rates shown on this page are illustrative. Card and account services are provided by licensed partners.
        </p>
      </div>

      {/* Giant outlined sign-off, cropped by the bottom edge */}
      <p
        aria-hidden
        className="display mt-12 select-none whitespace-nowrap text-center text-[34vw] leading-[0.72] text-transparent [-webkit-text-stroke:2px_#690dac] md:[-webkit-text-stroke:3px_#690dac]"
        style={{ marginBottom: "-0.1em" }}
      >
        Tribe
      </p>
      {/* keeps the mobile sticky CTA from covering the sign-off */}
      <div className="h-20 md:hidden" />
    </footer>
  );
}
