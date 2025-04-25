"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/protectedRoutes/ProtectedRouteProps";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Medicines", path: "/admin/medicines" },
    { name: "Users", path: "/admin/users" },
    { name: "Orders", path: "/admin/orders" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-[100vh] flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
            <nav className={`md:flex ${isMenuOpen ? "block" : "hidden"} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent`}>
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`py-2 px-4 text-sm ${
                      pathname === item.path
                        ? "bg-gray-700 text-white md:bg-transparent md:border-b-2 md:border-white"
                        : "text-gray-300 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-white"
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content (Outlet-like) */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboardLayout;