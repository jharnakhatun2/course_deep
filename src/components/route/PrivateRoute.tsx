// src/components/route/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router";
import Loader from "../../ult/loader/Loader";
import { useAuth } from "../../hook/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user.role.toLowerCase();

  // If route has allowedRoles, check authorization
  if (allowedRoles && !allowedRoles.includes(userRole)) {

    // If unauthorized — redirect based on role
    switch (userRole) {
      case "admin":
      case "super_admin":
        if (!location.pathname.startsWith("/admin")) {
          return <Navigate to="/admin" replace />;
        }
        break;

      case "instructor":
        if (!location.pathname.startsWith("/instructor-dashboard")) {
          return <Navigate to="/instructor-dashboard" replace />;
        }
        break;

      case "student":
        if (!location.pathname.startsWith("/dashboard")) {
          return <Navigate to="/dashboard" replace />;
        }
        break;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;