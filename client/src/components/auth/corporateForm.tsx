"use client";
import React, { useEffect } from "react";
import FormField from "../formik/Input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { corporateValidationSchemas } from "@/utils/schema";
import { corporateSteps } from "@/utils/constants";
import BackButton from "../common/BackButton";
import Button from "../common/Button";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { usePersistFormik } from "@/hooks/usePersistFormik";

interface CorporateFormProps {
  step: string;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

const CorporateForm = ({ step }: CorporateFormProps) => {
  const { handleRegisterUser, handleVerifyUserOTP } = useAuth();
  const router = useRouter();
  const params = useParams();

  const handleNextStep = (nextStep: string) => {
    router.push(nextStep);
  };

  const allSteps = corporateSteps.map((step) => step.split("/").pop()).slice(1);

  const isCompanyInformation = step === corporateSteps[1].split("/").pop();
  const isLoginDetails = step === corporateSteps[2].split("/").pop();
  const isOTPVerification = step === corporateSteps[3].split("/").pop();
  const companyInformationStep = corporateSteps[1].split("/").pop();
  const loginDetailsStep = corporateSteps[2].split("/").pop();
  const OTPVerificationStep = corporateSteps[3].split("/").pop();

  const [formValues, setFormValues] = usePersistFormik("corporateFormData", {
    company_name: "",
    type_of_business: "",
    date_of_incorporation: "",
    email: "",
    password: "",
    confirm_password: "",
    otp: "",
  });

  // Prevent user from manually bypassing pages on invalid input
  useEffect(() => {
    const isCompanyInfoValid = !(
      formValues.company_name?.trim() &&
      formValues.type_of_business?.trim() &&
      formValues.date_of_incorporation?.trim()
    );

    const isLoginDetails = !(
      formValues.email.trim() &&
      formValues.password.trim() &&
      formValues.confirm_password.trim()
    );

    if (loginDetailsStep === params.step && isCompanyInfoValid) {
      router.replace(corporateSteps[1]);
    }
    if (OTPVerificationStep === params.step && isLoginDetails) {
      router.replace(corporateSteps[1]);
    }
  }, [formValues, router]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    setFormValues(values);
    try {
      const nextStep = allSteps[allSteps.indexOf(step) + 1] || null;

      if (step === companyInformationStep) {
        return nextStep && handleNextStep(nextStep);
      }

      if (step === loginDetailsStep) {
        const { otp, confirm_password, ...payload } = values;

        if (!isFormComplete(payload)) {
          router.push(corporateSteps[1]);
          return;
        }
        payload.user_type = "corporate";
        const response = await handleRegisterUser(
          payload,
          "register-corporate"
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
      validationSchema={corporateValidationSchemas[step]}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="grid grid-flow-row grid-cols-2 gap-4 w-full">
          {isCompanyInformation && (
            <CompanyInformation errors={errors} touched={touched} />
          )}
          {isLoginDetails && <LoginDetails errors={errors} touched={touched} />}
          {isOTPVerification && (
            <OTPVerification errors={errors} touched={touched} />
          )}
          <div
            className={`flex ${
              isCompanyInformation ? "justify-center" : "justify-between"
            } items-center col-span-full mt-10`}
          >
            {!isCompanyInformation && (
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
              {isCompanyInformation && "NEXT STEP"}

              {isLoginDetails && "FINISH"}

              {isOTPVerification && "VERIFY"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CorporateForm;

const CompanyInformation = ({ errors, touched }: any) => {
  return (
    <>
      <div className="col-span-full">
        <FormField
          label="Company Name"
          type="text"
          name="company_name"
          errors={errors}
          placeholder="Enter company Name"
          touched={touched}
        />
      </div>

      <div className="">
        <label htmlFor="type_of_business" className="mb-1 flex text-sm">
          Type of Business
        </label>
        <Field
          as="select"
          name="type_of_business"
          id="type_of_business"
          className={`border border-[#E8ECEF] px-3 p-2 rounded w-full placeholder:text-xs md:placeholder:text-sm ${
            errors.type_of_business && touched?.type_of_business
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          {" "}
          <option value="" disabled>
            Select type of Business
          </option>
          <option value="sole proprietorship">Sole proprietorship</option>
          <option value="partnership">Partnership</option>
          <option value="corporate">Corporate</option>
        </Field>
        <ErrorMessage
          name="type_of_business"
          component="div"
          className="text-red-500 text-xs"
        />
      </div>

      <FormField
        label="Date of Incorporation"
        type="date"
        name="date_of_incorporation"
        errors={errors}
        placeholder="Select date"
        touched={touched}
      />
    </>
  );
};

const LoginDetails = ({ errors, touched }: any) => {
  return (
    <>
      <div className="col-span-full">
        <FormField
          label="Company Email"
          type="email"
          name="email"
          errors={errors}
          placeholder="Enter email"
          touched={touched}
        />
      </div>
      <div className="col-span-full">
        <FormField
          label="Password"
          type="password"
          name="password"
          errors={errors}
          placeholder="Enter your password"
          touched={touched}
        />
      </div>
      <div className="col-span-full">
        <FormField
          label="Confirm Password"
          type="password"
          name="confirm_password"
          errors={errors}
          placeholder="Confirm your password"
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
          Enter the 4-digit code that was sent to {values?.email}
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
