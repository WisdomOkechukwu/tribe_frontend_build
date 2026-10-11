import Image from "next/image";
import Link from "next/link";
import { Sticker } from "@/components/Sticker";
import { StoreButton } from "@/components/StoreButton";
import { Button } from "@/components/ui/Button";
import tribeIcon from "@/public/brand/tribe-icon.png";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-purple-900 text-white" data-theme="dark">
      <div className="stripes pointer-events-none absolute -right-32 -top-24 h-[420px] w-[640px] rotate-6 opacity-30 [--stripe-w:34px]" />
      <div className="stripes pointer-events-none absolute -bottom-28 -left-32 h-[320px] w-[560px] -rotate-3 opacity-20 [--stripe-w:26px]" />

      <header className="container-x relative pt-6">
        <Link href="/" aria-label="Tribe home" className="press inline-block rounded-full bg-white p-1.5 pr-3">
          <Image src={tribeIcon} alt="Tribe" className="h-10 w-auto" />
        </Link>
      </header>

      <div className="container-x relative flex flex-1 flex-col items-start justify-center py-16">
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.25em] text-orange-300">Error 404</p>
        <h1 className="display text-[clamp(4rem,15vw,13rem)]">
          This page
          <br />
          <span className="text-orange-500">don japa.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-purple-100">
          It packed its bags and left — no forwarding address. Your money is still right where you left it, though.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href="/" variant="light">
            Back home
          </Button>
          <StoreButton tone="orange" />
        </div>
        <span className="absolute right-[8%] top-[22%] hidden md:block">
          <Sticker shape="burst" tone="yellow" rotate={14}>
            omo
          </Sticker>
        </span>
      </div>
    </main>
  );
}
