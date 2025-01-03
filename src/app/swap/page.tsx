"use client";
import React, { useEffect, useState } from "react";
import Swap from "@/components/Swap";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

const SwapPage = () => {
  const { isConnected } = useAccount(); // Check if wallet is connected
  const { data: walletClient } = useWalletClient(); // Get wallet client
  const [signer, setSigner] = useState<ethers.Signer>();

  useEffect(() => {
    if (isConnected && walletClient) {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );
      const signer = provider.getSigner(walletClient.account.address);
      provider
        .getNetwork()
        .then((network) => {
          console.log("Network detected:", network);
        })
        .catch(async (error) => {
          console.error("Error detecting network:", error);
        });
      setSigner(signer);
    }
  }, [isConnected, walletClient]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Swap signer={signer} />
    </div>
  );
};

export default SwapPage;
