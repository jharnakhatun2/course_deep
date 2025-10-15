// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router";
import Loader from "../../ult/loader/Loader";
import { useAuth } from "../../hook/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />; // show loader while fetching
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
