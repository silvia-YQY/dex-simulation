"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  confirmations: string;
}

const TradingHistory = ({ walletAddress }: { walletAddress: string }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.bscscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=YourApiKey`
      );

      if (response.data.status === "1") {
        setTransactions(response.data.result);
      } else {
        setError("No transactions found.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch transaction history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchHistory();
    }
  }, [walletAddress]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Trading History
      </h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {transactions.map((tx) => (
            <li key={tx.hash} className="mb-4">
              <p>
                <strong>Hash:</strong>{" "}
                <a
                  href={`https://bscscan.com/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {tx.hash}
                </a>
              </p>
              <p>
                <strong>From:</strong> {tx.from}
              </p>
              <p>
                <strong>To:</strong> {tx.to}
              </p>
              <p>
                <strong>Value:</strong> {ethers.utils.formatEther(tx.value)} BNB
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TradingHistory;
