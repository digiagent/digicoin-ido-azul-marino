import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Copy, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import coin from "@/assets/digi_coin_green_center.png.asset.json";
import { ScrollTrigger } from "./scroll";

const DIGI_PER_USD = 1 / 0.0033;
const MIN_USD = 5000;
const MAX_USD = 50000;
const CHIME_URL = "https://assets.mixkit.co/active_storage/sfx/1992/1992-preview.mp3";
const FAKE_ADDRESS = "0x1234ab56cd78ef90ab12cd34ef56ab78cd905678";
const SAFE_WALLET_ADDRESS = "0x6De84ff2B533fcD822cd37913167bcc9cb8dDbfA";
const CHAINS = ["Base", "BNB", "Hyper", "Optimism", "Arbitrum", "Polygon", "Ethereum"];
const STEPS = ["Identity", "Wallet", "Allocation", "Confirmation", "Complete"];

const ROUND_FACTS: [string, string][] = [
  ["Status", "Opening soon"],
  ["Price", "$0.0033"],
  ["Allocation", "30,000,000 DIGI"],
  ["TGE", "TBA"],
  ["Token contract", "TBA"],
];

const truncate = (a: string) => `${a.slice(0, 6)}...${a.slice(-4)}`;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isEvm = (v: string) => /^0x[a-fA-F0-9]{40}$/.test(v.trim());

const field =
  "w-full rounded-xl border border-zinc-600 bg-zinc-800 p-4 text-2xl font-bold text-white outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:border-primary focus:ring-2 focus:ring-ring";
const label = "mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-400";
const primaryBtn =
  "w-full rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_28px_oklch(0.82_0.21_130_/_45%)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:shadow-none";
const ghostBtn =
  "rounded-xl border border-zinc-600 px-6 py-4 text-lg font-semibold text-zinc-300 transition-colors hover:border-primary/60 hover:text-white";

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 text-lg leading-relaxed text-zinc-300 transition-colors hover:text-white">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1.5 h-5 w-5 shrink-0 accent-[var(--primary)]"
      />
      <span>{children}</span>
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-6 border-t border-zinc-700 py-3.5 first:border-t-0">
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{k}</span>
      <span className="truncate text-right text-xl font-bold text-white">{v}</span>
    </div>
  );
}

async function makeShareCard(digi: number): Promise<string> {
  const img = new Image();
  img.src = coin.url;
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
  });
  const c = document.createElement("canvas");
  c.width = 1200;
  c.height = 630;
  const x = c.getContext("2d")!;
  x.fillStyle = "#08120a";
  x.fillRect(0, 0, 1200, 630);
  const g = x.createRadialGradient(900, 315, 40, 900, 315, 360);
  g.addColorStop(0, "rgba(125,250,90,0.30)");
  g.addColorStop(1, "rgba(125,250,90,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 1200, 630);
  x.drawImage(img, 720, 145, 340, 340);
  x.strokeStyle = "rgba(52,211,153,0.5)";
  x.lineWidth = 6;
  x.strokeRect(12, 12, 1176, 606);
  x.fillStyle = "#7dfa5a";
  x.font = "900 34px sans-serif";
  x.fillText("DIGI BRIDGE ROUND", 80, 130);
  x.fillStyle = "#ffffff";
  x.font = "900 64px sans-serif";
  x.fillText("I registered interest in", 80, 250);
  x.fillStyle = "#34d399";
  x.font = "900 88px sans-serif";
  x.fillText(`${digi.toLocaleString(undefined, { maximumFractionDigits: 0 })} DIGI`, 80, 360);
  x.fillStyle = "#d4d4d8";
  x.font = "700 38px sans-serif";
  x.fillText("at $0.0033 per DIGI", 80, 430);
  x.fillStyle = "#71717a";
  x.font = "700 28px sans-serif";
  x.fillText("DigiAgent · Bridge Round — Opening Soon", 80, 545);
  return c.toDataURL("image/png");
}

function StaggerText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h3
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.028, delayChildren: 0.35 }}
      aria-label={text}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((c, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.6em" },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", damping: 14, stiffness: 220 },
                },
              }}
            >
              {c}
            </motion.span>
          ))}
          {"\u00A0"}
        </span>
      ))}
    </motion.h3>
  );
}

