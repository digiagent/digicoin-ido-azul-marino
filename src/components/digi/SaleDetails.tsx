import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal, Section } from "./Section";
import { ROUNDS } from "./data";

export function SaleDetails() {
  const [i, setI] = useState(0);
  const round = ROUNDS[i];
  const reduced = useReducedMotion();

  const metrics: [string, string][] = [
    ["Tokens", round.supplyAmount],
    ["Accepted", round.currencies],
    ["Network", round.network],
    ["Ticket size", `${round.minTicket} – ${round.maxTicket}`],
    ["Init market cap", round.initMarketCap],
    ["FDV", round.fdv],
    ["Cliff", round.cliff],
    ["Vesting", round.vesting],
  ];

  return (
    <Section
      id="sale"
      index="08"
      eyebrow="Sale details"
      title="Four rounds, one price ladder"
      lead="Comprehensive metrics and vesting schedules across all funding rounds. Every round is on-chain, vested and independently attested."
    >
      <Reveal>
        <div className="overflow-hidden rounded-[32px] border border-hairline bg-card/40 p-6 shadow-[var(--shadow-deep)] backdrop-blur-md md:p-10 lg:p-12">
          <nav
            role="tablist"
            aria-label="Sale rounds"
            className="mb-10 flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-hairline bg-background/60 p-1.5"
          >
            {ROUNDS.map((r, idx) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={`relative min-w-[130px] flex-1 rounded-xl px-4 py-3.5 text-center text-sm transition-colors ${
                  idx === i
                    ? "font-semibold text-primary-foreground"
                    : "font-medium text-muted-foreground hover:text-foreground"
                }`}
              >
                {idx === i && (
                  <motion.span
                    layoutId="round-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "var(--gradient-accent)" }}
                    transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative">{r.label}</span>
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={round.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="tabpanel"
            >
              <div className="flex flex-col justify-between gap-6 border-b border-hairline pb-8 lg:flex-row lg:items-end">
                <div>
                  <span className="inline-block rounded-full border border-hairline bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                    {round.supplyPct} supply
                  </span>
                  <h3 className="mt-4 font-display text-4xl leading-none tracking-tight lg:text-5xl">
                    {round.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-baseline gap-8 lg:gap-12">
                  <div className="flex flex-col">
                    <span className="eyebrow">Launch price</span>
                    <span className="mt-2 font-display text-3xl tracking-tight text-primary md:text-4xl">
                      {round.launchPrice}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="eyebrow">Round raise</span>
                    <span className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
                      {round.roundFunding}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 md:grid-cols-3 lg:grid-cols-4">
                {metrics.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-2">
                    <span className="eyebrow">{k}</span>
                    <span className="font-mono text-base">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
