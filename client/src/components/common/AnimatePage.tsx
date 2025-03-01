"use client";

import { motion } from "framer-motion";

export default function AnimatePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-lg w-full flex flex-col items-center justify-center p-4 sm:p-10 bg-transparent sm:bg-white sm:rounded-sm mb-10 sm:dark:text-gray-800"
    >
      {children}
    </motion.div>
  );
}
