import IndividualForm from "@/components/auth/IndividualForm";
import { Loader } from "@/components/common/Loader";
import React from "react";

export default async function UserType({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const step = (await params).step;
  if (step) {
    return <IndividualForm step={step} />;
  }
  return <Loader />;
}
