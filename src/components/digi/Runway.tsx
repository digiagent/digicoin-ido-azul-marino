import { Reveal, Section } from "./Section";
import { RUNWAY } from "./data";

const FLOW = [
  "Capital",
  "Runway",
  "Product",
  "Growth",
  "Ecosystem",
  "Operations / Compliance",
  "Next milestones",
];

const MILESTONES = [
  "Product development",
  "Product launches",
  "Ecosystem growth",
  "User adoption",
  "Pre-registration",
  "TGE — date TBA",
];

const MAX = Math.max(...RUNWAY.map((r) => r.value));

export function Runway() {
  return (
    <Section
      id="runway"
      index="17"
      eyebrow="Runway / Use of proceeds"
      title={
        <>
          <span className="font-ubuntu font-bold">
            Where working <span className="text-primary">capital</span>{" "}
            <span className="text-primary">goes.</span>
          </span>
        </>
      }
      lead="Total DigiAgent Token Sale targets a $3,100,000 raise. Proceeds fund the path from capital to milestones — runway length depends on the final amount raised (TBA)."
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-3" data-testid="runway-flow">
          {FLOW.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <span
                className={`cursor-default rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 hover:border-primary ${
                  i === 0 || i === FLOW.length - 1
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
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="eyebrow">Allocation of proceeds</div>
          <div className="mt-6 flex flex-col gap-4" data-testid="runway-bars">
            {RUNWAY.map((r) => (
              <div key={r.name} className="group cursor-default">
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] text-foreground/85 transition-colors group-hover:text-foreground">
                    {r.name}
                  </span>
                  <span className="font-mono text-xs text-primary">{r.value}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary/70 transition-[background-color] duration-300 group-hover:bg-primary"
                    style={{ width: `${(r.value / MAX) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-hairline bg-card/40 p-7">
            <div className="eyebrow">Next milestones</div>
            <ul
              className="mt-6 flex flex-col divide-y divide-hairline"
              data-testid="runway-milestones"
            >
              {MILESTONES.map((m) => (
                <li
                  key={m}
                  className="group flex items-center gap-4 py-3.5 text-[15px] text-foreground/85"
                >
                  <span className="select-none text-xs leading-none text-primary">◆</span>
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
              Runway duration: TBA — set by final raise
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
