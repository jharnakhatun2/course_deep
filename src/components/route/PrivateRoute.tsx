// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { useCurrentUser } from "../auth/useCurrentUser";
import Loader from "../../ult/loader/Loader";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );
  
  useCurrentUser(); // fetch current user on mount
  const location = useLocation();

  if (loading) {
    return <Loader />; // show loader while fetching
  }

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
