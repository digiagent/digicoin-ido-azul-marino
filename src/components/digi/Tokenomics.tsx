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
      <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:items-center">
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
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <div className="min-w-[720px]">
              <div className={ROW + " px-5 py-3"}>
                <span className="eyebrow">Allocation</span>
                <span className="eyebrow text-right">Share</span>
                <span className="eyebrow text-right">Tokens</span>
                <span className="eyebrow text-right">Price</span>
                <span className="eyebrow text-right">Raise</span>
                <span className="eyebrow text-right">TGE</span>
                <span className="eyebrow text-right">Cliff</span>
                <span className="eyebrow text-right">Vest</span>
              </div>
              {TOKENOMICS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onMouseEnter={() => setActive(s.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.key)}
                  onBlur={() => setActive(null)}
                  className={ROW + " w-full border-t border-hairline px-5 py-3.5 text-left transition-colors"}
                  style={{ background: active === s.key ? "var(--surface)" : "transparent" }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] transition-transform"
                      style={{ background: s.color, transform: active === s.key ? "scale(1.5)" : "scale(1)" }}
                    />
                    <span className="text-sm text-foreground">{s.label}</span>
                  </span>
                  <span className="text-right font-mono text-xs text-muted-foreground">{s.pct}%</span>
                  <span className="text-right font-mono text-xs text-foreground/80">{s.tokens}</span>
                  <span className="text-right font-mono text-xs text-muted-foreground">{s.price}</span>
                  <span className="text-right font-mono text-xs text-primary">{s.raise}</span>
                  <span className="text-right font-mono text-xs text-muted-foreground">{s.tge}</span>
                  <span className="text-right font-mono text-xs text-muted-foreground">{s.cliff}</span>
                  <span className="text-right font-mono text-xs text-muted-foreground">{s.vesting}</span>
                </button>
              ))}
              <div className={ROW + " border-t border-hairline px-5 py-4"}>
                <span className="text-sm text-foreground">Total Supply</span>
                <span className="text-right font-mono text-xs text-muted-foreground">100%</span>
                <span className="text-right font-mono text-xs text-primary">1,000,000,000</span>
                <span className="text-right font-mono text-xs text-muted-foreground">—</span>
                <span className="text-right font-mono text-xs text-foreground">$4,250,000</span>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
