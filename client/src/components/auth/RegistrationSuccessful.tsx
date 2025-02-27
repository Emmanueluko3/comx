import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PAGES } from "@/utils/constants";
import Link from "next/link";
interface RegistrationSuccessfulProps {
  username: string;
}
function RegistrationSuccessful({ username }: RegistrationSuccessfulProps) {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-lg w-full flex flex-col items-center justify-center p-4 sm:p-10 bg-transparent sm:bg-white sm:rounded-sm mb-10 sm:dark:text-gray-800"
    >
      <Image
        src="/images/registration-successful.png"
        alt=""
        width={500}
        height={500}
        className="md:w-64 mb-8"
      />
      <h2 className="text-center md:text-3xl text-xl font-normal mb-2 w-full">
        Registration Complete
      </h2>
      <p className="md:text-sm text-xs mb-8 text-center">
        Dear {username}. Your registration is now complete. You may proceed to
        your dashboard and start trading commodities.
      </p>
      <Link
        href={PAGES.dashboard.index}
        replace
        className="hover:text-red-700 text-red-600 font-medium"
      >
        GO TO DASHBOARD
      </Link>
    </motion.div>
  );
}

export default RegistrationSuccessful;
