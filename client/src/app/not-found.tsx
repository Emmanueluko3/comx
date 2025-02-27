import ThemeToggle from "@/components/ToggleTheme";
import Logo from "@/components/common/Logo";
import { PAGES } from "@/utils/constants";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)] relative">
      <ThemeToggle />
      <main className="flex flex-col row-start-2 items-center w-full min-h-72">
        <Logo className="mb-12" />
        <h1 className="text-red-500 mb-8 text-sm md:text-base lg:text-xl">
          404 - Page Not Found
        </h1>

        <Link
          href={PAGES.home}
          className="bg-green-500 hover:bg-green-700 text-white px-5 py-1.5 font-medium rounded-sm"
        >
          GO HOME
        </Link>
      </main>
    </div>
  );
}
