import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import * as z from "zod";
import axios from "axios";

const updatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[@$!%*?&]/, "Must contain special character"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[@$!%*?&]/, "Must contain special character"),
});

const UpdatePassword = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      console.log("Form Data:", data);

      const response = await axios.patch(
        `${baseUrl}/auth/change-password`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Success:", response.data);

      reset();
    } catch (error) {
      console.error(
        "Change password error:",
        error.response?.data?.message || error.message,
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
          Change Password{" "}
        </h1>

        {/* Username */}
        <div className="mb-3">
          <p className="text-yellow-500 font-serif pb-2">Old Password:</p>
          <input
            className="bg-white w-full p-2 rounded outline-none"
            type="password"
            placeholder="Enter old password"
            {...register("oldPassword")}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.oldPassword?.message}
          </p>
        </div>

        {/* Phone */}
        <div className="mb-3">
          <p className="text-yellow-500 font-serif pb-2">New Password:</p>
          <input
            className="bg-white w-full p-2 rounded outline-none"
            type="password"
            placeholder="Enter new password"
            {...register("newPassword")}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword?.message}
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          <input
            type="submit"
            disabled={!isValid}
            value="SAVE"
            className={`px-6 py-2 rounded-lg font-bold font-[cursive] transition duration-300
            ${
              isValid
                ? "bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          />

          {/* Login Link */}
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
