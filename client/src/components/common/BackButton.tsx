import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BackButton({ children, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button {...props} onClick={() => router.back()}>
      {children}
    </Button>
  );
}
