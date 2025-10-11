// src/hooks/useAuth.ts
import { useGetCurrentUserQuery } from "../features/auth/authApi";
import { useAppSelector } from "../app/hooks";

export const useAuth = () => {
  // This will populate Redux state via extraReducers
  const { isLoading, refetch } = useGetCurrentUserQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
  });

  // Now just use Redux state as the single source of truth
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    loading: isLoading,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    refetchUser: refetch,
  };
};