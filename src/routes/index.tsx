import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/digi/Hero";
import { BridgeRound } from "@/components/digi/BridgeRound";
import { CTA } from "@/components/digi/CTA";
import { ScrollProgress } from "@/components/digi/ScrollProgress";
import { useLenis } from "@/components/digi/scroll";
import { Tokenomics } from "@/components/digi/Tokenomics";
import { SaleDetails } from "@/components/digi/SaleDetails";
import { Vesting } from "@/components/digi/Vesting";
import { Runway } from "@/components/digi/Runway";
import { Roadmap } from "@/components/digi/Roadmap";
import { Faq } from "@/components/digi/Faq";
import {
  DualUtility,
  Footer,
  Platforms,
  Summary,
} from "@/components/digi/Content";
import { AgentNomics } from "@/components/digi/AgentNomics";
import { Team } from "@/components/digi/Team";
import { WhyDigi } from "@/components/digi/WhyDigi";
import {
  EarlyValidation,
  Product,
  Transformation,
  WhyNow,
} from "@/components/digi/Story";

const title = "DigiAgent — DIGI Token Sale";
const description =
  "DIGI is the settlement asset for human and machine commerce across DigiPaga and DigiMercados. Bridge Round opening soon at $0.0025 per DIGI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  return (
    <main className="min-h-screen font-sans text-foreground antialiased">
      <ScrollProgress />
      <Hero />
      <Summary />
      <Platforms />
      <DualUtility />
      <WhyNow />
      <Product />
      <Transformation />
      <EarlyValidation />
      <Team />
      <WhyDigi />
      <AgentNomics />
      <Tokenomics />
      <Vesting />
      <SaleDetails />
      <BridgeRound />
      <Runway />
      <Roadmap />
      <Faq />
      <CTA />
      <Footer />
    </main>
  );
}
