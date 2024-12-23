import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-yellow dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">DEX</h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-24">
          <a
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="/swap"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            Swap
          </a>
          <a
            href="/history"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            History
          </a>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}

      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-yellow dark:bg-gray-800 transition-all duration-300 ease-in-out`}
      >
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <a
              href="/"
              className="block text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/swap"
              className="block text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              Swap
            </a>
          </li>
          <li>
            <a
              href="/history"
              className="block text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              History
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
