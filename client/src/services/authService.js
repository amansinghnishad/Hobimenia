import api from "../api/axios";

// Call this from SignupPage
export const signup = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};
