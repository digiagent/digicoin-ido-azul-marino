import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Section";
import {
  AI_ACCESS_TIERS,
  ILLUSTRATIVE_BREAK_SERIES,
  ILLUSTRATIVE_DIGI_MODEL_SERIES,
  INCINERATOR_EXAMPLE,
} from "./data";
import burner from "@/assets/digi_burner_supply.png.asset.json";

function FlowChips({ steps, testId }: { steps: string[]; testId: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2" data-testid={testId}>
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="cursor-default rounded-full border border-hairline px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors duration-300 hover:border-primary hover:text-primary">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-xs text-primary/60">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

type Series = { label: string; color: string; data: number[]; dashed?: boolean };

function toPath(data: number[]) {
  const w = 100;
  const h = 56;
  return data
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (data.length - 1)) * w).toFixed(1)},${(h - 4 - (v / 100) * (h - 8)).toFixed(1)}`)
    .join(" ");
}

function MiniChart({ series, testId }: { series: Series[]; testId: string }) {
  return (
    <div data-testid={testId}>
      <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="h-40 w-full md:h-48">
        {[14, 28, 42].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--hairline)" strokeWidth="0.4" />
        ))}
        {series.map((s, i) => (
          <motion.path
            key={s.label}
            d={toPath(s.data)}
            fill="none"
            stroke={s.color}
            strokeWidth="1.4"
            strokeOpacity={s.dashed ? 0.65 : 1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {series.map((s) => (
          <span key={s.label} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/70">
            <span className="h-0.5 w-5 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function IllustrativeBadge() {
  return (
    <span className="inline-block rounded-full border border-hairline px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50">
      Illustrative data — real tokenomics data pending
    </span>
  );
}

function IncineratorBox() {
  const [scenario, setScenario] = useState(0);
  const ex = INCINERATOR_EXAMPLE;

  return (
    <div className="flex flex-col gap-7">
      <FlowChips
        steps={["User", "AI Access", "Stablecoin Payment", "DIGI Required", "Incinerator", "DIGI Removed"]}
        testId="incinerator-flow"
      />
      <div>
        <div className="eyebrow">AI access tiers</div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {AI_ACCESS_TIERS.map((t) => (
            <span
              key={t}
              className="rounded-full border border-primary/25 px-4 py-1.5 font-mono text-xs text-foreground/85 transition-colors duration-300 hover:border-primary"
            >
              {t}/mo
            </span>
          ))}
          <span className="ml-1 text-xs text-muted-foreground">paid in USDC / USDT</span>
        </div>
      </div>
      <div
        className="rounded-xl border border-hairline bg-card/40 p-6"
        data-testid="incinerator-example"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-display text-3xl tracking-tight text-primary">{ex.accessUsd}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50">
            access level stays fixed in dollars
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {ex.scenarios.map((s, i) => (
            <button
              key={s.digiPrice}
              type="button"
              data-testid={`incinerator-price-btn-${i}`}
              onClick={() => setScenario(i)}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-300 ${
                scenario === i
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-hairline text-foreground/70 hover:border-primary/50"
              }`}
            >
              If DIGI = {s.digiPrice}
            </button>
          ))}
        </div>
        <div className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight" data-testid="incinerator-digi-required">
          {ex.scenarios[scenario].digiRequired}
          <span className="ml-2 text-base text-muted-foreground">required</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The DIGI amount required changes with DIGI&apos;s price — the dollar-denominated access
          level stays fixed. DIGI consumed / burned. {ex.accessNote}
        </p>
      </div>
    </div>
  );
}

function BreakBox() {
  const s = ILLUSTRATIVE_BREAK_SERIES;
  return (
    <div className="flex flex-col gap-6">
      <MiniChart
        testId="break-chart"
        series={[
          { label: "Circulating supply", color: "var(--destructive)", data: s.circulatingSupply },
          { label: "Demand", color: "var(--chart-2)", data: s.demand, dashed: true },
          { label: "Trading volume", color: "var(--chart-3)", data: s.tradingVolume, dashed: true },
          { label: "Adoption", color: "var(--chart-4)", data: s.adoption, dashed: true },
        ]}
      />
      <p className="text-sm leading-relaxed text-foreground/85">
        Continuously increasing circulating supply while ecosystem demand and utility weaken can
        create economic pressure.
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        This is a common failure pattern in token design — not the fate of every token.
      </p>
      <IllustrativeBadge />
    </div>
  );
}

function DigiModelBox() {
  const s = ILLUSTRATIVE_DIGI_MODEL_SERIES;
  return (
    <div className="flex flex-col gap-6">
      <FlowChips
        steps={["AI Usage", "DIGI Required", "DIGI Burned", "DIGI Removed From Circulation"]}
        testId="digi-model-flow"
      />
      <MiniChart
        testId="digi-model-chart"
        series={[
          { label: "Utility consumption", color: "var(--primary)", data: s.utilityConsumption },
          { label: "DIGI removed", color: "var(--chart-2)", data: s.tokensRemoved, dashed: true },
        ]}
      />
      <div className="rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
        Designed to align token consumption with ecosystem utility
      </div>
      <IllustrativeBadge />
    </div>
  );
}

const BOXES = [
  { n: "01", title: "The Incinerator", body: IncineratorBox },
  { n: "02", title: "Why Tokenomics Break", body: BreakBox },
  { n: "03", title: "The Digi Model", body: DigiModelBox },
];

export function AgentNomics() {
  const [active, setActive] = useState(0);

  return (
    <section id="agentnomics" className="hairline-t scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="eyebrow text-primary/70">12</span>
            <span className="eyebrow">Token mechanics</span>
          </div>
          <p className="mt-6 font-brand text-[clamp(2.6rem,6.4vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-primary">
            Agent-nomics
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            data-testid="agentnomics-boxes"
            className="mt-14 flex flex-col gap-px overflow-hidden rounded-xl border border-hairline bg-hairline lg:min-h-[640px] lg:flex-row"
          >
            {BOXES.map((b, i) => {
              const Body = b.body;
              const isActive = active === i;
              return (
                <div
                  key={b.n}
                  data-testid={`agentnomics-box-${i}`}
                  onClick={() => setActive(i)}
                  className={`relative flex flex-col overflow-hidden bg-background transition-[flex-grow,background-color] duration-700 ease-out ${
                    isActive ? "lg:flex-[3]" : "cursor-pointer hover:bg-card/60 lg:flex-[0.8]"
                  }`}
                >
                  {i === 0 && isActive && (
                    <img
                      src={burner.url}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="pointer-events-none absolute -right-10 bottom-0 hidden w-[220px] opacity-25 xl:block"
                    />
                  )}
                  <button
                    type="button"
                    data-testid={`agentnomics-tab-${i}`}
                    onClick={() => setActive(i)}
                    className="flex w-full items-baseline gap-3 px-7 pt-7 text-left"
                  >
                    <span className="font-mono text-xs text-primary/70">{b.n}</span>
                    <span
                      className={`font-display text-xl tracking-tight transition-colors duration-300 md:text-2xl ${
                        isActive ? "text-primary" : "text-foreground/70"
                      }`}
                    >
                      {b.title}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="relative z-10 min-w-[min(82vw,540px)] p-7 pt-6">
                        <Body />
                      </div>
                    </div>
                  </div>
                  {!isActive && (
                    <span className="hidden px-7 pb-7 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40 lg:mt-auto lg:block">
                      Click to expand
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
