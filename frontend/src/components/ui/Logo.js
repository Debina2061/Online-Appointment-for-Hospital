"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Logo = ({ className, size = "md" }) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Medical Cross Icon */}
      <div className="relative">
        <div
          className={cn(
            "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg p-2 shadow-lg",
            size === "sm" && "p-1.5",
            size === "lg" && "p-3",
            size === "xl" && "p-4"
          )}
        >
          <svg
            className={cn(
              "text-white",
              size === "sm" && "w-4 h-4",
              size === "md" && "w-5 h-5",
              size === "lg" && "w-6 h-6",
              size === "xl" && "w-8 h-8"
            )}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 2v8H2v4h8v8h4v-8h8V10h-8V2h-4z" />
          </svg>
        </div>
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-blue-400 rounded-lg animate-ping opacity-25"></div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent",
            sizes[size]
          )}
        >
          D-code
        </span>
        <span
          className={cn(
            "text-xs text-gray-500 dark:text-gray-400 font-medium -mt-1",
            size === "sm" && "text-[10px]",
            size === "lg" && "text-sm",
            size === "xl" && "text-base"
          )}
        >
          Hospital
        </span>
      </div>
    </div>
  );
};

export default Logo;
