"use client";
// src/app/layout.tsx
import React from "react";
import "windi.css";
import "@/styles/globals.css"; // 全局样式
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

import { wagmiConfig } from "@/configs/chains";

import "@rainbow-me/rainbowkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const metadata = {
  title: "Decentralized Exchange",
  description: "A DEX platform inspired by Binance and Bybit",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* 顶部导航栏 */}
        <Header />
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {/* 主内容 */}
              <main className="min-h-screen">{children}</main>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        {/* 底部 */}
        <Footer />
      </body>
    </html>
  );
}