export function BridgeRound() {
  const reduced = useReducedMotion();
  const chimeRef = useRef<HTMLAudioElement>(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [notUsa, setNotUsa] = useState(false);
  const [notOfac, setNotOfac] = useState(false);
  const [terms, setTerms] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [useConnected, setUseConnected] = useState(false);
  const [receiving, setReceiving] = useState("");
  const [amount, setAmount] = useState("");
  const [stable, setStable] = useState("USDC");
  const [chain, setChain] = useState("Base");
  const [processing, setProcessing] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cardUrl, setCardUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const usd = Number(amount);
  const amountValid = amount !== "" && !Number.isNaN(usd) && usd >= MIN_USD && usd <= MAX_USD;
  const digi = useMemo(() => (Number.isNaN(usd) ? 0 : Math.max(0, usd) * DIGI_PER_USD), [usd]);

  // Page height changes with each step — keep downstream pins in sync.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 380);
    return () => window.clearTimeout(id);
  }, [step]);

  useEffect(() => {
    if (step !== 5) return;
    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current.volume = 0.6;
      chimeRef.current.play().catch(() => {});
    }
    if (reduced) return;
    const colors = ["#7dfa5a", "#ffffff", "#3f8f2e", "#b7ffa0"];
    // Opening cannon blast
    confetti({
      particleCount: 180,
      spread: 100,
      startVelocity: 55,
      origin: { x: 0.5, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 90,
      spread: 140,
      startVelocity: 35,
      scalar: 1.3,
      origin: { x: 0.5, y: 0.5 },
      colors,
    });
    // Sustained side streams
    const end = Date.now() + 3200;
    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 80,
        startVelocity: 50,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 80,
        startVelocity: 50,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [step, reduced]);

  useEffect(() => {
    if (step !== 5) return;
    makeShareCard(digi)
      .then(setCardUrl)
      .catch(() => {});
  }, [step, digi]);

  const connectWallet = () => {
    setConnecting(true);
    window.setTimeout(() => {
      setConnecting(false);
      setWalletConnected(true);
    }, 1400);
  };

  const toggleUseConnected = (v: boolean) => {
    setUseConnected(v);
    setReceiving(v ? FAKE_ADDRESS : "");
  };

  const sign = () => {
    setProcessing(true);
    window.setTimeout(() => {
      setProcessing(false);
      setStep(5);
    }, 2000);
  };

  const variants = {
    enter: { opacity: 0, x: reduced ? 0 : 48 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reduced ? 0 : -48 },
  };

  return (
    <section id="bridge-round" className="hairline-t relative scroll-mt-24 overflow-hidden">
      <audio ref={chimeRef} src={CHIME_URL} preload="auto" muted={muted} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, oklch(0.6 0.16 140 / 12%), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
        <div className="text-center">
          <span className="eyebrow">16 · Bridge round</span>
          <h2
            className="mt-5 font-ubuntu font-bold bg-clip-text text-4xl uppercase tracking-tight text-transparent md:text-5xl"
            style={{ backgroundImage: "var(--gradient-accent)" }}
            data-testid="bridge-round-title"
          >
            DIGI BRIDGE ROUND
          </h2>
          <div
            className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-700 bg-zinc-700 sm:grid-cols-5"
            data-testid="bridge-round-stats"
          >
            {[
              ["30,000,000", "DIGI"],
              ["$0.0033", "/ DIGI"],
              ["$100,000", "Target raise"],
              ["$2.9M", "Target FDV"],
              ["3%", "Of total supply"],
            ].map(([v, k]) => (
              <div key={k} className="bg-zinc-900/90 px-3 py-4">
                <div className="font-display text-xl tracking-tight text-primary md:text-2xl">
                  {v}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {k}
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
            An early bridge round intended to accelerate product development, product launches,
            ecosystem growth, user adoption, and pre-registration.
          </p>
        </div>

        <div className="relative mt-14">
          {/* Success radial pulse behind the card */}
          <AnimatePresence>
            {step === 5 && !reduced && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-16 -z-10 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.82 0.21 130 / 35%), oklch(0.82 0.21 130 / 10%) 55%, transparent 75%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.75, 0.2] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          <div
            className="grid overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900/70 shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:border-primary/50 md:grid-cols-5"
            data-testid="bridge-split-box"
          >
            {/* Left — purchase form */}
            <div className="p-6 md:col-span-3 md:p-10">
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  {STEPS.map((s, i) => {
                    const n = i + 1;
                    const done = step > n;
                    const active = step === n;
                    return (
                      <div key={s} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-base font-bold transition-all ${
                              done || active
                                ? "border-primary bg-primary/15 text-primary"
                                : "border-zinc-600 text-zinc-300"
                            } ${active ? "shadow-[0_0_18px_oklch(0.82_0.21_130_/_60%)]" : ""}`}
                          >
                            {done || (active && n === STEPS.length) ? "✓" : n}
                          </div>
                          <span
                            className={`hidden text-xs font-bold uppercase tracking-widest sm:block ${
                              active ? "text-white" : "text-zinc-400"
                            }`}
                          >
                            {s}
                          </span>
                        </div>
                        {n < STEPS.length && (
                          <div className="mx-2 h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-700">
                            <div
                              className="h-full origin-left rounded-full bg-primary shadow-[0_0_10px_oklch(0.82_0.21_130_/_70%)] transition-transform duration-500"
                              style={{ transform: `scaleX(${step > n ? 1 : 0})` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 1 && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <span className={label}>Email address</span>
                        <input
                          type="email"
                          value={email}
                          maxLength={255}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className={field}
                          data-testid="bridge-email-input"
                        />
                        {email !== "" && !isEmail(email) && (
                          <p className="mt-2 text-lg text-destructive">
                            Enter a valid email address.
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-4">
                        <Check checked={notUsa} onChange={setNotUsa}>
                          I am not a USA citizen or resident.
                        </Check>
                        <Check checked={notOfac} onChange={setNotOfac}>
                          I am not from an OFAC sanctioned country.
                        </Check>
                        <Check checked={terms} onChange={setTerms}>
                          I accept the terms and acknowledge the risks of this token sale.
                        </Check>
                      </div>
                      <button
                        type="button"
                        className={primaryBtn}
                        disabled={!isEmail(email) || !notUsa || !notOfac || !terms}
                        onClick={() => setStep(2)}
                        data-testid="bridge-step1-continue-btn"
                      >
                        Continue
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-6">
                      {walletConnected ? (
                        <div className="flex items-center justify-between rounded-xl border border-primary/40 bg-primary/10 px-5 py-4">
                          <span className="text-xs font-bold uppercase tracking-widest text-primary">
                            Privy connected
                          </span>
                          <span className="font-mono text-xl font-bold text-white">
                            {truncate(FAKE_ADDRESS)}
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={primaryBtn}
                          disabled={connecting}
                          onClick={connectWallet}
                          data-testid="bridge-connect-wallet-btn"
                        >
                          {connecting ? "Connecting…" : "Connect Wallet (Privy)"}
                        </button>
                      )}
                      <div>
                        <span className={label}>EVM receiving wallet address</span>
                        <input
                          value={receiving}
                          onChange={(e) => setReceiving(e.target.value)}
                          disabled={useConnected}
                          maxLength={42}
                          placeholder="0x…"
                          className={`${field} font-mono text-lg disabled:opacity-60`}
                          data-testid="bridge-receiving-input"
                        />
                        {receiving !== "" && !isEvm(receiving) && (
                          <p className="mt-2 text-lg text-destructive">
                            Enter a valid EVM address.
                          </p>
                        )}
                      </div>
                      <Check
                        checked={useConnected}
                        onChange={(v) => walletConnected && toggleUseConnected(v)}
                      >
                        Use my connected Privy wallet
                      </Check>
                      <div className="flex gap-3">
                        <button type="button" className={ghostBtn} onClick={() => setStep(1)}>
                          Back
                        </button>
                        <button
                          type="button"
                          className={primaryBtn}
                          disabled={!isEvm(receiving)}
                          onClick={() => setStep(3)}
                          data-testid="bridge-step2-continue-btn"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <span className={label}>Requested amount in USD</span>
                        <input
                          inputMode="decimal"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                          placeholder="5000"
                          className={field}
                          data-testid="bridge-amount-input"
                        />
                        {amount !== "" && !amountValid && (
                          <p className="mt-2 text-lg text-destructive">
                            Amount must be between ${MIN_USD.toLocaleString()} and $
                            {MAX_USD.toLocaleString()}.
                          </p>
                        )}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <span className={label}>Stablecoin</span>
                          <select
                            value={stable}
                            onChange={(e) => setStable(e.target.value)}
                            className={field}
                          >
                            <option value="USDC">USDC</option>
                            <option value="USDT">USDT</option>
                            <option value="DAI">DAI</option>
                          </select>
                        </div>
                        <div>
                          <span className={label}>Preferred chain (network TBA)</span>
                          <select
                            value={chain}
                            onChange={(e) => setChain(e.target.value)}
                            className={field}
                          >
                            {CHAINS.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="rounded-xl border border-zinc-600 bg-zinc-800/70 px-5 py-4">
                        <div className={label}>Indicative allocation</div>
                        <div
                          className="text-3xl font-black text-primary drop-shadow-[0_0_12px_oklch(0.82_0.21_130_/_45%)]"
                          data-testid="bridge-digi-amount"
                        >
                          {digi.toLocaleString(undefined, { maximumFractionDigits: 0 })} DIGI
                        </div>
                        <div className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-400">
                          At $0.0033 per DIGI · subject to final terms
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button type="button" className={ghostBtn} onClick={() => setStep(2)}>
                          Back
                        </button>
                        <button
                          type="button"
                          className={primaryBtn}
                          disabled={!amountValid}
                          onClick={() => setStep(4)}
                          data-testid="bridge-review-order-btn"
                        >
                          Review request
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="flex flex-col gap-6">
                      <div className="rounded-xl border border-zinc-600 bg-zinc-800/70 px-5 py-2">
                        <Row k="Email" v={email} />
                        <Row k="Receiving wallet" v={truncate(receiving)} />
                        <Row k="Requested amount" v={`$${usd.toLocaleString()}`} />
                        <Row k="Stablecoin" v={stable} />
                        <Row k="Preferred chain" v={chain} />
                        <Row
                          k="Indicative DIGI"
                          v={`${digi.toLocaleString(undefined, { maximumFractionDigits: 0 })} DIGI`}
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className={ghostBtn}
                          onClick={() => setStep(3)}
                          disabled={processing}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className={primaryBtn}
                          disabled={processing}
                          onClick={sign}
                          data-testid="bridge-confirm-sign-btn"
                        >
                          {processing ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Submitting…
                            </span>
                          ) : (
                            "Register Interest"
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div
                      className="flex flex-col items-center gap-6 py-4 text-center"
                      data-testid="bridge-success-state"
                    >
                      <motion.img
                        src={coin.url}
                        alt="DIGI coin"
                        className="h-36 w-36 rounded-full object-contain"
                        initial={reduced ? false : { scale: 0, rotate: -35 }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                          boxShadow: reduced
                            ? "0 0 40px oklch(0.82 0.21 130 / 45%)"
                            : [
                                "0 0 25px oklch(0.82 0.21 130 / 30%)",
                                "0 0 70px oklch(0.82 0.21 130 / 65%)",
                                "0 0 25px oklch(0.82 0.21 130 / 30%)",
                              ],
                        }}
                        transition={{
                          scale: { type: "spring", stiffness: 160, damping: 12, delay: 0.1 },
                          rotate: { type: "spring", stiffness: 160, damping: 12, delay: 0.1 },
                          boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                        }}
                      />
                      <StaggerText
                        text="Your interest is registered!"
                        className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight tracking-tight text-white"
                      />
                      <motion.div
                        className="flex w-full flex-col items-center gap-6"
                        initial={reduced ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                      >
                        <p className="text-xl text-zinc-300">
                          Request recorded for{" "}
                          <span className="font-black text-primary">
                            {digi.toLocaleString(undefined, { maximumFractionDigits: 0 })} DIGI
                          </span>{" "}
                          · preferred chain <span className="font-bold text-white">{chain}</span>.
                        </p>
                        <p className="text-lg text-zinc-300">
                          No payment has been taken and nothing is on-chain yet. We&apos;ll contact
                          you at <span className="font-bold text-white">{email}</span> when the
                          Bridge Round opens.
                        </p>
                        {cardUrl && (
                          <div className="w-full">
                            <div className={label}>Your share card</div>
                            <img
                              src={cardUrl}
                              alt="DIGI purchase share card"
                              className="w-full rounded-xl border border-zinc-700"
                              data-testid="bridge-share-card-preview"
                            />
                          </div>
                        )}
                        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                          <button
                            type="button"
                            className="rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_28px_oklch(0.82_0.21_130_/_45%)]"
                            onClick={() => {
                              const text = encodeURIComponent(
                                "I just registered interest in the $DIGI Bridge Round at $0.0033 per DIGI. Opening soon!",
                              );
                              const url = encodeURIComponent(
                                `${window.location.origin}/digi-share-card.png`,
                              );
                              window.open(
                                `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
                                "_blank",
                                "noopener,noreferrer",
                              );
                            }}
                            data-testid="bridge-share-x-btn"
                          >
                            Share to 𝕏
                          </button>
                          <a
                            href={cardUrl || "#"}
                            download="digi-purchase-card.png"
                            className={`${ghostBtn} text-center`}
                            data-testid="bridge-download-card-btn"
                          >
                            Download card
                          </a>
                          <button
                            type="button"
                            className={ghostBtn}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          >
                            Back to top
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — dark showcase panel */}
            <div
              className="relative flex flex-col items-center justify-center gap-8 border-t border-zinc-800 bg-zinc-950 p-10 md:col-span-2 md:border-l md:border-t-0"
              data-testid="bridge-showcase-panel"
            >
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute celebration sound" : "Mute celebration sound"}
                className="absolute right-4 top-4 z-10 rounded-full border border-zinc-700 bg-zinc-900/80 p-2.5 text-zinc-300 transition-colors hover:border-primary/60 hover:text-white"
                data-testid="bridge-mute-toggle"
              >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 55% at 50% 38%, oklch(0.6 0.16 140 / 14%), transparent 70%)",
                }}
              />
              <motion.img
                src={coin.url}
                alt="DIGI coin"
                className="relative w-full max-w-[260px] object-contain drop-shadow-[0_0_40px_oklch(0.82_0.21_130_/_35%)]"
                animate={reduced ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative text-center">
                <div className="flex items-center justify-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                  </span>
                  <span
                    className="text-2xl font-black tracking-tight text-white md:text-3xl"
                    data-testid="bridge-status"
                  >
                    Opening Soon
                  </span>
                </div>
                <div className="mt-3 text-3xl font-black text-primary drop-shadow-[0_0_12px_oklch(0.82_0.21_130_/_45%)]">
                  $0.0033
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    per DIGI
                  </span>
                </div>
              </div>
              <div className="relative w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-left">
                <div className="flex items-center gap-3">
                  <img src="/assets/safe-white.svg" alt="Safe" className="h-6 w-auto" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                      Contribution Wallet
                    </div>
                    <div className="mt-1 text-[11px] text-zinc-500">
                      Verified Safe multisig wallet for Bridge Round contributions.
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="select-none font-mono text-xs text-zinc-300">
                    0x6De8...bDbfA
                  </span>
                  <button
                    type="button"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-primary/60 hover:text-white"
                    onClick={async () => {
                      await navigator.clipboard.writeText(SAFE_WALLET_ADDRESS);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 2000);
                    }}
                    data-wallet-address={SAFE_WALLET_ADDRESS}
                    aria-label="Copy Safe wallet address"
                  >
                    <Copy size={13} aria-hidden="true" />
                    {copied ? "Copied!" : "Copy Address"}
                  </button>
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-zinc-500">
                  Always verify the wallet address before sending funds. We are not responsible for
                  funds sent to incorrect addresses.
                </p>
              </div>
              <div
                className="relative w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-1"
                data-testid="bridge-round-facts"
              >
                {ROUND_FACTS.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-6 border-t border-zinc-800 py-3 first:border-t-0"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {k}
                    </span>
                    <span
                      className={`font-mono text-sm font-bold ${v === "TBA" ? "text-zinc-400" : "text-white"}`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
