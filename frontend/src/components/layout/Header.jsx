// frontend/src/components/layout/Header.jsx
"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

const Header = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      router.push("/"); // Redirect to home after logout
    } else {
      router.push("/auth/login");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="animate-pulse bg-gray-200 h-10 w-20 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Right Side - Auth & User Info */}
          <div className="flex items-center space-x-4">
            {/* User Info (if logged in) */}
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    Welcome,{" "}
                    {user.first_name ||
                      user.name ||
                      user.email?.split("@")[0] ||
                      "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.role || "Patient"}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {(user.first_name || user.name || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              </div>
            )}

            {/* Auth Button */}
            <button
              onClick={handleAuthAction}
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isAuthenticated
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 focus:ring-red-500"
                  : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 focus:ring-blue-500"
              }`}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
