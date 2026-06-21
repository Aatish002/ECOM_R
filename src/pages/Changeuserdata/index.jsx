import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import * as z from "zod";
import axios from "axios";

// Validation Schema
const updateDataSchema = z.object({
  userName: z
    .string()
    .min(2, "User name is too short")
    .max(20, "User name is too long"),

  phoneNumber: z
    .string()
    .min(8, "Phone number too short")
    .max(10, "Phone number too long"),
});

const UpdateData = () => {
  const accessToken = localStorage.getItem("accessToken");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(updateDataSchema),
    defaultValues: {
      userName: "",
      phoneNumber: "",
    },
  });

  // GET USER
  const getUser = async () => {
    const response = await axios.get(`${baseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  // Load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();

        reset({
          userName: user.userName || "",
          phoneNumber: user.phoneNo || "",
        });
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error.response?.data || error.message,
        );
      }
    };

    if (accessToken) {
      fetchUser();
    }
  }, []);

  // UPDATE USER
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      const response = await axios.patch(
        `${baseUrl}/auth/change-user-name`,
        {
          userName: data.userName,
          phoneNo: data.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Update Success:", response.data);

      reset();
    } catch (error) {
      console.error(
        "Update error:",
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
          Change Username & Phone Number
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

        {/* Submit */}
        <div className="flex flex-col items-center">
          <input
            type="submit"
            value="UPDATE"
            disabled={!isValid}
            className={`px-6 py-2 rounded-lg font-bold font-[cursive] transition duration-300
            ${
              isValid
                ? "bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          />

          {/* Login Link */}
          <p className="text-white mt-4 text-sm">
            Login needed{" "}
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

export default UpdateData;
