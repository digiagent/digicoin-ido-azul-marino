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

export type Round = {
  id: string;
  label: string;
  title: string;
  launchPrice: string;
  roundFunding: string;
  supplyPct: string;
  supplyAmount: string;
  currencies: string;
  network: string;
  initMarketCap: string;
  fdv: string;
  minTicket: string;
  maxTicket: string;
  cliff: string;
  vesting: string;
};

export const ROUNDS: Round[] = [
  {
    id: "bridge",
    label: "Bridge Sale",
    title: "Bridge Round",
    launchPrice: "$0.008",
    roundFunding: "$250,000",
    supplyPct: "3%",
    supplyAmount: "30,000,000 DIGIM",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "$1,000,000",
    fdv: "$2,500,000",
    minTicket: "$5K",
    maxTicket: "$50K",
    cliff: "6 months",
    vesting: "12 months",
  },
  {
    id: "private",
    label: "Private Sale",
    title: "Private Sale",
    launchPrice: "$0.014",
    roundFunding: "$1,250,000",
    supplyPct: "9%",
    supplyAmount: "90,000,000 DIGIM",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "$1,777,778",
    fdv: "$13,000,000",
    minTicket: "$25K",
    maxTicket: "$250K",
    cliff: "6 months",
    vesting: "6 months",
  },
  {
    id: "presale",
    label: "Pre-Sale",
    title: "Pre-Sale",
    launchPrice: "$0.025",
    roundFunding: "$500,000",
    supplyPct: "2%",
    supplyAmount: "20,000,000 DIGIM",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "$3,200,000",
    fdv: "$25,000,000",
    minTicket: "$50",
    maxTicket: "$10K",
    cliff: "2 months",
    vesting: "1 month",
  },
  {
    id: "public",
    label: "Public Sale",
    title: "Public Sale",
    launchPrice: "$0.063",
    roundFunding: "$500,000",
    supplyPct: "4%",
    supplyAmount: "40,000,000 DIGIM",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "$8,000,000",
    fdv: "$62,000,000",
    minTicket: "$50",
    maxTicket: "$10K",
    cliff: "0 months",
    vesting: "0 months",
  },
];

export const CENTRALIZED = [
  "Exchange's Crypto",
  "AI Battleroom",
  "Digital Markets Vaults",
  "Debit Card Rewards",
  "Swap Engine",
];

export const DECENTRALIZED = [
  "Access to Staking Vaults",
  "Best Price Routing",
  "Access DeFi Marketplace",
  "Enables AI Co-Pilot",
  "Governance Voting",
];

export const HERO_STATS = [
  { k: "Total raise", v: "$4.25M" },
  { k: "Total supply", v: "1,000,000,000" },
  { k: "ICS", v: "7.9%" },
  { k: "TGE", v: "Q3 · 2027" },
  { k: "Mintable", v: "No" },
  { k: "Burnable", v: "Yes" },
  { k: "Chain", v: "TBA" },
];

export const HERO_TICKER = [
  "DIGIM",
  "IDO · Q3 2027",
  "1,000,000,000 SUPPLY",
  "$4.25M TOTAL RAISE",
  "DUAL PLATFORM",
  "DIGIPAGA × DIGIMERCADOS",
  "CONFIDENTIAL — DO NOT DISTRIBUTE",
  "PRIVATE INVESTOR BRIEF",
  "REV. 01",
];

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
