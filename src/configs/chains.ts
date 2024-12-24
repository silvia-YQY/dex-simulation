import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

// export const wagmiConfig = getDefaultConfig({
//   appName: "My RainbowKit App",
//   projectId: "52d67f11ca895dfa5e6056ef260c33da",
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   transports: {
//     [mainnet.id]: http(),
//     [polygon.id]: http(),
//   },
// });

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
  ssr: true,
});
