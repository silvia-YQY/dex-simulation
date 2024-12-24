import React, { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or existing user preference
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const userPreference = localStorage.getItem("theme");

    if (userPreference) {
      setIsDarkMode(userPreference === "dark");
      document.documentElement.classList.toggle(
        "dark",
        userPreference === "dark"
      );
    } else {
      setIsDarkMode(isSystemDark);
      document.documentElement.classList.toggle("dark", isSystemDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    const newTheme = !isDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Save user preference
  };

  return (
    <header className="bg-yellow dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex gap-10">
          <h1 className="text-3xl font-bold text-blue-600">DEX</h1>

          <button
            onClick={toggleTheme}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m6.364 1.636l-1.414 1.414M21 12h-2m-1.636 6.364l-1.414-1.414M12 21v-2m-6.364-1.636l1.414-1.414M3 12h2m1.636-6.364L5.222 6.05M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            ) : (
              // Dark Mode Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0112 21c-5.523 0-10-4.477-10-10 0-4.478 2.937-8.28 7-9.567a.75.75 0 01.902.911A7.5 7.5 0 1019.82 14.1a.75.75 0 011.082.902z"
                />
              </svg>
            )}
          </button>
        </div>

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
