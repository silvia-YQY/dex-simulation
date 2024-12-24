"use client";
import React, { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

const PancakeSwapRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const routerABI = [
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
];

interface SwapProps {
  signer: ethers.Signer | null; // Accept signer as a prop
}

const Swap: React.FC<SwapProps> = ({ signer }) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [inputToken, setInputToken] = useState("");
  const [outputToken, setOutputToken] = useState("");
  const [amountIn, setAmountIn] = useState("");
  const [amountOutMin, setAmountOutMin] = useState("");
  const [status, setStatus] = useState("");

  const handleSwap = async () => {
    if (!signer) {
      console.log("No signer found. Please connect your wallet.");
      return;
    }

    if (!walletClient || !address) {
      setStatus("Please connect your wallet.");
      return;
    }

    try {
      const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // PancakeSwap Router
      const routerABI = [
        "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      ];

      const routerContract = new ethers.Contract(
        routerAddress,
        routerABI,
        signer
      );

      const path = [inputToken, outputToken];
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      const tx = await routerContract.swapExactTokensForTokens(
        ethers.utils.parseUnits(amountIn, 18),
        ethers.utils.parseUnits(amountOutMin, 18),
        path,
        await signer.getAddress(),
        deadline
      );

      setStatus(`Transaction submitted: ${tx.hash}`);
      await tx.wait();
      setStatus("Transaction confirmed!");
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen text-white p-5">
      <h1 className="text-3xl font-bold text-yellow-400 mb-5">Swap Tokens</h1>
      <div className="bg-gray-800 rounded-lg p-5 shadow-md max-w-md w-full">
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Input Token Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Output Token Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Amount In</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Minimum Amount Out
          </label>
          <input
            type="number"
            placeholder="Enter minimum output"
            value={amountOutMin}
            onChange={(e) => setAmountOutMin(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button
          onClick={handleSwap}
          className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition-all"
        >
          Swap
        </button>
        <p className="text-sm text-gray-400 text-center mt-3">{status}</p>
      </div>
    </div>
  );
};

export default Swap;
