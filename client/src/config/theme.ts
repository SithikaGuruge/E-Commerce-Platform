// Theme Configuration
export const theme = {
  colors: {
    primary: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
      DEFAULT: "#06b6d4",
    },

    secondary: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
      DEFAULT: "#f43f5e",
    },

    accent: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      DEFAULT: "#a855f7",
    },

    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      DEFAULT: "#22c55e",
    },

    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      DEFAULT: "#ef4444",
    },

    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      DEFAULT: "#f59e0b",
    },

    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      DEFAULT: "#737373",
    },

    background: {
      primary: "#0a0e27",
      secondary: "#1a1b3d",
      tertiary: "#0f1419",
      dark: "#050813",
      card: "rgba(30, 41, 59, 0.4)",
    },

    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      inverse: "#0f172a",
    },

    border: {
      light: "rgba(148, 163, 184, 0.2)",
      DEFAULT: "rgba(148, 163, 184, 0.3)",
      dark: "rgba(148, 163, 184, 0.5)",
    },

    toast: {
      success: {
        background: "#047857",
        progress: "rgba(255, 255, 255, 0.7)",
      },
      error: {
        background: "#b91c1c",
        progress: "rgba(255, 255, 255, 0.7)",
      },
      info: {
        background: "#06b6d4",
        progress: "rgba(255, 255, 255, 0.7)",
      },
      warning: {
        background: "#f59e0b",
        progress: "rgba(255, 255, 255, 0.7)",
      },
    },
  },

  gradients: {
    primary: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    secondary: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    sunset: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
    ocean: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
    fire: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
    purple: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
    cyber: "linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)",
    neon: "linear-gradient(135deg, #22d3ee 0%, #c084fc 100%)",

    trending: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    newArrivals: "linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)",
    imported: "linear-gradient(135deg, #22d3ee 0%, #10b981 100%)",
    regular: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
    hero: "linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)",
    card: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.15) 100%)",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",

    primaryShadow: "0 10px 40px -10px rgba(6, 182, 212, 0.5)",
    secondaryShadow: "0 10px 40px -10px rgba(244, 63, 94, 0.5)",
    accentShadow: "0 10px 40px -10px rgba(168, 85, 247, 0.5)",
    glow: "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(168, 85, 247, 0.2)",
  },

  borderRadius: {
    sm: "0.375rem",
    DEFAULT: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    full: "9999px",
  },

  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
    "3xl": "6rem",
  },

  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    DEFAULT: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export const getGradient = (
  gradientKey: keyof typeof theme.gradients
): string => {
  return theme.gradients[gradientKey];
};

export const getColorWithOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`;
};
