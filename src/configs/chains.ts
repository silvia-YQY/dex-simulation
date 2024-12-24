import { createStorage } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

const isBrowser = typeof window !== "undefined";

export const wagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "52d67f11ca895dfa5e6056ef260c33da",
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  storage: createStorage({
    storage: isBrowser
      ? localStorage // Use localStorage in the browser
      : {
          // Fallback to in-memory storage during SSR
          getItem: () => null,
          setItem: () => undefined,
          removeItem: () => undefined,
        },
  }),
});
