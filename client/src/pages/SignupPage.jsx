import { useForm } from "react-hook-form";
import { useState } from "react";
import { signup } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "../css/pagesCSS/SignupPage.css";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await signup(data);
      login(res.user, res.token); // Save user in context and localStorage
      navigate("/home");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signuppage-outer">
      <form onSubmit={handleSubmit(onSubmit)} className="signuppage-form">
        <h2 className="signuppage-title">Sign Up</h2>

        {errorMsg && <p className="signuppage-error">{errorMsg}</p>}

        <div className="mb-5">
          <label className="signuppage-label">Username</label>
          <div className="signuppage-input-wrapper">
            <span className="signuppage-icon">
              <FaUser />
            </span>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="signuppage-input"
              autoComplete="username"
              placeholder="Enter your username"
            />
          </div>
          <p className="signuppage-input-error">{errors.username?.message}</p>
        </div>

        <div className="mb-5">
          <label className="signuppage-label">Email</label>
          <div className="signuppage-input-wrapper">
            <span className="signuppage-icon">
              <FaEnvelope />
            </span>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="signuppage-input"
              autoComplete="email"
              placeholder="Enter your email"
            />
          </div>
          <p className="signuppage-input-error">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label className="signuppage-label">Password</label>
          <div className="signuppage-input-wrapper">
            <span className="signuppage-icon">
              <FaLock />
            </span>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="signuppage-input"
              autoComplete="new-password"
              placeholder="Create a password"
            />
          </div>
          <p className="signuppage-input-error">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="signuppage-submit"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
