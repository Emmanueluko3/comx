"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </AnimatePresence>
  );
};

export default Providers;
