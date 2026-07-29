import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import coin from "@/assets/digi_coin_green_center.png.asset.json";
import agent from "@/assets/digim-rocket.png.asset.json";

const STATS = [
  { k: "Token", v: "DIGI" },
  { k: "Bridge price", v: "$0.0420" },
  { k: "Raised to date", v: "$13.85M" },
  { k: "FDV", v: "$42M" },
  { k: "Network", v: "Base · Solana" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0]);

  return (
    <header ref={ref} className="grain relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
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
        <a
          href="#sale"
          className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          Join bridge sale
        </a>
      </nav>

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 md:pt-24">
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
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] tracking-tight"
            >
              The currency of
              <br />
              autonomous
              <span className="text-primary"> commerce</span>
            </motion.h1>
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
              <a
                href="#sale"
                className="rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--gradient-accent)" }}
              >
                Secure allocation
              </a>
              <a
                href="#tokenomics"
                className="rounded-full border border-hairline px-7 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                Read tokenomics
              </a>
            </motion.div>
          </div>

          <motion.div style={{ y, scale }} className="relative mx-auto aspect-square w-full max-w-[440px]">
            <motion.div
              className="absolute inset-0 rounded-full border border-hairline"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
            </motion.div>
            <motion.div
              className="absolute inset-[12%] rounded-full border border-primary/15"
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary/60" />
            </motion.div>
            <div
              className="absolute inset-[18%] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.16 140 / 35%), transparent 70%)" }}
              aria-hidden
            />
            <motion.img
              src={coin.url}
              alt="DIGI coin"
              className="absolute inset-[20%] h-[60%] w-[60%] object-contain drop-shadow-2xl"
              animate={reduced ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={agent.url}
              alt="DigiAgent"
              className="absolute -right-4 bottom-0 w-[42%] object-contain"
              animate={reduced ? undefined : { y: [0, 12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="hairline-t relative">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.k}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }}
              className="border-hairline py-7 md:border-l md:first:border-l-0 md:pl-6"
            >
              <div className="eyebrow">{s.k}</div>
              <div className="mt-2 font-mono text-lg text-foreground">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
