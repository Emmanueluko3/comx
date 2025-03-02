"use client";
import React, { useEffect } from "react";
import FormField from "../formik/Input";
import { Form, Formik } from "formik";
import { individualValidationSchemas } from "@/utils/schema";
import { individualSteps } from "@/utils/constants";
import BackButton from "../common/BackButton";
import Button from "../common/Button";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { usePersistFormik } from "@/hooks/usePersistFormik";

interface IndividualFormProps {
  step: string;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

const IndividualForm = ({ step }: IndividualFormProps) => {
  const { handleRegisterUser, handleVerifyUserOTP } = useAuth();
  const router = useRouter();
  const params = useParams();

  const handleNextStep = (nextStep: string) => {
    router.push(nextStep);
  };

  const allSteps = individualSteps
    .map((step) => step.split("/").pop())
    .slice(1);

  const isBasicInformation = step === individualSteps[1].split("/").pop();
  const isLoginDetails = step === individualSteps[2].split("/").pop();
  const isOTPVerification = step === individualSteps[3].split("/").pop();
  const basicInformationStep = individualSteps[1].split("/").pop();
  const loginDetailsStep = individualSteps[2].split("/").pop();
  const OTPVerificationStep = individualSteps[3].split("/").pop();

  const [formValues, setFormValues] = usePersistFormik("formData", {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    otp: "",
  });

  // Prevent user from manually bypassing pages on invalid input
  useEffect(() => {
    const isBasicInfoValid = !(
      formValues.first_name?.trim() &&
      formValues.last_name?.trim() &&
      formValues.email?.trim()
    );

    const isLoginDetails = !(
      formValues.password.trim() &&
      formValues.confirm_password.trim() &&
      formValues.phone_number.trim()
    );

    if (loginDetailsStep === params.step && isBasicInfoValid) {
      router.replace(individualSteps[1]);
    }
    if (OTPVerificationStep === params.step && isLoginDetails) {
      router.replace(individualSteps[1]);
    }
  }, [formValues, router, OTPVerificationStep, loginDetailsStep]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    setFormValues(values);
    try {
      const nextStep = allSteps[allSteps.indexOf(step) + 1] || null;

      if (step === basicInformationStep) {
        return nextStep && handleNextStep(nextStep);
      }

      if (step === loginDetailsStep) {
        const { otp, confirm_password, ...payload } = values;

        if (!isFormComplete(payload)) {
          router.push(individualSteps[1]);
          return;
        }
        payload.user_type = "individual";
        const response = await handleRegisterUser(
          payload,
          "register-individual"
        );

        if (response) return nextStep && handleNextStep(nextStep);
      }

      if (step === OTPVerificationStep) {
        const response = await handleVerifyUserOTP({
          otp: values.otp,
          email: values.email,
        });
        if (response) return nextStep && handleNextStep(nextStep);
      }
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormComplete = (values: any) => {
    return Object.values(values).every((val: any) => val.trim() !== "");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={individualValidationSchemas[step]}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="grid grid-flow-row grid-cols-2 gap-4 w-full">
          {isBasicInformation && (
            <BasicInformation errors={errors} touched={touched} />
          )}
          {isLoginDetails && <LoginDetails errors={errors} touched={touched} />}
          {isOTPVerification && (
            <OTPVerification errors={errors} touched={touched} />
          )}
          <div
            className={`flex ${
              isBasicInformation ? "justify-center" : "justify-between"
            } items-center col-span-full mt-10`}
          >
            {!isBasicInformation && (
              <BackButton
                type="button"
                disabled={isSubmitting}
                className="w-fit px-0 rounded-sm col-span-full bg-transparent hover:bg-transparent hover:text-gray-900 text-gray-600"
              >
                BACK
              </BackButton>
            )}
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="w-fit px-0 rounded-sm bg-transparent hover:bg-transparent hover:text-red-700 text-red-600"
            >
              {isBasicInformation && "NEXT STEP"}

              {isLoginDetails && "FINISH"}

              {isOTPVerification && "VERIFY"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default IndividualForm;

const BasicInformation = ({ errors, touched }: any) => {
  return (
    <>
      <FormField
        label="Your First Name"
        type="text"
        name="first_name"
        errors={errors}
        placeholder="Enter Your First Name"
        touched={touched}
      />
      <FormField
        label="Your Last Name"
        type="text"
        name="last_name"
        errors={errors}
        placeholder="Enter Your Last Name"
        touched={touched}
      />
      <div className="col-span-full">
        <FormField
          label="Your Email"
          type="email"
          name="email"
          errors={errors}
          placeholder="Enter your email"
          touched={touched}
        />
      </div>
    </>
  );
};

const LoginDetails = ({ errors, touched }: any) => {
  return (
    <>
      <FormField
        label="Password"
        type="password"
        name="password"
        errors={errors}
        placeholder="Enter your password"
        touched={touched}
      />
      <FormField
        label="Confirm Password"
        type="password"
        name="confirm_password"
        errors={errors}
        placeholder="Confirm your password"
        touched={touched}
      />
      <div className="col-span-full">
        <FormField
          label="Phone Number"
          type="text"
          name="phone_number"
          errors={errors}
          placeholder="Enter your phone number"
          touched={touched}
        />
      </div>
    </>
  );
};

const OTPVerification = ({ errors, touched, values }: any) => {
  return (
    <>
      <div className="col-span-full">
        <p className="text-sm md:text-sm mb-3">
          Enter the 4-digit code that was sent to {values?.phone_number} and{" "}
          {values?.email}
        </p>
        <FormField
          type="text"
          name="otp"
          errors={errors}
          placeholder="Enter OTP"
          touched={touched}
        />
      </div>
    </>
  );
};
