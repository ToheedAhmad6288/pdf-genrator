// src/components/Navbar.tsx
import { useState, useEffect } from "react";


interface NavbarProps {
  onNavigate?: (page: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {}
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));


  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0b1220] text-white' : 'bg-white text-black'} shadow-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
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
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick("features")}
              className="px-4 py-2 rounded-lg transition-all text-sm font-medium"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="px-4 py-2 rounded-lg transition-all text-sm font-medium"
            >
              About
            </button>
            <a href="#" className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-primary-800 hover:shadow-lg px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm">
              Get Started
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2 p-2 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zM4.22 4.22a.75.75 0 011.06 0l.88.88a.75.75 0 11-1.06 1.06l-.88-.88a.75.75 0 010-1.06zM13.84 13.84a.75.75 0 011.06 0l.88.88a.75.75 0 11-1.06 1.06l-.88-.88a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75H4a.75.75 0 010 1.5H2.75A.75.75 0 012 10zM16 10a.75.75 0 01.75-.75H18a.75.75 0 010 1.5h-1.25A.75.75 0 0116 10zM4.22 15.78a.75.75 0 010-1.06l.88-.88a.75.75 0 111.06 1.06l-.88.88a.75.75 0 01-1.06 0zM13.84 6.16a.75.75 0 010-1.06l.88-.88a.75.75 0 111.06 1.06l-.88.88a.75.75 0 01-1.06 0zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 0010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slideInDown bg-gradient-to-b from-primary-600 to-primary-700">
            <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
              <button
                onClick={() => handleNavClick("features")}
                className="block text-left px-4 py-2 text-yellow-100 rounded-lg transition-colors text-sm font-medium"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="block w-full text-left px-4 py-2 text-yellow-100 rounded-lg transition-colors text-sm font-medium"
              >
                About
              </button>
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
