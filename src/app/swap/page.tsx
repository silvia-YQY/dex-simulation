"use client";
import React, { useEffect, useState } from "react";
import Swap from "@/components/Swap";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

const SwapPage = () => {
  const { isConnected } = useAccount(); // Check if wallet is connected
  const { data: walletClient } = useWalletClient(); // Get wallet client
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  // useEffect(() => {
  //   if (isConnected && walletClient) {
  //     const provider = new ethers.providers.Web3Provider(walletClient);
  //     setSigner(provider.getSigner());
  //   }
  // }, [isConnected, walletClient]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Swap signer={signer} />
    </div>
  );
};

export default SwapPage;
