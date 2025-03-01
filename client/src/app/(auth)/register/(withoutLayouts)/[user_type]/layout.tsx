import AnimatePage from "@/components/common/AnimatePage";
import { Loader } from "@/components/common/Loader";
import Link from "next/link";
import { Suspense } from "react";

const user_types = ["individual", "corporate"];

export default async function RegisterLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ user_type: string }>;
}>) {
  const user_type = (await params).user_type;

  return (
    <Suspense fallback={<Loader />}>
      <AnimatePage>
        <h2 className="text-center md:text-3xl text-xl font-normal mb-2">
          Register new account
        </h2>
        <p className="md:text-sm text-xs mb-8 text-center">
          Sign up for an account and start trading today
        </p>
        <div className="w-full mb-8">
          <p className="text-sm mb-3">
            Select select the category that best describes you
          </p>
          <div className="flex items-center gap-4">
            {user_types.map((tab, index) => (
              <Link
                href={`/register/${tab}`}
                key={index}
                className={`w-28 px-4 py-2 md:w-36 md:py-3 border border-gray-300 flex justify-center items-center rounded-sm lg:hover:bg-gray-900 lg:hover:text-white transition-all ${
                  user_type === tab ? "bg-gray-900 text-white" : ""
                }`}
              >
                {tab}
              </Link>
            ))}
          </div>
        </div>

        {children}
      </AnimatePage>
    </Suspense>
  );
}
