import axios from "../utils/axios";

export const googleAuth = async (data) =>
  await axios.get(`/api/auth/google/callback?code=${data}`);
export const login = async (data) => await axios.post("/api/auth/login", data);
export const register = async (data) =>
  await axios.post("/api/auth/register", data);
export const getProfile = async () => await axios.get("/api/auth/profile");
export const verifymail = async (data) =>
  await axios.get(`/api/auth/${data.id}/verify-email/${data.token}`);
export const forgotPassword = async (data) =>
  await axios.post("/api/auth/forgot-password", data);
export const resetPassword = async (data) =>
  await axios.post(`/api/auth/${data.id}/reset-password/${data.token}`, {
    password: data.password,
  });
