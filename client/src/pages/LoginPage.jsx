import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import "../css/pagesCSS/LoginPage.css";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { login: loginContext } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      console.log("LOGIN RESPONSE:", res);

      if (res && res.token && res.user) {
        loginContext(res.user, res.token);
        navigate("/home");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="loginpage-outer">
      <form onSubmit={handleSubmit(onSubmit)} className="loginpage-form">
        <h2 className="loginpage-title">Login</h2>
        {error && <p className="loginpage-error">{error}</p>}
        <div className="mb-5">
          <label className="loginpage-label">Email</label>
          <div className="loginpage-input-wrapper">
            <FaEnvelope className="loginpage-input-icon" />
            <input
              type="email"
              {...register("email")}
              className="loginpage-input"
              autoComplete="email"
              placeholder="Enter your email"
            />
          </div>
          <p className="loginpage-input-error">{errors.email?.message}</p>
        </div>
        <div className="mb-6">
          <label className="loginpage-label">Password</label>
          <div className="loginpage-password-wrapper">
            <FaLock className="loginpage-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="loginpage-input"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="loginpage-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="loginpage-input-error">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="loginpage-submit-btn"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
