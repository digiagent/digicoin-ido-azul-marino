import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AI_ACCESS_TIERS,
  ILLUSTRATIVE_BREAK_SERIES,
  ILLUSTRATIVE_DIGI_MODEL_SERIES,
  INCINERATOR_EXAMPLE,
} from "./data";
import burner from "@/assets/digi_burner_supply.png.asset.json";

type Series = { label: string; color: string; data: number[]; dashed?: boolean };
const ease = [0.25, 0.46, 0.45, 0.94] as const;

function FlowChips({ steps, testId }: { steps: string[]; testId: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2" data-testid={testId}>
      {steps.map((step, index) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-hairline px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/80">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden className="text-xs text-primary/60">
              →
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function toPath(data: number[]) {
  return data
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"}${((index / (data.length - 1)) * 100).toFixed(1)},${(52 - (value / 100) * 44).toFixed(1)}`,
    )
    .join(" ");
}

function MiniChart({ series, testId }: { series: Series[]; testId: string }) {
  return (
    <div data-testid={testId}>
      <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="h-48 w-full">
        {[14, 28, 42].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--hairline)" strokeWidth="0.4" />
        ))}
        {series.map((item, index) => (
          <motion.path
            key={item.label}
            d={toPath(item.data)}
            fill="none"
            stroke={item.color}
            strokeWidth="1.4"
            strokeOpacity={item.dashed ? 0.65 : 1}
            strokeDasharray={item.dashed ? "2 2" : undefined}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease }}
          />
        ))}
      </svg>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {series.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/70"
          >
            <span className="h-0.5 w-5 rounded-full" style={{ background: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const Badge = () => (
  <span className="inline-block rounded-full border border-hairline px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50">
    Illustrative data — real tokenomics data pending
  </span>
);

function IncineratorSlide() {
  const [scenario, setScenario] = useState(0);
  return (
    <div className="space-y-7">
      <FlowChips
        steps={[
          "User",
          "AI Access",
          "Stablecoin Payment",
          "DIGI Required",
          "Incinerator",
          "DIGI Removed",
        ]}
        testId="incinerator-flow"
      />
      <div>
        <div className="eyebrow">AI access tiers</div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {AI_ACCESS_TIERS.map((tier) => (
            <span
              key={tier}
              className="rounded-full border border-primary/25 px-4 py-1.5 font-mono text-xs text-foreground/85"
            >
              {tier}/mo
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
          <span className="font-display text-3xl tracking-tight text-primary">
            {INCINERATOR_EXAMPLE.accessUsd}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50">
            access level stays fixed in dollars
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {INCINERATOR_EXAMPLE.scenarios.map((item, index) => (
            <button
              key={item.digiPrice}
              type="button"
              data-testid={`incinerator-price-btn-${index}`}
              onClick={() => setScenario(index)}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${scenario === index ? "border-primary bg-primary/10 text-primary" : "border-hairline text-foreground/70 hover:border-primary/50"}`}
            >
              If DIGI = {item.digiPrice}
            </button>
          ))}
        </div>
        <div
          className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight"
          data-testid="incinerator-digi-required"
        >
          {INCINERATOR_EXAMPLE.scenarios[scenario].digiRequired}
          <span className="ml-2 text-base text-muted-foreground">required</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The DIGI amount required changes with DIGI&apos;s price — the dollar-denominated access
          level stays fixed. DIGI consumed / burned. {INCINATOR_EXAMPLE.accessNote}
        </p>
      </div>
    </div>
  );
}

function BreakSlide() {
  const s = ILLUSTRATIVE_BREAK_SERIES;
  return (
    <div className="space-y-6">
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
      <Badge />
    </div>
  );
}

function DigiModelSlide() {
  const s = ILLUSTRATIVE_DIGI_MODEL_SERIES;
  return (
    <div className="space-y-6">
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
      <Badge />
    </div>
  );
}

function RoadmapVisual() {
  return (
    <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-primary/[0.03] p-8">
      <div className="absolute inset-8 rounded-full border border-primary/10" />
      <div className="absolute inset-16 rounded-full border border-dashed border-primary/20" />
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/50 bg-primary/10 shadow-[0_0_70px_-20px_#90ee90]">
        <Sparkles className="h-8 w-8 text-primary" aria-hidden />
      </div>
      {["DIGIM", "DIGIPAGA", "CROSS-CHAIN", "AI AGENTS"].map((label, index) => (
        <span
          key={label}
          className={`absolute rounded-full border border-hairline bg-background/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-primary/80 ${["left-5 top-12", "right-5 top-12", "bottom-10 left-8", "bottom-10 right-8"][index]}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

const slides = [
  {
    id: "incinerator",
    number: "01",
    title: "The Incinerator",
    description:
      "A fixed dollar access level creates a variable DIGI requirement, with every payment feeding the burn mechanism.",
    body: IncineratorSlide,
    visual: "burner",
  },
  {
    id: "break",
    number: "02",
    title: "Why Tokenomics Break",
    description:
      "When supply expands faster than utility, demand, volume, and adoption can lose their footing.",
    body: BreakSlide,
    visual: "break",
  },
  {
    id: "model",
    number: "03",
    title: "The Digi Model",
    description:
      "The model ties token consumption to real AI usage: more utility means more DIGI required and removed.",
    body: DigiModelSlide,
    visual: "model",
  },
  {
    id: "roadmap",
    number: "04",
    title: "Ecosystem Expansion",
    description: "Future utility integrations and cross-chain scalability.",
    body: () => (
      <div className="flex min-h-[280px] flex-col items-start justify-center rounded-xl border border-hairline bg-card/30 p-6 text-sm leading-relaxed text-slate-300">
        <span className="mb-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          Coming Q2 2027
        </span>
        New integrations are designed to extend the burn loop across products, networks, and
        agent-to-agent commerce.
      </div>
    ),
    visual: "roadmap",
  },
];

function Visual({ type }: { type: string }) {
  if (type === "burner")
    return (
      <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-primary/[0.03] p-8">
        <img
          src={burner.url}
          alt="DIGI incinerator supply diagram"
          loading="lazy"
          className="max-h-64 w-full object-contain opacity-80"
        />
      </div>
    );
  if (type === "break")
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/[0.03] p-5">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-destructive/80">
          Supply pressure / utility drift
        </div>
        <MiniChart
          testId="break-visual"
          series={[
            {
              label: "Supply",
              color: "var(--destructive)",
              data: ILLUSTRATIVE_BREAK_SERIES.circulatingSupply,
            },
            {
              label: "Utility",
              color: "var(--primary)",
              data: ILLUSTRATIVE_BREAK_SERIES.demand,
              dashed: true,
            },
          ]}
        />
      </div>
    );
  if (type === "model")
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-5">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/80">
          Utility / removal correlation
        </div>
        <MiniChart
          testId="model-visual"
          series={[
            {
              label: "Utility",
              color: "var(--primary)",
              data: ILLUSTRATIVE_DIGI_MODEL_SERIES.utilityConsumption,
            },
            {
              label: "DIGI removed",
              color: "var(--chart-2)",
              data: ILLUSTRATIVE_DIGI_MODEL_SERIES.tokensRemoved,
              dashed: true,
            },
          ]}
        />
      </div>
    );
  return <RoadmapVisual />;
}

export function AgentNomicsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const touchStart = useRef<number | null>(null);
  const slide = slides[currentIndex];
  const goTo = (index: number) => {
    setDirection(index >= currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  const nextSlide = () => goTo((currentIndex + 1) % slides.length);
  const prevSlide = () => goTo((currentIndex - 1 + slides.length) % slides.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur md:p-12"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 50) {
            if (delta < 0) nextSlide();
            else prevSlide();
          }
          touchStart.current = null;
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reducedMotion ? false : { opacity: 0, x: direction * 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: direction * -300 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease }}
            role="tabpanel"
            aria-live="polite"
            aria-label={`${slide.number} ${slide.title}`}
            className="grid min-h-[600px] grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14"
          >
            <div className="flex flex-col justify-center lg:col-span-3">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.1 }}
              >
                <div className="mb-4 font-mono text-sm text-primary">{slide.number}</div>
                <h3 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                  {slide.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                  {slide.description}
                </p>
              </motion.div>
              <div className="mt-8">
                <slide.body />
              </div>
            </div>
            <div className="flex items-center lg:col-span-2">
              <Visual type={slide.visual} />
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          aria-label="Previous agent-nomics slide"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-700 bg-slate-950/70 p-3 text-slate-300 transition-transform hover:scale-[1.02] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:block"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next agent-nomics slide"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-700 bg-slate-950/70 p-3 text-slate-300 transition-transform hover:scale-[1.02] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:block"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2"
          role="tablist"
          aria-label="Agent-nomics slides"
        >
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-label={`Go to ${item.title}`}
              aria-selected={currentIndex === index}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${currentIndex === index ? "w-8 bg-primary shadow-[0_0_16px_#90ee90]" : "w-2.5 bg-slate-700 opacity-40 grayscale hover:opacity-80"}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
        <span>Swipe to explore</span>
        <span className="hidden md:block">Arrow keys navigate</span>
      </div>
    </div>
  );
}
