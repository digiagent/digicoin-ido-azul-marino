import { Reveal, Section } from "./Section";

const FACTS: [string, string, boolean?][] = [
  ["Total supply", "1,000,000,000 DIGI"],
  ["Tokenomics", "9 allocations · fixed supply · see Tokenomics section"],
  ["Vesting", "Per-allocation TGE unlocks, cliffs and vesting · see Vesting & Unlocks"],
  ["Minting", "No — supply cannot increase"],
  ["Burnable", "Yes"],
  [
    "Bridge Round terms",
    "50,000,000 DIGI · $0.0025/DIGI · $100,000 target raise · $2.5M target FDV · 10% TGE · 6-month cliff · 12-month vesting",
  ],
  ["TGE", "TBA", true],
  ["Network", "Under consideration — not yet selected", true],
  ["Token contract", "TBA", true],
  ["Token deployment", "Not yet deployed", true],
  ["Audit", "Not yet completed", true],
];

export function Transparency() {
  return (
    <Section
      id="transparency"
      index="20"
      eyebrow="Transparency"
      title={
        <>
          What&apos;s confirmed, what&apos;s <span className="text-primary">pending.</span>
        </>
      }
      lead="DIGI is not deployed yet. Everything below is stated as-is — nothing is implied to be live on-chain."
    >
      <Reveal>
        <div
          className="overflow-hidden rounded-xl border border-hairline"
          data-testid="transparency-table"
        >
          {FACTS.map(([k, v, pending]) => (
            <div
              key={k}
              data-testid={`transparency-row-${k.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="grid grid-cols-[200px_1fr] items-center gap-4 border-t border-hairline px-5 py-4 transition-colors first:border-t-0 hover:bg-card/40 max-md:grid-cols-1 md:grid-cols-[260px_1fr]"
            >
              <span className="eyebrow">{k}</span>
              <span
                className={`text-[15px] leading-relaxed md:text-base ${
                  pending ? "font-mono text-sm text-foreground/60" : "text-foreground/90"
                }`}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
