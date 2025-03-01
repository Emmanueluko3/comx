import { Loader } from "@/components/common/Loader";
import { corporateSteps, individualSteps } from "@/utils/constants";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserType({
  params,
}: {
  params: Promise<{ user_type: string }>;
}) {
  const user_type = (await params).user_type;

  if (user_type === individualSteps[0].split("/").pop()) {
    redirect(individualSteps[1]);
  }
  if (user_type === corporateSteps[0].split("/").pop()) {
    redirect(corporateSteps[1]);
  }
  return <Loader />;
}
