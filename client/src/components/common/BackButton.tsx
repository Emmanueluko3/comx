import { useRouter } from "next/navigation";
import Button from "./Button";

export default function BackButton({ ...props }) {
  const router = useRouter();
  return (
    <Button {...props} onClick={() => router.back()}>
      Back
    </Button>
  );
}
