import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

export function AuthButton() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: `${theme.colors.primary.DEFAULT}20`,
            border: `1px solid ${theme.colors.primary.DEFAULT}40`,
          }}
        >
          <User
            className="w-4 h-4"
            style={{ color: theme.colors.primary.DEFAULT }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: theme.colors.text.primary }}
          >
            {user.name}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
          style={{
            color: theme.colors.error.DEFAULT,
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => navigate("/login")}
      size="sm"
      className="flex items-center gap-2"
      style={{
        backgroundColor: theme.colors.primary.DEFAULT,
        color: "white",
      }}
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </Button>
  );
}
