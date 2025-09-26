import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Input } from "../ui";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { login: loginContext } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      console.log("LOGIN RESPONSE:", res);

      if (res && res.token && res.user) {
        loginContext(res.user, res.token);
        toast.success(`Welcome back, ${res.user.username}!`);
        navigate("/home");
      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          leftIcon={<FaEnvelope />}
          placeholder="Enter your email"
          autoComplete="email"
        />
      </div>

      <div>
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={errors.password?.message}
          leftIcon={<FaLock />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
          placeholder="Enter your password"
          autoComplete="current-password"
        />
      </div>

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
