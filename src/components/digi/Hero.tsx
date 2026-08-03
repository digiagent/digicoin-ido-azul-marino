import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import coin from "@/assets/digi_coin_green_center.png.asset.json";
import agentCoin from "@/assets/digi-agent-coin-2.png.asset.json";
import { HERO_STATS as STATS, HERO_TICKER } from "./data";
import { Magnetic } from "./Magnetic";
import { gsap, SplitText, useGSAP, MOTION_OK } from "./scroll";

const RING_INNER =
  "CONFIDENTIAL · REV 01 · INVESTOR · PRIVATE · DIGIM · TGE Q3 2027 · $4.25M RAISE · 36-MONTH RUNWAY · DUAL PLATFORM · ";
const RING_OUTER =
  "DIGIMERCADOS · DIGIPAGA · 1,000,000,000 SUPPLY · DIGIMERCADOS · DIGIPAGA · 1,000,000,000 SUPPLY · ";

function CircularText({
  text,
  radius,
  size,
  duration,
  reverse,
  className,
  reduced,
}: {
  text: string;
  radius: number;
  size: number;
  duration: number;
  reverse?: boolean;
  className?: string;
  reduced?: boolean | null;
}) {
  const id = `ring-${radius}`;
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      aria-hidden
      animate={reduced ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <path
          id={id}
          d={`M 100,100 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          fill="none"
        />
      </defs>
      <text
        fill="currentColor"
        fontSize={size}
        letterSpacing="1.6"
        style={{ fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}
      >
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </motion.svg>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let split: SplitText | undefined;
        if (headlineRef.current) {
          split = new SplitText(headlineRef.current, { type: "chars" });
          gsap.from(split.chars, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.045,
            delay: 0.1,
          });
        }

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
        tl.to(bgRef.current, { yPercent: 30, ease: "none" }, 0)
          .to(coinRef.current, { yPercent: -14, scale: 1.06, ease: "none" }, 0)
          .to(
            contentRef.current,
            { opacity: 0, scale: 0.92, transformOrigin: "50% 30%", ease: "none" },
            0,
          );

        return () => split?.revert();
      });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="grain relative flex min-h-screen flex-col overflow-hidden">
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7">
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
        className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-6 pb-14 pt-10 will-change-transform md:pt-16"
      >
        <div className="grid items-center gap-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Token sale · Round 04 of 04
            </motion.p>
            <h1
              ref={headlineRef}
              className="mt-6 font-brand text-[clamp(3rem,9.5vw,6.8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em]"
            >
              <span className="block whitespace-nowrap text-primary">DIGI</span>
              <span className="block whitespace-nowrap text-foreground">
                Agent<span className="text-primary">.</span>
              </span>
            </h1>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              DIGI settles payments for humans on DigiPaga and for machines on DigiMercados —
              one asset, two economies, a single liquidity base.
            </motion.p>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#sale"
                  data-testid="hero-secure-allocation-btn"
                  className="cta-pulse block rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  Secure allocation
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#tokenomics"
                  className="block rounded-full border border-hairline px-7 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  Read tokenomics
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <div
            ref={coinRef}
            className="relative mx-auto aspect-square w-full max-w-[480px] will-change-transform"
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
              duration={90}
              reduced={reduced}
              className="text-muted-foreground/40"
            />
            <CircularText
              text={RING_INNER}
              radius={76}
              size={5.6}
              duration={62}
              reverse
              reduced={reduced}
              className="text-primary/50"
            />
            <motion.img
              src={agentCoin.url}
              alt="DigiAgent holding the DIGI coin"
              className="absolute inset-[22%] h-[56%] w-[56%] object-contain drop-shadow-2xl"
              animate={reduced ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <div className="hairline-t relative mt-auto">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-4 lg:grid-cols-7">
          {STATS.map((s, i) => (
            <motion.div
              key={s.k}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }}
              className="border-hairline py-9 md:border-l md:first:border-l-0 md:pl-4"
            >
              <div className="eyebrow">{s.k}</div>
              <div className="mt-2 font-mono text-base text-foreground">{s.v}</div>
            </motion.div>
          ))}
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
