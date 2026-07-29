import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal, Section } from "./Section";
import { ROUNDS } from "./data";

export function SaleDetails() {
  const [i, setI] = useState(0);
  const round = ROUNDS[i];
  const reduced = useReducedMotion();

  return (
    <Section
      id="sale"
      index="08"
      eyebrow="Sale details"
      title="Four rounds, one price ladder"
      lead="Every round is on-chain, vested, and independently attested. The Bridge Sale is the last entry before listing."
    >
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-hairline bg-card/40 shadow-[var(--shadow-deep)]">
          <div className="flex overflow-x-auto border-b border-hairline">
            {ROUNDS.map((r, idx) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setI(idx)}
                className={`relative shrink-0 px-6 py-5 text-left transition-colors md:flex-1 ${
                  idx === i ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                <span className="eyebrow block">0{idx + 1}</span>
                <span className="mt-1 block text-base font-medium">{r.name}</span>
                {idx === i && (
                  <motion.span
                    layoutId="round-underline"
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{ background: "var(--gradient-accent)" }}
                    transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={round.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-12"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
                    round.progress < 100
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {round.status}
                </span>
                <p className="text-sm text-muted-foreground">{round.note}</p>
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Token price", round.price],
                  ["Round raise", round.raise],
                  ["Allocation", round.allocation],
                  ["Implied FDV", round.fdv],
                  ["Minimum ticket", round.min],
                  ["Unlock schedule", round.lockup],
                ].map(([k, v]) => (
                  <div key={k} className="border-l border-hairline pl-5">
                    <div className="eyebrow">{k}</div>
                    <div className="mt-2 font-display text-2xl tracking-tight">{v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Round progress</span>
                  <span className="font-mono text-sm text-primary">{round.progress}%</span>
                </div>
                <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--gradient-accent)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${round.progress}%` }}
                    transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              {round.progress < 100 && (
                <a
                  href="#"
                  className="mt-10 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  Commit to {round.name}
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
