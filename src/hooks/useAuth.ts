import { fetchUserDetail } from "@/services/auth";
import { userAtom } from "@/store/user";
import { Role } from "@/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicRoute = (path: string) => {
    const publicRoutes = ["/login", "/recover-password"];
    return publicRoutes.includes(path);
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (!isPublicRoute(location.pathname)) {
          navigate("/login");
        }
        setLoading(false);
        return;
      }

      try {
        const userDetails = await fetchUserDetail(token);
        setUser(userDetails);
      } catch {
        if (!isPublicRoute(location.pathname)) {
          navigate("/login", {
            state: { error: "Session expired. Please login again." },
          });
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [navigate, location.pathname, setUser]);

  const isAuthorized = (requiredRoles: Role | Role[]) => {
    if (!user || !user.role) return false;
    const rolesArray = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];
    return rolesArray.includes(user.role);
  };

  return { user, loading, isAuthorized };
};
