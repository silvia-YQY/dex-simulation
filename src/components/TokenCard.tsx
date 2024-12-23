// src/components/TokenCard.tsx
import React from "react";

interface TokenCardProps {
  tokenSymbol: string;
  tokenName: string;
  price: string;
}

export default function TokenCard({
  tokenSymbol,
  tokenName,
  price,
}: TokenCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">
        {tokenName} ({tokenSymbol})
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Price: ${price}
      </p>
    </div>
  );
}
