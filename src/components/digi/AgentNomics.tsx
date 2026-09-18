import { AgentNomicsSlider } from "./AgentNomicsSlider";
import { Reveal } from "./Section";

export function AgentNomics() {
  return (
    <section id="agentnomics" className="hairline-t scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="eyebrow text-primary/70">11</span>
            <span className="eyebrow">Token mechanics</span>
          </div>
          <p className="mt-6 font-ubuntu text-[clamp(2.6rem,6.4vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary">
            AGENT-NOMICS
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <AgentNomicsSlider />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
