"use client";
import React, { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

interface SwapProps {
  signer?: ethers.Signer; // Accept signer as a prop
}
const tokenPresets = [
  { symbol: "WBNB", address: "0x123..." },
  { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0" },
  { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
];

const tokenABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
];
const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // PancakeSwap Router
const routerABI = [
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
];
const Swap: React.FC<SwapProps> = ({ signer }) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [outputToken, setOutputToken] = useState("");
  const [amountIn, setAmountIn] = useState("");
  const [amountOutMin, setAmountOutMin] = useState("");
  const [status, setStatus] = useState("");

  const approveToken = async (tokenAddress: string, amount: string) => {
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    const estimatedGas = await tokenContract.estimateGas.approve(
      routerAddress,
      ethers.utils.parseUnits(amount, 18)
    );
    const gasLimit = estimatedGas.mul(120).div(100);
    const tx = await signer?.sendTransaction({
      to: routerAddress,
      data: tokenContract.interface.encodeFunctionData("approve", [
        routerAddress,
        ethers.utils.parseUnits(amount, 18),
      ]), // Encoded function call (approve or swap)
      gasLimit,
    });
    setStatus(`Approval transaction submitted: ${tx?.hash}`);
    await tx?.wait();
    setStatus("Approval confirmed!");
  };

  const handleSwap = async () => {
    if (!signer) {
      console.log("No signer found. Please connect your wallet.");
      return;
    }

    if (!walletClient || !address) {
      setStatus("Please connect your wallet.");
      return;
    }

    if (!inputToken || !ethers.utils.isAddress(inputToken)) {
      setStatus("Invalid input token address.");
      return;
    }
    if (!outputToken || !ethers.utils.isAddress(outputToken)) {
      setStatus("Invalid output token address.");
      return;
    }
    if (!amountIn || parseFloat(amountIn) <= 0) {
      setStatus("Amount in must be greater than zero.");
      return;
    }
    if (!amountOutMin || parseFloat(amountOutMin) <= 0) {
      setStatus("Minimum amount out must be greater than zero.");
      return;
    }

    if (
      !ethers.utils.isAddress(inputToken) ||
      !ethers.utils.isAddress(outputToken)
    ) {
      setStatus("Invalid token address.");
      return;
    }

    if (parseFloat(amountIn) <= 0 || parseFloat(amountOutMin) <= 0) {
      setStatus("Amounts must be greater than zero.");
      return;
    }
    setIsLoading(true);
    try {
      setStatus("Approving token...");
      await approveToken(inputToken, amountIn);

      setStatus("Swapping tokens...");
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
        deadline,
        { gasLimit: ethers.utils.hexlify(200000) }
      );

      setStatus(`Transaction submitted: ${tx.hash}`);
      await tx.wait();
      setStatus("Swap confirmed!");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "reason" in error
      ) {
        setStatus(`Error: ${(error as { reason: string }).reason}`);
      } else {
        setStatus("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
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
          {/* <input
            type="text"
            placeholder="0x..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-yellow-400"
          /> */}
          <select
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Token</option>
            {tokenPresets.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
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
          disabled={isLoading}
          className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition-all"
        >
          {isLoading ? "Processing..." : "Swap"}
        </button>
        <p className="text-sm text-gray-400 text-red text-center mt-3">
          {status}
        </p>
      </div>
    </div>
  );
};

export default Swap;
