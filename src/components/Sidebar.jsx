"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ onClose }) {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Clients", icon: Users, href: "/clients" },
    { name: "Reports", icon: FileText, href: "/reports" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  const isActive = (href) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <div className="w-60 bg-[#F3F3F3] dark:bg-[#1A1A1A] flex-shrink-0 flex flex-col h-full">
      {/* Brand Logo */}
      <div className="p-4 flex justify-start">
        <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl flex items-center justify-center">
          <span className="text-white text-xl font-bold font-sora">M</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (
                    onClose &&
                    typeof window !== "undefined" &&
                    window.innerWidth < 1024
                  ) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-white dark:bg-[#262626] border border-[#E4E4E4] dark:border-[#404040] text-black dark:text-white"
                    : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 active:bg-white/70 dark:active:bg-white/15 active:scale-[0.98]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className={
                      active
                        ? "text-black dark:text-white"
                        : "text-black/70 dark:text-white/70"
                    }
                  />
                  <span
                    className={`font-medium text-sm font-plus-jakarta ${
                      active
                        ? "text-black dark:text-white"
                        : "text-black/70 dark:text-white/70"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <a
          href="/account/logout"
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 active:bg-white/70 dark:active:bg-white/15 active:scale-[0.98] transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm font-plus-jakarta">Logout</span>
        </a>
      </div>
    </div>
  );
}
