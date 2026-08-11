import { Reveal, Section } from "./Section";
import agentCoin from "@/assets/digi-agent-coin-2.png.asset.json";
import phone from "@/assets/digi_mockup_mobile.png.asset.json";

const BEATS = [
  { n: "01", t: "AI is moving from generating information to executing actions.", d: "The next generation of software doesn't just answer — it acts." },
  { n: "02", t: "Digital commerce is becoming software-driven.", d: "Discovery, payment, and settlement are increasingly handled by code, not clicks." },
  { n: "03", t: "People and businesses need intelligent systems.", d: "Systems capable of discovering, deciding, and executing economic activity." },
];

export function WhyNow() {
  return (
    <Section
      id="why-now"
      index="05"
      eyebrow="Why now"
      title={
        <>
          The economy is learning to <span className="text-primary">act on its own.</span>
        </>
      }
    >
      <div
        className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3"
        data-testid="why-now-beats"
      >
        {BEATS.map((b, i) => (
          <Reveal
            key={b.n}
            delay={i * 0.08}
            className="bg-background p-8 transition-colors duration-300 hover:bg-card/60"
          >
            <span className="font-mono text-xs text-primary/70">{b.n}</span>
            <h3 className="mt-4 font-display text-2xl leading-snug tracking-tight">{b.t}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const CHAIN_STEPS = ["Discover", "Decide", "Pay", "Convert", "Send", "Settle", "Manage"];

export function Problem() {
  return (
    <Section
      id="problem"
      index="06"
      eyebrow="The problem"
      title={
        <>
          Seven tasks. <span className="text-primary">Seven different apps.</span>
        </>
      }
      lead="Completing a single economic task today means moving between multiple systems and applications — each with its own account, interface, and settlement logic."
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-3" data-testid="problem-chain">
          {CHAIN_STEPS.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <span className="cursor-default rounded-full border border-hairline px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors duration-300 hover:border-primary hover:text-primary">
                {s}
              </span>
              {i < CHAIN_STEPS.length - 1 && (
                <span aria-hidden className="text-primary/60">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="hairline-t mt-12 max-w-2xl pt-8 font-display text-2xl leading-snug tracking-tight md:text-3xl">
          Digi-Agent connects these activities into{" "}
          <span className="text-primary">intelligent workflows.</span>
        </p>
      </Reveal>
    </Section>
  );
}

const PRODUCT_COLS: [string, string][] = [
  [
    "What it does",
    "Coordinates discovery, decisions, and execution across payments, wallets, and markets — one intelligence layer instead of disconnected tools.",
  ],
  [
    "Who it serves",
    "People, businesses, and autonomous agents operating across Latin America and the Global South.",
  ],
  [
    "What is being built",
    "The agent layer for the DigiPaga and Digimercados ecosystem — guided today, increasingly autonomous over time.",
  ],
];

export function Product() {
  return (
    <Section
      id="product"
      index="07"
      eyebrow="Digi-Agent"
      title={
        <>
          The intelligence layer of the <span className="text-primary">Digi economy.</span>
        </>
      }
      lead="Digi-Agent is the intelligence layer connecting financial and commercial activity across the DigiPaga / Digimercados ecosystem."
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="flex justify-center">
          <img
            src={agentCoin.url}
            alt="Digi-Agent"
            loading="lazy"
            className="w-full max-w-[340px] object-contain drop-shadow-2xl"
          />
        </Reveal>
        <div className="flex flex-col divide-y divide-hairline" data-testid="product-columns">
          {PRODUCT_COLS.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.08} className="py-7 first:pt-0 last:pb-0">
              <div className="eyebrow">{k}</div>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg">
                {v}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const FLOW = ["Human", "Digi-Agent", "Discover", "Decide", "Execute", "Digital Economy"];

export function Transformation() {
  return (
    <section id="transformation" className="hairline-t scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="eyebrow text-primary/70">08</span>
            <span className="eyebrow">Transformation</span>
          </div>
          <p className="mt-6 max-w-4xl font-brand text-[clamp(1.9rem,4.6vw,3.4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.01em]">
            From digital payments to{" "}
            <span className="text-primary">autonomous economic activity.</span>
          </p>
        </Reveal>
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="flex justify-center">
            <img
              src={phone.url}
              alt="DigiPaga app"
              loading="lazy"
              className="h-[440px] w-auto object-contain drop-shadow-2xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-3" data-testid="transformation-flow">
              {FLOW.map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:border-primary ${
                      i === 1 || i === FLOW.length - 1
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-hairline text-foreground/80"
                    }`}
                  >
                    {s}
                  </span>
                  {i < FLOW.length - 1 && (
                    <span aria-hidden className="text-primary/60">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Today, Digi-Agent guides people through payments and markets. Over time, the same
              intelligence executes on their behalf — with every action settled inside the Digi
              economy.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const VALIDATION: [string, string][] = [
  ["1st Place", "Hackathon Winner"],
  ["Ecosystem Synergy", "Web3 Wallet Technology Collaboration"],
  ["Early Pilots", "Product Testing"],
  ["Building", "Multiple Products in Development"],
];

export function EarlyValidation() {
  return (
    <Section
      id="early-validation"
      index="09"
      eyebrow="Early validation"
      title={
        <>
          Signal, not <span className="text-primary">noise.</span>
        </>
      }
    >
      <div
        className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4"
        data-testid="early-validation-grid"
      >
        {VALIDATION.map(([k, v], i) => (
          <Reveal
            key={k}
            delay={i * 0.06}
            className="bg-background p-7 transition-colors duration-300 hover:bg-card/60"
          >
            <div className="font-display text-2xl tracking-tight text-primary">{k}</div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{v}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
