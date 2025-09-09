// src/hooks/useAuthLoader.ts
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout, setUser } from "../../features/auth/authSlice";


export const useCurrentUser = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        dispatch(setUser({ user: data.user, token: "" }));
      } catch {
        dispatch(logout());
      }
    };

    fetchCurrentUser();
  }, [dispatch]);
};
