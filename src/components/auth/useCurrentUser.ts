import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, setLoading, setUser } from "../../features/auth/authSlice";
import { useGetCurrentUserQuery } from "../../features/auth/authApi";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Only fetch if we don't have a user but think we should be authenticated
  const shouldFetch = !user && isAuthenticated;
  
  const { data, error, isLoading, refetch } = useGetCurrentUserQuery(undefined, {
    skip: !shouldFetch,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (error) {
      console.error("Auth error:", error);
      dispatch(logout());
    } else if (data) {
      // Fix: Pass an object with user property
      dispatch(setUser({ user: data }));
    }
  }, [data, error, dispatch, isLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    refetch,
  };
};