import { useState } from "react";
import { Reveal, Section } from "./Section";

const FAQS: [string, string][] = [
  [
    "Why does Digi-Agent need a token?",
    "DIGI is designed to connect token consumption with ecosystem utility: it meters AI access and is designed to unlock premium functionality across DigiPaga and Digimercados — one token across both platforms.",
  ],
  [
    "How does the AI-access mechanism determine the DIGI amount?",
    "Access tiers are fixed in dollars ($3–$6/month, paid in USDC/USDT). The DIGI required equals the dollar level divided by DIGI's current price — for example, $5 at $0.0025 requires 2,000 DIGI.",
  ],
  [
    "What happens to DIGI after it's consumed?",
    "It is routed to the Incinerator and burned — removed from circulation. There is no mint function, so burned supply cannot be recreated.",
  ],
  [
    "What happens if the DIGI price changes?",
    "The dollar-denominated access level stays fixed; only the DIGI amount required adjusts. $5 of access requires 2,000 DIGI at $0.0025, 1,000 at $0.005, and 500 at $0.01.",
  ],
  [
    "Why is the bridge round happening before TGE?",
    "It is an early bridge round intended to accelerate product development, product launches, ecosystem growth, user adoption, and pre-registration ahead of the token generation event.",
  ],
  [
    "What happens after the bridge round?",
    "The target schedule is: Private/Pre-Seed at $0.005 ($5M target FDV), Pre-Sale at $0.01 ($10M target FDV), then Public Sale/TGE at $0.015–$0.02 ($15M–$20M target FDV range). All dates and terms are targets; TGE is TBA.",
  ],
  [
    "How does vesting work?",
    "Each allocation has a TGE unlock percentage, a cliff, and a linear vesting period. Bridge Round terms: 10% at TGE, 6-month cliff, 12-month vesting. The full schedule is in the Vesting & Unlocks section.",
  ],
  [
    "When will the token contract be deployed?",
    "TBA. DIGI is not deployed yet and no contract address exists — any address claiming to be DIGI today is not official.",
  ],
  [
    "How will the final TGE network be selected?",
    "The network is under consideration and not yet selected. The final chain will be announced before TGE.",
  ],
  [
    "What are the main risks?",
    "This is an early-stage, high-risk project: the token is not deployed, dates and terms are targets and may change, the products are still in development, and there is no guarantee of listing or of any token value. Participation is restricted in certain jurisdictions.",
  ],
  [
    "Where can the tokenomics be verified?",
    "The full allocation, vesting, and round terms are published on this page (Tokenomics, Vesting & Unlocks, Transparency). On-chain verification becomes possible only after deployment; an audit has not yet been completed.",
  ],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      index="19"
      eyebrow="FAQ"
      title={
        <>
          <span className="font-ubuntu font-bold">FAQ</span>
        </>
      }
    >
      <Reveal>
        <div className="overflow-hidden rounded-xl border border-hairline" data-testid="faq-list">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-t border-hairline first:border-t-0">
                <button
                  type="button"
                  data-testid={`faq-question-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-card/40"
                >
                  <span
                    className={`font-display text-lg tracking-tight transition-colors duration-300 md:text-xl ${
                      isOpen ? "text-primary" : "text-foreground/90 group-hover:text-foreground"
                    }`}
                  >
                    {q}
                  </span>
                  <span
                    aria-hidden
                    className={`shrink-0 font-mono text-xl text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="max-w-3xl px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground md:text-base"
                      data-testid={`faq-answer-${i}`}
                    >
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
