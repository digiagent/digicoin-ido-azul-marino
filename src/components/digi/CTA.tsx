import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "./scroll";
import agentCoin from "@/assets/digi-agent-coin-2.png.asset.json";

export function CTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: "+=50%",
          pin: true,
          anticipatePin: 1,
        });
        gsap.from(".cta-inner", {
          autoAlpha: 0,
          scale: 0.94,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="cta"
      className="hairline-t grain relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--cta-x", `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty("--cta-y", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at var(--cta-x, 50%) var(--cta-y, 35%), oklch(0.32 0.09 148 / 50%), transparent 65%)",
        }}
        aria-hidden
      />
      <div className="cta-inner relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <img src={agentCoin.url} alt="" className="h-24 w-24 object-contain drop-shadow-2xl" aria-hidden />
        <span className="eyebrow mt-10">Final call · Bridge round closes at allocation</span>
        <h2 className="mt-6 font-brand text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
          Own the <span className="text-primary">settlement layer</span> of the agent economy.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          50,000,000 DIGI at $0.005 — 6-month cliff, 12-month vest. When the machines start
          paying each other, you&apos;ll want to have been early.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#sale"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="cta-pulse rounded-full px-9 py-4 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-accent)" }}
          >
            Secure allocation now
          </motion.a>
          <a
            href="#summary"
            className="rounded-full border border-hairline px-9 py-4 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:border-primary/40 hover:text-foreground"
          >
            Re-read the story
          </a>
        </div>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Min $5K · Max $50K · USDT / DAI / USDC
        </p>
      </div>
    </section>
  );
}
