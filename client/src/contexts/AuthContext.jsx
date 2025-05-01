import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Load user/token from localStorage on mount
  useEffect(() => {
    const storedUserRaw = localStorage.getItem("hob_user");
    const storedToken = localStorage.getItem("hob_token");

    try {
      const parsedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

      if (parsedUser && storedToken) {
        setUser(parsedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse stored user JSON:", error);
      localStorage.removeItem("hob_user"); // Clean up bad data
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("hob_user", JSON.stringify(userData));
    localStorage.setItem("hob_token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("hob_user");
    localStorage.removeItem("hob_token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
