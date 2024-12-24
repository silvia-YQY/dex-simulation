"use client";

import React from "react";
import TradingHistory from "@/components/TradingHistory";
import { useAccount } from "wagmi";

const HistoryPage = () => {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <p className="text-center text-red-500">
        Please connect your wallet to view your history.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <TradingHistory walletAddress={address!} />
    </div>
  );
};

export default HistoryPage;
