// src/hooks/useAuth.ts
import { useAppSelector } from "../app/hooks";

export const useAuth = () => {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  
  return {
    user,
    isAuthenticated,
    loading,
    // Helper methods
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
  };
};