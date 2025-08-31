import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
  type UserCredential,
} from "firebase/auth";
import { auth } from "../../firebase/Firebase.config";

// ✅ Type for Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// ✅ Type for AuthContext value
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  userLogIn: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  gitHubSignIn: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

// ✅ Create Context with correct type
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const UserContext = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // ✅ Firebase User type
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const gitHubSignIn = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("User Observing", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo: AuthContextValue = {
    user,
    createUser,
    userLogIn,
    googleSignIn,
    gitHubSignIn,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

//use useContext with custom hook
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserContext provider");
  }
  return context;
};

export default UserContext;


