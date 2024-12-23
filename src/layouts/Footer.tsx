// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4 mt-8">
      <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Decentralized Exchange. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
