import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import coin from "@/assets/digi_coin_green_center.png.asset.json";
import { ScrollTrigger } from "./scroll";

const DIGI_PER_USD = 1 / 0.003;
const MIN_USD = 100;
const MAX_USD = 15000;
const HARD_CAP_USD = 150000;
const RAISED_USD = 27000; // mocked for UI demo
const RAISED_PCT = Math.round((RAISED_USD / HARD_CAP_USD) * 100);
const CHIME_URL = "https://assets.mixkit.co/active_storage/sfx/1992/1992-preview.mp3";
const FAKE_ADDRESS = "0x1234ab56cd78ef90ab12cd34ef56ab78cd905678";
const CHAINS = ["Base", "BNB", "Hyper", "Optimism", "Arbitrum", "Polygon", "Ethereum"];
const STEPS = ["Identity", "Wallet", "Amount", "Confirm", "Done"];

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

let buyId = 0;
const hex2 = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
const BUY_AMOUNTS = [250, 500, 750, 1000, 1500, 2500, 5000];
const fakeBuy = () => ({
  id: buyId++,
  addr: `0x${hex2()}…${hex2()}`,
  amount: BUY_AMOUNTS[Math.floor(Math.random() * BUY_AMOUNTS.length)],
});

function RecentBuys() {
  const [buys, setBuys] = useState<ReturnType<typeof fakeBuy>[]>([]);
  useEffect(() => {
    setBuys(Array.from({ length: 3 }, fakeBuy));
    const id = window.setInterval(() => setBuys((p) => [fakeBuy(), ...p].slice(0, 3)), 4000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="relative w-full" data-testid="bridge-recent-buys">
      <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Recent buys</div>
      <div className="mt-2 flex flex-col gap-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {buys.map((b) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="font-mono text-zinc-300">{b.addr}</span>
              <span className="text-zinc-400">bought</span>
              <span className="font-bold text-primary">${b.amount.toLocaleString()}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
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
  x.fillText("I just secured", 80, 250);
  x.fillStyle = "#34d399";
  x.font = "900 88px sans-serif";
  x.fillText(`${digi.toLocaleString(undefined, { maximumFractionDigits: 0 })} DIGI`, 80, 360);
  x.fillStyle = "#d4d4d8";
  x.font = "700 38px sans-serif";
  x.fillText("at $0.003 per DIGI", 80, 430);
  x.fillStyle = "#71717a";
  x.font = "700 28px sans-serif";
  x.fillText("DigiAgent · Bridge Round Live", 80, 545);
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
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14, stiffness: 220 } },
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
  const [txHash, setTxHash] = useState("");
  const [muted, setMuted] = useState(false);
  const [cardUrl, setCardUrl] = useState("");

  const usd = Number(amount);
  const amountValid = amount !== "" && !Number.isNaN(usd) && usd >= MIN_USD && usd <= MAX_USD;
  const digi = useMemo(
    () => (Number.isNaN(usd) ? 0 : Math.max(0, usd) * DIGI_PER_USD),
    [usd],
  );

  // Page height changes with each step — keep downstream pins in sync.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 380);
    return () => window.clearTimeout(id);
  }, [step]);

  useEffect(() => {
    if (step !== 5) return;
    setTxHash(
      "0x" +
        Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
    );
    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current.volume = 0.6;
      chimeRef.current.play().catch(() => {});
    }
    if (reduced) return;
    const colors = ["#7dfa5a", "#ffffff", "#3f8f2e", "#b7ffa0"];
    // Opening cannon blast
    confetti({ particleCount: 180, spread: 100, startVelocity: 55, origin: { x: 0.5, y: 0.6 }, colors });
    confetti({ particleCount: 90, spread: 140, startVelocity: 35, scalar: 1.3, origin: { x: 0.5, y: 0.5 }, colors });
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
    makeShareCard(digi).then(setCardUrl).catch(() => {});
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
        style={{ background: "radial-gradient(60% 100% at 50% 0%, oklch(0.6 0.16 140 / 12%), transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
        <div className="text-center">
          <span className="eyebrow">§ 09 Token sale</span>
          <h2
            className="mt-5 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-5xl"
            style={{ backgroundImage: "var(--gradient-accent)" }}
          >
            Purchase DIGI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-300">
            Bridge round pricing at $0.003 per DIGI. Allocation is confirmed on signature.
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
                          <p className="mt-2 text-lg text-destructive">Enter a valid email address.</p>
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
                          <p className="mt-2 text-lg text-destructive">Enter a valid EVM address.</p>
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
                        <span className={label}>Amount in USD</span>
                        <input
                          inputMode="decimal"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                          placeholder="1000"
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
                          <select value={stable} onChange={(e) => setStable(e.target.value)} className={field}>
                            <option value="USDC">USDC</option>
                            <option value="USDT">USDT</option>
                          </select>
                        </div>
                        <div>
                          <span className={label}>Chain</span>
                          <select value={chain} onChange={(e) => setChain(e.target.value)} className={field}>
                            {CHAINS.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="rounded-xl border border-zinc-600 bg-zinc-800/70 px-5 py-4">
                        <div className={label}>You will receive</div>
                        <div
                          className="text-3xl font-black text-primary drop-shadow-[0_0_12px_oklch(0.82_0.21_130_/_45%)]"
                          data-testid="bridge-digi-amount"
                        >
                          {digi.toLocaleString(undefined, { maximumFractionDigits: 0 })} DIGI
                        </div>
                        <div className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-400">
                          $0.003 per DIGI
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
                          Review order
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="flex flex-col gap-6">
                      <div className="rounded-xl border border-zinc-600 bg-zinc-800/70 px-5 py-2">
                        <Row k="Email" v={email} />
                        <Row k="Receiving wallet" v={truncate(receiving)} />
                        <Row k="Amount" v={`$${usd.toLocaleString()}`} />
                        <Row k="Stablecoin" v={stable} />
                        <Row k="Chain" v={chain} />
                        <Row
                          k="You receive"
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
                              Processing…
                            </span>
                          ) : (
                            "Confirm & Sign Transaction"
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="flex flex-col items-center gap-6 py-4 text-center" data-testid="bridge-success-state">
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
                        text="Welcome to the Digi-Agent holder community!"
                        className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight tracking-tight text-white"
                      />
                      <motion.div
                        className="flex w-full flex-col items-center gap-6"
                        initial={reduced ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                      >
                        <p className="text-xl text-zinc-300">
                          <span className="font-black text-primary">
                            {digi.toLocaleString(undefined, { maximumFractionDigits: 0 })} DIGI
                          </span>{" "}
                          reserved on <span className="font-bold text-white">{chain}</span>.
                        </p>
                        <div className="w-full rounded-xl border border-zinc-600 bg-zinc-800/70 px-5 py-4 text-left">
                          <div className={label}>Transaction hash</div>
                          <div className="break-all font-mono text-base text-zinc-300" data-testid="bridge-tx-hash">
                            {txHash}
                          </div>
                        </div>
                        <p className="text-lg text-zinc-300">
                          A confirmation email has been sent to{" "}
                          <span className="font-bold text-white">{email}</span>.
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
                                "I just secured my $DIGI allocation at $0.003 in the Bridge Round! Welcome to the Digi-Agent holder community 🚀",
                              );
                              const url = encodeURIComponent(`${window.location.origin}/digi-share-card.png`);
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
                  <span className="text-2xl font-black tracking-tight text-white md:text-3xl">
                    Bridge Round Live
                  </span>
                </div>
                <div className="mt-3 text-3xl font-black text-primary drop-shadow-[0_0_12px_oklch(0.82_0.21_130_/_45%)]">
                  $0.003
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    per DIGI
                  </span>
                </div>
              </div>
              <div className="relative w-full" data-testid="bridge-raise-progress">
                <div className="flex items-end justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Raised</span>
                  <span className="text-xl font-black text-primary">{RAISED_PCT}% Sold</span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    className="h-full rounded-full shadow-[0_0_14px_oklch(0.82_0.21_130_/_80%)]"
                    style={{ backgroundImage: "var(--gradient-accent)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${RAISED_PCT}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: reduced ? 0 : 1.5, ease: "easeOut", delay: 0.25 }}
                  />
                </div>
                <div className="mt-2 text-right text-sm font-bold text-white">
                  ${RAISED_USD.toLocaleString()}{" "}
                  <span className="font-semibold text-zinc-400">/ ${HARD_CAP_USD.toLocaleString()}</span>
                </div>
              </div>
              <RecentBuys />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
