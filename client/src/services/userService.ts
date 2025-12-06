import { userApiClient } from "@/lib/api-client";

export const getUserById = async (userId: string) => {
  try {
    const response = await userApiClient.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await userApiClient.post(`/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    const response = await userApiClient.put(`/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await userApiClient.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userData = { name, email, password };
    const response = await userApiClient.post(`/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await userApiClient.post(`/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const response = await userApiClient.put(`/user/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const response = await userApiClient.put(`/user/${userId}/password`, {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await userApiClient.get(`/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
