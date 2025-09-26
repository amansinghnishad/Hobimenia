import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Input } from "../ui";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignupForm = () => {
  const { login } = useAuth();
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
      const res = await signup(data);
      login(res.user, res.token);
      toast.success(`Welcome to Hobimenia, ${res.user.username}!`);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="Username"
          type="text"
          {...register("username")}
          error={errors.username?.message}
          leftIcon={<FaUser />}
          placeholder="Choose a username"
          autoComplete="username"
        />
      </div>

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
          type="password"
          {...register("password")}
          error={errors.password?.message}
          leftIcon={<FaLock />}
          placeholder="Create a password"
          autoComplete="new-password"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
