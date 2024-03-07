import { useAuth } from "@/hooks";
import { Outlet } from "react-router-dom";
import { RegisterUserPage } from "@/pages/RegisterUserPage/RegisterUserPage";

export default function PrivateRoute() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <RegisterUserPage />;
  }

  return <Outlet />;
}
