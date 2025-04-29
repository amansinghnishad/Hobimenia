import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import { useState } from "react";

const schema = yup.object({
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await signup(data);
      if (res.token) {
        // TODO: store token in AuthContext
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">
          Sign up
        </h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div>
          <label>Username</label>
          <input {...register("username")} className="input-field" />
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input {...register("email")} type="email" className="input-field" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input
            {...register("password")}
            type="password"
            className="input-field"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded mt-4"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
