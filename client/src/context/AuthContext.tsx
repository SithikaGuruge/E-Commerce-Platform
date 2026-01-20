import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  authService,
  User,
  SignupData,
  LoginData,
} from "@/services/authService";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      if (!isAuth) {
        setUser(null);
      }
      setUser(authService.getCurrentUser());
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      const response = await authService.login(data);
      setUser(response.data.user);
      showSuccessToast(`Welcome back, ${response.data.user.name}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      showErrorToast(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    try {
      setIsLoading(true);
      const response = await authService.signup(data);
      setUser(response.data.user);
      showSuccessToast(`Welcome, ${response.data.user.name}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      showErrorToast(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("cart");
      setUser(null);

      showSuccessToast("Logged out successfully");
    } catch (error: any) {
      showErrorToast("Logout failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
