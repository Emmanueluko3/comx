import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES } from "@/utils/constants";
import { User, UserData } from "@/types";
import axios from "axios";
import { baseUrl } from "@/api";

type AuthContextType = {
  user: UserData | null;
  accessToken: string | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

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
      const { accessToken, data: user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      router.push(PAGES.dashboard.index);
      setUser(user);
      setAccessToken(accessToken);
    } catch (error) {
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
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
