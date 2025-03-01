"use client";

import { individualSteps } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import RegistrationSuccessful from "@/components/auth/RegistrationSuccessful";
import { Loader } from "@/components/common/Loader";

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

export default function Register() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/register") {
      router.replace(individualSteps[1]);
    }
  }, [router]);

  if (pathname === individualSteps[4].split("/").pop()) {
    return <RegistrationSuccessful username={"Emmanuel"} />;
  }

  return <Loader />;
}
