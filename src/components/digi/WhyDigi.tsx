import { Reveal, Section } from "./Section";

const BOXES: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Intelligence layer",
    d: "Digi-Agent coordinates payments, wallets, and markets across DigiPaga and Digimercados — one layer of intelligence over the digital economy.",
  },
  {
    n: "02",
    t: "Consumption-linked",
    d: "Using the ecosystem's AI capabilities is designed to require DIGI — so token consumption tracks actual usage across the platforms.",
  },
  {
    n: "03",
    t: "Utility by design",
    d: "DIGI's role is functional: access, execution, and participation across centralized and decentralized environments.",
  },
];

export function WhyDigi() {
  return (
    <Section
      id="why-digi"
      index="11"
      eyebrow="Why DIGI"
      title={
        <>
          Designed to connect consumption with{" "}
          <span className="text-primary">actual utility.</span>
        </>
      }
      lead="Digi-Agent is building an intelligence layer for the digital economy. DIGI is designed to connect token consumption with actual ecosystem utility."
    >
      <Reveal>
        <div
          data-testid="why-digi-boxes"
          className="flex flex-col gap-px overflow-hidden rounded-xl border border-hairline bg-hairline lg:h-[320px] lg:flex-row"
        >
          {BOXES.map((b) => (
            <div
              key={b.n}
              className="group relative flex flex-1 flex-col justify-between overflow-hidden bg-background p-8 transition-[flex-grow,background-color] duration-500 ease-out hover:bg-card/60 lg:hover:flex-[2.2]"
            >
              <span className="font-mono text-xs text-primary/70">{b.n}</span>
              <div>
                <h3 className="font-display text-2xl leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {b.t}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground opacity-100 transition-all delay-100 duration-500 lg:max-w-sm lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  {b.d}
                </p>
              </div>
              <span className="mt-6 block h-px w-8 bg-primary transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
