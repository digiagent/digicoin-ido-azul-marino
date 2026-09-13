import { Reveal, Section } from "./Section";

const BOXES: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Ecosystem Activity",
    d: "Users engage with DigiPaga payments, Digimercados trading, and AI-powered services across the platform ecosystem.",
  },
  {
    n: "02",
    t: "AI Utility",
    d: "Using Digi-Agent's intelligence capabilities requires DIGI — connecting token consumption to actual ecosystem utility.",
  },
  {
    n: "03",
    t: "DIGI Required",
    d: "As users consume AI services and platform features, they must acquire DIGI to access advanced functionality.",
  },
  {
    n: "04",
    t: "DIGI Acquired",
    d: "Demand for DIGI increases as ecosystem activity grows, with tokens acquired through participation and utility.",
  },
  {
    n: "05",
    t: "Planned Removal",
    d: "A systematic burn mechanism (Incinerator) is designed to remove DIGI from circulation as the ecosystem scales.",
  },
];

export function WhyDigi() {
  return (
    <Section
      id="why-digi"
      index="10"
      eyebrow="Why DIGI"
      title={
        <>
          <span className="font-ubuntu font-bold">
            What <span className="text-primary">DIGI</span> is designed to{" "}
            <span className="text-primary">do.</span>
          </span>
        </>
      }
      lead="DIGI connects ecosystem activity to AI utility — creating a flow where consumption requires DIGI, which drives acquisition, with planned removal mechanisms ensuring long-term value."
    >
      <Reveal>
        <div
          data-testid="why-digi-boxes"
          className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3 lg:h-[400px]"
        >
          {BOXES.map((b) => (
            <div
              key={b.n}
              className="group relative flex flex-1 flex-col justify-between overflow-hidden bg-background p-8 transition-colors duration-500 ease-out hover:bg-card/60"
            >
              <span className="font-mono text-xs text-primary/70">{b.n}</span>
              <div>
                <h3 className="font-display text-2xl leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {b.t}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/90">{b.d}</p>
              </div>
              <span className="mt-6 block h-px w-8 bg-primary transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
