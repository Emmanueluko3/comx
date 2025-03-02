"use client";

import { individualSteps } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "@/components/common/Loader";

export default function Register() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/register") {
      router.replace(individualSteps[1]);
    }
  }, [router, pathname]);

  return <Loader />;
}
