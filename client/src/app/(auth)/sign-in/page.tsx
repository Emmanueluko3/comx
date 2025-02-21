"use client";
import Button from "@/components/common/Button";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/utils/schema";
import Link from "next/link";
import { PAGES } from "@/utils/constants";

export default function SignIn() {
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
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-full">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-1 flex text-base">
                Your Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`border border-[#E8ECEF] px-3 p-2 rounded w-full ${
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="mb-1 flex text-base">
                Your Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className={`border border-[#E8ECEF] px-3 p-2 rounded w-full ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
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
                  className="flex text-nowrap text-base"
                >
                  Stay Signed in
                </label>
              </div>
              <Link
                href={PAGES.auth.forgotPassword}
                className="text-base text-red-500"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              // onClick={() => login(`${origin}${PAGES.validateUser}`)}
              className="w-full rounded-sm font-bold"
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
