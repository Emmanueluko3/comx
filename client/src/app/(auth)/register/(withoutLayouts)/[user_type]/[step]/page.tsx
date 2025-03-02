import IndividualForm from "@/components/auth/IndividualForm";
import RegistrationSuccessful from "@/components/auth/RegistrationSuccessful";
import CorporateForm from "@/components/auth/corporateForm";
import { Loader } from "@/components/common/Loader";
import { corporateSteps, individualSteps } from "@/utils/constants";

export default async function UserType({
  params,
}: {
  params: Promise<{ step: string; user_type: string }>;
}) {
  const step = (await params).step;

  const user_type = (await params).user_type;

  if (step === individualSteps[4].split("/").pop()) {
    return <RegistrationSuccessful username={"Emmanuel"} />;
  }
  if (user_type === individualSteps[0].split("/").pop()) {
    return <IndividualForm step={step} />;
  }
  if (user_type === corporateSteps[0].split("/").pop()) {
    return <CorporateForm step={step} />;
  }
  return <Loader />;
}
