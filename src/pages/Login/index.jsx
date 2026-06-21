import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoginError("");

      console.log("Login Data:", data);

      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", response.data);

      const token = response.data.accessToken;

      if (!token) {
        throw new Error("Token not found");
      }

      // Store token
      localStorage.setItem("accessToken", token);

      // Notify navbar instantly
      window.dispatchEvent(new Event("auth-change"));

      reset();
      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message,
      );

      setLoginError(
        error.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        autoComplete="off"
        className="bg-black w-full max-w-md p-6 rounded-lg border-yellow-500 border-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-yellow-500 text-2xl font-bold text-center mb-6 font-[cursive]">
          LOGIN FORM
        </h1>

        {/* Email */}
        <div className="mb-3">
          <p className="text-yellow-500 font-serif pb-2">Email:</p>
          <input
            className="bg-white w-full p-2 rounded outline-none"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <p className="text-yellow-500 font-serif pb-2">Password:</p>
          <input
            className="bg-white w-full p-2 rounded outline-none"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>
        </div>

        {/* Login Error Message */}
        {loginError && (
          <div className="mb-4">
            <p className="text-red-500 text-center font-semibold">
              {loginError}
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col items-center">
          <input
            type="submit"
            disabled={!isValid || isSubmitting}
            value={isSubmitting ? "LOGGING IN..." : "LOGIN"}
            className={`px-6 py-2 rounded-lg font-bold font-[cursive] transition duration-300
            ${
              isValid && !isSubmitting
                ? "bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          />

          {/* Register Link */}
          <p className="text-white mt-4 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-500 hover:underline font-semibold"
            >
              Click here to Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
