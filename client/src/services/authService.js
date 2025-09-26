import api from "../api/axios";

// Call this from SignupPage
export const signup = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const forgotPassword = async (data) => {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
};

export const resetPassword = async (token, password) => {
  const res = await api.post(`/auth/reset-password/${token}`, { password });
  return res.data;
};

