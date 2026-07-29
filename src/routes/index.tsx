import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/digi/Hero";
import { Tokenomics } from "@/components/digi/Tokenomics";
import { SaleDetails } from "@/components/digi/SaleDetails";
import {
  AgentNomics,
  Distribution,
  DualUtility,
  Footer,
  Platforms,
  Runway,
  Summary,
  Team,
} from "@/components/digi/Content";

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
  return (
    <main className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Hero />
      <Summary />
      <Platforms />
      <DualUtility />
      <Tokenomics />
      <Distribution />
      <AgentNomics />
      <SaleDetails />
      <Runway />
      <Team />
      <Footer />
    </main>
  );
}
