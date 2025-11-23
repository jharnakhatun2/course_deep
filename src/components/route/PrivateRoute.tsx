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

  
  if (loading) {
    return <Loader />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role permissions if specific roles are required
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    let redirectPath = "/";
    
    if (user.role === "admin") {
      redirectPath = "/admin";
    } else if (user.role === "instructor") {
      redirectPath = "/instructor-dashboard";
    } else if (user.role === "student") {
      redirectPath = "/dashboard";
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;