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
          <span className="font-ubuntu font-bold">The economy is learning to <span className="text-primary">act on its own.</span></span>
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
            <h3 className="mt-4 font-display text-2xl leading-snug tracking-tight text-foreground">{b.t}</h3>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">{b.d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Problem() {
  return null;
}

const PRODUCT_COLS: [string, string][] = [
  [
    "What it does",
    "DigiAgent connects economic activities into intelligent workflows — helping users and future autonomous agents discover, decide, and execute.",
  ],
  [
    "Who it serves",
    "People, businesses, and autonomous agents operating across Latin America and the Global South.",
  ],
  [
    "What is being built",
    "The intelligence SDK for the DigiPaga and Digimercados ecosystem — guided today, increasingly autonomous over time.",
  ],
];

export function Product() {
  return (
    <Section
      id="product"
      index="06"
      eyebrow="Digi-Agent"
      title={
        <>
          <span className="font-ubuntu font-bold">The Intelligence SDK of the <span className="text-primary">Digital Economy.</span></span>
        </>
      }
      lead="Digi-Agent is the intelligence SDK connecting financial and commercial activity across the DigiPaga / Digimercados ecosystem."
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
            <span className="eyebrow text-primary/70">07</span>
            <span className="eyebrow">Transformation</span>
          </div>
          <p className="mt-6 max-w-4xl font-ubuntu font-bold text-[clamp(1.9rem,4.6vw,3.4rem)] uppercase leading-[1.02] tracking-[-0.01em]">
            FROM DIGITAL PAYMENTS TO <span className="text-primary">AUTONOMOUS ECONOMIC ACTIVITY.</span>
          </p>
        </Reveal>
        <div className="mt-16 flex justify-center">
          <Reveal className="flex justify-center">
            <img
              src={phone.url}
              alt="DigiPaga app"
              loading="lazy"
              className="h-[440px] w-auto object-contain drop-shadow-2xl"
            />
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
      index="08"
      eyebrow="Early validation"
      title={
        <>
          <span className="font-ubuntu font-bold">Building with real <span className="text-primary">traction.</span></span>
        </>
      }
    >
      <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/90">
        {VALIDATION.map(([k, v], i) => (
          <Reveal key={k} delay={i * 0.06}>
            <div className="flex items-baseline gap-3">
              <span className="font-semibold text-primary">{k}</span>
              <span className="text-muted-foreground">{v}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
