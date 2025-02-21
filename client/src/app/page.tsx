"use client";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ToggleTheme";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleUserAction = (url: string) => {
    router.push(url);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] relative"
    >
      <ThemeToggle />
      <main className="flex flex-col row-start-2 items-center w-full">
        <Logo className="mb-12" />

        <div className="max-w-lg w-full flex flex-col items-center justify-center p-4 sm:p-10 bg-transparent sm:bg-white sm:rounded-sm mb-10 sm:dark:text-gray-800">
          <h2 className="text-center md:text-3xl text-xl font-normal mb-2">
            Sign in to ComX
          </h2>
          <p className="md:text-sm text-xs mb-8 text-center">Welcome to ComX</p>

          <Button
            onClick={() => handleUserAction("/sign-in")}
            className="w-full rounded-sm font-bold"
          >
            Sign in
          </Button>
        </div>
        <div className="max-w-lg w-full flex flex-col items-center justify-center p-4 sm:p-10 bg-transparent sm:bg-white sm:rounded-sm sm:dark:text-gray-800">
          <h2 className="text-center md:text-3xl text-xl font-normal mb-2">
            Create an Account
          </h2>
          <p className="md:text-sm text-xs mb-8 text-center">Join the Family</p>

          <Button
            onClick={() => handleUserAction("/register")}
            variant="dark"
            className="w-full rounded-sm font-bold"
          >
            Register
          </Button>
        </div>
      </main>
    </motion.div>
  );
}
