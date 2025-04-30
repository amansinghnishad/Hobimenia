import { useForm } from "react-hook-form";
import { useState } from "react";
import { signup } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-6 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">Username is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
