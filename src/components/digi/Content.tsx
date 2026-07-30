import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Reveal, Section } from "./Section";
import {
  CENTRALIZED,
  DECENTRALIZED,
  DISTRIBUTION_DETAILS,
  PLATFORM_FEATURES,
  RUNWAY,
  TEAM,
} from "./data";
import phone from "@/assets/digi_mockup_mobile.png.asset.json";
import burner from "@/assets/digi_burner_supply.png.asset.json";
import centerCoin from "@/assets/digi_coin_green_center.png.asset.json";
import rocket from "@/assets/digim-rocket.png.asset.json";

export function Summary() {
  return (
    <section id="summary" className="hairline-t scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.85fr_1.15fr] md:py-32">
        <Reveal>
          <span className="eyebrow">§ 01 Project details</span>
          <h2 className="mt-6 font-display text-[clamp(3rem,7vw,5rem)] leading-[0.95] tracking-tight">
            Summary<span className="text-primary">.</span>
          </h2>
        </Reveal>
        <div className="flex flex-col gap-6 text-[17px] leading-[1.65] text-muted-foreground md:text-lg">
          {[
            ["DigiPaga", " is an Agentic Stablecoin Orchestration Engine designed to power payments across Latin America and the Global South."],
            ["Digimercados", " is a Hybrid Smart Wallet and Exchange that brings advanced trading tools, structured access, and digital market participation to the same regions."],
            ["Digi Agent", " serves as the AI-guided avatar layer across both platforms, helping users navigate payments, stablecoins, wallets, and market tools with greater clarity."],
            ["DIGIM", " unlocks premium functionality across the ecosystem and operates in both centralized and decentralized environments, making advanced financial infrastructure more accessible to users regardless of technical background."],
          ].map(([b, rest], i) => (
            <Reveal key={b} delay={i * 0.06}>
              <p>
                <strong className="font-semibold text-foreground">{b}</strong>
                {rest}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <div className="hairline-t mt-6 flex gap-3 overflow-x-auto whitespace-nowrap pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {["Payments", "Smart Exchange", "Stablecoins", "AI Agent", "Global South", "Hybrid Finance"].map((t) => (
                <span
                  key={t}
                  className="shrink-0 cursor-default rounded-full border border-primary/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 transition-colors duration-300 hover:border-primary hover:text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Platforms() {
  return (
    <section id="platforms" className="hairline-t scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <span className="eyebrow">§ 02 Product stack</span>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] tracking-tight">
            Two platforms.
            <br />
            <span className="text-primary">One cryptocurrency.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr_1fr]">
          <Reveal className="order-2 flex justify-center lg:order-1">
            <img
              src={phone.url}
              alt="Digimercados app"
              loading="lazy"
              className="h-[420px] w-auto object-contain [transform:rotate(-8deg)] drop-shadow-2xl"
            />
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6">
              <ul className="flex flex-col gap-3 text-right text-sm text-muted-foreground md:text-[15px]">
                <li className="font-medium text-primary">Digimercados</li>
                {PLATFORM_FEATURES.digimercados.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="relative aspect-square w-[130px] shrink-0 md:w-[190px]">
                <div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ background: "radial-gradient(circle, oklch(0.6 0.16 140 / 30%), transparent 70%)" }}
                  aria-hidden
                />
                <div className="absolute -inset-4 rounded-full border border-primary/10" aria-hidden />
                <div className="absolute -inset-9 rounded-full border border-hairline" aria-hidden />
                <img
                  src={centerCoin.url}
                  alt="DIGI coin"
                  loading="lazy"
                  className="relative h-full w-full object-contain"
                />
              </div>
              <ul className="flex flex-col gap-3 text-left text-sm text-muted-foreground md:text-[15px]">
                <li className="font-medium text-primary">DigiPaga</li>
                {PLATFORM_FEATURES.digipaga.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="order-3 flex justify-center">
            <img
              src={phone.url}
              alt="DigiPaga app"
              loading="lazy"
              className="h-[420px] w-auto object-contain [transform:rotate(8deg)] drop-shadow-2xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function DualUtility() {
  return (
    <section id="utility" className="hairline-t relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-end gap-8 px-6 pb-16 pt-28 lg:pb-24">
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
          <span className="eyebrow">§ 04 · Utility design</span>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] tracking-tight">
            <span className="text-primary">Dual utility</span>
            <br />
            across environments.
          </h2>
        </div>
        <div className="col-span-12 max-w-[440px] text-[15px] leading-[1.7] text-muted-foreground lg:col-span-5 lg:col-start-8">
          <strong className="font-semibold text-foreground">Nowadays</strong>, it&apos;s not enough for a
          cryptocurrency to rely on a single platform.{" "}
          <strong className="font-semibold text-foreground">DIGI</strong> unlocks value across
          centralized and decentralized environments, powering two mobile apps with one shared token
          supply — network effects compounding with every user, every platform.
        </div>
      </div>

      <div className="relative grid min-h-[520px] grid-cols-1 lg:grid-cols-2">
        {[
          { title: "Centralized", items: CENTRALIZED, side: "left" as const },
          { title: "Decentralized", items: DECENTRALIZED, side: "right" as const },
        ].map((panel) => (
          <Reveal
            key={panel.title}
            className={`relative overflow-hidden border-hairline px-6 py-16 md:px-14 lg:py-24 ${
              panel.side === "left"
                ? "border-b bg-card/40 lg:border-b-0 lg:border-r"
                : "bg-surface"
            }`}
          >
            {panel.side === "left" && (
              <img
                src={rocket.url}
                alt=""
                aria-hidden
                loading="lazy"
                className="pointer-events-none absolute -left-16 top-1/2 z-0 w-[180px] -translate-y-1/2 opacity-30 md:w-[240px] md:opacity-60 lg:w-[300px]"
              />
            )}
            <div
              className={`relative z-10 max-w-[420px] ${
                panel.side === "left" ? "ml-auto lg:pr-10" : "mr-auto lg:pl-14"
              }`}
            >
              <span className="mb-10 block font-display text-3xl tracking-tight">{panel.title}</span>
              <ul className="flex flex-col divide-y divide-hairline">
                {panel.items.map((c) => (
                  <li
                    key={c}
                    className="group flex cursor-default items-center justify-between py-4 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="flex items-center gap-4">
                      <span className="select-none text-xs leading-none text-primary">◆</span>
                      <span className="text-base md:text-[17px]">{c}</span>
                    </span>
                    <span
                      className={`h-px w-6 scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100 ${
                        panel.side === "left" ? "origin-left" : "origin-right"
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Distribution() {
  return (
    <section id="distribution" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal>
          <div className="rounded-[28px] border border-hairline bg-card/30 px-6 py-12 md:px-14 md:py-16">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">Distribution Details</h2>
            <dl className="mt-10 divide-y divide-hairline">
              {DISTRIBUTION_DETAILS.map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-2 py-6 md:grid-cols-[280px_1fr] md:gap-10"
                >
                  <dt className="text-[15px] text-primary md:text-base">{k}</dt>
                  <dd className="text-[15px] leading-relaxed text-muted-foreground md:text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AgentNomics() {
  return (
    <section id="agentnomics" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <span className="eyebrow">§ 06 AI environments</span>
        </Reveal>
        <div className="mt-12 grid items-start gap-14 md:grid-cols-2">
          <Reveal>
            <div className="flex items-center justify-center overflow-hidden rounded-[28px] border border-hairline bg-card/30 p-6">
              <img
                src={burner.url}
                alt="Digi Incinerator burning DIGI supply"
                loading="lazy"
                className="mx-auto max-h-[440px] object-contain"
              />
            </div>
          </Reveal>
          <div className="flex max-w-[560px] flex-col gap-6">
            <Reveal>
              <p className="font-display text-3xl italic tracking-tight text-primary">Agent-nomics</p>
              <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight">
                Defeating Inflation with Active AI Tokenomics.
              </h2>
            </Reveal>
            {[
              "Meet the Digi Incinerator, the first autonomous agent designed to help equalize circulating supply as real utility expands across the DIGIM ecosystem.",
              "Most token projects keep increasing circulating supply long after usability fades. DIGI is designed differently: it acts as a balancer for dynamic token circulation, responding to network activity across both centralized and decentralized environments.",
              "By programmatically removing supply based on real network usage, we establish a deflationary gravity that protects long-term holders and rewards genuine ecosystem participation.",
            ].map((p, idx) => (
              <Reveal key={idx} delay={idx * 0.06}>
                <p className="text-[15px] leading-[1.75] text-muted-foreground md:text-base">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Runway() {
  return (
    <Section
      id="runway"
      index="09"
      eyebrow="Runway"
      title="Runway breakdown"
      lead="Proceeds fund 36 months of operation with liquidity reserved separately from opex."
    >
      <Reveal>
        <div className="rounded-2xl border border-hairline bg-card/40 p-6 md:p-10">
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RUNWAY} layout="vertical" margin={{ left: 8, right: 24 }}>
                <XAxis type="number" hide domain={[0, 40]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  width={130}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 13 }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={22} isAnimationActive={false}>
                  {RUNWAY.map((r, i) => (
                    <Cell key={r.name} fill={`var(--chart-${i + 1})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="hairline-t mt-6 grid gap-6 pt-6 sm:grid-cols-3">
            {[
              ["Runway", "36 months"],
              ["Monthly burn", "$385K"],
              ["Liquidity ring-fenced", "$3.0M"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="eyebrow">{k}</div>
                <div className="mt-2 font-mono text-lg">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Team() {
  return (
    <section id="team" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <span className="eyebrow">§ 09 Team</span>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-tight">
            Team<span className="text-primary">.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 0.05}
              className="bg-background p-7 transition-colors hover:bg-card/60"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-medium text-primary">
                  {m.name[0]}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold">{m.name}</h3>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80">
                    {m.role}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.prev}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="hairline-t grain relative">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-3xl tracking-tight">DigiAgent</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The settlement asset for human and machine commerce. Bridge Sale open until listing.
            </p>
          </div>
          {[
            ["Protocol", ["Whitepaper", "Audits", "Contracts", "Governance"]],
            ["Company", ["About", "Careers", "Press", "Contact"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <div className="eyebrow">{title as string}</div>
              <ul className="mt-4 space-y-2.5">
                {(links as string[]).map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="hairline-t mt-16 flex flex-col gap-3 pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 DigiAgent Labs. All rights reserved.</p>
          <p className="max-w-xl">
            Nothing on this page constitutes an offer of securities. Token sale participation is
            restricted in certain jurisdictions.
          </p>
        </div>
      </div>
    </footer>
  );
}
