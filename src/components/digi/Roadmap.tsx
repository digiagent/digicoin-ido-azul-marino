import { Reveal, Section } from "./Section";

const PHASES: { q: string; title: string; d: string }[] = [
  { q: "Q2–Q3 2026", title: "Bridge Round", d: "Early-stage round for angel investors. Registration of interest open." },
  { q: "Q1–Q2 2027", title: "Private / Pre-Seed Sale", d: "Pre-Seed round at $0.005 per DIGI · $5M target FDV." },
  { q: "Q2 2027", title: "Pre-Sale", d: "Pre-TGE sale at partner launchpads and communities · $0.01 per DIGI." },
  { q: "Q3 2027", title: "Public Sale · Listing", d: "Multi-launchpad public sale and listing & market making. TGE date: TBA." },
];

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      index="18"
      eyebrow="Roadmap"
      title={
        <>
          <span className="font-ubuntu font-bold">The path to <span className="text-primary">TGE.</span></span>
        </>
      }
      lead="Target schedule — subject to change. TGE date, chain, and contract are TBA."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-4" data-testid="roadmap-grid">
        {PHASES.map((p, i) => (
          <Reveal
            key={p.q}
            delay={i * 0.06}
            className="group bg-background p-7 transition-colors duration-300 hover:bg-card/60"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80">
              {p.q}
            </div>
            <h3 className="mt-4 font-display text-xl leading-snug tracking-tight md:text-2xl">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            <span className="mt-6 block h-px w-8 bg-primary transition-all duration-500 group-hover:w-16" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
