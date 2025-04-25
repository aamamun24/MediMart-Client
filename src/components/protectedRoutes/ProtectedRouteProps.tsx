// components/ProtectedRoute.tsx
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useSelector(useCurrentToken);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ensures window is available
  }, []);

  useEffect(() => {
    if (isClient && !token) {
      window.location.href = "/login"; // redirects to login
    }
  }, [isClient, token]);

  if (!token || !isClient) return null;

  return <>{children}</>;
};
