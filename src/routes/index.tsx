import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/digi/Hero";
import { BridgeRound } from "@/components/digi/BridgeRound";
import { CTA } from "@/components/digi/CTA";
import { ScrollProgress } from "@/components/digi/ScrollProgress";
import { useLenis } from "@/components/digi/scroll";
import { Tokenomics } from "@/components/digi/Tokenomics";
import { SaleDetails } from "@/components/digi/SaleDetails";
import {
  AgentNomics,
  DualUtility,
  Footer,
  Platforms,
  Summary,
  Team,
} from "@/components/digi/Content";
import {
  EarlyValidation,
  Problem,
  Product,
  Transformation,
  WhyNow,
} from "@/components/digi/Story";

const title = "DigiAgent — DIGI Token Sale";
const description =
  "DIGI is the settlement asset for human and machine commerce across DigiPaga and DigiMercados. Bridge Sale open at $0.0420.";

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
      <Problem />
      <Product />
      <Transformation />
      <EarlyValidation />
      <Tokenomics />
      <AgentNomics />
      <SaleDetails />
      <BridgeRound />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}
