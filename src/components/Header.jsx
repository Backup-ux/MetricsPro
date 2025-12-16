"use client";

import { Menu } from "lucide-react";

export default function Header({ onMenuClick, title = "Dashboard" }) {
  return (
    <div className="h-16 bg-[#F3F3F3] dark:bg-[#1A1A1A] flex items-center justify-between px-4 md:px-6 flex-shrink-0 border-b border-[#E6E6E6] dark:border-[#2A2A2A]">
      {/* Left side - Mobile menu button and title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-all duration-150 hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] active:bg-[#EEEEEE] dark:active:bg-[#2A2A2A] active:scale-95"
        >
          <Menu size={20} className="text-[#4B4B4B] dark:text-[#B0B0B0]" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight font-sora">
          {title}
        </h1>
      </div>

      {/* Right side - User info */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-black dark:text-white font-inter">
            MetricsPro
          </p>
        </div>
      </div>
    </div>
  );
}
