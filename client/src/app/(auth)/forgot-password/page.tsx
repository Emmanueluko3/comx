"use client";
import Button from "@/components/common/Button";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/utils/schema";
import BackButton from "@/components/common/BackButton";

export default function ForgotPassword() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-lg w-full flex flex-col items-center justify-center p-4 sm:p-10 bg-transparent sm:bg-white sm:rounded-sm mb-10 sm:dark:text-gray-800"
    >
      <h2 className="text-center md:text-3xl text-xl font-normal mb-2">
        Password Reset
      </h2>
      <p className="md:text-sm text-xs mb-8 text-center">
        Reset your password to continue trading on ComX
      </p>

      <Formik
        initialValues={{ email: "", password: "", StaySignedIn: false }}
        validationSchema={loginSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-full">
            {/* Email Field */}
            <div className="mt-16 ">
              <label htmlFor="email" className="mb-1 flex text-sm">
                Enter the Email Address you registered with
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`border border-[#E8ECEF] px-3 p-2 rounded w-full placeholder:text-sm ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <p className="text-gray-400 text-xs mx-auto mb-16">
              Note that you’ll be sent an OTP to the email address provided
            </p>

            <div className="flex justify-between items-center">
              <BackButton className=" rounded-sm text-gray-800 font-bold bg-transparent hover:bg-transparent hover:text-gray-950">
                Back
              </BackButton>
              <Button
                type="submit"
                disabled={isSubmitting}
                // onClick={() => login(`${origin}${PAGES.validateUser}`)}
                className=" rounded-sm font-bold bg-transparent hover:bg-transparent hover:text-red-700 text-red-500 "
              >
                Proceed
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
