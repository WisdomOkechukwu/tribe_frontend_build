import { BillerTile } from "@/components/BillerTile";
import { Coin } from "@/components/Coin";
import { Icon, type IconName } from "@/components/Icon";
import { StatusBar } from "./PhoneFrame";

function Row({ code, title, sub, value, valueSub }: { code: string; title: string; sub: string; value: string; valueSub?: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Coin code={code} size={34} />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-tight">{title}</p>
        <p className="text-[11px] text-ink-300">{sub}</p>
      </div>
      <div className="text-right">
        <p className="text-[13px] font-semibold leading-tight">{value}</p>
        {valueSub && <p className="text-[11px] text-ink-300">{valueSub}</p>}
      </div>
    </div>
  );
}

function Action({ icon, label, active = false }: { icon: IconName; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className={`grid size-11 place-items-center rounded-2xl ${active ? "bg-orange-500 text-white" : "bg-purple-50 text-purple-700"}`}>
        <Icon name={icon} className="size-[18px]" />
      </span>
      <span className="text-[10px] font-medium text-ink-500">{label}</span>
    </div>
  );
}

export function WalletScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pt-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-orange-500 text-xs font-bold text-white">A</span>
          <div className="leading-tight">
            <p className="text-[10px] text-ink-300">Good evening</p>
            <p className="text-[13px] font-semibold">Ada Okafor</p>
          </div>
        </div>
        <Icon name="bell" className="size-[18px] text-ink-500" />
      </div>
      <div className="relative mx-4 mt-4 overflow-hidden rounded-[22px] bg-purple-500 p-4 text-white">
        <div className="stripes absolute -right-10 -top-6 h-28 w-40 opacity-30 [--stripe-w:10px]" />
        <p className="text-[11px] text-purple-100">Total balance</p>
        <p className="mt-1 font-display text-[26px] font-extrabold leading-none tracking-tight">₦4,826,310</p>
        <p className="mt-2 text-[11px] text-purple-100">
          ≈ $3,133.97 · <span className="font-semibold text-success-300">+2.4% today</span>
        </p>
      </div>
      <div className="mt-4 grid grid-cols-4 px-4">
        <Action icon="send" label="Send" active />
        <Action icon="swap" label="Swap" />
        <Action icon="pay" label="Pay" />
        <Action icon="card" label="Card" />
      </div>
      <div className="mt-4 flex-1 rounded-t-[24px] bg-paper px-4 pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-300">Assets</p>
        <div className="divide-y divide-ink-50">
          <Row code="BTC" title="Bitcoin" sub="0.0142 BTC" value="₦2,151,600" valueSub="+3.1%" />
          <Row code="USDT" title="Tether" sub="812.40 USDT" value="₦1,251,096" valueSub="0.0%" />
          <Row code="ETH" title="Ethereum" sub="0.2 ETH" value="₦1,114,960" valueSub="+1.8%" />
          <Row code="NGN" title="Naira" sub="Main wallet" value="₦308,654" />
        </div>
      </div>
    </div>
  );
}

