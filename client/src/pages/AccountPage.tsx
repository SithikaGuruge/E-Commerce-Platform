import { useAuth } from "@/context/AuthContext";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AccountPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-6">
          <div
            className="w-32 h-32 rounded-full mx-auto flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary[400]}20, ${theme.colors.primary[600]}30)`,
            }}
          >
            <Lock
              className="w-16 h-16"
              style={{ color: theme.colors.primary.DEFAULT }}
            />
          </div>
          <h2
            className="text-3xl font-bold"
            style={{ color: theme.colors.text.primary }}
          >
            Please Login
          </h2>
          <p style={{ color: theme.colors.text.secondary }}>
            You need to be logged in to access your account
          </p>
          <Button
            onClick={() => (window.location.href = "/login")}
            className="mt-4"
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: "white",
            }}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1
        className="text-4xl font-bold"
        style={{ color: theme.colors.text.primary }}
      >
        My Account
      </h1>
      <div
        className="rounded-2xl p-6 shadow-lg"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.DEFAULT}`,
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: theme.colors.text.primary }}
        >
          Profile Information
        </h2>
        <div className="space-y-4">
          <div>
            <label
              className="text-sm font-medium"
              style={{ color: theme.colors.text.secondary }}
            >
              Name
            </label>
            <p
              className="text-lg font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              {user?.name}
            </p>
          </div>
          <div>
            <label
              className="text-sm font-medium"
              style={{ color: theme.colors.text.secondary }}
            >
              Email
            </label>
            <p
              className="text-lg font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              {user?.email}
            </p>
          </div>
          {user?.contactNumber && (
            <div>
              <label
                className="text-sm font-medium"
                style={{ color: theme.colors.text.secondary }}
              >
                Contact Number
              </label>
              <p
                className="text-lg font-semibold"
                style={{ color: theme.colors.text.primary }}
              >
                {user.contactNumber}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
