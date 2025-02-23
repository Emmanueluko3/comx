"use client";
import { motion } from "framer-motion";
import SideNav from "@/components/SideNav";
import React, { Suspense } from "react";
import withAuth from "@/utils/withAuth";
import { Loader } from "@/components/common/Loader";

interface DashboardLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  header,
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)] w-full"
    >
      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-[auto_1fr] h-full w-full">
          <div className="flex items-center justify-center h-full relative">
            <SideNav />
          </div>

          <main className="w-full h-full flex flex-col">
            {header}
            <div className={`${className} flex-grow`}>{children}</div>
          </main>
        </div>
      </Suspense>
    </motion.div>
  );
};

export default withAuth(DashboardLayout);
