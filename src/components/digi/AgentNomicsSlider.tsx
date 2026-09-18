import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, ChevronLeft, ChevronRight, Flame, Gamepad2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ILLUSTRATIVE_BREAK_SERIES, ILLUSTRATIVE_DIGI_MODEL_SERIES } from "./data";
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

function MiniChart({
  series,
  testId,
  xLabels,
}: {
  series: Series[];
  testId: string;
  xLabels?: string[];
}) {
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
      {xLabels ? (
        <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-widest text-foreground/45">
          {xLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}
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
    ILLUSTRATIVE DATA — REAL TOKENOMICS DATA PENDING
  </span>
);

function IncineratorSlide() {
  return (
    <div className={STANDARD_SLIDE}>
      <div className={`${STANDARD_VISUAL} flex items-center justify-center`}>
        <img
          src={burner.url}
          alt="DIGI incinerator robot burning supply"
          loading="lazy"
          className="h-auto max-h-155 w-full object-contain"
        />
      </div>
      <div className="group min-w-0 flex-1 space-y-8 transition-transform duration-300 hover:-translate-y-0.5">
        <div>
          <div className="eyebrow text-primary">01 // THE INCINERATOR</div>
          <h3 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-white lg:text-5xl">
            Defeating Inflation with Active AI Tokenomics.
          </h3>
        </div>
        <div className="space-y-8 text-base leading-relaxed text-slate-300 lg:text-lg">
          <div>
            <h4 className="mb-3 text-lg font-bold text-primary transition-colors duration-300 group-hover:text-primary/90 lg:text-xl">
              The Supply Balancer
            </h4>
            <p>
              The Incinerator holds 15% of the total supply, with the potential to reach 30% through
              governance voting or team burns to offset vesting cliffs. Before any new supply enters
              circulation, the Incinerator autonomously burns an equivalent amount. This creates a
              deflationary gravity that prevents market dilution and stabilizes the token&apos;s
              value.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold text-primary transition-colors duration-300 group-hover:text-primary/90 lg:text-xl">
              Real-Utility Burns (AI &amp; Gaming)
            </h4>
            <p>
              Every user interaction drives permanent burns. When users purchase DIGI AI MCP
              credits, they effectively execute an OTC-style buy from the Incinerator Treasury; the
              project receives stablecoins, and the corresponding DIGI is permanently retired.
              Similarly, accessing the Digi Digital World Game requires buying DIGI from the
              orderbook, which the Incinerator immediately burns.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold text-primary transition-colors duration-300 group-hover:text-primary/90 lg:text-xl">
              Deflationary by Design
            </h4>
            <p>
              Most token projects keep increasing circulating supply long after usability fades.
              DIGI is designed differently: it acts as a balancer for dynamic token circulation,
              responding to network activity across both centralized and decentralized environments.
              By programmatically removing supply based on real network usage, we establish a
              deflationary gravity that protects long-term holders.
            </p>
          </div>
        </div>
        <Badge />
      </div>
    </div>
  );
}

const BREAK_YEARS = [
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
];

const MODEL_TEXT_COLUMN =
  "group min-w-0 flex-1 space-y-8 transition-transform duration-300 hover:-translate-y-0.5";
const MODEL_TEXT = "space-y-8 text-base leading-relaxed text-slate-300 lg:text-lg";
const MODEL_HEADING =
  "mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-white lg:text-5xl";
const MODEL_SECTION_TITLE =
  "mb-3 text-lg font-bold text-primary transition-colors duration-300 group-hover:text-primary/90 lg:text-xl";

const STANDARD_SLIDE = "flex h-full flex-col gap-10 md:flex-row md:items-center md:gap-12";
const STANDARD_VISUAL = "w-full shrink-0 md:w-[44%]";

function EcosystemBurnDiagram() {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5"
      data-testid="ecosystem-burn-diagram"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex w-[31%] flex-col items-center gap-3 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary">
            <Gamepad2 className="h-9 w-9" aria-hidden />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/75">
            Gaming Burns
          </span>
        </div>
        <span className="text-xl text-primary/70" aria-hidden>
          →
        </span>
        <div className="flex w-[31%] flex-col items-center gap-3 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary">
            <Bot className="h-9 w-9" aria-hidden />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/75">
            AI Credits Burns
          </span>
        </div>
        <span className="text-xl text-primary/70" aria-hidden>
          →
        </span>
        <div className="flex w-[31%] flex-col items-center gap-3 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary">
            <Flame className="h-9 w-9" aria-hidden />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/75">
            Permanent Supply Reduction
          </span>
        </div>
      </div>
      <div className="w-full border-t border-dashed border-primary/30 pt-5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-primary/70">
        Users → Buy DIGI → Incinerator Treasury → DIGI Burned
      </div>
    </div>
  );
}

function BreakSlide() {
  const s = ILLUSTRATIVE_BREAK_SERIES;
  return (
    <div className={STANDARD_SLIDE}>
      <div className={STANDARD_VISUAL}>
        <MiniChart
          testId="break-chart"
          xLabels={BREAK_YEARS}
          series={[
            { label: "Circulating Supply", color: "#ef4444", data: s.circulatingSupply },
            { label: "Market Demand", color: "#60a5fa", data: s.demand },
            { label: "Trading Volume", color: "#f97316", data: s.tradingVolume },
            { label: "Ecosystem Utility", color: "#84cc16", data: s.adoption },
          ]}
        />
        <a
          href="#faq"
          className="mt-6 inline-flex font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Read more{" "}
          <span aria-hidden className="ml-2 text-base leading-none">
            →
          </span>
        </a>
        <div className="mt-6">
          <Badge />
        </div>
      </div>
      <div className={MODEL_TEXT_COLUMN}>
        <div>
          <div className="eyebrow text-primary">02 // WHY TOKENOMICS FAIL</div>
          <h3 className={MODEL_HEADING}>Trapped in the 4-Year Cycle.</h3>
        </div>
        <div className={MODEL_TEXT}>
          <div>
            <h4 className={MODEL_SECTION_TITLE}>The Problem</h4>
            <p>
              Most tokenomics follow a linear supply unlock schedule (vesting, cliffs, team
              allocations) while utility, demand, and trading volume decay cyclically. This creates
              a fatal divergence: maximum dilution coincides with minimum market demand.
            </p>
          </div>
          <div>
            <h4 className={MODEL_SECTION_TITLE}>The Solution</h4>
            <p>
              The Digi Incinerator neutralizes this by burning supply in real-time, counterbalancing
              vesting schedules and protecting against the 4-year cycle collapse that destroys 99%
              of token projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DigiModelSlide() {
  const years = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];
  return (
    <div className={STANDARD_SLIDE}>
      <div className={STANDARD_VISUAL}>
        <MiniChart
          testId="digi-model-chart"
          xLabels={years}
          series={[
            {
              label: "Scheduled Supply Unlocks",
              color: "#ef4444",
              data: [20, 20, 38, 38, 56, 56, 74, 74, 92, 92, 100],
            },
            {
              label: "Incinerator Burns",
              color: "#84cc16",
              data: [20, 8, 30, 8, 48, 8, 66, 8, 84, 8, 8],
            },
            {
              label: "Net Circulating Supply",
              color: "#60a5fa",
              data: [42, 41, 41, 40, 40, 39, 39, 38, 38, 37, 36],
            },
          ]}
        />
        <div className="mt-6">
          <Badge />
        </div>
      </div>
      <div className={MODEL_TEXT_COLUMN}>
        <div>
          <div className="eyebrow text-primary">03 // THE DIGI MODEL</div>
          <h3 className={MODEL_HEADING}>Proactive Supply Defense.</h3>
        </div>
        <div className={MODEL_TEXT}>
          <p>
            The Incinerator operates preemptively. Before any scheduled unlock, vesting event, or
            supply increase, it burns an equivalent amount—neutralizing dilution before it impacts
            the market.
          </p>
          <p>
            While other projects experience supply shocks, DIGI&apos;s circulating supply remains
            stable or contracts. This predictive burn mechanism ensures the token economy is always
            moving toward scarcity, never inflation.
          </p>
        </div>
      </div>
    </div>
  );
}

function EcosystemSlide() {
  return (
    <div className={STANDARD_SLIDE}>
      <div className={`${STANDARD_VISUAL} flex items-center justify-center`}>
        <EcosystemBurnDiagram />
      </div>
      <div className={MODEL_TEXT_COLUMN}>
        <div>
          <div className="eyebrow text-primary">04 // LONG-TERM DEFLATIONARY SUPPLY</div>
          <h3 className={MODEL_HEADING}>Deflationary Through Gaming &amp; AI Usage.</h3>
        </div>
        <div className={MODEL_TEXT}>
          <p>
            The Digi Economy World transforms DIGI into an arcade token. Users must purchase DIGI
            from the orderbook to explore virtual worlds, hunt treasures (real gold, stablecoins,
            Bitcoin), and access premium gameplay. Every entry fee burns DIGI immediately—turning
            entertainment into permanent supply reduction.
          </p>
          <p>
            Businesses and users paying for DigiPaga AI automation, premium invoicing, reduced fees,
            or advanced payment tooling purchase DIGI directly from the Incinerator Treasury. These
            AI credits aren&apos;t just consumed—they permanently burn supply. Every premium feature
            activation contracts the total supply.
          </p>
          <p>
            As ecosystem adoption grows, so does the burn rate. Gaming, AI credits, marketplace
            access, and governance participation all feed the incinerator. This creates a
            deflationary flywheel: more utility → more burns → increased scarcity → higher value →
            more utility.
          </p>
        </div>
        <Badge />
      </div>
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
    title: "Long-Term Deflationary Supply",
    description: "Gaming and AI utility feed the permanent burn loop.",
    body: EcosystemSlide,
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
        className="relative h-300 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur md:h-190 md:p-12"
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
            className="scrollbar-none h-full overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden"
          >
            <slide.body />
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
