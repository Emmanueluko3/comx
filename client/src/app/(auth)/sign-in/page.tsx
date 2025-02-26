"use client";
import Button from "@/components/common/Button";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import { loginSchema } from "@/utils/schema";
import Link from "next/link";
import { PAGES } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import FormField from "@/components/formik/Input";

export default function SignIn() {
  const { login } = useAuth();

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-lg w-full flex flex-col items-center justify-center p-4 sm:p-10 bg-transparent sm:bg-white sm:rounded-sm mb-10 sm:dark:text-gray-800"
    >
      <h2 className="text-center md:text-3xl text-xl font-normal mb-2">
        Sign in to ComX
      </h2>
      <p className="md:text-sm text-xs mb-8 text-center">
        Enter your login credentials below.
      </p>

      <Formik
        initialValues={{ email: "", password: "", StaySignedIn: false }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await login(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-full">
            <div>
              <FormField
                label="Enter your email"
                type="email"
                name="email"
                errors={errors}
                touched={touched}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <FormField
                type="password"
                name="password"
                errors={errors}
                touched={touched}
                placeholder="Enter your password"
                enablePasswordToggle={true}
              />
            </div>

            <div className="flex justify-between items-center my-3 md:my-8">
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="StaySignedIn"
                  id="StaySignedIn"
                  className="border border-[#E8ECEF] rounded w-full mr-2"
                  placeholder="Enter your password"
                />
                <label
                  htmlFor="StaySignedIn"
                  className="flex text-nowrap text-sm"
                >
                  Stay Signed in
                </label>
              </div>
              <Link
                href={PAGES.auth.forgotPassword}
                className="text-sm text-red-500"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              // onClick={() => login(`${origin}${PAGES.validateUser}`)}
              className="w-full rounded-sm font-bold mb-4"
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        href={PAGES.home}
        className="w-full flex justify-center items-center py-2 rounded-sm text-gray-950 font-bold bg-gray-200 hover:bg-gray-300"
      >
        Back
      </Link>
    </motion.div>
  );
}
