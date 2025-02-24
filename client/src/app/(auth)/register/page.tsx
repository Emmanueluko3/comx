"use client";
import Button from "@/components/common/Button";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { individualValidationSchemas } from "@/utils/schema";
import { PAGES } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormField from "@/components/formik/Input";
import BackButton from "@/components/common/BackButton";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";

const tabs = ["individual", "corporate"];

export default function Register() {
  const { handleRegisterUser, handleVerifyUserOTP } = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const activeTab = searchParams.get("tab");
  const currentPage =
    searchParams.get("page") || PAGES.auth.individualPages.basicInformation;

  // Come back and fix this
  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    params.set("page", PAGES.auth.individualPages.basicInformation);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleNextPage = (page: string) => {
    setCompletedSteps([...completedSteps, currentPage]);
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // fromik general error
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    setGeneralError("");

    try {
      const pages = Object.values(PAGES.auth.individualPages);
      const nextPage = pages[pages.indexOf(currentPage) + 1] || null;

      if (currentPage === PAGES.auth.individualPages.basicInformation) {
        return nextPage && handleNextPage(nextPage);
      }

      if (currentPage === PAGES.auth.individualPages.loginDetails) {
        console.log("Fired");
        const { otp, confirm_password, ...payload } = values;
        payload.user_type = "individual";
        await handleRegisterUser(payload, "register-individual");
        return nextPage && handleNextPage(nextPage);
      }

      if (currentPage === PAGES.auth.individualPages.otpVerification) {
        await handleVerifyUserOTP({ otp: values.otp, email: values.email });
        return nextPage && handleNextPage(nextPage);
      }
    } catch (error: any) {
      console.error("Error:", error);
      setGeneralError(error?.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-lg w-full flex flex-col items-center justify-center p-4 sm:p-10 bg-transparent sm:bg-white sm:rounded-sm mb-10 sm:dark:text-gray-800"
    >
      <h2 className="text-center md:text-3xl text-xl font-normal mb-2">
        Register new account
      </h2>
      <p className="md:text-sm text-xs mb-8 text-center">
        Sign up for an account and start trading today
      </p>

      {currentPage == PAGES.auth.individualPages.basicInformation && (
        <div className="w-full mb-8">
          <p className="text-sm mb-3">
            Select select the category that best describes you
          </p>
          <div className="flex items-center gap-4">
            {tabs.map((tab, index) => (
              <button
                onClick={() => handleTabChange(tab)}
                key={index}
                className={`w-28 py-2 md:w-36 md:py-3 border border-gray-300 rounded-sm lg:hover:bg-gray-900 lg:hover:text-white transition-all ${
                  activeTab === tab ? "bg-gray-900 text-white" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: "",
          phone_number: "",
          otp: "",
        }}
        validationSchema={individualValidationSchemas[currentPage]}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, values }) => (
          <Form className="grid grid-flow-row grid-cols-2 gap-4 w-full">
            {currentPage === PAGES.auth.individualPages.basicInformation && (
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
            )}

            {currentPage === PAGES.auth.individualPages.loginDetails && (
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
            )}

            {currentPage === PAGES.auth.individualPages.otpVerification && (
              <div className="col-span-full">
                <p className="text-sm md:text-sm mb-3">
                  Enter the 4-digit code that was sent to {values.phone_number}{" "}
                  and {""}
                  {values.email}
                </p>
                <FormField
                  type="text"
                  name="otp"
                  errors={errors}
                  placeholder="Enter OTP"
                  touched={touched}
                />
              </div>
            )}

            {generalError && (
              <p className="col-span-full text-red-500">{generalError}</p>
            )}

            <div className="flex justify-between col-span-full mt-32">
              <BackButton
                type="button"
                disabled={isSubmitting}
                className="w-fit px-0 rounded-sm col-span-full bg-transparent hover:bg-transparent hover:text-gray-900 text-gray-600"
              >
                BACK
              </BackButton>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-fit px-0 rounded-sm bg-transparent hover:bg-transparent hover:text-red-700 text-red-600"
              >
                {isSubmitting ? "Processing..." : "NEXT STEP"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
