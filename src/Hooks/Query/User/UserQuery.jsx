import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/auth/get-all-users`;

const fetchUsers = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No access token found");
  }

  console.log("Using token:", token);

  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Do NOT send cookies
    withCredentials: false,
  });

  return data.data;
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
