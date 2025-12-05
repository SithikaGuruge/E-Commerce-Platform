import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
  validateLoginForm,
  LoginFormData,
  ValidationErrors,
} from "@/lib/validation";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      // Error toast is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: theme.colors.text.primary }}
        >
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: theme.colors.text.tertiary }}
          />
          <Input
            type="text"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email"
            className="pl-11"
            style={{
              backgroundColor: theme.colors.background.tertiary,
              borderColor: errors.email
                ? theme.colors.error.DEFAULT
                : theme.colors.border.DEFAULT,
              color: theme.colors.text.primary,
            }}
          />
        </div>
        {errors.email && (
          <p
            className="text-sm mt-1"
            style={{ color: theme.colors.error.DEFAULT }}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: theme.colors.text.primary }}
        >
          Password
        </label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: theme.colors.text.tertiary }}
          />
          <Input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Enter your password"
            className="pl-11 pr-11"
            style={{
              backgroundColor: theme.colors.background.tertiary,
              borderColor: errors.password
                ? theme.colors.error.DEFAULT
                : theme.colors.border.DEFAULT,
              color: theme.colors.text.primary,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff
                className="w-5 h-5"
                style={{ color: theme.colors.text.tertiary }}
              />
            ) : (
              <Eye
                className="w-5 h-5"
                style={{ color: theme.colors.text.tertiary }}
              />
            )}
          </button>
        </div>
        {errors.password && (
          <p
            className="text-sm mt-1"
            style={{ color: theme.colors.error.DEFAULT }}
          >
            {errors.password}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-6 text-lg font-bold"
        style={{
          background: theme.gradients.cyber,
          color: "white",
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
