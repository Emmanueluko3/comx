"use client";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ToggleTheme";
import Logo from "@/components/common/Logo";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] relative"
    >
      <ThemeToggle />
      <main className="flex flex-col row-start-2 items-center w-full">
        <Logo className="mb-12" />
        hi dashboard
      </main>
    </motion.div>
  );
}
