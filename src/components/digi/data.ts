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
  {
    name: "John Doe",
    role: "Founder & CEO",
    prev: "Former Wall Street quant with 15 years in digital asset markets and exchange infrastructure.",
  },
  {
    name: "Maria Garcia",
    role: "Chief Technology Officer",
    prev: "Ex-Stripe engineer who built payment rails for three fintech unicorns across LATAM.",
  },
  {
    name: "David Kim",
    role: "Head of AI",
    prev: "PhD in Machine Learning from MIT. Published 40+ papers on autonomous financial systems.",
  },
  {
    name: "Sarah Chen",
    role: "Head of Partnerships",
    prev: "Former Binance BD lead. Built the LATAM expansion strategy from zero to 2M users.",
  },
  {
    name: "James Wilson",
    role: "Chief Security Officer",
    prev: "Ex-Coinbase security. Audited and secured over $2B in smart contract value.",
  },
  {
    name: "Aisha Patel",
    role: "Head of Community",
    prev: "Built and managed crypto-native communities of 500K+ members across emerging markets.",
  },
];

export const DISTRIBUTION_DETAILS: [string, string][] = [
  ["Bridge Round", "Early-stage high-risk round for Angel Investors. Q2–Q3 2026. Min $5K · Max $50K"],
  ["Private Sale", "Pre-Seed round. Locked 6 months, 6-month vesting. Q1–Q2 2027. Min $25K · Max $250K"],
  ["Pre-Sale", "Pre-TGE sale at partner Launchpads and Communities. Q2 2027. Min $20 · Max $3,000"],
  ["Public Sale", "Multi-launchpad fixed-price sale for community access. Q3 2027. Min $10 · Max $10,000"],
  ["Listing & Market Making", "Locked liquidity to fulfill AMM and order books across DEX and CEX. Q3 2027."],
  ["Incinerator", "Systematic burns to balance new issuance and enable cross-chain wrapping of DIGI."],
  ["Wallet Community", "Users receive 10 DIGIM on download when they invite 3 contacts to join."],
  ["Team", "Core team committed to burning at least 30% of team-allocated supply."],
  ["DAO Treasury", "Multi-sig vault unlockable by community vote — reserved for growth hacking and emergency burns."],
];

export const PLATFORM_FEATURES = {
  digimercados: ["Hybrid Smart Wallet", "CEX + DEX in one", "AI Trading & Yield", "Digital Markets"],
  digipaga: ["Agentic Commerce", "Borderless Payments", "Debit Card", "On and Off Ramps"],
};
