import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/auth`;

const getCart = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.get(`${API}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.cart || [];
};

export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
