import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import coin from "@/assets/digi_coin_green_center.png.asset.json";
import agentCoin from "@/assets/digi-agent-coin-2.png.asset.json";
import { HERO_STATS as STATS, HERO_TICKER } from "./data";
import { CircularText } from "./CircularText";
import { Magnetic } from "./Magnetic";
import { gsap, useGSAP, MOTION_OK } from "./scroll";

const RING_INNER =
  "CONFIDENTIAL · REV 01 · INVESTOR · PRIVATE · DIGI · BRIDGE ROUND · $125K TARGET RAISE · $2.5M TARGET FDV · DUAL PLATFORM · ";
const RING_OUTER =
  "DIGIMERCADOS · DIGIPAGA · 1,000,000,000 SUPPLY · DIGIMERCADOS · DIGIPAGA · 1,000,000,000 SUPPLY · ";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".hero-char", {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.045,
          delay: 0.1,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });
        tl.to(bgRef.current, { opacity: 1, yPercent: 25, scale: 1.12, ease: "none" }, 0)
          .to(coinRef.current, { yPercent: -35, scale: 1.16, rotate: 5, ease: "none" }, 0)
          .to(
            contentRef.current,
            { opacity: 0, scale: 0.85, yPercent: -6, transformOrigin: "50% 30%", ease: "none" },
            0,
          );

        gsap.fromTo(
          document.documentElement,
          { "--page-bg": "#0b0d0b" },
          {
            "--page-bg": "#0e2014",
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="grain relative flex min-h-screen flex-col overflow-hidden">
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 opacity-0 will-change-transform"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7">
        <div className="flex items-center gap-3">
          <img src={coin.url} alt="" className="h-8 w-8" />
          <span className="font-display text-xl tracking-tight">DigiAgent</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {[
            ["Summary", "summary"],
            ["Tokenomics", "tokenomics"],
            ["Sale", "sale"],
            ["Team", "team"],
          ].map(([label, href]) => (
            <a key={href} href={`#${href}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </a>
          ))}
        </div>
        <Magnetic>
          <a
            href="#sale"
            data-testid="nav-join-sale-btn"
            className="cta-pulse block rounded-full border border-primary/50 bg-primary/15 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/25"
          >
            Join bridge sale
          </a>
        </Magnetic>
      </nav>

      <div
        ref={contentRef}
        className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-14 pt-10 will-change-transform md:pt-16"
      >
        <div className="grid items-center gap-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              DIGI Token · Bridge Round
            </motion.p>
            <h1
              data-testid="hero-headline"
              className="mt-6 font-brand text-[clamp(3rem,9.5vw,6.8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em]"
            >
              <span className="block whitespace-nowrap text-primary" aria-label="DIGI">
                {"DIGI".split("").map((c, i) => (
                  <Magnetic key={`d-${i}`} strength={0.35}>
                    <span aria-hidden className="hero-char inline-block will-change-transform">
                      {c}
                    </span>
                  </Magnetic>
                ))}
              </span>
              <span className="block whitespace-nowrap text-foreground" aria-label="Agent.">
                {"AGENT".split("").map((c, i) => (
                  <Magnetic key={`a-${i}`} strength={0.35}>
                    <span aria-hidden className="hero-char inline-block will-change-transform">
                      {c}
                    </span>
                  </Magnetic>
                ))}
                <Magnetic strength={0.35}>
                  <span aria-hidden className="hero-char inline-block text-primary will-change-transform">
                    .
                  </span>
                </Magnetic>
              </span>
            </h1>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8"
              data-testid="hero-positioning"
            >
              <p className="font-brand text-[clamp(1.05rem,2.1vw,1.55rem)] font-bold uppercase leading-snug tracking-[0.02em]">
                Own the intelligence
                <br />
                <span className="text-primary">powering the digital economy.</span>
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
                Digi-Agent is building the intelligence layer that lets people, businesses, and
                autonomous agents discover, decide, and execute economic activity across the
                DigiPaga and Digimercados ecosystem.
              </p>
            </motion.div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#bridge-round"
                  data-testid="hero-secure-allocation-btn"
                  className="cta-pulse block rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  View Bridge Round
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#platforms"
                  className="block rounded-full border border-hairline px-7 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  Explore the Economy
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <div
            ref={coinRef}
            className="relative mx-auto aspect-square w-full max-w-[620px] will-change-transform"
          >
            <div
              className="absolute inset-[6%] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.16 140 / 22%), transparent 70%)" }}
              aria-hidden
            />
            <div className="absolute inset-[4%] rounded-full border border-hairline" aria-hidden />
            <div className="absolute inset-[18%] rounded-full border border-primary/10" aria-hidden />
            <CircularText
              text={RING_OUTER}
              radius={92}
              size={5.2}
              duration={36}
              reduced={reduced}
              className="text-muted-foreground/40"
            />
            <CircularText
              text={RING_INNER}
              radius={76}
              size={5.6}
              duration={24}
              reverse
              reduced={reduced}
              className="text-primary/50"
            />
            <motion.img
              src={agentCoin.url}
              alt="DigiAgent holding the DIGI coin"
              className="absolute inset-[22%] h-[56%] w-[56%] object-contain drop-shadow-2xl"
              animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 2.5, 0, -2.5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <div className="hairline-t relative mt-auto">
        <div
          data-testid="hero-info-bar"
          className="mx-auto flex w-full max-w-[1700px] flex-nowrap items-center justify-center overflow-x-auto whitespace-nowrap px-6 py-5 [scrollbar-width:none] xl:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {STATS.map((s, i) => {
            const isTge = s.k === "Target TGE FDV";
            return (
              <motion.div
                key={s.k}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                className="group relative flex shrink-0 items-center"
              >
                {i > 0 && (
                  <span aria-hidden className="mx-6 text-[9px] leading-none text-primary">
                    ◆
                  </span>
                )}
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {isTge ? (
                    <>
                      Target{" "}
                      <span
                        className="cursor-help text-foreground/80 underline decoration-primary/60 decoration-dotted underline-offset-4"
                        data-testid="tge-hover-target"
                      >
                        TGE
                      </span>{" "}
                      FDV
                    </>
                  ) : (
                    s.k
                  )}
                </span>
                <span className="ml-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-foreground">
                  {s.v}
                </span>
                {isTge && (
                  <div
                    className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-4 w-60 -translate-x-1/2 rounded-xl border border-hairline bg-card p-5 opacity-0 shadow-[var(--shadow-deep)] backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100"
                    data-testid="tge-networks-tooltip"
                  >
                    <div className="eyebrow">Networks under consideration</div>
                    <ul className="mt-3 space-y-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                      {["Base", "BNB Chain", "Hyper"].map((n) => (
                        <li key={n} className="flex items-center gap-2.5">
                          <span aria-hidden className="text-[8px] text-primary">
                            ◆
                          </span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="hairline-t relative overflow-hidden border-b border-hairline py-5">
        <div className="flex w-max gap-14 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground [animation:digi-ticker_38s_linear_infinite] motion-reduce:animate-none">
          {[...HERO_TICKER, ...HERO_TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-14">
              {t}
              <span className="text-primary">◆</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
