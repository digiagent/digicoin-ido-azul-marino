import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "./scroll";
import { ROUNDS, type Round } from "./data";

const STEP_COUNT = ROUNDS.length;

function metricsFor(round: Round): [string, string][] {
  return [
    ["Tokens", round.supplyAmount],
    ["Accepted", round.currencies],
    ["Network", round.network],
    ["Ticket size", `${round.minTicket} – ${round.maxTicket}`],
    ["Init market cap", round.initMarketCap],
    ["FDV", round.fdv],
    ["Cliff", round.cliff],
    ["Vesting", round.vesting],
  ];
}

export function SaleDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        const dots = gsap.utils.toArray<HTMLElement>(".sale-dot", sectionRef.current);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const i = Math.round(self.progress * (STEP_COUNT - 1));
              dots.forEach((d, di) => d.classList.toggle("sale-dot-active", di === i));
            },
          },
        });

        gsap.utils.toArray<HTMLElement>(".sale-panel", track).forEach((panel) => {
          const wipe = panel.querySelector(".sale-wipe");
          if (!wipe) return;
          gsap.fromTo(
            wipe,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 78%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="sale"
      className="hairline-t scroll-mt-24 overflow-hidden"
    >
      <div className="flex flex-col justify-center gap-12 py-24 lg:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex items-baseline gap-4">
            <span className="eyebrow text-primary/70">08</span>
            <span className="eyebrow">Sale details</span>
          </div>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Four rounds, one price ladder
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every round is on-chain, vested and independently attested.
            <span className="mt-2 hidden font-mono text-[11px] uppercase tracking-[0.22em] text-primary/70 lg:block">
              Keep scrolling — the rounds slide sideways →
            </span>
          </p>
          <div data-testid="sale-step-dots" className="mt-6 hidden items-center gap-2.5 lg:flex">
            {ROUNDS.map((r, i) => (
              <span
                key={r.id}
                data-testid={`sale-dot-${i}`}
                className={`sale-dot h-2 w-2 rounded-full ${i === 0 ? "sale-dot-active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-6 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-6 px-6 will-change-transform lg:gap-8 lg:px-[max(1.5rem,calc((100vw-72rem)/2))]"
          >
            {ROUNDS.map((round, idx) => (
              <article
                key={round.id}
                className="sale-panel w-[85vw] max-w-[540px] shrink-0 lg:w-[600px] lg:max-w-none"
              >
                <div className="sale-wipe h-full rounded-[28px] border border-hairline bg-card/40 p-7 shadow-[var(--shadow-deep)] backdrop-blur-md transition-[border-color] duration-300 hover:border-primary/30 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary/70">
                      Step 0{idx + 1} / 04
                    </span>
                    <span className="rounded-full border border-hairline bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                      {round.supplyPct} supply
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-4xl leading-none tracking-tight lg:text-5xl">
                    {round.title}
                  </h3>
                  <div className="mt-8 flex flex-wrap items-baseline gap-8 border-b border-hairline pb-8">
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
                  <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-8">
                    {metricsFor(round).map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-1.5">
                        <span className="eyebrow">{k}</span>
                        <span className="font-mono text-sm md:text-base">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
