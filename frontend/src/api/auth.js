import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Login
export const loginUser = (data) =>
  API.post("/auth/login", data);

// Signup
export const signupUser = (data) =>
  API.post("/auth/signup", data);

// Forgot Password
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

// Reset Password
export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);

// Get Users
export const getUsers = () =>
  API.get("/auth/users");

// Update User
export const updateUser = (id, data) =>
  API.put(`/auth/users/${id}`, data);

// Delete User
export const deleteUser = (id) =>
  API.delete(`/auth/users/${id}`);