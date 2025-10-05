import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, setLoading, setUser } from "../../features/auth/authSlice";
import { useGetCurrentUserQuery } from "../../features/auth/authApi";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Always try to get current user (cookies will handle authentication)
  const { data, error, isLoading, refetch } = useGetCurrentUserQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (error) {
      console.error("Auth error:", error);
      dispatch(logout());
    } else if (data) {
      dispatch(setUser(data));
    }
  }, [data, error, dispatch, isLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    refetch,
  };
};
