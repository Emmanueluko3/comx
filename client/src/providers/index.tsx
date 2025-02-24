"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Toaster position="top-center" richColors duration={5000} />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </AnimatePresence>
  );
};

export default Providers;