export function FiatScreen() {
  const accounts = [
    { code: "USD", label: "US Dollar account", bal: "$1,240.00", detail: "ACH · Routing •••• 0021", bg: "bg-blue-500" },
    { code: "GBP", label: "British Pound account", bal: "£318.20", detail: "Sort code •• •• 47", bg: "bg-purple-300" },
    { code: "EUR", label: "Euro account", bal: "€96.75", detail: "IBAN •••• 8810", bg: "bg-blue-700" },
  ];
  return (
    <div className="flex h-full flex-col bg-paper">
      <StatusBar />
      <div className="px-5 pt-4">
        <p className="text-[11px] text-ink-300">Accounts in your name</p>
        <p className="font-display text-[22px] font-extrabold leading-tight">Global accounts</p>
      </div>
      <div className="mt-4 space-y-3 px-4">
        {accounts.map((a) => (
          <div key={a.code} className={`${a.bg} rounded-[20px] p-4 text-white`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] opacity-80">{a.label}</span>
              <Coin code={a.code} size={26} />
            </div>
            <p className="mt-2 font-display text-[22px] font-extrabold leading-none">{a.bal}</p>
            <p className="mt-2 text-[10px] opacity-75">{a.detail}</p>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-[20px] border border-dashed border-ink-100 p-4 text-[12px] font-medium text-ink-500">
          Open another currency
          <Icon name="plus" className="size-4" />
        </div>
      </div>
      <div className="mx-4 mt-auto mb-5 rounded-2xl bg-white p-3 text-[11px] text-ink-500 shadow-sm">
        <span className="font-semibold text-success-600">Received $450.00</span> from Upwork · 2m ago
      </div>
    </div>
  );
}

export function SwapScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <p className="px-5 pt-4 font-display text-[22px] font-extrabold">Swap</p>
      <div className="relative mx-4 mt-3 space-y-2">
        <div className="rounded-[20px] bg-paper p-4">
          <p className="text-[11px] text-ink-300">You pay</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-display text-[26px] font-extrabold">250</span>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[12px] font-semibold shadow-sm">
              <Coin code="USDT" size={20} /> USDT
            </span>
          </div>
        </div>
        <span className="absolute left-1/2 top-1/2 z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-orange-500 text-white">
          <Icon name="swap" className="size-4 rotate-90" />
        </span>
        <div className="rounded-[20px] bg-purple-50 p-4">
          <p className="text-[11px] text-ink-300">You get</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-display text-[26px] font-extrabold text-purple-700">383,075</span>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[12px] font-semibold shadow-sm">
              <Coin code="NGN" size={20} /> NGN
            </span>
          </div>
        </div>
      </div>
      <dl className="mx-5 mt-4 space-y-2 text-[11px]">
        {[
          ["Rate", "1 USDT = ₦1,540"],
          ["Fee", "1.25 USDT"],
          ["Arrives", "Instantly"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <dt className="text-ink-300">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mx-4 mt-auto mb-5 rounded-2xl bg-ink-900 py-3.5 text-center text-[13px] font-semibold text-white">
        Swap now
      </div>
    </div>
  );
}

export function CashpointsScreen() {
  return (
    <div className="flex h-full flex-col bg-purple-900 text-white">
      <StatusBar dark />
      <div className="px-5 pt-4">
        <p className="text-[11px] text-purple-200">Generate Cashpoint</p>
        <p className="font-display text-[30px] font-extrabold leading-tight">₦5,000</p>
        <p className="text-[11px] text-purple-200">From your NGN wallet · no fee</p>
      </div>
      <div className="mx-4 mt-5 rounded-[20px] bg-white p-4 text-ink-900">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-600">Your 12-digit code</p>
        <p className="mt-2 font-mono text-[21px] font-semibold tracking-[0.1em]">4827 1930 5561</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-semibold">
          <span className="flex items-center justify-center gap-1 rounded-xl bg-purple-50 py-2 text-purple-700">
            <Icon name="copy" className="size-3.5" /> Copy
          </span>
          <span className="flex items-center justify-center gap-1 rounded-xl bg-purple-50 py-2 text-purple-700">
            <Icon name="send" className="size-3.5" /> Share
          </span>
        </div>
      </div>
      <div className="mx-4 mt-3 flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5 text-[11px] text-purple-100">
        <span className="size-2 rounded-full bg-warning-400" /> Not redeemed yet
      </div>
      <p className="mx-5 mt-3 text-[10px] leading-relaxed text-purple-200">
        Anyone can redeem it — existing Tribe users instantly, new users at sign-up.
      </p>
      <div className="mx-4 mt-auto mb-5 rounded-2xl bg-orange-500 py-3.5 text-center text-[13px] font-semibold">Generate another</div>
    </div>
  );
}

export function TokenVaultScreen() {
  const tokens = [
    { units: "34.2 kWh", amount: "₦15,000", provider: "PHED", used: false },
    { units: "22.8 kWh", amount: "₦10,000", provider: "PHED", used: false },
    { units: "45.6 kWh", amount: "₦20,000", provider: "PHED", used: true },
  ];
  return (
    <div className="flex h-full flex-col bg-orange-50">
      <StatusBar />
      <div className="px-5 pt-4">
        <p className="font-display text-[22px] font-extrabold leading-tight">Token Vault</p>
        <p className="text-[11px] text-ink-400">Every token you buy, saved.</p>
      </div>
      <div className="mx-4 mt-3 flex items-center gap-2 rounded-2xl bg-orange-500 px-3 py-2.5 text-[11px] font-medium text-white">
        <Icon name="bolt" className="size-4" /> 2 tokens not loaded yet
      </div>
      <div className="mt-3 space-y-2.5 px-4">
        {tokens.map((t, i) => (
          <div key={i} className={`rounded-[18px] bg-white p-3.5 ${t.used ? "opacity-55" : ""}`}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-semibold">
                <BillerTile id="phed" size={18} />
                {t.provider}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${t.used ? "bg-ink-50 text-ink-400" : "bg-orange-100 text-orange-800"}`}>
                {t.used ? "Loaded" : "Not loaded yet"}
              </span>
            </div>
            <p className={`mt-1.5 font-mono text-[12px] tracking-wide ${t.used ? "line-through" : ""}`}>4821 0937 5512 8846 {3307 + i}</p>
            <p className="mt-1 text-[10px] text-ink-300">
              {t.units} · {t.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
