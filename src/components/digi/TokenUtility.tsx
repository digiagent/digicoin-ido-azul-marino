import { Reveal, Section } from "./Section";

const CORE_UTILITY: [string, string][] = [
  [
    "AI access consumption",
    "Paying for AI access tiers ($3–$6/month in USDC/USDT) is designed to require DIGI, which is routed to the Incinerator and removed from circulation.",
  ],
  [
    "Premium functionality",
    "DIGI is designed to unlock premium features across DigiPaga and Digimercados — one token across both platforms.",
  ],
  [
    "Fixed, burnable supply",
    "1,000,000,000 DIGI. No mint function. Burnable — supply can only decrease.",
  ],
];

const PLANNED_UTILITY: [string, string][] = [
  ["Governance voting", "Participation in DAO Treasury decisions."],
  ["Access to staking vaults", "Planned for the decentralized environment."],
  ["AI Co-Pilot enablement", "Planned agent tooling across the ecosystem."],
  ["Debit card rewards", "Planned for the centralized environment."],
  ["DeFi marketplace access & best price routing", "Planned for the decentralized environment."],
];

export function TokenUtility() {
  return (
    <Section
      id="token-utility"
      index="12"
      eyebrow="Token utility"
      title={
        <>
          What DIGI is{" "}
          <span className="text-primary">
            designed to do<span className="text-foreground">.</span>
          </span>
        </>
      }
      lead="DIGI is the utility token of the DigiPaga / Digimercados ecosystem. It is not deployed yet — utility activates with the token at TGE. Chain: TBA · Token contract: TBA."
    >
      <div
        className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline lg:grid-cols-2"
        data-testid="token-utility-grid"
      >
        <Reveal className="bg-background p-8 md:p-10">
          <div className="eyebrow text-primary">Core utility — from TGE</div>
          <ul className="mt-8 flex flex-col divide-y divide-hairline">
            {CORE_UTILITY.map(([t, d]) => (
              <li key={t} className="group cursor-default py-6 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="select-none text-xs leading-none text-primary">◆</span>
                  <span className="font-display text-xl tracking-tight md:text-2xl">{t}</span>
                </div>
                <p className="mt-3 pl-7 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  {d}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="bg-surface p-8 md:p-10">
          <div className="eyebrow">Planned utility — future releases</div>
          <ul className="mt-8 flex flex-col divide-y divide-hairline">
            {PLANNED_UTILITY.map(([t, d]) => (
              <li key={t} className="group flex cursor-default flex-col py-5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-foreground/85 md:text-lg">{t}</span>
                  <span className="h-px w-6 origin-right scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-lg border border-hairline px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
            Planned utility ships in future releases — timing TBA
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
