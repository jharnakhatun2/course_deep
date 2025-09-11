import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, setLoading, setUser } from "../../features/auth/authSlice";
import { useGetCurrentUserQuery } from "../../features/auth/authApi";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  // Skip query if no token (guest user)
  const { data, error, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      // Guest: stop loading immediately
      dispatch(setLoading(false));
      return;
    }

    if (error) {
      dispatch(logout());
    } else if (data) {
      dispatch(setUser({ user: data, token }));
    }
  }, [data, error, dispatch, token]);

  return isLoading;
};
