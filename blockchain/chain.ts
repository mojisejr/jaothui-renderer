import { Chain } from "viem";
export const bitkub_mainnet: Chain = {
  id: 96,
  name: "Bitkub",
  nativeCurrency: {
    decimals: 18,
    name: "KUB",
    symbol: "KUB",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.bitkubchain.io"],
    },
    public: {
      http: ["https://rpc.bitkubchain.io"],
    },
  },
  blockExplorers: {
    default: { name: "BKCScan", url: "https://bkcscan.com" },
  },
  testnet: false,
};

export const bitkub_testnet: Chain = {
  id: 25_925,
  name: "bitkub_testnet",
  nativeCurrency: {
    decimals: 18,
    name: "KUB",
    symbol: "KUB",
  },
  rpcUrls: {
    default: { http: ["https://rpc-testnet.bitkubchain.io"] },
    public: {
      http: ["https://rpc.bitkubchain.io"],
    },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.bkcscan.com" },
  },
  testnet: false,
};
