"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export function SiteLogo({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className={`relative ${className}`}>
      <Image
        src={isDarkMode ? "/images/logo-dark.png" : "/images/logo-light.png"}
        alt="Multimedios Chaco"
        width={300}
        height={100}
        className="h-full w-auto transition-opacity duration-300"
        priority
      />
    </div>
  );
}
