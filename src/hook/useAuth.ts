import { useGetCurrentUserQuery } from "../features/auth/authApi";
import { useAppSelector } from "../app/hooks";

export const useAuth = () => {
  
  const { isLoading, refetch } = useGetCurrentUserQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
  });


  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    loading: isLoading,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    isInstructor: user?.role === 'instructor', 
    isStudent: user?.role === 'student',
    refetchUser: refetch,
  };
};