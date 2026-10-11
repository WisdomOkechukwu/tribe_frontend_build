import { SafeImage } from "@/components/SafeImage";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import { TokenVault } from "@/components/TokenVault";
import { Button } from "@/components/ui/Button";
import { DOWNLOAD_PATH } from "@/lib/site";
import lights from "@/public/images/lights.jpg";

const STEPS = [
  {
    title: "Every purchase is saved",
    body: "Token, units, meter number, provider and time — stored the second you pay. No more digging through SMS.",
  },
  {
    title: "Unloaded tokens wait up top",
    body: "Anything you haven't punched in sits under “To load” with a one-tap Copy, so units you paid for never go missing.",
  },
  {
    title: "Tap “I've loaded it” and it moves to Loaded",
    body: "Stamped with the date, so nobody in the house loads the same token twice or swears they already did.",
  },
];

export function Vault() {
  return (
    <section id="vault" className="relative overflow-hidden bg-orange-50 py-24 md:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-orange-700">
            <Icon name="bolt" className="size-4" /> Token Vault
          </p>
          <Headline className="text-[clamp(2.9rem,7vw,6.5rem)] text-purple-900" lines={["Bought units?", "Not sure you", <span key="l" className="text-orange-500">loaded them?</span>]} />
          <p data-reveal className="mt-7 max-w-lg text-lg leading-relaxed text-ink-600">
            You paid for light, the token came in, then it got buried under forty bank alerts. Did you load it? Did your sister already use it? Is the meter about to beep? We built Token Vault so you never have to guess again.
          </p>

          <div data-reveal className="relative mt-10 aspect-[16/9] max-w-lg overflow-hidden rounded-panel">
            <SafeImage fallbackLabel="Token Vault" src={lights} alt="City lights coming on at dusk" fill placeholder="blur" sizes="(min-width: 1024px) 512px, 100vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink-900/80 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur">
              NEPA took light? At least your token is safe.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 lg:items-stretch">
          <div data-reveal className="flex w-full justify-center lg:sticky lg:top-24">
            <TokenVault />
          </div>
        </div>
      </div>

      <div className="container-x mt-20">
        <ol data-reveal className="grid gap-px overflow-hidden rounded-panel bg-orange-200 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-orange-50 p-7 md:p-9">
              <span className="display text-6xl text-orange-500">{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{s.body}</p>
            </li>
          ))}
        </ol>
        <Button href={DOWNLOAD_PATH} data-store-cta className="mt-10">
          Never lose a token again
        </Button>
      </div>
    </section>
  );
}
