import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PAGES } from "./constants";

function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  const Wrapper = (props: T) => {
    const { accessToken, user } = useAuth();
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
      if (user !== undefined && accessToken !== undefined) {
        setIsAuthChecked(true);
      }
    }, [user, accessToken]);

    useEffect(() => {
      if (isAuthChecked && (!user || !accessToken)) {
        router.push(PAGES.auth.signIn);
      }
    }, [isAuthChecked, user, accessToken, router]);

    if (!isAuthChecked) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

export default withAuth;
