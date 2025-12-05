export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordMinLength = 6;

export const validateLoginForm = (data: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < passwordMinLength) {
    errors.password = `Password must be at least ${passwordMinLength} characters`;
  }

  return errors;
};

export const validateSignupForm = (data: SignupFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name) {
    errors.name = "Name is required";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.contactNumber) {
    errors.contactNumber = "Contact number is required";
  } else if (!/^\d{10,15}$/.test(data.contactNumber.replace(/[\s-]/g, ""))) {
    errors.contactNumber = "Invalid contact number (10-15 digits)";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < passwordMinLength) {
    errors.password = `Password must be at least ${passwordMinLength} characters`;
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
