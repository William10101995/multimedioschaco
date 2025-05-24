"use client";
import { useEffect } from "react";

export default function HlsLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
