"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AnimatePresence } from "framer-motion";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AnimatePresence>
  );
};

export default Providers;
