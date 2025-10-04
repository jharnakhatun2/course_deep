import { useEffect, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // This only runs on the client side
    const userFromStorage = localStorage.getItem('user');
    const tokenFromStorage = localStorage.getItem('token');
    
    if (tokenFromStorage) {
      dispatch(setUser({ 
        user: userFromStorage ? JSON.parse(userFromStorage) : null, 
        token: tokenFromStorage 
      }));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;