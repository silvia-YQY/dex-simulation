// src/components/TokenCard.tsx
import React, { useEffect, useState } from "react";

interface TokenCardProps {
  tokenSymbol: string;
  tokenName: string;
}

export default function TokenCard({ tokenSymbol, tokenName }: TokenCardProps) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${tokenSymbol.toLowerCase()}usdt@trade`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(parseFloat(data.p)); // 'p' is the price field
    };

    return () => ws.close(); // Clean up on unmount
  }, [tokenSymbol]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">
        {tokenName} ({tokenSymbol})
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Price:${price ? price.toFixed(5) : "Loading..."}
      </p>
    </div>
  );
}
