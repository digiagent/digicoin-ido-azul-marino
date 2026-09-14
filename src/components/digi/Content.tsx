import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { CircularText } from "./CircularText";
import { Reveal, Section } from "./Section";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "./scroll";
import { CENTRALIZED, DECENTRALIZED, PLATFORM_FEATURES } from "./data";
import phone from "@/assets/digi_mockup_mobile.png.asset.json";
import phoneMercados from "@/assets/digi_m_temp_mockup.png.asset.json";
import centerCoin from "@/assets/digi_coin_green_center.png.asset.json";
import rocket from "@/assets/digim-rocket.png.asset.json";

export function Summary() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".summary-card", ref.current);
        gsap.set(cards, { autoAlpha: 0, x: 56 });
        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="summary" ref={ref} className="hairline-t scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.85fr_1.15fr] md:items-start md:py-32">
        <div className="md:sticky md:top-28">
          <span className="eyebrow">§ 01 Project details</span>
          <h2 className="mt-6 font-ubuntu font-bold text-[clamp(3rem,7vw,5rem)] leading-[0.95] tracking-tight">
            Summary<span className="text-primary">.</span>
          </h2>
          <p className="mt-8 hidden max-w-[260px] text-sm leading-relaxed text-muted-foreground md:block">
            One ecosystem, four moving parts — each card is a chapter of the story.
          </p>
        </div>
        <div className="flex flex-col gap-5 text-[17px] leading-[1.65] text-muted-foreground md:text-lg">
          {[
            [
              "DigiPaga",
              " is an Agentic Stablecoin Orchestration Engine designed to power payments across Latin America and the Global South.",
            ],
            [
              "Digimercados",
              " is a Hybrid Smart Wallet and Exchange that brings advanced trading tools, structured access, and digital market participation to the same regions.",
            ],
            [
              "Digi Agent",
              " serves as the AI-guided avatar layer across both platforms, helping users navigate payments, stablecoins, wallets, and market tools with greater clarity.",
            ],
            [
              "DIGI ROBOTICS",
              " is an open marketplace for robotics education and training. Companies and builders can publish vetted video and voice tutorials, customized knowledge modules, and training content. A platform where anyone can educate robots to earn — democratizing access to robotics expertise.",
            ],
          ].map(([b, rest]) => (
            <div
              key={b}
              className="summary-card rounded-2xl border border-hairline bg-card/40 p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-[var(--shadow-lift)] md:p-7"
            >
              <p>
                <strong className="font-semibold text-foreground">{b}</strong>
                {rest}
              </p>
            </div>
          ))}
          <div className="summary-card hairline-t mt-2 flex gap-3 overflow-x-auto whitespace-nowrap pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["PAYMENTS", "EXCHANGE", "STABLECOINS", "AI AGENT", "ROBOTICS", "HYBRID FINANCE"].map(
              (t) => (
                <span
                  key={t}
                  className="shrink-0 cursor-default rounded-full border border-primary/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 transition-colors duration-300 hover:border-primary hover:text-foreground"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const COIN_RING =
  "ONE COIN · TWO PLATFORMS · DIGIPAGA · DIGIMERCADOS · ONE COIN · TWO PLATFORMS · DIGIPAGA · DIGIMERCADOS · ";

function CoinTilt() {
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 260, damping: 20 });
  const ry = useSpring(0, { stiffness: 260, damping: 20 });

  return (
    <motion.div
      data-testid="platforms-coin"
      className="group relative aspect-square w-[220px] shrink-0 md:w-[320px]"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={reduced ? undefined : { scale: 1.06 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set((0.5 - (e.clientY - r.top) / r.height) * 12);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <div
        className="absolute -inset-8 rounded-full opacity-70 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.16 140 / 40%), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 rounded-full border border-hairline" aria-hidden />
      <CircularText
        text={COIN_RING}
        radius={88}
        size={6.2}
        duration={40}
        reduced={reduced}
        className="text-primary/60"
      />
      <img
        src={centerCoin.url}
        alt="DIGI coin"
        loading="lazy"
        className="absolute inset-[16%] h-[68%] w-[68%] object-contain transition-[filter] duration-300 group-hover:drop-shadow-[0_0_36px_oklch(0.82_0.21_130_/_45%)]"
      />
    </motion.div>
  );
}

export function Platforms() {
  return (
    <section id="platforms" className="hairline-t scroll-mt-24 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 md:pt-32">
        <Reveal>
          <span className="eyebrow">§ 02 Product stack</span>
          <h2 className="mt-6 font-ubuntu font-bold text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] tracking-tight">
            One cryptocurrency.
            <br />
            <span className="text-primary">Multiple platforms.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 w-full max-w-[1600px] px-6 pb-24 md:pb-32">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.4fr_0.9fr]">
          <Reveal className="order-2 flex justify-center lg:order-1">
            <img
              src={phoneMercados.url}
              alt="Digimercados app"
              loading="lazy"
              className="h-[560px] w-auto object-contain drop-shadow-2xl md:h-[720px] xl:h-[840px]"
            />
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
              <ul className="flex flex-col gap-4 text-right text-sm text-foreground md:whitespace-nowrap md:text-[15px]">
                <li className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  Digimercados
                </li>
                {PLATFORM_FEATURES.digimercados.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <CoinTilt />
              <ul className="flex flex-col gap-4 text-left text-sm text-foreground md:whitespace-nowrap md:text-[15px]">
                <li className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  DigiPaga
                </li>
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
              className="h-[560px] w-auto object-contain drop-shadow-2xl md:h-[720px] xl:h-[840px]"
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
          <h2 className="font-ubuntu font-bold text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] tracking-tight">
            <span className="text-primary">Dual utility</span>
            <br />
            across environments<span className="text-primary">.</span>
          </h2>
        </div>
        <div className="col-span-12 max-w-[440px] text-[15px] leading-[1.7] text-muted-foreground lg:col-span-5 lg:col-start-8">
          <strong className="font-semibold text-foreground">Nowadays</strong>, it&apos;s not enough
          for a cryptocurrency to rely on a single platform.{" "}
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
              panel.side === "left" ? "border-b bg-card/40 lg:border-b-0 lg:border-r" : "bg-surface"
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
              <span className="mb-10 block font-display text-3xl tracking-tight">
                {panel.title}
              </span>
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

export function Footer() {
  return (
    <footer className="hairline-t grain relative">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-3xl tracking-tight">DigiAgent</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The settlement asset for human and machine commerce. Bridge Round opening soon —
              register interest.
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
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
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
