import { createThirdwebClient } from "thirdweb";

export const thirdwebClient = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID ?? "",
});

export const SAFE_WALLET =
  import.meta.env.VITE_SAFE_WALLET ?? "0x6De84ff2B533fcD822cd37913167bcc9cb8dDbfA";

// Stablecoin contract addresses per chain
export const STABLECOIN_ADDRESSES: Record<string, Record<string, string>> = {
  USDT: {
    BNB: "0x55d398326f99059fF775485246999027B3197955",
    Base: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
    Arbitrum: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    Ethereum: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    Optimism: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    Polygon: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    Hyper: "",
  },
  USDC: {
    BNB: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    Base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    Arbitrum: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    Ethereum: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    Optimism: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    Polygon: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    Hyper: "",
  },
  SKY: {
    Ethereum: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    BNB: "",
    Base: "",
    Arbitrum: "",
    Optimism: "",
    Polygon: "",
    Hyper: "",
  },
};

// Chain objects for Thirdweb
export { bsc, base, arbitrum, mainnet, optimism, polygon } from "thirdweb/chains";
