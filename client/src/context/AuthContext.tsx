import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES } from "@/utils/constants";
import { User, UserData } from "@/types";
import axios from "axios";
import { baseUrl } from "@/api";
import { toast } from "sonner";

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

type AuthContextType = {
  user: UserData | null;
  accessToken: string | null;
  login: (userData: User) => void;
  handleRegisterUser: (payload: UserData, endpoint: string) => Promise<any>;
  handleVerifyUserOTP: (payload: {
    otp: string;
    email: string;
  }) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  const router = useRouter();

  const setCredentials = (accessToken: string, user: UserData) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setAccessToken(accessToken);
  };

  useEffect(() => {
    const fetchUser = () => {
      try {
        if (typeof window !== "undefined") {
          const storedAccessToken = localStorage.getItem("accessToken");
          const storedUser = localStorage.getItem("user");

          if (storedAccessToken && storedUser) {
            setAccessToken(storedAccessToken);
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData: any) => {
    const { StaySignedIn, ...newUserData } = userData;

    try {
      const response = await axios.post(
        baseUrl + "api/v1/auth/sign-in",
        newUserData,
        { withCredentials: true }
      );
      const { accessToken, data: user, message } = response.data;
      setCredentials(accessToken, user);
      toast.success(message);
      router.push(PAGES.dashboard.index);
    } catch (error: any) {
      toast.error(error?.response.data.message);
      console.error("Error during auth login:", error);
    }
  };

  const handleRegisterUser = async (payload: UserData, endpoint: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}api/v1/auth/${endpoint}`,
        payload,
        { withCredentials: true }
      );
      const { message } = response.data;
      toast.success(message);
      return response.data;
    } catch (error: any) {
      toast.error(error?.response.data.message);
      console.error("Error during auth login:", error);
      throw error;
    }
  };

  const handleVerifyUserOTP = async (payload: {
    otp: string;
    email: string;
  }) => {
    try {
      const response = await axios.post(
        baseUrl + "api/v1/auth/register/verify-otp",
        payload,
        { withCredentials: true }
      );
      const { accessToken, data: user, message } = response.data;

      setCredentials(accessToken, user);
      toast.success(message);
      router.push(PAGES.dashboard.index);
    } catch (error: any) {
      toast.error(error?.response.data.message);
      console.error("Error during auth login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken(null);
    router.push(PAGES.home);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        handleRegisterUser,
        handleVerifyUserOTP,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
