import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../app/hooks";


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Optional: you can have a loading state if you want
  // For now, assume Redux is ready after App.js restores user

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
