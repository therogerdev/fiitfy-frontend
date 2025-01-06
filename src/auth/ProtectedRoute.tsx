import { checkTokenValidity } from "@/lib/checkTokenValidity";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "@/components/ui/spinner";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Check if the token is valid
  const isValid = checkTokenValidity();

  if (loading) {
    return <Spinner size="sm" />;
  }

  // Redirect to login if the token is invalid or user is not authenticated
  if (!isValid || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if the user has an allowed role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
