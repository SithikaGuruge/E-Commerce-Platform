import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "@/config/theme";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{
        zIndex: 9999,
      }}
      toastStyle={{
        backgroundColor: theme.colors.background.card,
        color: theme.colors.text.primary,
        borderRadius: "12px",
        boxShadow: theme.shadows.lg,
      }}
    />
  );
}
