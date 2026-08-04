import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Reveal, Section } from "./Section";
import { gsap, useGSAP, MOTION_OK } from "./scroll";
import { DISTRIBUTION_DETAILS, TOKENOMICS } from "./data";

const ROW =
  "grid grid-cols-[1.5fr_0.5fr_1fr_0.6fr_0.9fr_0.5fr_0.5fr_0.5fr] items-center gap-4";

const BENTO = [
  { label: "Total supply", count: 1_000_000_000, display: "1,000,000,000", prefix: "", suffix: "", decimals: 0, note: "Fixed — no mint function", span: "sm:col-span-2" },
  { label: "Total raise", count: 4_250_000, display: "4,250,000", prefix: "$", suffix: "", decimals: 0, note: "Across four rounds", span: "" },
  { label: "Initial circulating", count: 7.9, display: "7.9", prefix: "", suffix: "%", decimals: 1, note: "At TGE · Q3 2027", span: "" },
];

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 280, damping: 22 });
  const ry = useSpring(0, { stiffness: 280, damping: 22 });

  return (
    <motion.div
      className={`rounded-2xl border border-hairline bg-card/40 p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set((0.5 - (e.clientY - r.top) / r.height) * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Tokenomics() {
  const [active, setActive] = useState<string | null>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", bentoRef.current).forEach((el) => {
          const end = parseFloat(el.dataset.count || "0");
          const decimals = Number(el.dataset.decimals || 0);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const state = { v: 0 };
          gsap.to(state, {
            v: end,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate() {
              el.textContent =
                prefix +
                state.v.toLocaleString("en-US", {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                }) +
                suffix;
            },
          });
        });
      });
    },
    { scope: bentoRef },
  );

  return (
    <Section
      id="tokenomics"
      index="05"
      eyebrow="Tokenomics"
      title="One billion DIGI, allocated for durability"
      lead="Supply is fixed at 1,000,000,000 DIGI. Allocations are weighted toward the agent economy and long-dated liquidity rather than short-term distribution."
    >
      <div
        ref={bentoRef}
        className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 [perspective:1000px]"
      >
        {BENTO.map((b) => (
          <TiltCard key={b.label} className={b.span}>
            <div className="eyebrow">{b.label}</div>
            <div
              className="mt-3 font-display text-4xl tracking-tight text-foreground md:text-5xl"
              data-count={b.count}
              data-prefix={b.prefix}
              data-suffix={b.suffix}
              data-decimals={b.decimals}
            >
              {b.prefix + b.display + b.suffix}
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80">
              {b.note}
            </div>
          </TiltCard>
        ))}
      </div>

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
                  <span
                    className={`text-right font-mono text-xs ${s.raise === "—" ? "text-muted-foreground" : "text-primary"}`}
                  >
                    {s.raise}
                  </span>
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

      <div className="mt-10" data-testid="distribution-details">
        <Reveal>
          <h3 className="font-display text-3xl tracking-tight md:text-4xl">
            Distribution details<span className="text-primary">.</span>
          </h3>
          <div className="mt-6 overflow-hidden rounded-xl border border-hairline">
            <div className="grid grid-cols-[240px_1fr] items-center gap-4 px-5 py-3 max-md:grid-cols-1">
              <span className="eyebrow">Allocation</span>
              <span className="eyebrow max-md:hidden">Description</span>
            </div>
            {DISTRIBUTION_DETAILS.map(([k, v]) => {
              const slice = TOKENOMICS.find((s) => s.label === k);
              const isActive = slice != null && active === slice.key;
              return (
                <div
                  key={k}
                  data-testid={`distribution-row-${slice?.key ?? k}`}
                  onMouseEnter={() => slice && setActive(slice.key)}
                  onMouseLeave={() => setActive(null)}
                  className="grid grid-cols-[240px_1fr] items-center gap-4 border-t border-hairline px-5 py-3.5 transition-colors max-md:grid-cols-1"
                  style={{ background: isActive ? "var(--surface)" : "transparent" }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] transition-transform"
                      style={{
                        background: slice?.color ?? "var(--muted-foreground)",
                        transform: isActive ? "scale(1.5)" : "scale(1)",
                      }}
                    />
                    <span className="text-sm text-foreground">{k}</span>
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{v}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
