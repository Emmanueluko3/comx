import { PAGES } from "@/utils/constants";
import { redirect } from "next/navigation";

export const useAuthNavigator = () => {
  const storedAccessToken = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (storedAccessToken || user?.email) {
    return redirect(PAGES.dashboard.index);
  }
};
