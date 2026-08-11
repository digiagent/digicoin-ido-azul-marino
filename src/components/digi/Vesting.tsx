import { useState } from "react";
import { Reveal, Section } from "./Section";
import { TOKENOMICS } from "./data";

const MARKERS = [
  { label: "TGE", month: 0 },
  { label: "Q1", month: 3 },
  { label: "Q2", month: 6 },
  { label: "Q3", month: 9 },
  { label: "Q4", month: 12 },
  { label: "Year 2", month: 24 },
  { label: "Year 3", month: 36 },
];
const MAX_MONTH = 36;

type Row = {
  key: string;
  label: string;
  color: string;
  tokens: string;
  tgePct: string;
  cliffM: number;
  vestM: number;
  special?: string;
};

const ROWS: Row[] = TOKENOMICS.map((s) => ({
  key: s.key,
  label: s.label,
  color: s.color,
  tokens: s.tokens,
  tgePct: s.tge,
  cliffM: parseInt(s.cliff, 10) || 0,
  vestM: parseInt(s.vesting, 10) || 0,
  special: s.key === "dao" ? "Unlocked by community vote — timing TBA" : undefined,
}));

function fullyUnlocked(r: Row): string {
  if (r.special) return "TBA (community vote)";
  const end = r.cliffM + r.vestM;
  return end === 0 ? "At TGE" : `TGE + ${end} months`;
}

export function Vesting() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = ROWS.find((r) => r.key === selected) ?? null;

  return (
    <Section
      id="vesting"
      index="15"
      eyebrow="Vesting & unlocks"
      title={
        <>
          Unlocks, on a <span className="text-primary">timeline.</span>
        </>
      }
      lead="Hover or tap an allocation to see its TGE unlock, cliff, vesting period, and when it is fully unlocked. TGE date: TBA — all timings are relative to TGE."
    >
      <Reveal>
        <div className="overflow-x-auto rounded-xl border border-hairline" data-testid="vesting-timeline">
          <div className="min-w-[760px] p-6 md:p-8">
            <div className="relative ml-[220px]">
              <div className="relative h-6">
                {MARKERS.map((m) => (
                  <span
                    key={m.label}
                    className="absolute -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/60"
                    style={{ left: `${(m.month / MAX_MONTH) * 100}%` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-6 bottom-0">
                {MARKERS.map((m) => (
                  <span
                    key={m.label}
                    className="absolute top-0 h-full w-px bg-hairline"
                    style={{ left: `${(m.month / MAX_MONTH) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 flex flex-col">
              {ROWS.map((r) => {
                const active = selected === r.key;
                const start = (Math.min(r.cliffM, MAX_MONTH) / MAX_MONTH) * 100;
                const end = Math.min(r.cliffM + r.vestM, MAX_MONTH);
                const width = Math.max(((end - Math.min(r.cliffM, MAX_MONTH)) / MAX_MONTH) * 100, 0);
                const overflows = r.cliffM + r.vestM > MAX_MONTH;
                return (
                  <button
                    key={r.key}
                    type="button"
                    data-testid={`vesting-row-${r.key}`}
                    onMouseEnter={() => setSelected(r.key)}
                    onFocus={() => setSelected(r.key)}
                    onClick={() => setSelected(active ? null : r.key)}
                    className="group grid grid-cols-[220px_1fr] items-center gap-0 rounded-md py-2.5 text-left transition-colors"
                    style={{ background: active ? "var(--surface)" : "transparent" }}
                  >
                    <span className="flex items-center gap-3 pr-4">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] transition-transform"
                        style={{ background: r.color, transform: active ? "scale(1.5)" : "scale(1)" }}
                      />
                      <span className="truncate text-sm text-foreground">{r.label}</span>
                    </span>
                    <span className="relative block h-3">
                      {r.special ? (
                        <span className="absolute inset-y-0 left-0 flex items-center font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/40">
                          By community vote · TBA
                        </span>
                      ) : (
                        <>
                          {r.tgePct !== "0%" && (
                            <span
                              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background"
                              style={{ background: r.color, left: "0%" }}
                              title={`${r.tgePct} at TGE`}
                            />
                          )}
                          {width > 0 ? (
                            <span
                              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-opacity"
                              style={{
                                left: `${start}%`,
                                width: `${width}%`,
                                background: r.color,
                                opacity: active ? 1 : 0.55,
                              }}
                            />
                          ) : (
                            r.cliffM > 0 && (
                              <span
                                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-background"
                                style={{ background: r.color, left: `${start}%` }}
                                title={`Full unlock at TGE + ${r.cliffM} mo`}
                              />
                            )
                          )}
                          {overflows && (
                            <span
                              className="absolute top-1/2 -translate-y-1/2 font-mono text-[10px]"
                              style={{ left: "calc(100% + 4px)", color: r.color }}
                            >
                              →
                            </span>
                          )}
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          className="mt-5 grid min-h-[92px] gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-5"
          data-testid="vesting-detail-panel"
        >
          {sel ? (
            (
              [
                ["Allocation", `${sel.tokens} DIGI`],
                ["TGE unlock", sel.tgePct],
                ["Cliff", sel.special ? "TBA" : `${sel.cliffM} months`],
                ["Vesting", sel.special ? "TBA" : `${sel.vestM} months`],
                ["Fully unlocked", fullyUnlocked(sel)],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="bg-background px-5 py-4">
                <div className="eyebrow">{k}</div>
                <div className="mt-2 font-mono text-sm text-foreground">{v}</div>
              </div>
            ))
          ) : (
            <div className="bg-background px-5 py-4 sm:col-span-5">
              <p className="text-sm text-muted-foreground">
                Hover or tap an allocation above to see its full unlock schedule.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
