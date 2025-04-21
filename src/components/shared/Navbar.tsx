"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
 
  const mainNavLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },

  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 container mx-auto mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
      
          <div className="flex items-center">
            <div className="flex items-center">
              <svg 
                className="h-6 w-6 text-teal-600 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
                />
              </svg>
              <span className="text-xl font-bold text-teal-600">FineMed</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {mainNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href 
                    ? 'bg-teal-600 text-white' 
                    : 'text-gray-700 hover:bg-teal-100 hover:text-teal-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/login" 
                  ? 'bg-teal-600 text-white' 
                  : 'text-gray-700 hover:bg-teal-100 hover:text-teal-800'
              }`}
            >
              Login
            </Link>

            {/* Mobile menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown  */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white shadow-md">
          {mainNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === href 
                  ? 'bg-teal-600 text-white' 
                  : 'text-gray-700 hover:bg-teal-100 hover:text-teal-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;