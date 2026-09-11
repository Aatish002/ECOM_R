import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useRegisterMutation } from "../../../Hooks/Mutations/auth/Userregister";

const registerSchema = z
  .object({
    userName: z
      .string()
      .min(2, "User name is too short")
      .max(20, "User name is too long"),

    phoneNumber: z
      .string()
      .min(8, "Phone number too short")
      .max(10, "Phone number too long"),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[@$!%*?&]/, "Must contain special character"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const { mutate, isPending } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    mutate(
      {
        userName: data.userName,
        phoneNo: data.phoneNumber,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          console.log("Registered:", data);
          reset();
        },

        onError: (error) => {
          console.error(error.response?.data?.message || error.message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        autoComplete="off"
        className="bg-black w-full max-w-md p-6 rounded-lg border-yellow-500 border-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-yellow-500 text-2xl font-bold text-center mb-6 font-[cursive]">
          REGISTRATION FORM
        </h1>

        {/* Username */}
        <div className="mb-3">
          <p className="text-yellow-500 font-serif pb-2">Username:</p>
          <input
            className="bg-white w-full p-2 rounded outline-none"
            type="text"
            placeholder="Enter username"
            {...register("userName")}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.userName?.message}
          </p>
        </div>

        {/* Phone */}
        <div className="mb-3">
          <p className="text-yellow-500 font-serif pb-2">Phone Number:</p>
          <input
            className="bg-white w-full p-2 rounded outline-none"
            type="text"
            placeholder="Enter phone number"
            {...register("phoneNumber")}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber?.message}
          </p>
        </div>

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
        <div className="mb-3">
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

        {/* Confirm Password */}
        <div className="mb-4">
          <p className="text-yellow-500 font-serif pb-2">Confirm Password:</p>
          <input
            className="bg-white w-full p-2 rounded outline-none"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword?.message}
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          <input
            type="submit"
            disabled={!isValid || isPending}
            value={isPending ? "REGISTERING..." : "REGISTER"}
            className={`px-6 py-2 rounded-lg font-bold font-[cursive] transition duration-300
${
  !isValid || isPending
    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
    : "bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer"
}`}
          />

          {/* Login Link */}
          <p className="text-white mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 hover:underline font-semibold"
            >
              Click here to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
