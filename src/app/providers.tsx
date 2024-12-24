"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { mainnet } from "wagmi/chains";
import { wagmiConfig } from "@/configs/chains";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={mainnet}
          showRecentTransactions={true}
          locale="en-US"
        >
          <main className="min-h-screen">{children}</main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
