import Loader from "../../ult/loader/Loader";
import { useGetCurrentUserQuery } from "../../features/auth/authApi";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { isLoading } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Show loader while checking authentication
  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};