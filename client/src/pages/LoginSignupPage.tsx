import { useState } from "react";
import { theme } from "@/config/theme";
import { LoginForm } from "@/components/Auth/LoginForm";
import { SignupForm } from "@/components/Auth/SignupForm";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div
        className="w-full max-w-md rounded-3xl p-8 shadow-2xl"
        style={{
          border: `1px solid ${theme.colors.border.DEFAULT}`,
          boxShadow: theme.shadows.xl,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              background: theme.gradients.cyber,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={{ color: theme.colors.text.secondary }}>
            {isLogin
              ? "Sign in to continue shopping"
              : "Join us for exclusive deals"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div
          className="flex rounded-xl p-1 mb-6 gap-2"
          style={{
            backgroundColor: theme.colors.background.tertiary,
          }}
        >
          <button
            onClick={() => setIsLogin(true)}
            className="flex-1 py-2 rounded-lg font-semibold transition-all duration-300"
            style={{
              border: `1px solid ${theme.colors.border.DEFAULT}`,
              backgroundColor: isLogin
                ? theme.colors.primary.DEFAULT
                : "transparent",
              color: isLogin ? "white" : theme.colors.text.secondary,
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className="flex-1 py-2 rounded-lg font-semibold transition-all duration-300"
            style={{
              border: `1px solid ${theme.colors.border.DEFAULT}`,
              backgroundColor: !isLogin
                ? theme.colors.primary.DEFAULT
                : "transparent",
              color: !isLogin ? "white" : theme.colors.text.secondary,
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
