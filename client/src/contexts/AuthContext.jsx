// client/src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

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
      localStorage.removeItem("hob_user");
    } finally {
      setIsInitializing(false);
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
    setIsInitializing(false);
    navigate("/login");
  };

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
