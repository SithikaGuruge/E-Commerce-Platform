import axios from "axios";

const API_URL = import.meta.env.VITE_USER_API_URL || "http://localhost:4003";

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Register user
export const registerUser = async (name, email, password) => {
  try {
    const userData = { name, email, password };
    const response = await axios.post(`${API_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user (if you add login endpoint later)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Change password
export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}/password`, {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

// Get all users (admin)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
