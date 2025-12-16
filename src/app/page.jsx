"use client";

import { useEffect } from "react";
import useUser from "@/utils/useUser";

export default function Home() {
  const { data: user, loading } = useUser();

  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      if (user) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/account/signin";
      }
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center">
      <p className="text-[#6F6F6F] dark:text-[#AAAAAA] font-inter">
        Loading...
      </p>
    </div>
  );
}
