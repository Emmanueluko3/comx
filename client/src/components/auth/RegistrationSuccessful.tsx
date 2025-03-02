import React from "react";
import Image from "next/image";
import { PAGES } from "@/utils/constants";
import Link from "next/link";
import AnimatePage from "../common/AnimatePage";
interface RegistrationSuccessfulProps {
  username: string;
}
function RegistrationSuccessful({ username }: RegistrationSuccessfulProps) {
  return (
    <AnimatePage>
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
    </AnimatePage>
  );
}

export default RegistrationSuccessful;
