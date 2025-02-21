"use client";
import ThemeToggle from "@/components/ToggleTheme";
import Logo from "@/components/common/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] relative">
      <ThemeToggle />
      <main className="flex flex-col row-start-2 items-center w-full">
        <Logo className="mb-12" />
        {children}
      </main>
    </div>
  );
}
