import Image from "next/image";
import { StoreBadges } from "@/components/StoreButton";
import { FOOTER_LINKS, SOCIALS } from "@/lib/site";
import tribeIcon from "@/public/brand/tribe-icon.png";

export function Footer() {
  return (
    <footer className="bg-paper pb-28 pt-20 md:pb-10">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Image src={tribeIcon} alt="Tribe" className="h-[88px] w-auto" />
            <p className="mt-3 text-[15px] font-medium text-ink-500">Mobile wallet simplified</p>
            <StoreBadges className="mt-8" />
          </div>
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
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
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ink-900/10 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-5">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-[14px] font-medium text-ink-500 hover:text-orange-500">
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
    </footer>
  );
}
