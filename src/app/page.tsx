"use client";
import React from "react";
import WalletButton from "@/components/WalletButton";
import TokenCard from "@/components/TokenCard";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Decentralized Exchange
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Trade your favorite tokens seamlessly and securely.
        </p>
      </section>

      {/* connect with wallet */}
      <section className="flex justify-center my-8">
        <WalletButton />
      </section>

      {/* display crypto exchange */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TokenCard tokenSymbol="BTC" tokenName="Bitcoin" price="50000" />
        <TokenCard tokenSymbol="ETH" tokenName="Ethereum" price="4000" />
        <TokenCard tokenSymbol="BNB" tokenName="Binance Coin" price="300" />
      </section>

      {/* 快速导航到交易功能 */}
      <section className="mt-12 text-center">
        <a
          href="/swap"
          className="inline-block px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Trading
        </a>
      </section>
    </div>
  );
}
