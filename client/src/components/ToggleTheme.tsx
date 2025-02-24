"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="h-6 w-8 md:h-8 md:w-10 text-xs md:text-base text-center flex justify-center items-center rounded-full border-gray-500 dark:border-gray-100 border absolute right-5 top-5"
    >
      {resolvedTheme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
