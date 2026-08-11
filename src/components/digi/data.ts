export type Slice = {
  key: string;
  label: string;
  pct: number;
  tokens: string;
  price: string;
  raise: string;
  tge: string;
  cliff: string;
  vesting: string;
  color: string;
};

export const TOKENOMICS: Slice[] = [
  { key: "bridge", label: "Bridge Round", pct: 5, tokens: "50,000,000", price: "$0.0025", raise: "$125,000", tge: "10%", cliff: "6", vesting: "12", color: "var(--chart-1)" },
  { key: "private", label: "Private Sale", pct: 11, tokens: "110,000,000", price: "$0.005", raise: "TBA", tge: "20%", cliff: "6", vesting: "6", color: "var(--chart-2)" },
  { key: "presale", label: "Pre-Sale", pct: 2, tokens: "20,000,000", price: "$0.01", raise: "TBA", tge: "50%", cliff: "2", vesting: "0", color: "var(--chart-3)" },
  { key: "public", label: "Public Sale", pct: 6, tokens: "60,000,000", price: "$0.015–$0.02", raise: "TBA", tge: "100%", cliff: "0", vesting: "0", color: "var(--chart-4)" },
  { key: "listing", label: "Listing & Market Making", pct: 20, tokens: "200,000,000", price: "—", raise: "—", tge: "10%", cliff: "6", vesting: "0", color: "var(--chart-5)" },
  { key: "incinerator", label: "Incinerator", pct: 10, tokens: "100,000,000", price: "—", raise: "—", tge: "25%", cliff: "0", vesting: "42", color: "var(--chart-6)" },
  { key: "wallet", label: "Wallet Community", pct: 5, tokens: "50,000,000", price: "—", raise: "—", tge: "25%", cliff: "0", vesting: "60", color: "var(--chart-7)" },
  { key: "team", label: "Team", pct: 11, tokens: "110,000,000", price: "—", raise: "—", tge: "0%", cliff: "12", vesting: "12", color: "var(--chart-8)" },
  { key: "dao", label: "DAO Treasury", pct: 30, tokens: "300,000,000", price: "—", raise: "—", tge: "0%", cliff: "0", vesting: "0", color: "var(--chart-9)" },
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
    launchPrice: "$0.0025",
    roundFunding: "$125,000 target",
    supplyPct: "5%",
    supplyAmount: "50,000,000 DIGI",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "TBA",
    fdv: "$2.5M target",
    minTicket: "$5K",
    maxTicket: "$50K",
    cliff: "6 months",
    vesting: "12 months",
  },
  {
    id: "private",
    label: "Private Sale",
    title: "Private / Pre-Seed",
    launchPrice: "$0.005",
    roundFunding: "TBA",
    supplyPct: "11%",
    supplyAmount: "110,000,000 DIGI",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "TBA",
    fdv: "$5M target",
    minTicket: "$25K",
    maxTicket: "$250K",
    cliff: "6 months",
    vesting: "6 months",
  },
  {
    id: "presale",
    label: "Pre-Sale",
    title: "Pre-Sale",
    launchPrice: "$0.01",
    roundFunding: "TBA",
    supplyPct: "2%",
    supplyAmount: "20,000,000 DIGI",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "TBA",
    fdv: "$10M target",
    minTicket: "$50",
    maxTicket: "$10K",
    cliff: "2 months",
    vesting: "1 month",
  },
  {
    id: "public",
    label: "Public Sale",
    title: "Public Sale / TGE",
    launchPrice: "$0.015–$0.02",
    roundFunding: "TBA",
    supplyPct: "6%",
    supplyAmount: "60,000,000 DIGI",
    currencies: "USDT, DAI, USDC",
    network: "TBA",
    initMarketCap: "TBA",
    fdv: "$15M–$20M target",
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
  { k: "Total supply", v: "1,000,000,000 DIGI" },
  { k: "Bridge FDV", v: "$2.5M target" },
  { k: "Bridge price", v: "$0.0025" },
  { k: "Target TGE FDV", v: "$15M–$20M" },
  { k: "Minting", v: "No" },
  { k: "Burnable", v: "Yes" },
  { k: "Chain", v: "TBA" },
];

export const HERO_TICKER = [
  "DIGI",
  "BRIDGE ROUND",
  "1,000,000,000 SUPPLY",
  "$125,000 TARGET RAISE",
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

export type TeamSocial = { type: "linkedin" | "github" | "x"; url: string };

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  desc: string;
  socials: TeamSocial[];
};

export const TEAM: TeamMember[] = [
  {
    name: "Oscar",
    role: "CEO & Co-Founder",
    initials: "OS",
    desc: "Co-founder leading company strategy and direction as CEO.",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com/in/olahventures" },
      { type: "github", url: "https://www.github.com/okite" },
      { type: "x", url: "https://x.com/ozkite" },
    ],
  },
  {
    name: "Otto",
    role: "CTO & Co-Founder",
    initials: "OT",
    desc: "Co-founder leading engineering and technical architecture as CTO.",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com/in/otto-blockchain" },
      { type: "github", url: "https://www.github.com/ottodevs" },
      { type: "x", url: "https://x.com/aerovalencia" },
    ],
  },
  {
    name: "Daniel",
    role: "Solution Architect",
    initials: "DA",
    desc: "Designs the solution architecture across the Digi-Agent platform stack.",
    socials: [],
  },
  {
    name: "Azahel",
    role: "Compliance",
    initials: "AZ",
    desc: "Leads compliance across the Digi-Agent ecosystem.",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com/in/azahel-h-a823323a/" },
    ],
  },
];

export const OPEN_ROLES = ["Head of Growth", "Head of Community", "Security Lead"];

// ─── Agent-nomics ───
export const AI_ACCESS_TIERS = ["$3", "$4", "$5", "$6"];

export const INCINERATOR_EXAMPLE = {
  accessUsd: "$5 USDC",
  accessNote: "User's AI access remains: $5/month.",
  scenarios: [
    { digiPrice: "$0.0025", digiRequired: "2,000 DIGI" },
    { digiPrice: "$0.005", digiRequired: "1,000 DIGI" },
    { digiPrice: "$0.01", digiRequired: "500 DIGI" },
  ],
};

// TEMPORARY ILLUSTRATIVE CHART DATA — replace these arrays with real
// tokenomics series when available. Values are relative (0–100).
export const ILLUSTRATIVE_BREAK_SERIES = {
  circulatingSupply: [18, 30, 42, 55, 68, 82, 95],
  demand: [72, 66, 57, 47, 37, 29, 22],
  tradingVolume: [62, 58, 50, 41, 32, 25, 19],
  adoption: [56, 53, 46, 38, 30, 23, 17],
};

export const ILLUSTRATIVE_DIGI_MODEL_SERIES = {
  utilityConsumption: [8, 20, 33, 47, 61, 75, 90],
  tokensRemoved: [4, 14, 26, 39, 53, 67, 81],
};

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
