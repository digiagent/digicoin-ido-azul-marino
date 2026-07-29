export type Slice = {
  key: string;
  label: string;
  pct: number;
  tokens: string;
  vesting: string;
  color: string;
};

export const TOKENOMICS: Slice[] = [
  { key: "sale", label: "Public & Private Sale", pct: 28, tokens: "280,000,000", vesting: "10% TGE · 12mo linear", color: "var(--chart-1)" },
  { key: "ecosystem", label: "Ecosystem & Agent Rewards", pct: 24, tokens: "240,000,000", vesting: "48mo emission curve", color: "var(--chart-2)" },
  { key: "treasury", label: "Treasury & Liquidity", pct: 18, tokens: "180,000,000", vesting: "6mo cliff · 24mo", color: "var(--chart-3)" },
  { key: "team", label: "Team & Contributors", pct: 15, tokens: "150,000,000", vesting: "12mo cliff · 36mo", color: "var(--chart-4)" },
  { key: "merchants", label: "Merchant Onboarding", pct: 9, tokens: "90,000,000", vesting: "Performance unlock", color: "var(--chart-5)" },
  { key: "advisors", label: "Advisors & Partners", pct: 6, tokens: "60,000,000", vesting: "9mo cliff · 24mo", color: "var(--chart-6)" },
];

export const ROUNDS = [
  {
    id: "bridge",
    name: "Bridge Sale",
    status: "Live now",
    price: "$0.0420",
    raise: "$4.2M",
    allocation: "100,000,000 DIGI",
    fdv: "$42M",
    min: "$500",
    lockup: "15% TGE · 9mo linear",
    progress: 68,
    note: "Final round before exchange listing. Bridges private commitments into public liquidity.",
  },
  {
    id: "private",
    name: "Private Sale",
    status: "Closed · 3.1x oversubscribed",
    price: "$0.0310",
    raise: "$6.2M",
    allocation: "200,000,000 DIGI",
    fdv: "$31M",
    min: "$25,000",
    lockup: "10% TGE · 18mo linear",
    progress: 100,
    note: "Strategic capital from LatAm payment operators and agent infrastructure funds.",
  },
  {
    id: "preseed",
    name: "Pre-Seed",
    status: "Closed",
    price: "$0.0085",
    raise: "$850K",
    allocation: "100,000,000 DIGI",
    fdv: "$8.5M",
    min: "$5,000",
    lockup: "24mo linear",
    progress: 100,
    note: "Founding capital covering protocol research and the first merchant corridor.",
  },
  {
    id: "seed",
    name: "Seed",
    status: "Closed",
    price: "$0.0175",
    raise: "$2.6M",
    allocation: "150,000,000 DIGI",
    fdv: "$17.5M",
    min: "$10,000",
    lockup: "6mo cliff · 24mo linear",
    progress: 100,
    note: "Scaled the settlement layer and shipped the DigiPaga consumer wallet.",
  },
] as const;

export const RUNWAY = [
  { name: "Protocol Eng.", value: 34 },
  { name: "Liquidity", value: 22 },
  { name: "Merchant Ops", value: 16 },
  { name: "Compliance", value: 12 },
  { name: "Agent Grants", value: 10 },
  { name: "Reserve", value: 6 },
];

export const TEAM = [
  { name: "Mateo Rivas", role: "Founder & CEO", prev: "Prev. Mercado Pago, Bitso" },
  { name: "Ana Krieger", role: "Chief Protocol Architect", prev: "Prev. Chainlink Labs" },
  { name: "Daniel Oyelaran", role: "Head of Agent Systems", prev: "Prev. DeepMind Applied" },
  { name: "Sofia Delgado", role: "Head of Compliance", prev: "Prev. Circle LatAm" },
  { name: "Yuki Tanaka", role: "Head of Markets", prev: "Prev. Wintermute" },
  { name: "Luis Bermudez", role: "Head of Merchant Growth", prev: "Prev. Rappi Pay" },
];
