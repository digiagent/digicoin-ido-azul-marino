import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Reveal, Section } from "./Section";
import { CENTRALIZED, DECENTRALIZED, RUNWAY, TEAM } from "./data";
import phone from "@/assets/digi_mockup_mobile.png.asset.json";
import burner from "@/assets/digi_burner_supply.png.asset.json";
import agentCoin from "@/assets/digi-agent-coin.png.asset.json";
import rocket from "@/assets/digim-rocket.png.asset.json";

export function Summary() {
  return (
    <Section
      id="summary"
      index="02"
      eyebrow="Summary"
      title="An investment in the settlement layer for agent commerce"
      lead="DigiAgent operates two production surfaces: a consumer payments wallet in Latin America and an autonomous marketplace where AI agents transact on behalf of merchants. DIGI is the settlement asset for both."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3">
        {[
          ["$13.85M", "Committed across four rounds", "Fully attested on-chain, no side letters."],
          ["412K", "Monthly settled transactions", "Live volume across DigiPaga corridors."],
          ["1,900+", "Merchants onboarded", "Colombia, Mexico, Peru and Argentina."],
        ].map(([v, k, d]) => (
          <Reveal key={k} className="bg-background p-8">
            <div className="font-display text-4xl tracking-tight text-primary">{v}</div>
            <div className="mt-3 text-sm font-medium">{k}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Platforms() {
  return (
    <Section
      id="platforms"
      index="03"
      eyebrow="Two platforms"
      title="Two platforms. One cryptocurrency."
      lead="DigiPaga serves people. DigiMercados serves machines. Both clear in DIGI, so liquidity compounds instead of fragmenting."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {[
          {
            name: "DigiPaga",
            kind: "Consumer wallet",
            copy: "Stablecoin cards, remittances and merchant checkout with instant local settlement.",
            points: ["Apple / Google Wallet", "Sub-second settlement", "Fiat off-ramp in 4 markets"],
            img: phone.url,
          },
          {
            name: "DigiMercados",
            kind: "Agent marketplace",
            copy: "Autonomous agents source, negotiate and settle inventory contracts without human intervention.",
            points: ["Agent identity & escrow", "Programmable fee routing", "Machine-readable orderbook"],
            img: agentCoin.url,
          },
        ].map((p) => (
          <Reveal key={p.name}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-card/40 transition-colors hover:border-primary/30">
              <div className="flex items-baseline justify-between px-8 pt-8">
                <h3 className="font-display text-3xl tracking-tight">{p.name}</h3>
                <span className="eyebrow">{p.kind}</span>
              </div>
              <p className="mt-4 px-8 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              <ul className="mt-6 space-y-2 px-8">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex h-64 items-end justify-center overflow-hidden px-8">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-full object-contain transition-transform duration-700 group-hover:-translate-y-2"
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
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
    <Section
      id="distribution"
      index="06"
      eyebrow="Distribution"
      title="Distribution details"
      lead="Circulating supply at TGE is 11.4%. Every unlock is enforced by contract, published in advance, and independently verifiable."
    >
      <div className="grid gap-10 md:grid-cols-3">
        {[
          ["TGE circulating", "114,000,000 DIGI", "11.4% of total supply"],
          ["Longest lock", "48 months", "Ecosystem emission curve"],
          ["Cliffed supply", "39%", "Team, advisors and treasury"],
        ].map(([k, v, d], idx) => (
          <Reveal key={k} delay={idx * 0.08}>
            <div className="border-t border-primary/30 pt-6">
              <div className="eyebrow">{k}</div>
              <div className="mt-3 font-display text-3xl tracking-tight">{v}</div>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function AgentNomics() {
  return (
    <Section
      id="agentnomics"
      index="07"
      eyebrow="Agent-nomics"
      title="Defeating inflation with active AI tokenomics"
      lead="Meet the Digi Incinerator — the first autonomous agent designed to help equalize circulating supply as real utility expands across the DIGIM ecosystem."
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-hairline bg-card/40 p-8">
            <img
              src={burner.url}
              alt="Digimercados Incinerator burning DIGI supply"
              loading="lazy"
              className="mx-auto max-h-[420px] object-contain"
            />
          </div>
        </Reveal>
        <div className="flex max-w-[540px] flex-col gap-6 text-base leading-[1.7] text-muted-foreground">
          {[
            "Most token projects keep increasing circulating supply long after usability fades. DIGI is designed differently: it acts as a balancer for dynamic token circulation, responding to network activity across both centralized and decentralized environments.",
            "By programmatically removing supply based on real network usage, we establish a deflationary gravity that protects long-term holders and rewards genuine ecosystem participation.",
          ].map((p, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
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
    <Section
      id="team"
      index="10"
      eyebrow="Team"
      title="Operators from payments, protocol and applied AI"
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.05} className="bg-background p-8 transition-colors hover:bg-card/60">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full font-display text-lg text-primary-foreground"
              style={{ background: "var(--gradient-accent)" }}
            >
              {m.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="mt-6 font-display text-2xl tracking-tight">{m.name}</h3>
            <div className="mt-1 text-sm text-primary">{m.role}</div>
            <p className="mt-2 text-sm text-muted-foreground">{m.prev}</p>
          </Reveal>
        ))}
      </div>
    </Section>
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
