import type { ReactNode } from "react";
import Loader from "../../ult/loader/Loader";
import { useCurrentUser } from "../auth/useCurrentUser";


export const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useCurrentUser();

  // Show loader while checking authentication
  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};