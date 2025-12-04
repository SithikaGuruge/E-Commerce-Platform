import { toast, ToastOptions } from "react-toastify";
import { theme } from "@/config/theme";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...defaultOptions,
    style: {
      backgroundColor: theme.colors.toast.success.background,
      color: "#ffffff",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...defaultOptions,
    style: {
      backgroundColor: theme.colors.toast.error.background,
      color: "#ffffff",
    },
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    ...defaultOptions,
    style: {
      backgroundColor: theme.colors.toast.info.background,
      color: "#ffffff",
    },
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    ...defaultOptions,
    style: {
      backgroundColor: theme.colors.toast.warning.background,
      color: "#ffffff",
    },
  });
};
