import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Reveal, Section } from "./Section";
import { TOKENOMICS } from "./data";

export function Tokenomics() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section
      id="tokenomics"
      index="05"
      eyebrow="Tokenomics"
      title="One billion DIGI, allocated for durability"
      lead="Supply is fixed at 1,000,000,000 DIGI. Allocations are weighted toward the agent economy and long-dated liquidity rather than short-term distribution."
    >
      <div className="grid gap-12 lg:grid-cols-[420px_1fr] lg:items-center">
        <Reveal>
          <div className="relative aspect-square w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOKENOMICS}
                  dataKey="pct"
                  nameKey="label"
                  innerRadius="62%"
                  outerRadius="92%"
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                  onMouseEnter={(_, i) => setActive(TOKENOMICS[i].key)}
                  onMouseLeave={() => setActive(null)}
                >
                  {TOKENOMICS.map((s) => (
                    <Cell
                      key={s.key}
                      fill={s.color}
                      style={{
                        opacity: active && active !== s.key ? 0.25 : 1,
                        filter: active === s.key ? "brightness(1.15)" : "none",
                        transition: "opacity 220ms ease, filter 220ms ease",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              {active ? (
                <>
                  <div className="font-display text-5xl">
                    {TOKENOMICS.find((s) => s.key === active)?.pct}%
                  </div>
                  <div className="mt-2 max-w-[9rem] text-xs text-muted-foreground">
                    {TOKENOMICS.find((s) => s.key === active)?.label}
                  </div>
                </>
              ) : (
                <>
                  <div className="font-display text-4xl">1B</div>
                  <div className="eyebrow mt-2">Total supply</div>
                </>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-xl border border-hairline">
            <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 text-left md:grid-cols-[1.4fr_0.8fr_1fr_auto]">
              <span className="eyebrow">Allocation</span>
              <span className="eyebrow hidden md:block">Tokens</span>
              <span className="eyebrow hidden md:block">Unlock</span>
              <span className="eyebrow text-right">Share</span>
            </div>
            {TOKENOMICS.map((s) => (
              <button
                key={s.key}
                type="button"
                onMouseEnter={() => setActive(s.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.key)}
                onBlur={() => setActive(null)}
                className="grid w-full grid-cols-[1fr_auto] items-center gap-4 border-t border-hairline px-5 py-4 text-left transition-colors md:grid-cols-[1.4fr_0.8fr_1fr_auto]"
                style={{ background: active === s.key ? "var(--surface)" : "transparent" }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] transition-transform"
                    style={{ background: s.color, transform: active === s.key ? "scale(1.5)" : "scale(1)" }}
                  />
                  <span className="text-sm text-foreground">{s.label}</span>
                </span>
                <span className="hidden font-mono text-sm text-muted-foreground md:block">{s.tokens}</span>
                <span className="hidden text-sm text-muted-foreground md:block">{s.vesting}</span>
                <span className="text-right font-mono text-sm text-primary">{s.pct}%</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
