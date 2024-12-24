"use client";
// src/app/layout.tsx
import React from "react";
import "windi.css";
import "@/styles/globals.css"; // 全局样式
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
