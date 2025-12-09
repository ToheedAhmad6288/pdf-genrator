// src/components/Navbar.tsx
import { useState } from "react";
import { getThemeClass } from "../hooks/useTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navClass = getThemeClass('navbar', 'default');

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center font-bold text-primary-900 text-lg sm:text-xl shadow-lg hover:scale-110 transition-transform duration-300">
              PDF
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-2xl text-black tracking-tight">
                PDF Suite
              </h1>
              <p className="text-xs sm:text-sm text-yellow-400">Professional Converter Tools</p>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-800 transition-colors text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-black hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all text-sm font-medium">
              Features
            </a>
            <a href="#about" className="text-black hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all text-sm font-medium">
              About
            </a>
            <a href="#" className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-primary-800 hover:shadow-lg px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm">
              Get Started
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slideInDown bg-gradient-to-b from-primary-600 to-primary-700">
            <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
              <a
                href="#features"
                className="block px-4 py-2 text-yellow-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-4 py-2 text-yellow-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
              >
                About
              </a>
              <button className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 text-primary-800 hover:shadow-lg px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
