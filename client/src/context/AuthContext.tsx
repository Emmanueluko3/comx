import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES } from "@/utils/constants";
import { OrgData, User, UserData } from "@/types";

type AuthContextType = {
  user: UserData | OrgData | null;
  accessToken: string | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | OrgData | null>(null);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("accessToken", "skjksjd");
        localStorage.setItem("user", JSON.stringify(userData));
        resolve("Done");
      }, 2000);
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
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
